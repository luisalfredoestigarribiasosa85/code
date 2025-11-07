// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabaseServer'

// Normaliza posibles variantes del honeypot
const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  lang: z.enum(['en', 'es']).default('en'),
  // acepta ambas claves sin romper compatibilidad
  honey: z.string().max(0).optional(),
  honeypot: z.string().max(0).optional(),
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
  // Permite IPv4 simple, IPv6 compacta y '::1'
  const looksOk =
    /^(\d{1,3}\.){3}\d{1,3}$/.test(candidate) || // IPv4
    /^[0-9a-fA-F:]+$/.test(candidate) // IPv6 muy laxa (suficiente para almacenar)
  return looksOk ? candidate : null
}

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for')
    const ip = sanitizeIp(rawIp)
    const ua = req.headers.get('user-agent') ?? ''

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

    // Honeypot anti-spam: si cualquiera vino con contenido, salimos como éxito
    if (data.honey || data.honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const { name, email, message, lang } = data

    const { error } = await supabaseServer
      .from('contact_messages')
      .insert([{ name, email, message, lang, user_agent: ua, ip }])

    if (error) {
      console.error(error)
      return NextResponse.json(
        { ok: false, error: 'DB insert failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
