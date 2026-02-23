# CI 설정 계획

## Context

Beyond U Client 프로젝트에 코드 품질 관리를 위한 CI 파이프라인이 없는 상태입니다.
PR 및 main 브랜치 push 시 자동으로 코드 품질을 검증하여 안정성을 확보합니다.

## 생성 파일

### `.github/workflows/ci.yml`

GitHub Actions 워크플로우 파일을 생성합니다.

**트리거:**
- `pull_request` (모든 브랜치 → main)
- `push` to `main`

**환경:**
- `ubuntu-latest`
- Node.js 22 (프로젝트의 `@types/node: ^22` 기준)
- pnpm (corepack으로 활성화)

**Job 구성 — 단일 Job, 4단계 순차 실행:**

1. **Lint** — `pnpm run lint`
   - Biome lint + format 검사
2. **Typecheck** — `pnpm run typecheck`
   - `cf-typegen` → `react-router typegen` → `tsc -b` 순차 실행
   - wrangler types 생성을 위해 환경변수 불필요 (타입 생성만 수행)
3. **Build** — `pnpm run build`
   - React Router + Cloudflare Workers 빌드
4. **Storybook Build** — `pnpm run build-storybook`
   - Storybook 정적 빌드 검증

**최적화:**
- pnpm store 캐싱 (`actions/cache`)으로 의존성 설치 속도 향상
- `concurrency` 설정으로 같은 PR의 이전 실행 자동 취소

## 검증

1. 워크플로우 파일 생성 후 YAML 문법 확인
2. PR을 생성하면 CI가 자동 실행되는지 확인
