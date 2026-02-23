# Select/ComboBox 드롭다운 개선: 너비, 호버 컬러, 스프링 애니메이션

## Context

Select와 ComboBox의 드롭다운이 부모 입력 너비를 따르지 않고, 호버 시 `#CDE79A` 컬러를 디자인 시스템에 추가해야 합니다. `tailwindcss-spring`(이미 설치/설정 완료)을 활용한 스프링 기반 transition과 shadcn/ui 수준의 애니메이션을 적용합니다.

현재 상태:
- `tailwindcss-spring` v1.0.1 설치 및 `@plugin` 설정 완료
- 기존 애니메이션 패턴: `@theme`에 `--animate-*` 정의 + `@keyframes` + Radix `data-[state]` 활용 (tooltip 참조)
- 기존 spring 패턴: `spring-bounce-*` + `spring-duration-*` + `transition` (button, checkbox, card 등에서 사용 중)

## 변경 사항

### 1. 디자인 시스템에 호버 컬러 + 드롭다운 애니메이션 추가

**파일:** `app/app.css`

**`@theme` 블록에 추가:**
```css
/* Colors - Surface 섹션, line 26 뒤에 */
--color-surface-hover: #cde79a;

/* Animations 섹션, line 41 뒤에 */
--animate-dropdown-in: dropdown-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
--animate-dropdown-out: dropdown-out 150ms cubic-bezier(0.4, 0, 1, 1) forwards;
```

> 기존 `tooltip-in`/`tooltip-out`과 동일한 easing 패턴 사용. 프로젝트 전체 일관성 유지.

**`@keyframes` 추가 (기존 keyframes 뒤에):**
```css
@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dropdown-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }
}
```

> tooltip은 `scale`만 사용하지만, dropdown은 위에서 내려오는 느낌을 위해 `translateY(-4px)` + `scale(0.96)` 조합.

### 2. Select 컴포넌트 개선

**파일:** `app/shared/ui/primitives/select.tsx`

**Content (line 47):**
```diff
- className="z-50 overflow-hidden rounded-input border border-base-400 bg-white shadow-lg"
+ className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-input border border-base-400 bg-white shadow-lg animate-dropdown-in data-[state=closed]:animate-dropdown-out"
```

- `w-[var(--radix-select-trigger-width)]`: Radix가 제공하는 CSS 변수로 트리거 너비에 맞춤
- `animate-dropdown-in data-[state=closed]:animate-dropdown-out`: tooltip.tsx와 동일한 패턴

**Item (line 54):**
```diff
- className="flex cursor-pointer items-center gap-2 px-4 py-2 text-style-body outline-none data-[highlighted]:bg-surface-page"
+ className="flex cursor-pointer items-center gap-2 px-4 py-2 text-style-body outline-none spring-bounce-0 spring-duration-150 transition-colors data-[highlighted]:bg-surface-hover"
```

- `data-[highlighted]:bg-surface-hover`: 호버 컬러 변경
- `spring-bounce-0 spring-duration-150 transition-colors`: badge/tag 패턴을 따른 부드러운 색상 전환

### 3. ComboBox 컴포넌트 개선

**파일:** `app/shared/ui/primitives/combobox.tsx`

**드롭다운을 항상 렌더링 + CSS transition으로 show/hide:**

기존 (line 116-140):
```tsx
{isOpen && filtered.length > 0 && (
  <div className="absolute top-full left-0 z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-input border border-base-400 bg-white shadow-lg" ...>
    {filtered.map(...)}
  </div>
)}
```

변경:
```tsx
<div
  className={cn(
    "absolute top-full left-0 z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-input border border-base-400 bg-white shadow-lg",
    "spring-bounce-20 spring-duration-200 transition-[opacity,transform]",
    isOpen && filtered.length > 0
      ? "scale-100 opacity-100"
      : "pointer-events-none scale-[0.96] opacity-0",
  )}
  id={listboxId}
  role="listbox"
>
  {filtered.map((item, index) => (
    <div
      aria-selected={index === activeIndex}
      className={cn(
        "cursor-pointer px-4 py-2 text-style-body spring-bounce-0 spring-duration-150 transition-colors hover:bg-surface-hover",
        index === activeIndex && "bg-surface-hover",
      )}
      id={`${id}-option-${index}`}
      key={item}
      onMouseDown={() => selectItem(item)}
      onMouseEnter={() => setActiveIndex(index)}
      role="option"
      tabIndex={-1}
    >
      {item}
    </div>
  ))}
</div>
```

- 조건부 렌더링 → 항상 렌더링 + CSS transition으로 제어 (enter/exit 모두 부드러움)
- `spring-bounce-20 spring-duration-200`: button/checkbox와 동일한 스프링 설정
- 아이템: `spring-bounce-0 spring-duration-150 transition-colors` (badge/tag 패턴)

### `bg-surface-page` 영향 범위 확인

변경하는 곳 (hover 용도):
- `select.tsx:54` → `bg-surface-hover`로 변경
- `combobox.tsx:126-127` → `bg-surface-hover`로 변경

변경하지 않는 곳 (배경/disabled 용도, 영향 없음):
- `content-section.tsx:15` — 섹션 배경
- `text-input.tsx:16` — disabled 상태 배경
- `number-input.tsx:16` — disabled 상태 배경

## 수정 파일 요약

| 파일 | 변경 내용 |
|------|-----------|
| `app/app.css` | `--color-surface-hover` + `--animate-dropdown-in/out` + `@keyframes` 추가 |
| `app/shared/ui/primitives/select.tsx` | Content width + 애니메이션 + 아이템 hover 컬러/transition |
| `app/shared/ui/primitives/combobox.tsx` | 항상 렌더링 + 스프링 transition + 아이템 hover 컬러/transition |

## 검증

1. Select: 열기/닫기 시 fade+scale+slide 애니메이션, 트리거와 동일한 너비 확인
2. ComboBox: 입력 시 스프링 느낌으로 나타남/사라짐 확인
3. 양쪽 아이템 hover 시 `#CDE79A` + 부드러운 색상 전환 확인
4. 키보드 네비게이션(화살표 키)에서도 동일한 하이라이트 확인
5. 반응형에서 Select 드롭다운 너비 적응 확인
6. `content-section`, `text-input`, `number-input`의 `bg-surface-page` 영향 없음 확인
