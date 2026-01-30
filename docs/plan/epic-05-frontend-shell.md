# Epic 05 · Frontend Agent – Next.js Shell

**Owner:** Frontend agent  
**Skills:** `nextjs-15`, `tailwind-4`, `quizapp-ui`

## Goal
Set up the Next.js 15 App Router foundation with Tailwind 4, shadcn/ui, and global layout.

## Tasks
- [ ] Configure `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, Tailwind v4 config, and `app/globals.css`.
- [ ] Install shadcn/ui primitives (Button, Card, Dialog, Tabs, etc.) according to design needs.
- [ ] Implement `app/layout.tsx` with typography, theme colors, metadata.
- [ ] Create `app/page.tsx` placeholder referencing upcoming quiz components.
- [ ] Ensure `pnpm --filter frontend dev` runs without errors (hot reload + lint clean).

## Deliverables
- Fully functional Next.js shell ready for feature components.
- Base UI primitives and styling tokens.

## Definition of Done
- app router compiles, lint/format clean, and default page loads with base layout.

## Commit Guidance
`feat(frontend): scaffold next app shell`

## Dependencies
- Epic 04 provides backend endpoints for eventual data fetching.
