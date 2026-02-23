# Plan: Create AGENTS.md from Session Analysis

## Context

Analyzed all 29 Claude Code conversation sessions for the beyondu-client project. Identified recurring patterns the user corrects or emphasizes. These findings should be codified in AGENTS.md so future sessions don't repeat the same mistakes. CLAUDE.md will be a symlink to AGENTS.md.

## User Feedback Summary

Items to exclude (session-specific, not project-wide):
- ~~API undefined parameter filtering~~ (one-time fix, already implemented)
- ~~fixup commit workflow~~ (per-session instruction)
- ~~session-scoped changes only~~ (per-session instruction)

Items to include (persistent project-wide rules):
- Design tokens over hardcoding (most frequent correction)
- No arbitrary Tailwind classes — define tokens in `@theme`
- Figma as source of truth
- shadcn/ui-level component quality (states, interactions, transitions)
- Spring-based animations via tailwindcss-spring
- No code duplication — extract shared components
- No unnecessary abstraction layers (frames layer was removed)
- Image optimization required
- GPG commit issue — disable sandbox when committing
- `/review` code review after commits

## Implementation Steps

### Step 1: Create `/AGENTS.md` (English)

Write AGENTS.md in English with these sections:

```
# Beyond U Client

## Project Overview
- Exchange student preparation guide app
- React Router 7 + Cloudflare Workers + TailwindCSS 4 + TypeScript

## Tech Stack & Tools
- Package manager: pnpm
- Linter/Formatter: Biome (tabs, double quotes, semicolons, line width 100)
- Build: Vite + Cloudflare Workers
- UI: Radix UI primitives, lucide-react icons
- HTTP client: ky
- Styling: TailwindCSS 4 + tailwindcss-spring
- Storybook 10 for component docs

## Code Style
- Path alias: `~/` (e.g., `~/shared/ui/primitives/button`)
- React 19 patterns: ComponentProps, no forwardRef
- Import ordering: Biome organizeImports (:NODE:, :PACKAGE:, :ALIAS:, :PATH:)
- Utility function: `cn()` from `~/lib/cn` for class merging

## Design System
- All design tokens live in `app/app.css` under `@theme`
- NEVER use arbitrary Tailwind bracket values — define tokens in @theme instead
- NEVER hardcode colors, spacing, blur, or radius — use the existing tokens
- Typography: use `text-style-*` custom utilities (heading-lg, heading-md, body-bold, body, body-sm, caption, badge-sm, logo)
- Figma is the source of truth for all visual decisions
- Prefer Figma design assets over programmatic styling (e.g., use exported blur images, not CSS gradients)
- Optimize all images before committing (compress to reasonable sizes)

## Component Development
- Primitives: `app/shared/ui/primitives/` — low-level building blocks
- Feature components: `app/shared/components/` — composed from primitives
- Target shadcn/ui-level quality: comprehensive states, interactions, and transitions
- Use spring-based animations via tailwindcss-spring (`spring-bounce-*`, `spring-duration-*`)
- Use Radix UI for complex primitives (Select, Checkbox, Tooltip)
- Use lucide-react for all icons
- Extract shared UI into reusable components — no code duplication across routes
- Avoid unnecessary abstraction layers — implement directly in route files when appropriate
- Co-locate Storybook stories (*.stories.tsx) with components

## API Integration
- HTTP client: ky (created via `createApiClient()` in `app/shared/api/client.ts`)
- API functions: `app/shared/api/universities.ts`
- API types: `app/shared/api/types.ts`
- Environment: SSR on Cloudflare Workers
- Base URL configured via `wrangler.jsonc` env vars
- Validate types against Swagger docs at https://api.beyondu.yourssu.com/v3/api-docs

## Git & Commit Workflow
- IMPORTANT: Disable sandbox (`dangerouslyDisableSandbox: true`) when running git commit — GPG signing requires it
- Run `/review` via a separate sub-agent after committing
- Verify implementation against Figma design after completing UI work

## Do NOT
- Use magic numbers or hardcoded color/spacing values
- Use arbitrary Tailwind bracket notation (e.g., `h-[82px]`) — define a token
- Duplicate UI code across files — extract to shared component
- Add unnecessary wrapper/abstraction layers
- Commit uncompressed large images
- Leak default/placeholder values into URLs or visible UI
```

### Step 2: Create symlink `CLAUDE.md` -> `AGENTS.md`

```bash
ln -s AGENTS.md CLAUDE.md
```

## Files to Create/Modify

| File | Action |
|------|--------|
| `AGENTS.md` | Create (new) |
| `CLAUDE.md` | Create symlink → `AGENTS.md` |

## Verification

1. `cat CLAUDE.md` — symlink 동작 확인
2. AGENTS.md 내용이 프로젝트 실제 구조/설정과 일치하는지 검토
