# Search 카드 크기 불일치 및 태그 stretch 문제 수정

## Context

Search route에서 대학 카드들의 높이가 일정하지 않아 그리드가 들쭉날쭉하게 보이는 문제가 있다. `languageRequirementSummary`가 조건부 렌더링되기 때문에 카드마다 콘텐츠 높이가 달라진다. 또한 search와 detail route에서 Badge가 `flex-col` 컨테이너 안에서 전체 너비로 늘어나는 문제가 있다.

## 수정 사항

### 1. 카드 높이 균일화

**파일: `app/shared/components/university-card.tsx`**

CSS Grid는 같은 행의 셀 높이를 동일하게 맞추지만, Link와 Card에 `h-full`이 없어서 내부 콘텐츠가 셀 높이를 채우지 못한다.

- Link에 `h-full` 추가: `"block"` → `"block h-full"`
- Card에 `h-full` 추가: `"flex flex-col gap-3 p-5"` → `"flex h-full flex-col gap-3 p-5"`
- 하단 리뷰 Badge에 `mt-auto` 추가하여 항상 카드 하단에 위치하도록 설정

### 2. Badge stretch 해소

`flex-col` 컨테이너에서 `align-items: stretch`가 기본값이라 Badge가 전체 너비로 늘어난다. 각 사용처에 `self-start`를 추가하여 해결한다.

**파일: `app/shared/components/university-card.tsx`**
- 리뷰 상태 Badge: `className="mt-auto self-start"` 추가

**파일: `app/routes/detail.tsx`**
- 상단 Badge: `className="self-start"` 추가

## 변경 파일 요약

| 파일 | 변경 내용 |
|------|----------|
| `app/shared/components/university-card.tsx` | Link에 `h-full`, Card에 `h-full`, Badge에 `mt-auto self-start` |
| `app/routes/detail.tsx` | Badge에 `self-start` |

## 검증

- 브라우저에서 `/search` 페이지 확인: 같은 행의 카드들이 동일한 높이를 가지는지 확인
- `languageRequirementSummary`가 있는 카드와 없는 카드가 같은 행에 있을 때 높이가 맞는지 확인
- Badge가 콘텐츠 너비만큼만 차지하는지 확인 (search, detail 모두)
- 모바일(1열), 태블릿(2열), 데스크탑(3열) 반응형 레이아웃 정상 동작 확인
