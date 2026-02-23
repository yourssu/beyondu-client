# Storybook 설정 계획

## Context

프로젝트에 컴포넌트 개발/테스트/문서화를 위한 Storybook이 없는 상태입니다. 11개 primitive 컴포넌트와 6개 feature 컴포넌트에 대해 Storybook 9 + React Vite를 설정하여 독립적으로 컴포넌트를 확인하고 개발할 수 있게 합니다.

## 1단계: Storybook 패키지 설치

```bash
pnpm add -D @storybook/react-vite storybook @storybook/addon-essentials @storybook/blocks
```

**참고**: `react-router` 의존 컴포넌트(UniversityCard, BackButton)를 위해 `react-router`는 이미 dependencies에 있으므로 별도 설치 불필요.

## 2단계: Storybook 설정 파일 생성

### `.storybook/main.ts`

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../app/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
  ],
  viteFinal(config) {
    return config;
  },
};

export default config;
```

- `vite-tsconfig-paths` 플러그인이 이미 `vite.config.ts`에 있으므로 `~` 경로 alias가 자동으로 적용됨
- Storybook은 프로젝트의 `vite.config.ts`를 자동으로 상속함

### `.storybook/preview.ts`

```ts
import type { Preview } from "@storybook/react-vite";

import "../app/app.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

- Tailwind CSS v4 + 커스텀 테마가 적용된 `app.css`를 import하여 모든 story에 전역 스타일 적용

## 3단계: package.json scripts 추가

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## 4단계: react-router 데코레이터 생성

`UniversityCard`와 `BackButton`이 `react-router`의 `Link`를 사용하므로, Storybook에서 라우터 컨텍스트를 제공하는 데코레이터가 필요합니다.

### `.storybook/decorators.tsx`

```tsx
import type { Decorator } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

export const withRouter: Decorator = (Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);
```

## 5단계: Story 파일 작성 (컴포넌트 옆에 co-located)

### Primitive 컴포넌트 (11개)

| 컴포넌트 | Story 파일 | 주요 Story |
|---------|-----------|-----------|
| Button | `app/shared/ui/primitives/button.stories.tsx` | Primary, Outline, Large, WithIcon, FullWidth, Disabled |
| Card | `app/shared/ui/primitives/card.stories.tsx` | Default, Bordered |
| Badge | `app/shared/ui/primitives/badge.stories.tsx` | Green, Neutral |
| Tag | `app/shared/ui/primitives/tag.stories.tsx` | ExchangeOnly, WithProgram |
| TextInput | `app/shared/ui/primitives/text-input.stories.tsx` | Default, WithPlaceholder, Error, Disabled |
| NumberInput | `app/shared/ui/primitives/number-input.stories.tsx` | Default, WithPlaceholder, Error, Disabled |
| Checkbox | `app/shared/ui/primitives/checkbox.stories.tsx` | Unchecked, Checked |
| Select | `app/shared/ui/primitives/select.stories.tsx` | Default, WithValue, Error |
| Combobox | `app/shared/ui/primitives/combobox.stories.tsx` | Default, WithSuggestions, RestrictToSuggestions |
| FormField | `app/shared/ui/primitives/form-field.stories.tsx` | Default, WithError |
| Tooltip | `app/shared/ui/primitives/tooltip.stories.tsx` | Default, Open |

### Feature 컴포넌트 (6개)

| 컴포넌트 | Story 파일 | 주요 Story | 특이사항 |
|---------|-----------|-----------|---------|
| Header | `app/shared/components/header.stories.tsx` | Default, WithChildren | - |
| BackButton | `app/shared/components/back-button.stories.tsx` | WithHref, WithOnClick | `withRouter` 데코레이터 필요 |
| UniversityCard | `app/shared/components/university-card.stories.tsx` | Default, WithReview, WithLanguageReqs | `withRouter` 데코레이터 필요 |
| InfoCard | `app/shared/components/info-card.stories.tsx` | Default | - |
| ContentSection | `app/shared/components/content-section.stories.tsx` | Default | - |
| SearchFilterBar | `app/shared/components/search-filter-bar.stories.tsx` | Default | - |

## 주요 수정 파일

- **신규 생성**: `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/decorators.tsx`
- **수정**: `package.json` (scripts 추가)
- **신규 생성**: 17개 `*.stories.tsx` 파일 (컴포넌트 옆에 co-located)

## Story 작성 패턴 예시

```tsx
// app/shared/ui/primitives/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: {
    children: "버튼",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const WithIcon: Story = {
  args: { rightIcon: <ArrowRight className="size-5" /> },
};
```

## 검증 방법

1. `pnpm storybook` 실행하여 Storybook 서버 시작 확인
2. `http://localhost:6006`에서 모든 컴포넌트가 올바르게 렌더링되는지 확인
3. Tailwind CSS 스타일(커스텀 테마 변수, typography utilities)이 정상 적용되는지 확인
4. `Select`, `Combobox` 등 Radix UI 기반 컴포넌트의 인터랙션이 정상 동작하는지 확인
5. `UniversityCard`, `BackButton`의 react-router Link가 에러 없이 렌더링되는지 확인
