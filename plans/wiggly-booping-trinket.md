# Plan: Figma 디자인 불일치 수정

## Context

이전 리팩토링(frames 삭제)은 완료되었으나, Figma 검증 결과 여러 디자인 불일치가 발견되었습니다. 사용자의 3가지 요청을 처리합니다:
1. CSS 그라디언트를 Figma 블러 캠퍼스 사진으로 교체
2. 폼 타이틀("내 정보 입력하기") 좌측 정렬
3. 모든 페이지의 Figma 디자인 불일치 수정

## Step 1: 배경 이미지 다운로드 및 적용

**Figma 에셋 URL**: `https://www.figma.com/api/mcp/asset/a2572723-e486-43c4-8815-64d5e171ec60`

- 이미지를 다운로드하여 `public/campus-bg.jpg`로 저장
- `app/routes/home.tsx` (line 51): CSS 그라디언트를 `<img>` + `blur-[25.2px]`로 교체
- `app/routes/search.tsx` (line 125): 동일하게 교체

변경 전:
```html
<div className="absolute inset-0 bg-gradient-to-br from-green-100 via-amber-50 to-emerald-100" />
```

변경 후:
```html
<img
  alt=""
  className="absolute inset-0 h-full w-full object-cover blur-[25.2px] scale-105"
  src="/campus-bg.jpg"
/>
```
> `scale-105`는 blur 적용 시 가장자리 투명 영역을 방지

## Step 2: 폼 타이틀 좌측 정렬

**파일**: `app/routes/home.tsx` (line 62)

현재 타이틀 컨테이너가 `items-center`로 중앙 정렬됨. `items-start`로 변경하여 "전공" 라벨과 x좌표를 맞춤.

변경: 카드 컨테이너의 `items-center` → `items-start`

## Step 3: Header 높이 및 투명도 수정

**파일**: `app/shared/components/header.tsx`

| 속성 | Figma | 현재 코드 | 수정 |
|------|-------|----------|------|
| 높이 | 82px | `h-20` (80px) | `h-[82px]` |
| 배경 | `rgba(255,255,255,0.6)` | `bg-surface-glass` (0.8) | `bg-white/60` |

`bg-surface-glass`는 다른 곳(폼 카드 등)에서도 사용되므로 CSS 변수는 유지하고, header에만 `bg-white/60`을 직접 적용.

## Step 4: Checkbox 순서 반전 (라벨 → 체크박스)

**파일**: `app/shared/ui/primitives/checkbox.tsx`

Figma에서는 라벨이 먼저, 체크박스가 뒤에 옵니다.

변경: JSX에서 `<label>` 요소를 `<CheckboxPrimitive.Root>` 앞으로 이동

## Step 5: 검색 결과 요약 텍스트 수정

**파일**: `app/routes/search.tsx` (line 162-165)

현재: `총 5개의 학교가 검색되었습니다.`
Figma: `[ 글로벌미디어학부 / 3.8점 / TOEIC 904점 / 미국 / 후기 보고서 필수 ] 의 조건으로 분석한 34개의 학교입니다.`

`filters` 상태에서 동적으로 조건 문자열을 생성:
```tsx
const conditions = [
  filters.major,
  filters.gpa ? `${filters.gpa}점` : "",
  filters.languageCert && filters.score ? `${filters.languageCert} ${filters.score}점` : "",
  filters.country,
  filters.requireReview ? "후기 보고서 필수" : "",
].filter(Boolean).join(" / ");

// JSX
<p>
  [ <span className="text-style-body-bold">{conditions}</span> ] 의 조건으로 분석한{" "}
  <span className="text-style-body-bold">{mockResults.length}개</span>의 학교입니다.
</p>
```

## Step 6: 대학 카드 레이아웃 수정

**파일**: `app/shared/components/university-card.tsx`

Figma 카드 구조:
1. **1행**: `📍 국가` (좌) + `Badge | Tag` (우) — justify-between
2. **2행**: 대학 영문명 (bold)
3. **3행**: 대학 한글명
4. **4행**: 어학 요구사항 (slash 구분자: "IELTS 6.5 / TOEFL 90")
5. **5행**: 후기 뱃지 (항상 표시: 있음=green, 없음=dark)

변경사항:
- 국가 정보를 Badge/Tag와 같은 첫 행으로 이동 (justify-between)
- 어학 요구사항: 개별 span → "/" 구분자로 join한 단일 텍스트
- 후기 정보: `hasReview`가 false일 때도 "후기 없음" 표시, Badge 스타일 적용

## Step 7: Select 기본값 변경

**파일**: `app/routes/home.tsx`

`languageCert` 초기값을 `""` → `"없음"`으로 변경하여 Figma의 기본 표시 상태와 일치시킴.

## 수정 파일 요약

| 동작 | 파일 |
|------|------|
| 생성 | `public/campus-bg.jpg` |
| 수정 | `app/routes/home.tsx` |
| 수정 | `app/routes/search.tsx` |
| 수정 | `app/shared/components/header.tsx` |
| 수정 | `app/shared/ui/primitives/checkbox.tsx` |
| 수정 | `app/shared/components/university-card.tsx` |

## 검증

1. `pnpm build` — 빌드 성공 확인
2. `npx biome check app/` — lint 통과 확인
3. dev 서버(localhost:5173)에서 각 페이지 시각적 확인
4. 직접 수정한 파일만 선별하여 커밋
