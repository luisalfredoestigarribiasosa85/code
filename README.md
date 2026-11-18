# Luis Estigarribia — Portfolio

Personal portfolio of Luis Estigarribia: a bilingual (EN/ES) site built with Next.js (App Router), React 19, Tailwind CSS v4 and shadcn/ui-style components. Project case studies are statically generated; the contact form posts to a Supabase-backed API route.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) · **next-themes** (dark mode)
- **Supabase** (`@supabase/supabase-js`) for contact-form persistence
- **Zod** for server-side payload validation
- **@vercel/analytics**

## Project structure

```
├── app/
│   ├── layout.tsx              # Root layout (providers, metadata)
│   ├── page.tsx                # Home (hero / projects / about / contact)
│   ├── not-found.tsx           # 404
│   ├── globals.css             # Tailwind v4 theme + CSS variables
│   ├── sitemap.ts              # Generated sitemap
│   ├── robots.ts               # Generated robots.txt
│   ├── api/contact/route.ts    # Contact form endpoint (validation, rate limit, honeypot)
│   └── projects/[slug]/page.tsx# Case studies (statically generated)
├── components/                 # Page sections + ui/ primitives
├── contexts/language-context.tsx  # EN/ES locale state (persisted in localStorage)
├── lib/
│   ├── i18n.ts                 # EN/ES dictionaries (typed)
│   ├── projects.ts             # Project data (single source of truth)
│   └── utils.ts                # cn()
├── scripts/check-translations.ts  # i18n key-parity checker
└── public/                     # Static assets (CV PDF)
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run check-translations
npm run build
```

Requires Node.js 20+.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (used server-side by `/api/contact`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key — **server-only**, never exposed to the client |
| `IP_HASH_SALT` | Optional. Salt for hashing visitor IPs before they are stored |

### Supabase table

```sql
create table contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  lang text not null default 'en',
  user_agent text,
  ip text  -- sha256 hash (32 chars), never the raw IP
);

alter table contact_messages enable row level security;
-- No public policies: inserts happen only through the API route with the service-role key.
```

## Contact form behavior

- Zod-validated payload (`name` 2–80 chars, `message` 10–2000 chars, `email` format)
- Honeypot field (`honey`): filled submissions get a fake success and are discarded
- Best-effort in-memory rate limit: 5 messages / 10 min / IP (per instance; use an external store such as Upstash for a hard global limit)
- Visitor IPs are stored only as salted SHA-256 hashes
- User agents are truncated to 512 chars

## Internationalization

Language is toggled client-side (localStorage → browser language → English). Translation keys live in `lib/i18n.ts`; run `npm run check-translations` to verify EN/ES parity.

## Deployment

The site is static-first (home + case studies are prerendered). Deploy to Vercel or `npm run build && npm run start` elsewhere. Set the environment variables above in your hosting provider.
