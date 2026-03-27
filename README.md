# SignalizeAI Website

SignalizeAI-Website is the public website, pricing surface, auth entry, and website-side prospect experience for SignalizeAI.

Current version: `5.3.0`

## What it does

- hosts the landing page and marketing content
- shows pricing and upgrade flows
- handles website sign-in through Supabase
- renders prospect pages at `/prospect/[id]`
- supports unsaved preview-style prospect pages and saved prospect pages
- lets users save / unsave prospects from the website
- shows status controls only for saved prospects
- generates outreach emails and follow-up emails on the website
- syncs auth, status, prospect content, install state, and theme with the extension

## Main routes

- `/`
- `/pricing`
- `/signin`
- `/signup`
- `/auth/callback`
- `/prospect/[id]`
- `/docs`
- `/about`
- `/contact`
- `/privacy`
- `/payment-success`

## Prospect page behavior

The website prospect page is the detailed website view for a prospect record.

It supports:

- snapshot + strategy layout
- outreach generation
- follow-up generation
- copy actions for every email
- save / unsave
- saved-only status editing
- live sync back to the extension when the prospect changes

## Navbar behavior

The header CTA changes based on install + auth state:

- `Get Extension`
- `Sign in`
- `Sign out`

The sign-in CTA is hidden on `/signin`.

## Tech stack

- Next.js App Router
- React
- Tailwind CSS
- Supabase browser auth
- next-themes
- Cloudflare Pages

## Local development

1. Install dependencies

```bash
npm install
```

2. Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=https://dev-api.signalizeai.org
```

For production deploys:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.signalizeai.org
```

3. Start the app

```bash
npm run dev
```

Local URL:

```text
http://localhost:3000
```

## Auth notes

- website auth uses Supabase OAuth
- the callback route is `/auth/callback`
- localhost testing requires the localhost callback URLs in Supabase Redirect URLs
- extension sync only works locally when the extension is built with the dev manifest

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Deployment notes

- built for Cloudflare Pages
- edge runtime is enabled on the routes that need it
- production domain is `https://signalizeai.org`

## Support

- Website: https://signalizeai.org
- Email: support@signalizeai.org
