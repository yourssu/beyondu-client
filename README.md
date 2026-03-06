# Beyond U

교환학생 준비 가이드 앱의 클라이언트입니다.

## Tech Stack

- **Framework:** React Router 7 (SSR)
- **Runtime:** Cloudflare Workers
- **Language:** TypeScript
- **Styling:** TailwindCSS 4 + tailwindcss-spring
- **UI:** Radix UI, lucide-react
- **HTTP Client:** ky
- **Linter/Formatter:** Biome
- **Component Docs:** Storybook 10
- **CI:** GitHub Actions (lint, typecheck, build)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

`http://localhost:5173`에서 앱을 확인할 수 있습니다.

### Storybook

```bash
pnpm storybook
```

`http://localhost:6006`에서 컴포넌트 문서를 확인할 수 있습니다.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | 개발 서버 실행 (HMR) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 프로덕션 빌드 로컬 프리뷰 |
| `pnpm deploy` | Cloudflare Workers 배포 |
| `pnpm lint` | Biome 린트 검사 |
| `pnpm lint:fix` | Biome 린트 자동 수정 |
| `pnpm format` | Biome 포맷팅 |
| `pnpm typecheck` | 타입 검사 |
| `pnpm storybook` | Storybook 개발 서버 |
| `pnpm build-storybook` | Storybook 빌드 |

## Project Structure

```
app/
├── routes/                  # 페이지 라우트
│   ├── home.tsx             # / (메인 페이지)
│   ├── search.tsx           # /search (검색)
│   ├── detail.tsx           # /detail/:id (상세)
│   └── api.universities.ts  # /api/universities (API 프록시)
├── shared/
│   ├── api/                 # API 클라이언트 및 타입
│   ├── components/          # 공통 컴포넌트
│   ├── ui/primitives/       # UI 프리미티브 (Button, Card, Select 등)
│   └── types/               # 공유 타입
├── lib/                     # 유틸리티 (cn, filter-params)
├── app.css                  # 디자인 토큰 (@theme)
├── root.tsx                 # 루트 레이아웃
└── routes.ts                # 라우트 설정
```

## Deployment

Cloudflare Workers에 배포됩니다. 커스텀 도메인: `beyondu.urssu.com`

```bash
# 프로덕션 배포
pnpm deploy

# 프리뷰 배포
pnpx wrangler versions upload
```
