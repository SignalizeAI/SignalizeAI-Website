# SignalizeAI Website

Marketing site, pricing surface, auth entry point, and saved-prospect website dashboard for SignalizeAI.

## What This App Does

The website handles four main jobs:

- marketing pages for the product
- pricing and upgrade flows
- Supabase-based website sign-in
- saved prospect pages at `/prospect/[id]`

The website also syncs with the browser extension for:

- auth state
- install detection
- prospect status updates
- saved prospect content refresh
- theme sync

## Core Routes

- `/` — landing page
- `/pricing` — plans and upgrade UI
- `/signin` and `/signup` — website auth entry
- `/auth/callback` — Supabase auth callback
- `/prospect/[id]` — saved prospect dashboard page
- `/docs`, `/about`, `/contact`, `/privacy`
- `/payment-success`

## Prospect Page Features

The website prospect page mirrors the extension’s saved prospect experience and supports:

- prospect snapshot and strategy sections
- outreach email generation
- follow-up generation
- copy actions for generated emails
- status updates
- live sync with the open extension

## Tech Stack

- Next.js 15 App Router
- React 18
- Tailwind CSS 4
- Supabase browser auth and client reads
- Stripe pricing UI
- Cloudflare Pages deployment target

## Project Structure

```text
SignalizeAI-Website/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── (auth)/
│   │   │   ├── pricing/
│   │   │   ├── prospect/[id]/
│   │   │   ├── docs/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── privacy/
│   │   ├── auth/callback/
│   │   └── providers.tsx
│   ├── components/
│   ├── hooks/
│   ├── stripe/
│   └── utils/
├── public/
└── markdown/
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with the public client values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=https://dev-api.signalizeai.org
```

For production deploys, `NEXT_PUBLIC_API_BASE_URL` should point to:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.signalizeai.org
```

3. Start the website:

```bash
npm run dev
```

Local URL:

```text
http://localhost:3000
```

## Build And Checks

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Auth Notes

- Website auth uses Supabase OAuth with Google
- The auth callback route is `/auth/callback`
- Local testing requires localhost callback URLs in Supabase Redirect URLs
- The extension and website communicate through a same-origin bridge on supported hosts

## Deployment Notes

- This app is built for Cloudflare Pages
- Non-static app routes that need it export `runtime = "edge"`
- Production domain is `https://signalizeai.org`

## Support

- Website: https://signalizeai.org
- Email: support@signalizeai.org
