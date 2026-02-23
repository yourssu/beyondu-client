# Beyond U - 디자인 시스템 및 UI 구현 계획

## Context

교환학생 준비 가이드 앱 "Beyond U"의 Figma 디자인(메인/검색/상세 3개 뷰)을 분석하여, 디자인 시스템을 구축하고 재사용 가능한 UI 컴포넌트 및 페이지 템플릿을 구현합니다. 현재 프로젝트는 React Router v7 + Tailwind CSS v4 + TypeScript 기반의 빈 프로젝트이며, 디자인 시스템이나 공용 컴포넌트가 전혀 없는 상태입니다.

---

## Figma 레퍼런스

모든 디자인은 아래 Figma 파일에서 참조합니다.

| 뷰 | URL | Node ID | File Key |
|----|-----|---------|----------|
| 메인 뷰 (`/`) | [Figma Link](https://www.figma.com/design/Jr6rZtdgE5nUcjdtgDX6nq/%EA%B5%90%ED%99%98%ED%95%99%EC%83%9D-%EC%A4%80%EB%B9%84-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%95%B1?node-id=83-84&m=dev) | `83:84` | `Jr6rZtdgE5nUcjdtgDX6nq` |
| 검색 뷰 (`/search`) | [Figma Link](https://www.figma.com/design/Jr6rZtdgE5nUcjdtgDX6nq/%EA%B5%90%ED%99%98%ED%95%99%EC%83%9D-%EC%A4%80%EB%B9%84-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%95%B1?node-id=260-3919&m=dev) | `260:3919` | `Jr6rZtdgE5nUcjdtgDX6nq` |
| 상세 뷰 (`/detail/:id`) | [Figma Link](https://www.figma.com/design/Jr6rZtdgE5nUcjdtgDX6nq/%EA%B5%90%ED%99%98%ED%95%99%EC%83%9D-%EC%A4%80%EB%B9%84-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%95%B1?node-id=121-1054&m=dev) | `121:1054` | `Jr6rZtdgE5nUcjdtgDX6nq` |

### 주요 Figma 컴포넌트 노드 레퍼런스

| 컴포넌트 | Node ID | 출현 뷰 |
|----------|---------|---------|
| Button (Primary CTA) | `94:305` | 메인 |
| Checkbox (unchecked) | `236:2600` | 메인 |
| Checkbox (checked) | `236:2639` | 검색 |
| Text Input | `90:104` | 메인 |
| Number Input | `90:109` | 메인 |
| Dropdown/Select | `90:115` | 메인 |
| Form Label | `90:102` | 메인 |
| Header/Navbar | `110:153` | 메인, `143:310` 상세, `260:4375` 검색 |
| Back Button | `121:1128` | 상세, `260:4372` 검색 |
| Badge (일반교환) | `121:1172` | 상세 |
| Tag (교환유형\|프로그램) | `I260:3960;225:155` | 검색 카드 내 |
| University Card | `260:3960` | 검색 |
| InfoCard (어학 요구사항) | `121:1203` | 상세 |
| InfoCard (학점 요구사항) | `121:1194` | 상세 |
| ContentSection (수학가능학과) | `123:1250` | 상세 |
| ContentSection (참고사항) | `135:220` | 상세 |
| Tooltip | `225:430` | 상세 |
| Search Filter Bar | `260:3926` | 검색 |
| 후기 보고서 버튼 | `188:943` | 상세 |

---

## 1. 파일 구조

```
beyondu-client/
  design/
    systems.md                         # 디자인 시스템 문서

  app/
    app.css                            # Tailwind v4 @theme 토큰, 커스텀 유틸리티
    root.tsx                           # lang="ko", Pretendard CDN, Chilanka 폰트
    routes.ts                          # /, /search, /detail/:id 라우트

    routes/
      home.tsx                         # 메인 필터 뷰 (/)
      search.tsx                       # 검색 결과 뷰 (/search)
      detail.tsx                       # 대학 상세 뷰 (/detail/:id)

    shared/
      ui/
        primitives/                    # --- Primitive 컴포넌트 (기본 빌딩 블록) ---
          index.ts                     # Primitives 배럴 export
          button.tsx                   # 기본 버튼
          text-input.tsx               # 텍스트 입력
          number-input.tsx             # 숫자 입력
          select.tsx                   # 네이티브 셀렉트
          combobox.tsx                 # 자동완성 입력 (suggestions)
          checkbox.tsx                 # 커스텀 체크박스
          form-field.tsx               # 레이블 + 입력 래퍼
          badge.tsx                    # 알약형 뱃지
          tag.tsx                      # 사각 태그
          tooltip.tsx                  # 플로팅 툴팁
          card.tsx                     # 기본 카드 컨테이너

        index.ts                       # 공용 컴포넌트 배럴 export
        header.tsx                     # 상단 로고 헤더 (Header + Logo)
        back-button.tsx                # ← 뒤로가기 (ArrowLeft + Link)
        university-card.tsx            # 대학 카드 (Card + Badge + Tag 조합)
        info-card.tsx                  # 초록 테두리 정보 카드
        content-section.tsx            # 회색 배경 컨텐츠 섹션
        search-filter-bar.tsx          # 검색 인라인 필터바

    frames/
      main-frame.tsx                   # 메인 필터 뷰 템플릿
      search-frame.tsx                 # 검색 결과 뷰 템플릿
      detail-frame.tsx                 # 대학 상세 뷰 템플릿

    lib/
      cn.ts                            # clsx 래퍼 유틸리티

  .storybook/
    main.ts                            # Storybook Vite 빌더 설정
    preview.ts                         # 글로벌 스타일, 뷰포트

  public/
    images/
      bg-campus.jpg                    # Figma 배경 이미지 다운로드
```

### 컴포넌트 계층 구조

```
Primitives (기본 빌딩 블록)          Composed (공용 컴포넌트)
┌──────────────────────┐        ┌───────────────────────────┐
│ button               │───────→│ header (Button 사용 가능)  │
│ text-input           │───────→│ back-button               │
│ number-input         │        │ search-filter-bar          │
│ select               │───────→│   (모든 폼 primitives 조합) │
│ combobox             │───────→│                            │
│ checkbox             │        │ university-card             │
│ form-field           │───────→│   (Card + Badge + Tag 조합) │
│ badge                │───────→│                            │
│ tag                  │───────→│ info-card (Card 확장)      │
│ tooltip              │        │ content-section            │
│ card                 │───────→│                            │
└──────────────────────┘        └───────────────────────────┘
```

---

## 2. 디자인 토큰 (Tailwind CSS v4 @theme)

### 2.1 컬러 시스템

| 토큰명 | 값 | 용도 |
|--------|-----|------|
| `--color-primary-olive` | `#838c00` | 강조 텍스트 (요구사항 수치) |
| `--color-primary-brown` | `#4f3109` | Primary 버튼 배경 |
| `--color-primary-green` | `#cde79a` | 뱃지, 카드 테두리, 구분선 |
| `--color-base-900` | `#0a0a0a` | 기본 텍스트 |
| `--color-base-700` | `#443f3b` | 보조 텍스트 |
| `--color-base-400` | `#b4bc9f` | 테두리, 입력 필드 보더 |
| `--color-surface-white` | `#ffffff` | 기본 배경 |
| `--color-surface-page` | `#fafafa` | 컨텐츠 섹션 배경 |
| `--color-surface-tag` | `#f2f2f2` | 태그 배경 |
| `--color-surface-tooltip` | `#fbfff3` | 툴팁 배경 |
| `--color-surface-glass` | `rgba(255,255,255,0.8)` | 헤더/오버레이 |
| `--color-logo` | `#062c05` | 로고 텍스트 |

### 2.2 타이포그래피

**폰트 패밀리:**
- `--font-sans`: Pretendard Variable (본문) - CDN (cdn.jsdelivr.net) 로드
- `--font-display`: Chilanka (로고) - Google Fonts CDN 로드

**텍스트 스타일 (커스텀 유틸리티 `@utility`):**

| 유틸리티 | 크기 | 행간 | 자간 | 두께 |
|----------|------|------|------|------|
| `text-style-heading-lg` | 30px | 36px | 0.4px | Bold(700) |
| `text-style-heading-md` | 24px | 32px | 0.07px | Bold(700) |
| `text-style-body-bold` | 16px | 24px | 0 | Bold(700) |
| `text-style-body` | 16px | 24px | 0 | Regular(400) |
| `text-style-body-sm` | 14px | 24px | 0 | Regular(400) |
| `text-style-caption` | 12px | 16px | 0 | Regular(400) |
| `text-style-badge-sm` | 10px | 20px | 0 | SemiBold(600) |
| `text-style-logo` | 32px | normal | 0 | Regular(400) + Chilanka |

### 2.3 Spacing & Border Radius

**커스텀 Spacing:** 18px(`4.5`), 30px(`7.5`), 60px(`15`), 80px(`20`)

**Border Radius:**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius-button` | 5px | 버튼 |
| `--radius-input` | 10px | 입력 필드 |
| `--radius-card` | 14px | 카드 |
| `--radius-tag` | 4px | 태그 |

### 2.4 아이콘

**lucide-react** 패키지 사용 (설치 필요: `pnpm add lucide-react`)

| 용도 | lucide 아이콘 | 사용처 |
|------|--------------|--------|
| 뒤로가기 화살표 | `ArrowLeft` | BackButton |
| CTA 화살표 | `ArrowRight` | Button rightIcon |
| 셀렉트 chevron | `ChevronDown` | Select, Combobox |
| 위치 | `MapPin` | UniversityCard, DetailFrame |
| 인원 | `Users` | DetailFrame |
| 외부 링크 | `ExternalLink` | DetailFrame 홈페이지 링크 |
| 체크 | `Check` | Checkbox |

---

## 3. Primitive 컴포넌트 명세

> `app/shared/ui/primitives/` 아래에 위치. 스타일링된 기본 빌딩 블록으로, 도메인 로직 없이 순수 UI만 담당.

### 3.1 Button
- Props: `variant("primary"|"outline")`, `size("md"|"lg")`, `rightIcon?`, `fullWidth?`, `asChild?`
- Primary: `bg-primary-brown text-white rounded-button`
- Figma ref: `94:305`

### 3.2 TextInput
- Props: `label?`, `placeholder?`, `error?` + 기본 `<input>` HTML 속성
- `rounded-input border-base-400 bg-white`
- Figma ref: `90:104`

### 3.3 NumberInput
- Props: TextInput과 동일 + `min?`, `max?`, `step?`
- TextInput을 `type="number"`로 재사용
- Figma ref: `90:109`

### 3.4 Select
- Props: `label?`, `options[]`, `placeholder?`, `value?`, `onChange?`
- 네이티브 `<select>` + lucide `ChevronDown`
- Figma ref: `90:115`

### 3.5 Combobox (자동완성 입력)
- Props:
  - `label?`: 레이블
  - `suggestions: string[]`: 추천 목록
  - `value?`, `onChange?`: 제어형
  - `placeholder?`: 플레이스홀더
  - `restrictToSuggestions?: boolean`: `true`일 때 suggestions에 없는 값 입력 불가
  - `error?`: 에러 메시지
- 동작:
  - 입력 시 suggestions 필터링하여 드롭다운 표시
  - 키보드 네비게이션 (ArrowUp/Down, Enter, Escape)
  - `restrictToSuggestions=true` 시 자유 입력 불가, 목록에서만 선택
  - `restrictToSuggestions=false` (기본) 시 자유 입력 + 추천 동시 지원
- 스타일: TextInput과 동일한 외관 + 드롭다운 목록
- 사용처: 전공 입력, 희망 나라 입력 등

### 3.6 Checkbox
- Props: `label`, `checked?`, `onChange?`, `name?`
- 숨겨진 네이티브 input + lucide `Check` 아이콘
- Figma ref: `236:2600` (unchecked), `236:2639` (checked)

### 3.7 FormField
- Props: `label`, `htmlFor?`, `error?`, `children`
- 레이블 + children + 에러 메시지 래퍼

### 3.8 Badge
- Props: `variant("green"|"neutral")`, `children`
- Green: `bg-primary-green rounded-full text-style-badge-sm`
- Figma ref: `121:1172`

### 3.9 Tag
- Props: `exchangeType`, `program?`
- `bg-surface-tag rounded-tag text-style-caption`
- Figma ref: `I260:3960;225:155`

### 3.10 Tooltip
- Props: `content`, `children`, `open?`
- `bg-surface-tooltip` + 삼각형 꼬리
- Figma ref: `225:430`

### 3.11 Card
- Props: `children`, `className?`, `variant("default"|"bordered")`
- Default: `rounded-card border bg-white`
- Bordered (green): `border-2 border-primary-green`

---

## 4. Composed 공용 컴포넌트 명세

> `app/shared/ui/` 아래에 위치. Primitive를 조합하여 도메인 맥락을 가진 컴포넌트.

### 4.1 Header
- Sticky top, `bg-surface-glass backdrop-blur-sm`
- "Beyond U" 로고 (Chilanka 폰트, `text-logo` 색상)
- `children` 슬롯으로 BackButton 등 삽입 가능
- Figma ref: `110:153` (메인), `143:310` (상세)

### 4.2 BackButton
- lucide `ArrowLeft` + "뒤로가기" 텍스트
- `href` prop 시 React Router `<Link>` 사용
- Figma ref: `121:1128`

### 4.3 UniversityCard
- Props: `id`, `country`, `exchangeType`, `program?`, `nameEn`, `nameKr`, `languageRequirements[]`, `hasReview`, `reviewYears?`
- Primitive `Card` + `Badge` + `Tag` + lucide `MapPin` 조합
- 전체 카드가 `/detail/{id}`로의 링크
- Figma ref: `260:3960`

### 4.4 InfoCard
- Props: `title`, `children`
- Primitive `Card` variant="bordered" 활용
- Figma ref: `121:1203`, `121:1194`

### 4.5 ContentSection
- Props: `title`, `children`
- `bg-surface-page rounded-card p-6`
- Figma ref: `123:1250`, `135:220`

### 4.6 SearchFilterBar
- 수평 인라인 필터 (Combobox + Select + NumberInput + Checkbox + Button 조합)
- 제출 버튼 "위의 조건으로 확인해보기"
- 반응형: 모바일에서 세로 스택
- Figma ref: `260:3926`

---

## 5. 프레임(템플릿) 구조

### 5.1 MainFrame (/) - 메인 필터 뷰
- 블러 처리된 배경 이미지 (`public/images/bg-campus.jpg`, Figma 에셋 다운로드) 위에 반투명 폼 카드
- 헤더 → 폼 카드 (제목 + 설명 + 6개 필드 + 제출 버튼)
- 필드 구성: Combobox(전공), NumberInput(학점), Select(언어자격증), NumberInput(점수), Combobox(희망나라), Checkbox(후기필수)
- 반응형: 데스크톱 2열 폼, 모바일 1열
- Figma ref: Node `83:84`

### 5.2 SearchFrame (/search) - 검색 결과 뷰
- 헤더(BackButton) → SearchFilterBar → 조건 요약 텍스트 → 3열 UniversityCard 그리드
- 반응형: lg 3열, sm 2열, mobile 1열
- Figma ref: Node `260:3919`

### 5.3 DetailFrame (/detail/:id) - 상세 뷰
- 헤더(BackButton) → Badge + 대학명 + 홈페이지 링크 + 메타정보
- "후기 보고서 보러가기" 버튼: **외부 링크 (새 탭, `target="_blank"`)** + Tooltip
- InfoCard 2개 (어학/학점 요구사항) 횡배치
- ContentSection 2개 (수학 가능 학과, 참고사항)
- 반응형: InfoCard sm 이상 횡배치, 모바일 종배치
- Figma ref: Node `121:1054`

---

## 6. 수정 필요 파일

| 파일 | 변경 내용 |
|------|-----------|
| `app/app.css` | `@theme` 토큰, 커스텀 `@utility`, 다크모드 제거 |
| `app/root.tsx` | `lang="ko"`, Pretendard CDN + Chilanka 폰트 링크, Inter 제거, 메타 한글화 |
| `app/routes.ts` | `/search`, `/detail/:id` 라우트 추가 |
| `app/welcome/` | 디렉토리 전체 삭제 (보일러플레이트) |

---

## 7. 작업 단계 및 팀 위임 전략

> 메인 에이전트가 각 서브에이전트에게 **위임 전 상세 계획(plan)을 작성**하여 전달합니다.

### Phase 0: 기반 작업 (리더, 순차)
1. 의존성 설치: `pnpm add lucide-react clsx` + Storybook 관련 패키지
2. `design/systems.md` 작성
3. `app/app.css` 토큰 설정 (다크모드 제거, @theme, @utility)
4. `app/root.tsx` 업데이트 (lang, 폰트 링크, 메타)
5. `app/lib/cn.ts` 생성
6. `app/routes.ts` 업데이트 (3개 라우트)
7. `app/shared/ui/primitives/index.ts`, `app/shared/ui/index.ts` 생성
8. `.storybook/main.ts`, `.storybook/preview.ts` 설정
9. Figma 배경 이미지 다운로드 → `public/images/bg-campus.jpg`
10. `app/welcome/` 디렉토리 삭제

### Phase 1: 병렬 작업 (3개 에이전트)

**Agent A - Primitive 기본 컴포넌트:**

위임 전 작성할 계획:
- 구현할 파일 목록: `button.tsx`, `badge.tsx`, `tag.tsx`, `card.tsx`, `tooltip.tsx`
- 각 컴포넌트의 상세 Props 인터페이스
- Tailwind 클래스 매핑 (디자인 토큰 → 유틸리티)
- Figma 노드 레퍼런스 포함
- 각 스토리 파일에 포함할 상태 목록

**Agent B - Primitive 폼 컴포넌트:**

위임 전 작성할 계획:
- 구현할 파일 목록: `form-field.tsx`, `text-input.tsx`, `number-input.tsx`, `select.tsx`, `checkbox.tsx`, `combobox.tsx`
- Combobox의 상세 동작 명세 (키보드 네비게이션, restrictToSuggestions 로직)
- 접근성 요구사항 (aria-* 속성)
- Figma 노드 레퍼런스 포함

**Agent C - Composed 공용 컴포넌트:**

위임 전 작성할 계획:
- 구현할 파일 목록: `header.tsx`, `back-button.tsx`, `university-card.tsx`, `info-card.tsx`, `content-section.tsx`, `search-filter-bar.tsx`
- Primitive 의존 관계 명시 (어떤 primitive를 import할지)
- 각 컴포넌트의 상세 레이아웃 구조
- Figma 노드 레퍼런스 및 스크린샷 참조 방법

### Phase 2: 프레임 조립 (2개 에이전트, Phase 1 완료 후)

**Agent D - 메인 + 검색 프레임:**

위임 전 작성할 계획:
- `frames/main-frame.tsx`, `frames/search-frame.tsx` 상세 레이아웃
- `routes/home.tsx`, `routes/search.tsx` 라우트 파일 구조 (loader/action 포함)
- 목 데이터 구조 (FilterFormData, UniversityResult 타입)
- Figma 노드별 컴포넌트 매핑

**Agent E - 상세 프레임:**

위임 전 작성할 계획:
- `frames/detail-frame.tsx` 상세 레이아웃
- `routes/detail.tsx` 라우트 파일 (loader, params 처리)
- 목 데이터 구조 (UniversityDetail 타입)
- 후기 버튼 + Tooltip 상호작용

### Phase 3: 통합 검증 (리더, 순차)
- `shared/ui/primitives/index.ts`, `shared/ui/index.ts` 배럴 export 정리
- TypeScript 타입 체크
- Biome 린트/포맷
- Storybook 빌드 검증
- 시각적 검토

---

## 8. 검증 방법

### 8.1 타입 체크
```bash
pnpm typecheck
```

### 8.2 린트/포맷
```bash
pnpm lint && pnpm lint:fix
```

### 8.3 빌드
```bash
pnpm build
```

### 8.4 Storybook
```bash
pnpm storybook
```
- 모든 primitive에 기본 + 변형 스토리
- Composed 컴포넌트에 기본 + 목 데이터 스토리
- Frame에 전체 페이지 스토리

### 8.5 시각 체크리스트
- [ ] 컬러가 디자인 토큰과 일치
- [ ] 타이포그래피 일치 (폰트, 크기, 두께, 행간)
- [ ] 간격 일관성
- [ ] absolute 미사용 (Tooltip 제외)
- [ ] 불필요한 flex wrapper 없음
- [ ] 반응형 정상 동작 (375px / 768px / 1280px)

### 8.6 접근성
- 모든 폼 입력에 label 연결
- Combobox: aria-expanded, aria-activedescendant, role="listbox"
- 키보드 포커스 가능
- 이미지에 alt 텍스트
