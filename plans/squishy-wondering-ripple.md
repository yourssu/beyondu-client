# Arbitrary Tailwind 클래스 제거 계획

## Context

VSCode Tailwind CSS IntelliSense의 `suggestCanonicalClasses` 경고를 제거하기 위해, 프로젝트 내 arbitrary bracket notation 클래스(`h-[50px]`, `text-[10px]` 등)를 canonical Tailwind 클래스 또는 커스텀 테마 토큰으로 대체한다.

현재 프로젝트에서 발견된 arbitrary 클래스: **7개 인스턴스, 6개 파일**

## 변경 사항

### 1. 테마 토큰 추가 — `app/app.css` `@theme` 블록

```css
@theme {
  /* ... 기존 토큰들 ... */

  /* Container */
  --container-form: 700px;

  /* Colors - Base (기존 scale: 900, 700, 400 확장) */
  --color-base-300: #c5c5c5;

  /* Font Size */
  --text-2xs: 0.625rem;
}
```

| 토큰 | 용도 | 생성되는 유틸리티 |
|---|---|---|
| `--container-form: 700px` | 폼 컨테이너 최대 너비 | `max-w-form` |
| `--color-base-300: #c5c5c5` | 툴팁 border 색상 | `border-base-300` |
| `--text-2xs: 0.625rem` | 10px 폰트 사이즈 | `text-2xs` |

### 2. 컴포넌트 클래스 변경

| 파일 | 기존 (arbitrary) | 변경 후 (canonical) | 비고 |
|---|---|---|---|
| `app/shared/ui/primitives/select.tsx:34` | `h-[50px]` | `h-12.5` | spacing scale (12.5 × 4px = 50px) |
| `app/shared/ui/primitives/text-input.tsx:12` | `h-[50px]` | `h-12.5` | spacing scale |
| `app/shared/ui/primitives/number-input.tsx:12` | `h-[50px]` | `h-12.5` | spacing scale |
| `app/shared/ui/primitives/combobox.tsx:101` | `h-[50px]` | `h-12.5` | spacing scale |
| `app/frames/main-frame.tsx:54` | `max-w-[702px]` | `max-w-form` | `--container-form: 700px` 테마 토큰 (702→700 반올림) |
| `app/frames/main-frame.tsx:54` | `sm:px-[73px]` | `sm:px-18` | spacing scale (18 × 4px = 72px, 73→72 반올림) |
| `app/shared/ui/primitives/tooltip.tsx:21` | `border-[#c5c5c5]` | `border-base-300` | `--color-base-300` 테마 토큰 |
| `app/shared/ui/primitives/tooltip.tsx:21` | `text-[10px]` | `text-2xs` | `--text-2xs` 테마 토큰 |

> **참고**: `max-w-[702px]` → `700px`, `sm:px-[73px]` → `72px`로 조정.
> 실제 콘텐츠 폭: `700 - (72×2) = 556px` (기존 `702 - (73×2) = 556px`과 동일)

## 변경 대상 파일 목록

1. `app/app.css` — 테마 토큰 3개 추가
2. `app/shared/ui/primitives/select.tsx` — `h-[50px]` → `h-12.5`
3. `app/shared/ui/primitives/text-input.tsx` — `h-[50px]` → `h-12.5`
4. `app/shared/ui/primitives/number-input.tsx` — `h-[50px]` → `h-12.5`
5. `app/shared/ui/primitives/combobox.tsx` — `h-[50px]` → `h-12.5`
6. `app/frames/main-frame.tsx` — `max-w-[702px]` → `max-w-form`, `sm:px-[73px]` → `sm:px-18`
7. `app/shared/ui/primitives/tooltip.tsx` — `border-[#c5c5c5]` → `border-base-300`, `text-[10px]` → `text-2xs`

## 검증

1. `pnpm build` 실행하여 빌드 오류 없는지 확인
2. 브라우저에서 각 컴포넌트의 스타일이 동일하게 렌더링되는지 확인:
   - 입력 필드(TextInput, NumberInput, Select, Combobox) 높이: 50px
   - 메인 프레임 폼 컨테이너: max-width 700px, sm 이상에서 좌우 패딩 72px
   - 툴팁: border 색상 #c5c5c5, 폰트 사이즈 10px
3. VSCode에서 `suggestCanonicalClasses` 경고가 사라졌는지 확인
