// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.email().max(320),
  message: z.string().min(10).max(2000),
  lang: z.enum(['en', 'es']).default('en'),
  // acepta ambas claves sin romper compatibilidad; cualquier contenido no vacío
  // se trata como bot (ver honeypot check abajo)
  honey: z.string().max(500).optional(),
  honeypot: z.string().max(500).optional(),
}).transform((data) => ({
  ...data,
  name: data.name.trim(),
  email: data.email.trim(),
  message: data.message.trim(),
}))

// Valida si la IP luce razonable (IPv4/IPv6 simple), si no => null
function sanitizeIp(ip: string | null): string | null {
  if (!ip) return null
  const candidate = ip.split(',')[0]?.trim()
  if (!candidate) return null
  const looksOk =
    /^(\d{1,3}\.){3}\d{1,3}$/.test(candidate) || // IPv4
    /^[0-9a-fA-F:]+$/.test(candidate) // IPv6 laxa (suficiente para hashear)
  return looksOk ? candidate : null
}

// Nunca guardamos la IP en crudo: hash con sal opcional (IP_HASH_SALT)
function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? 'contact-form'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
}

// Cliente Supabase perezoso: no explota al importar el módulo si falta env,
// responde 500 con log claro en su lugar.
let supabaseAdmin: SupabaseClient | null = null
function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error('Missing required env vars: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY')
  }
  supabaseAdmin = createClient(url, serviceRoleKey, { auth: { persistSession: false } })
  return supabaseAdmin
}

// Rate limit en memoria (best-effort por instancia; en serverless multi-instancia
// no es garantía global, para eso hace falta un store externo tipo Upstash).
const WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  // limpieza ocasional para no crecer sin bound
  if (hits.size > 5000) hits.clear()
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps)
    return true
  }
  timestamps.push(now)
  hits.set(key, timestamps)
  return false
}

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for')
    const ip = sanitizeIp(rawIp)
    const ipHash = ip ? hashIp(ip) : null
    const ua = (req.headers.get('user-agent') ?? '').slice(0, 512)

    // Rate limit por IP (o por UA+IP ausente como 'anonymous')
    if (isRateLimited(ipHash ?? 'anonymous')) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Maneja JSON inválido con error claro
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payload' },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Honeypot anti-spam: si vino con contenido, salimos como éxito sin insertar
    if (data.honey || data.honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const { name, email, message, lang } = data

    const { error } = await getSupabaseAdmin()
      .from('contact_messages')
      .insert([{ name, email, message, lang, user_agent: ua, ip: ipHash }])

    if (error) {
      console.error('contact_messages insert failed:', error.message)
      return NextResponse.json(
        { ok: false, error: 'DB insert failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('Contact form error:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
