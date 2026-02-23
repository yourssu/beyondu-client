# Plan: 코드 리뷰 이슈 수정

## Context

커밋 `17d985c`에 대한 코드 리뷰에서 발견된 이슈들을 수정합니다:
- 이미지 2.5MB → 압축 필요
- `languageCert` 기본값 `"없음"`이 URL/필터 요약에서 의도치 않게 포함됨
- 배경 이미지 코드 중복 (home.tsx / search.tsx)
- Header `bg-white/60` 하드코딩 → 디자인 토큰화
- 매직 넘버 `h-[82px]`, `blur-[25.2px]` → Tailwind 토큰화

## Step 1: 이미지 압축

macOS 내장 `sips`로 리사이즈 후 경량화:
- 1536×1024 → 768×512 (blur 처리되므로 충분)
- 목표: 200KB 이하

```bash
sips -z 512 768 public/campus-bg.jpg
```

> 현재 PNG 형식(확장자만 .jpg). 포맷은 유지하되 해상도만 줄여 용량 절감.

## Step 2: 디자인 토큰 추가

**파일**: `app/app.css` — `@theme` 블록에 추가

Tailwind CSS v4 네임스페이스 규칙에 따라:
- `--spacing-*` → `h-header` 등으로 사용 가능
- `--blur-*` → `blur-campus` 로 사용 가능
- `--color-surface-*` → `bg-surface-header` 로 사용 가능

```css
/* @theme 블록 내부에 추가 */

/* Spacing */
--spacing-header: 82px;

/* Blur */
--blur-campus: 25.2px;

/* Colors - Surface (기존 토큰 아래에 추가) */
--color-surface-header: rgba(255, 255, 255, 0.6);
```

## Step 3: 토큰 적용 — Header

**파일**: `app/shared/components/header.tsx`

| 변경 전 | 변경 후 |
|---------|---------|
| `bg-white/60` | `bg-surface-header` |
| `h-[82px]` | `h-header` |

## Step 4: 토큰 적용 — 배경 이미지 + 중복 제거

배경 이미지 `<img>` 태그를 공유 컴포넌트로 추출하여 중복 제거.

**생성**: `app/shared/components/campus-background.tsx`

```tsx
export function CampusBackground() {
  return (
    <img
      alt=""
      className="absolute inset-0 h-full w-full scale-105 object-cover blur-campus"
      src="/campus-bg.jpg"
    />
  );
}
```

**수정**: `app/routes/home.tsx`, `app/routes/search.tsx`
- 인라인 `<img>` → `<CampusBackground />` 교체

## Step 5: `languageCert` 기본값 처리 수정

**파일**: `app/routes/home.tsx`

`handleSubmit`에서 `"없음"`을 미선택으로 취급:

```tsx
if (languageCert && languageCert !== "없음") params.set("languageCert", languageCert);
```

**파일**: `app/routes/search.tsx`

필터 요약에서도 `"없음"`을 제외:

```tsx
filters.languageCert && filters.languageCert !== "없음" && filters.score
  ? `${filters.languageCert} ${filters.score}점`
  : "",
```

## 수정 파일 요약

| 동작 | 파일 |
|------|------|
| 압축 | `public/campus-bg.jpg` |
| 수정 | `app/app.css` |
| 생성 | `app/shared/components/campus-background.tsx` |
| 수정 | `app/shared/components/header.tsx` |
| 수정 | `app/routes/home.tsx` |
| 수정 | `app/routes/search.tsx` |

## 검증

1. `pnpm build` — 빌드 성공 확인
2. `npx biome check app/` — lint 통과 확인
3. 이미지 파일 크기 확인 (200KB 이하 목표)
