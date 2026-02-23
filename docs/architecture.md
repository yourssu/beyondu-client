# Beyond U - 아키텍처 다이어그램

## 1. 전체 아키텍처 개요

Cloudflare Workers 위 React Router 7 SSR 구조, 라우트/컴포넌트/API/유틸리티/스타일 레이어 간 관계.

```mermaid
graph TB
    subgraph Infrastructure["인프라"]
        CF["Cloudflare Workers"]
        Vite["Vite Build"]
    end

    subgraph Runtime["런타임"]
        RR["React Router 7 SSR"]
        Root["root.tsx Layout + ErrorBoundary"]
    end

    subgraph Routes["라우트"]
        Home["home.tsx /"]
        Search["search.tsx /search"]
        Detail["detail.tsx /detail/:id"]
    end

    subgraph Features["Feature 컴포넌트"]
        Header & BackButton & CampusBG["CampusBackground"] & FilterBar["SearchFilterBar"] & UniCard["UniversityCard"] & InfoCard & ContentSection
    end

    subgraph Primitives["Primitive 컴포넌트"]
        Button & Combobox & Select & Checkbox & NumberInput & FormField & Card & Badge & Tag & Tooltip
    end

    subgraph API["API 레이어"]
        Client["createApiClient()"] --> UnivAPI["getUniversities() / getUniversityDetail()"]
    end

    subgraph Utils["유틸리티"]
        CN["cn()"] & FilterParams["serializeFilterParams() / deserializeFilterParams()"] & Constants["countries/majors/lang-certs JSON"]
    end

    CF --> RR --> Root --> Routes
    Routes --> Features --> Primitives
    Routes --> Utils
    API --> Routes
```

## 2. 라우트 & 네비게이션 플로우

```mermaid
flowchart LR
    subgraph home["/ (Home)"]
        Form["폼 입력 6개 필드"] --> Validate["isFormComplete 검증"]
        Validate -->|완료| Submit["handleSubmit()"]
    end

    subgraph search["/search"]
        ParseURL["URL params → FilterFormData"] --> FilterBarUI["SearchFilterBar"]
        FilterBarUI -->|수정 후 검색| HandleSearch["setSearchParams()"]
        HandleSearch --> ParseURL
        Results["UniversityCard 그리드"]
    end

    subgraph detail["/detail/:id"]
        Loader["loader() SSR"] --> APICall["API 조회"] --> Render["상세 렌더링"]
    end

    Submit -->|"navigate('/search?params')"| search
    Results -->|"Link /detail/:id"| detail
    detail -->|"BackButton href='/search'"| search
    search -->|"BackButton href='/'"| home
```

## 3. 컴포넌트 의존성 그래프

```mermaid
graph TB
    subgraph Routes
        Home["home.tsx"]
        Search["search.tsx"]
        Detail["detail.tsx"]
    end

    subgraph Feature["Feature 컴포넌트"]
        Header & BackButton & CampusBG["CampusBackground"] & FilterBar["SearchFilterBar"] & UniCard["UniversityCard"] & InfoCard & ContentSection
    end

    subgraph Primitive["Primitive"]
        Button & Combobox & Select & Checkbox & NumberInput & FormField & Card & Badge & Tag & Tooltip
    end

    Home --> Header & CampusBG & FilterBar
    Search --> Header & BackButton & CampusBG & FilterBar & UniCard
    Detail --> Header & BackButton & InfoCard & ContentSection & Badge & Button & Tooltip

    FilterBar --> Button & Checkbox & Combobox & FormField & NumberInput & Select
    UniCard --> Badge & Card & Tag
    InfoCard --> Card
```

## 4. 데이터 플로우

```mermaid
flowchart TB
    subgraph Input["사용자 입력 (Home)"]
        U["major / gpa / languageCert / score / country / requireReview"]
    end

    subgraph Serialize["직렬화"]
        U --> SFP["serializeFilterParams()"] --> URLParams["URLSearchParams"]
    end

    subgraph Nav["네비게이션"]
        URLParams --> Navigate["navigate('/search?...')"] --> URLBar["브라우저 URL"]
    end

    subgraph SearchState["Search 상태"]
        URLBar --> Loader["loader()"]
        Loader --> API["getUniversities(apiParams)"]
        API --> LoaderData["loaderData"]
        URLBar --> UseSearchParams["useSearchParams()"] --> FilterState["useState FilterFormData"]
        FilterState --> FilterBarUI["SearchFilterBar 렌더링"]
        FilterBarUI -->|수정| FilterState
        FilterState -->|onSubmit| SetParams["setSearchParams()"] --> URLBar
    end

    subgraph Results["결과"]
        LoaderData --> CardGrid["UniversityCard Grid"]
        CardGrid -->|"Link /detail/:id"| DetailLoader["detail loader()"]
        DetailLoader --> DetailAPI["getUniversityDetail(id)"]
        DetailAPI --> DetailUI["상세 렌더링"]
    end
```

## 5. API 레이어 구조

```mermaid
graph LR
    subgraph Client["클라이언트"]
        BaseURL["wrangler.jsonc API_BASE_URL"] --> Create["createApiClient(baseUrl)"]
        Create --> Ky["KyInstance retry:0 timeout:10s"]
    end

    subgraph Functions["API 함수"]
        Ky --> GetUnivs["getUniversities(client, params?)"]
        Ky --> GetDetail["getUniversityDetail(client, id)"]
    end

    subgraph Endpoints["엔드포인트"]
        GetUnivs --> EP1["GET api/v1/universities"]
        GetDetail --> EP2["GET api/v1/universities/:id"]
    end

    subgraph Types["타입 체계"]
        EP1 --> ApiResp1["ApiResponse‹UniversityListResponse›"]
        EP2 --> ApiResp2["ApiResponse‹UniversityDetailResponse›"]
        ApiResp1 --> SummaryDto["UniversitySummaryDto"] & PageInfo
        ApiResp2 --> DetailResp["UniversityDetailResponse"] --> LangReq["LanguageRequirementResponse"]
    end

    subgraph Params["검색 파라미터"]
        USP["UniversitySearchParams"] --> GetUnivs
    end
```

## 6. 디자인 시스템 토큰 맵

```mermaid
graph TB
    subgraph Tokens["app.css @theme"]
        Colors["primary-olive/brown/green, base-900/700/400, surface-*"]
        Radius["button:5px input:10px card:14px tag:4px"]
        Misc["blur-campus:25.2px header:82px form:700px"]
        Fonts["Pretendard(sans) Chilanka(display)"]
    end

    subgraph Typography["@utility 타이포그래피"]
        HL["heading-lg 30px/700"] & HM["heading-md 24px/700"]
        BB["body-bold 16px/700"] & Body["body 16px/400"] & BS["body-sm 14px/400"]
        Cap["caption 12px/400"] & BadgeSm["badge-sm 10px/600"] & Logo["logo 32px Chilanka"]
    end

    subgraph Animations["애니메이션"]
        Spring["spring-bounce-0/10/20 + spring-duration-150/200/300"]
        Keyframes["tooltip-in/out, dropdown-in/out, check-in, error-in"]
    end

    subgraph Components["컴포넌트 사용"]
        Btn["Button: rounded-button, bg-primary-brown, spring-bounce-20"]
        Crd["Card: rounded-card, border-base-400, spring-bounce-10"]
        Inp["Input: rounded-input, spring-bounce-0"]
        Sel["Select: rounded-input, animate-dropdown-in/out"]
        Chk["Checkbox: animate-check-in, spring-bounce-20"]
        Bdg["Badge: bg-primary-green, text-style-badge-sm"]
        Hdr["Header: bg-surface-header, h-header, text-style-logo"]
    end

    Tokens --> Components
    Typography --> Components
    Animations --> Components
```
