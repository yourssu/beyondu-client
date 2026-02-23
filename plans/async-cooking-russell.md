# View Transition API + tailwind-spring 통합 계획

## Context

현재 Beyond U 앱은 페이지 간 전환 애니메이션이 없어 라우트 이동 시 즉시 교체됩니다. 컴포넌트 레벨에서는 tailwindcss-spring 기반 전환이 잘 갖춰져 있지만(버튼 hover, 카드 hover, 드롭다운 등), 페이지 전환에는 적용되지 않습니다. View Transition API를 React Router 7의 내장 `viewTransition` 기능과 결합하고, spring easing을 적용하여 자연스러운 페이지 전환을 구현합니다.

## 변경 요약

| 파일 | 변경 내용 | 규모 |
|------|----------|------|
| `app/app.css` | Spring easing 커스텀 프로퍼티, VT 의사 요소 규칙, card-stagger-in 키프레임 | 중 |
| `app/shared/ui/primitives/card.tsx` | `style`, `ref` prop 추가 | 소 |
| `app/shared/components/header.tsx` | `<a>` → `<Link viewTransition>`, view-transition-name 추가 | 소 |
| `app/shared/components/campus-background.tsx` | view-transition-name 추가 | 소 |
| `app/shared/components/back-button.tsx` | `viewTransition` prop 추가 | 소 |
| `app/shared/components/university-card.tsx` | `viewTransition` + `useViewTransitionState` 적용 | 중 |
| `app/shared/components/route-error-fallback.tsx` | `viewTransition` prop 추가 | 소 |
| `app/routes/home.tsx` | `navigate()`에 `{ viewTransition: true }` 추가 | 소 |
| `app/routes/search.tsx` | 카드 stagger 애니메이션 래퍼 추가 | 소 |
| `app/routes/detail.tsx` | `<main>`에 view-transition-name 추가 | 소 |

새 파일: 0개 / 새 의존성: 0개

---

## 구현 상세

### 1. `app/app.css` — Spring Easing 토큰 및 View Transition CSS

**@theme 블록에 추가:**
```css
/* View Transition 지속 시간 */
--duration-vt-page: 300ms;
--duration-vt-hero: 400ms;

/* 카드 stagger 입장 애니메이션 */
--animate-card-stagger-in: card-stagger-in 400ms both;
```

**@theme 블록 밖에 추가:**
```css
/* tailwindcss-spring generateEase()에서 추출한 spring linear() easing */
:root {
  --ease-spring-subtle: linear(0, 0.0014, 0.0053 1.02%, 0.0225 2.18%, 0.0512 3.41%, 0.0903 4.72%, 0.1772 7.11%, 0.3978 12.56%, 0.5033 15.31%, 0.6026, 0.6881 21.12%, 0.7255 22.57%, 0.7611, 0.7931, 0.8217 27.14%, 0.8482, 0.8715 30.34%, 0.8935, 0.9124 33.82%, 0.929 35.64%, 0.9436 37.52%, 0.956 39.48%, 0.9668 41.59%, 0.9759 43.84%, 0.9834 46.23%, 0.994, 0.999 57.12%, 1.0012 64.16%, 1.0002 99.94%);
  --ease-spring-bouncy: linear(0, 0.0014 0.51%, 0.0061 1.09%, 0.0243 2.25%, 0.0564 3.56%, 0.1004 4.94%, 0.1964 7.4%, 0.4369 12.92%, 0.5444 15.53%, 0.6487 18.36%, 0.7338 21.05%, 0.8066 23.81%, 0.8376 25.19%, 0.8666, 0.8921 28.09%, 0.9153 29.61%, 0.9361, 0.9535 32.81%, 0.9668 34.26%, 0.9785 35.78%, 0.9883 37.38%, 0.9965 39.05%, 1.0081 42.68%, 1.0141 46.96%, 1.0145 53.42%, 1.0054 68.37%, 1.0019 77.37%, 0.9998 99.94%);
}

/* 기본 페이지 크로스 페이드 (spring easing) */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--duration-vt-page);
  animation-timing-function: var(--ease-spring-subtle);
}

/* Header 로고: 모든 페이지에서 유지 */
::view-transition-old(header-logo),
::view-transition-new(header-logo) {
  animation-duration: var(--duration-vt-page);
  animation-timing-function: var(--ease-spring-subtle);
}

/* 캠퍼스 배경: home ↔ search 간 유지 */
::view-transition-old(campus-bg),
::view-transition-new(campus-bg) {
  animation-duration: var(--duration-vt-page);
  animation-timing-function: var(--ease-spring-subtle);
}

/* 대학 카드 → 상세 페이지 히어로 모핑 */
::view-transition-old(university-hero),
::view-transition-new(university-hero) {
  animation-duration: var(--duration-vt-hero);
  animation-timing-function: var(--ease-spring-bouncy);
  overflow: hidden;
  border-radius: var(--radius-card);
}

/* 카드 stagger 입장 키프레임 */
@keyframes card-stagger-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. `app/shared/ui/primitives/card.tsx` — `style`, `ref` prop 추가

React 19 패턴이므로 forwardRef 불필요. `style`과 `ref` prop을 CardProps에 추가하고 `<div>`에 전달.

### 3. `app/shared/components/header.tsx` — `<a>` → `<Link viewTransition>`

현재 `<a href="/">`는 풀 페이지 리로드를 유발합니다. `react-router`의 `<Link>`로 교체하여 클라이언트 사이드 네비게이션을 활성화하고, `viewTransition` prop 추가. 로고에 `style={{ viewTransitionName: "header-logo" }}` 적용.

### 4. `app/shared/components/campus-background.tsx` — view-transition-name

`<img>`에 `style={{ viewTransitionName: "campus-bg" }}` 추가. home ↔ search 전환 시 배경이 크로스페이드 대신 자연스럽게 유지됨.

### 5. `app/shared/components/back-button.tsx` — viewTransition

`<Link>` 컴포넌트에 `viewTransition` prop 추가 (한 줄 변경).

### 6. `app/shared/components/university-card.tsx` — 히어로 전환

`useViewTransitionState`를 사용하여 클릭한 카드에만 동적으로 `view-transition-name: university-hero`를 할당합니다. 이 접근은 forward/back 네비게이션 모두를 처리합니다.

```tsx
import { Link, useViewTransitionState } from "react-router";

export function UniversityCard({ id, ...rest }: UniversityCardProps) {
  const isTransitioning = useViewTransitionState(`/detail/${id}`);

  return (
    <Link className="block" to={`/detail/${id}`} viewTransition>
      <Card
        style={isTransitioning ? { viewTransitionName: "university-hero" } : undefined}
        // ... 기존 props
      >
        {/* 기존 콘텐츠 */}
      </Card>
    </Link>
  );
}
```

### 7. `app/routes/home.tsx` — navigate에 viewTransition 추가

```tsx
navigate(`/search?${params.toString()}`, { viewTransition: true });
```

### 8. `app/routes/search.tsx` — 카드 stagger 입장 애니메이션

대학 카드를 stagger 래퍼로 감쌈. `index % PAGE_SIZE`로 무한 스크롤 시 배치별 stagger 리셋:

```tsx
universities.map((university, index) => (
  <div
    key={university.id}
    className="animate-card-stagger-in"
    style={{
      animationDelay: `${(index % PAGE_SIZE) * 50}ms`,
      animationTimingFunction: "var(--ease-spring-bouncy)",
    }}
  >
    <UniversityCard {...university} />
  </div>
))
```

### 9. `app/routes/detail.tsx` — 히어로 수신 요소

```tsx
<main
  className="mx-auto max-w-5xl px-8 py-10"
  style={{ viewTransitionName: `university-${university.id}` }}
>
```

**주의**: university-card에서 `useViewTransitionState`가 전환 중인 카드에만 `university-hero`를 설정하므로, detail 쪽도 `university-hero`를 사용해야 매칭됩니다. 따라서:

```tsx
style={{ viewTransitionName: "university-hero" }}
```

### 10. `app/shared/components/route-error-fallback.tsx` — viewTransition

`<Link to="/">`에 `viewTransition` prop 추가.

---

## Progressive Enhancement & SSR 호환성

- View Transition API 미지원 브라우저: `viewTransition` prop은 no-op, `::view-transition-*` CSS 규칙 무시됨 → 기존과 동일하게 동작
- SSR: `view-transition-name`은 CSS 속성이므로 서버 렌더링에 영향 없음. `document.startViewTransition()`은 클라이언트에서만 React Router가 호출
- stagger 애니메이션: CSS only이므로 SSR/CSR 무관하게 동작

## 구현 순서

1. `app/app.css` — 토큰, easing 프로퍼티, VT 규칙, 키프레임
2. `card.tsx` — style/ref prop 추가
3. `header.tsx` — Link 교체 + view-transition-name
4. `campus-background.tsx` — view-transition-name
5. `back-button.tsx` — viewTransition prop
6. `university-card.tsx` — viewTransition + useViewTransitionState
7. `home.tsx` — navigate에 viewTransition 옵션
8. `detail.tsx` — main에 view-transition-name
9. `search.tsx` — stagger 래퍼
10. `route-error-fallback.tsx` — viewTransition prop

## 검증 방법

1. `pnpm dev`로 로컬 서버 실행
2. Home → Search 전환: 배경 유지, 로고 유지, 콘텐츠 크로스페이드 확인
3. Search → Detail 전환: 클릭한 카드가 상세 페이지로 모핑되는 히어로 효과 확인
4. Detail → Back: 상세 페이지에서 카드로 역방향 히어로 전환 확인
5. Search 무한 스크롤: 새 카드 배치가 stagger 애니메이션으로 등장 확인
6. Safari(VT 미지원 시): 전환 없이 정상 네비게이션 확인
7. `pnpm build && pnpm preview`로 프로덕션 빌드 검증
