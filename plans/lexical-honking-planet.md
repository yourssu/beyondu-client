# 불필요한 Tailwind 클래스 및 마크업 문제 수정 계획

## Context

코드베이스 전반에 걸쳐 탭 인덴트 불일치, 레이아웃에 영향을 주지 않는 불필요한 Tailwind 클래스, `cn()` 대신 template literal 사용, 임의 bracket 값 사용 등의 마크업 문제가 존재합니다. 코드를 최대한 간결하게 정리하고 CLAUDE.md 규칙을 준수하기 위해 이를 수정합니다.

## 수정 사항

### 1. 탭 인덴트 불일치

**`app/shared/ui/primitives/select.tsx`** — 파일 전체가 2-space 인덴트 사용 중. 프로젝트 표준(Biome 설정)인 탭 인덴트로 변환.

### 2. 임의 bracket 값 (CLAUDE.md 위반)

**`app/shared/ui/primitives/button.tsx:29`**
```diff
- "active:scale-[0.97]",
+ "active:scale-97",
```

**`app/shared/ui/primitives/combobox.tsx:125`**
```diff
- : "pointer-events-none scale-[0.96] opacity-0",
+ : "pointer-events-none scale-96 opacity-0",
```

`app/app.css`의 `@theme`에 `--scale-96: 0.96;`, `--scale-97: 0.97;` 토큰 추가.

### 3. Template literal → `cn()` 유틸리티

**`app/routes/search.tsx:107-109`**
```diff
  <div
-   className={`spring-duration-200 mt-8 grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
+   className={cn(
+     "spring-duration-200 mt-8 grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3",
+     isLoading && "pointer-events-none opacity-50",
+   )}
  >
```
상단에 `cn` import 추가 필요.

### 4. 불필요한/중복 클래스 제거

**`app/routes/home.tsx:57`** — `items-start` 불필요
```diff
- <div className="flex w-full max-w-form flex-col items-start gap-10 ...">
+ <div className="flex w-full max-w-form flex-col gap-10 ...">
```
모든 자식이 이미 `w-full`을 가지거나 텍스트 콘텐츠라 `items-start`와 기본값 `stretch` 간 시각적 차이 없음.

**`app/routes/home.tsx:76`** — `text-center` 무효
```diff
- <p className="text-center text-red-500 text-style-caption">
+ <p className="text-red-500 text-style-caption">
```
부모가 `flex-col`이고 `<p>`가 콘텐츠 너비로 렌더되므로 `text-center`가 시각적 효과를 가지지 않음.

**`app/routes/detail.tsx:96`** — `sm:gap-3` 중복
```diff
- <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
+ <div className="flex flex-col gap-3 sm:flex-row">
```
`gap-3`이 이미 모든 브레이크포인트에 적용되므로 `sm:gap-3`은 중복.

**`app/routes/detail.tsx:130`** — `flex flex-col` 불필요
```diff
- <div className="flex flex-col text-base-900 text-style-body-bold">
+ <div className="text-base-900 text-style-body-bold">
```
자식이 모두 `<p>` 블록 요소이고 `gap` 없이 `flex flex-col`만 사용되어 일반 block flow와 동일.

**`app/shared/components/campus-background.tsx:5`** — `h-full w-full` 중복
```diff
- className="absolute inset-0 h-full w-full scale-105 object-cover blur-campus"
+ className="absolute inset-0 scale-105 object-cover blur-campus"
```
`absolute inset-0`이 이미 상하좌우 0으로 요소를 부모에 꽉 채우므로 `h-full w-full`은 중복.

**`app/shared/components/search-filter-bar.tsx:100`** — 불필요한 wrapper div
```diff
- <div className="flex w-full items-center">
-   <Checkbox ... />
- </div>
+ <Checkbox ... />
```
부모가 `flex-col`이므로 자식은 기본 전체 너비. Checkbox 자체가 `flex items-center`를 가지고 있어 외부 wrapper 불필요.

### 5. 일관되지 않은 타이포그래피 유틸리티

**`app/shared/ui/primitives/form-field.tsx:18`**
```diff
- {error && <p className="mt-1 animate-error-in text-red-500 text-sm">{error}</p>}
+ {error && <p className="mt-1 animate-error-in text-red-500 text-style-caption">{error}</p>}
```
`text-sm`(14px) 대신 디자인 시스템의 `text-style-caption`(12px) 사용.

**`app/shared/ui/primitives/tooltip.tsx:22`**
```diff
- "z-50 whitespace-nowrap rounded-tag border border-base-300 bg-surface-tooltip px-2.5 py-0.5 text-center text-2xs leading-6",
+ "z-50 whitespace-nowrap rounded-tag border border-base-300 bg-surface-tooltip px-2.5 py-0.5 text-center text-style-badge-sm",
```
`text-2xs leading-6` 조합 대신 디자인 시스템의 `text-style-badge-sm` 사용.

### `relative` 클래스 분석 결과

코드베이스의 모든 `relative` 사용처를 검토한 결과, 전부 필요한 경우였습니다:
- `home.tsx:49`, `search.tsx:57` — `CampusBackground`의 `absolute` 자식 포지셔닝에 필요
- `home.tsx:53`, `search.tsx:61` — `z-10` 스태킹 컨텍스트에 필요
- `combobox.tsx:97` — 드롭다운의 `absolute` 포지셔닝에 필요

## 수정 대상 파일 목록

| 파일 | 수정 내용 |
|------|----------|
| `app/app.css` | `--scale-96`, `--scale-97` 토큰 추가 |
| `app/shared/ui/primitives/select.tsx` | 탭 인덴트로 변환 |
| `app/shared/ui/primitives/button.tsx` | `scale-[0.97]` → `scale-97` |
| `app/shared/ui/primitives/combobox.tsx` | `scale-[0.96]` → `scale-96` |
| `app/routes/search.tsx` | template literal → `cn()` |
| `app/routes/home.tsx` | `items-start` 제거, `text-center` 제거 |
| `app/routes/detail.tsx` | `sm:gap-3` 제거, 불필요한 `flex flex-col` 제거 |
| `app/shared/components/campus-background.tsx` | 중복 `h-full w-full` 제거 |
| `app/shared/components/search-filter-bar.tsx` | 불필요한 wrapper div 제거 |
| `app/shared/ui/primitives/form-field.tsx` | `text-sm` → `text-style-caption` |
| `app/shared/ui/primitives/tooltip.tsx` | `text-2xs leading-6` → `text-style-badge-sm` |

## 검증 방법

1. `pnpm biome check --write .` — Biome lint/format 통과 확인
2. `pnpm build` — 빌드 성공 확인
3. 브라우저에서 home, search, detail 페이지 시각적 확인 (레이아웃 변경 없음을 검증)
4. tooltip, form-field 에러 상태의 폰트 사이즈 시각적 확인
