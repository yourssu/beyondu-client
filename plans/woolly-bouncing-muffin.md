# Search Route: SSR 비활성화 + 무한 스크롤 구현

## Context

검색 라우트(`/search`)는 현재 서버 `loader`를 통해 SSR로 대학 목록을 한 번에 전부 가져온다. 페이지네이션 파라미터(`page`, `size`)와 `PageInfo` 응답이 API에 이미 존재하지만 사용되고 있지 않다. SSR을 비활성화하고 TanStack Query의 `useInfiniteQuery`를 활용하여 무한 스크롤로 결과를 점진적으로 로드한다.

## 구현 방식

- `loader` 제거 → `clientLoader`로 교체하여 SSR 비활성화
- API 프록시용 resource route 생성 (API_BASE_URL을 서버에 유지, CORS 회피)
- `@tanstack/react-query`의 `useInfiniteQuery`로 페이지네이션 + 캐싱
- `IntersectionObserver`로 무한 스크롤 트리거

## 변경 파일

### 0. 패키지 설치

```bash
pnpm add @tanstack/react-query
```

### 1. `app/root.tsx` (수정)

`QueryClientProvider`로 앱 전체를 감싼다.

- `useState(() => new QueryClient({ ... }))`로 QueryClient를 state로 관리 (컴포넌트 라이프사이클당 1회 생성)
- `App` 컴포넌트에서 `QueryClientProvider`로 `<Outlet />`을 래핑

### 3. `app/routes/api.universities.ts` (신규)

서버 사이드 resource route. 클라이언트의 fetch 요청을 외부 API로 프록시한다.

- `loader`만 export (default export 없음 → resource route)
- URL searchParams를 그대로 전달하되 `page`, `size`, `gpa`는 숫자로, `hasReview`는 boolean으로 변환
- `context.cloudflare.env.API_BASE_URL`로 API 클라이언트 생성
- 기존 `getUniversities()` 함수 재사용

### 4. `app/routes.ts` (수정)

```diff
+ route("api/universities", "routes/api.universities.ts"),
```

### 5. `app/routes/search.tsx` (수정)

**제거:**
- `loader` export
- `useNavigation`/`isLoading` 로직
- `createApiClient`, `getUniversities` import

**추가:**
- `clientLoader`: URL searchParams에서 필터만 파싱하여 반환 (API 호출 없음)
- `HydrateFallback`: JS 로드 전 서버에서 렌더링되는 스켈레톤 셸
- `useInfiniteQuery`: `/api/universities`에서 페이지 단위로 fetch, `getNextPageParam`으로 다음 페이지 계산, `pageInfo.isLast`로 종료 판단
- `IntersectionObserver`: sentinel ref를 리스트 하단에 배치, viewport 진입 시 `fetchNextPage()` 호출

**컴포넌트 로직:**
- `queryKey`에 필터 파라미터 포함 → 필터 변경 시 자동으로 새 쿼리 실행 (TanStack Query가 캐시/리셋 자동 관리)
- `pages.flatMap(page => page.universities)`로 전체 대학 목록 평탄화
- 초기 로딩(`isLoading`): 스켈레톤 카드 표시
- 추가 로딩(`isFetchingNextPage`): 하단 스피너
- 빈 결과: 기존 빈 상태 UI 유지
- 결과 요약: 첫 페이지의 `pageInfo.totalElements` 사용
- 페이지 사이즈: `12` (3열 그리드에서 4행)

## 동작 흐름

```
홈 → /search?major=...&gpa=... 네비게이션
  ↓
clientLoader: URL params → FilterFormData 반환 (API 호출 없음, SSR 없음)
  ↓
컴포넌트 마운트 → useInfiniteQuery 실행
  ↓
page=0 fetch → /api/universities?major=...&page=0&size=12
  ↓
api.universities.ts (서버): 외부 API 프록시 → 응답 반환
  ↓
결과 렌더링 (12개 카드)
  ↓
스크롤 → IntersectionObserver 트리거 → fetchNextPage() → page=1 fetch
  ↓
TanStack Query가 pages 배열에 누적 → 기존 카드 + 새 카드 렌더링
  ↓
isLast === true → hasNextPage = false → observer 비활성화
```

## 검증

1. `pnpm dev`로 로컬 실행
2. 홈에서 필터 설정 후 검색 → 검색 페이지가 SSR 없이 로드되는지 확인 (페이지 소스에 대학 데이터 없음)
3. 스크롤하여 추가 결과가 로드되는지 확인
4. 필터 변경 시 결과가 초기화되고 새로 로드되는지 확인
5. 결과가 적어 1페이지 이내일 때 추가 fetch가 발생하지 않는지 확인
6. 빈 검색 결과 표시 확인
7. 뒤로가기 시 TanStack Query 캐시 덕분에 이전 결과가 즉시 표시되는지 확인
