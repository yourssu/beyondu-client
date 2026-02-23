# Plan: frames 삭제 및 routes 직접 구현 + Figma 검증

## Context

현재 프로젝트는 `app/frames/` 디렉토리에 프레젠테이션 컴포넌트(MainFrame, SearchFrame, DetailFrame)를 두고, `app/routes/`의 페이지 컴포넌트에서 이를 import하여 렌더링하는 구조입니다. 각 frame은 정확히 하나의 route에서만 사용되므로 불필요한 간접 계층입니다. 이를 제거하고 route 파일에 직접 UI를 구현하여 구조를 단순화합니다.

## Step 1: 공유 타입 파일 생성

**새 파일**: `app/shared/types/filter.ts`

`FilterFormData` 인터페이스는 `home.tsx`와 `search.tsx` 양쪽에서 사용되므로 공유 위치로 추출합니다. 동일하게 중복 정의된 `languageCertOptions` 상수도 함께 이동합니다.

```ts
export interface FilterFormData {
  major: string;
  gpa: string;
  languageCert: string;
  score: string;
  country: string;
  requireReview: boolean;
}

export const languageCertOptions = [
  { label: "없음", value: "없음" },
  { label: "TOEFL", value: "TOEFL" },
  { label: "IELTS", value: "IELTS" },
  { label: "TOEIC", value: "TOEIC" },
  { label: "기타", value: "기타" },
];
```

## Step 2: `app/routes/home.tsx` - MainFrame 병합

- `~/frames/main-frame` import 제거
- `FilterFormData`, `languageCertOptions`를 `~/shared/types/filter`에서 import
- MainFrame이 사용하던 import 추가 (ArrowRight, useState, Header, Button, Checkbox, Combobox, FormField, NumberInput, Select)
- MainFrame의 상태(useState 6개)와 JSX를 Home 컴포넌트에 직접 인라인
- `onSubmit` 콜백 간접 호출 대신 `handleSubmit`에서 직접 URLSearchParams 구성 + navigate 수행

## Step 3: `app/routes/search.tsx` - SearchFrame 병합

- `~/frames/main-frame`, `~/frames/search-frame` import 제거
- `FilterFormData`, `languageCertOptions`를 `~/shared/types/filter`에서 import
- SearchFrame이 사용하던 import 추가 (BackButton, Header, SearchFilterBar, UniversityCard)
- `UniversityResult` 인터페이스를 search.tsx에 직접 정의
- SearchFrame의 JSX를 Search 컴포넌트에 직접 인라인
- `onFiltersChange` 콜백 제거, `setFilters` 직접 호출
- `resultCount` prop 제거, `mockResults.length` 직접 참조

## Step 4: `app/routes/detail.tsx` - DetailFrame 병합

- `~/frames/detail-frame` import 제거
- DetailFrame이 사용하던 import 추가 (MapPin, Users, BackButton, ContentSection, Header, InfoCard, Badge, Button, Tooltip)
- `UniversityDetail` 인터페이스를 detail.tsx에 직접 정의
- DetailFrame의 JSX와 `languageText` 계산 로직을 Detail 컴포넌트에 직접 인라인

## Step 5: frames 디렉토리 삭제

모든 route 파일 수정 후 삭제:
- `app/frames/main-frame.tsx`
- `app/frames/search-frame.tsx`
- `app/frames/detail-frame.tsx`

## Step 6: Figma 디자인 검증 (agent-browser)

dev 서버를 실행하고 agent-browser를 사용하여 각 페이지의 뷰가 Figma 디자인과 일치하는지 확인합니다.

Figma 참조:
- 메인 뷰 (`/`): fileKey=`Jr6rZtdgE5nUcjdtgDX6nq`, nodeId=`83:84`
- 검색 뷰 (`/search`): nodeId=`260:3919`
- 상세 뷰 (`/detail/:id`): nodeId=`121:1054`

확인 항목:
1. `/` - 폼 레이아웃, 그라디언트 배경, 글래스모피즘 카드, 버튼 스타일
2. `/search` - 필터바, 결과 카드 그리드, 뒤로가기 버튼
3. `/detail/1` - 뱃지, 대학 정보, InfoCard, ContentSection

## 수정 파일 요약

| 동작 | 파일 |
|------|------|
| 생성 | `app/shared/types/filter.ts` |
| 수정 | `app/routes/home.tsx` |
| 수정 | `app/routes/search.tsx` |
| 수정 | `app/routes/detail.tsx` |
| 삭제 | `app/frames/main-frame.tsx` |
| 삭제 | `app/frames/search-frame.tsx` |
| 삭제 | `app/frames/detail-frame.tsx` |

## 검증

1. `npm run build` - 빌드 성공 확인
2. `npm run dev` - 로컬 서버 실행
3. agent-browser로 각 페이지 스크린샷 + Figma 디자인 비교
4. `npx biome check` - lint 통과 확인

## Step 7: 커밋 및 코드 리뷰

1. 변경사항을 커밋
2. 커밋 해시에 대해 서브에이전트로 `/review` 스킬 실행
