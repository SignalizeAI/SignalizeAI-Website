# Contributing to SignalizeAI-Website

Thanks for your interest. This is the Next.js website for SignalizeAI: landing
page, pricing, auth entry, and the prospect workspace.

## Getting started

```bash
git clone https://github.com/SignalizeAI/SignalizeAI-Website
cd SignalizeAI-Website
npm install
npm run dev
```

You'll need Supabase environment variables in `.env.local` for auth and prospect
routes to work locally.

## Before you open a PR

```bash
npm run lint
npm run build
```

Keep changes focused, use clear commit messages, and describe what you changed and
why in the PR body.

## Claiming an issue

Want to pick something up? Just comment on the issue saying you'd like to work on
it. A workflow adds the `claimed` label so nobody else duplicates your effort.

Two small rules keep things fair:

- **Two open claims per person.** If you already hold two claimed issues, we'll ask
  you to finish one first so other people get a turn. Comment again once one lands
  and the next is yours.
- **Claims go stale after 14 days.** If a claimed issue sees no activity for two
  weeks, the label is removed and it goes back in the pool. No hard feelings, and
  you can always claim it again.

No pressure on timelines otherwise. Ask questions in the issue thread any time.
