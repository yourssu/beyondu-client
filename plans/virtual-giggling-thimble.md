# API 요청 함수 구현 계획

## Context

현재 프로젝트는 React Router 7 + Cloudflare Workers 기반이며, 모든 데이터가 mock으로 하드코딩되어 있다. Swagger 문서(`/v3/api-docs`)에 정의된 2개의 API 엔드포인트를 호출하는 함수를 `shared/api/`에 구현하여, React Router의 `loader`에서 SSR로 데이터를 가져올 수 있도록 한다.

## API 엔드포인트 요약

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/v1/universities` | 대학교 목록 조회 (필터, 페이지네이션) |
| GET | `/api/v1/universities/{id}` | 대학교 상세 조회 |

## 구현 단계

### 1. 환경 변수 추가

**파일: `wrangler.jsonc`**
- `vars`에 `API_BASE_URL: "https://api.beyondu.yourssu.com"` 추가

**파일: `worker-configuration.d.ts`**
- `wrangler types` 재실행하여 `Env` 타입에 `API_BASE_URL` 반영 (`pnpm wrangler types`)

### 2. API 응답 타입 정의

**새 파일: `app/shared/api/types.ts`**

Swagger 스키마 기반으로 다음 타입을 정의:

```ts
// 공통 응답 wrapper
interface ApiResponse<T> {
  code: string;
  message: string;
  result: T;
}

// 페이지네이션 정보
interface PageInfo {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

// 대학교 목록 요약
interface UniversitySummaryDto {
  id: number;
  nameKor: string;
  nameEng: string;
  nation: string;
  badge: string;
  isExchange: boolean;
  isVisit: boolean;
  programType: string;
  languageRequirementSummary: string | null;
  reviewStatus: string;
}

// 대학교 목록 응답
interface UniversityListResponse {
  universities: UniversitySummaryDto[];
  pageInfo: PageInfo;
}

// 어학 요구사항
interface LanguageRequirementResponse {
  languageGroup: string;
  examType: string;
  minScore: number;
}

// 대학교 상세 응답
interface UniversityDetailResponse {
  id: number;
  nameKor: string;
  nameEng: string;
  nation: string;
  region: string;
  isExchange: boolean;
  isVisit: boolean;
  badge: string;
  hasReview: boolean;
  minGpa: number;
  websiteUrl: string | null;
  significantNote: string | null;
  remark: string | null;
  languageRequirements: LanguageRequirementResponse[];
  availableMajors: string[] | null;
  courseListUrl: string | null;
  studentCount: string | null;
}

// 검색 요청 파라미터
interface UniversitySearchParams {
  nation?: string;
  isExchange?: boolean;
  isVisit?: boolean;
  search?: string;
  gpa?: number;
  nations?: string;
  major?: string;
  hasReview?: boolean;
  page?: number;
  size?: number;
}
```

### 3. ky 설치 및 API 클라이언트 구현

**패키지 설치:**
```sh
pnpm add ky
```

**새 파일: `app/shared/api/client.ts`**

`ky`를 사용한 API 클라이언트:

```ts
import ky from "ky";

function createApiClient(baseUrl: string) {
  return ky.create({
    prefixUrl: baseUrl,
  });
}
```

- `ky`는 `fetch` 기반 경량 HTTP 클라이언트로 Cloudflare Workers 환경과 호환
- `prefixUrl`로 base URL 설정
- loader의 `context.cloudflare.env.API_BASE_URL`로 base URL 전달

### 4. University API 함수 구현

**새 파일: `app/shared/api/universities.ts`**

```ts
import type { KyInstance } from "ky";

async function getUniversities(
  client: KyInstance,
  params?: UniversitySearchParams,
): Promise<ApiResponse<UniversityListResponse>>

async function getUniversityDetail(
  client: KyInstance,
  id: number,
): Promise<ApiResponse<UniversityDetailResponse>>
```

- 각 함수는 `createApiClient`로 생성한 `KyInstance`를 받아 사용
- `client.get(...).json<T>()`로 타입 안전한 응답 파싱
- 검색 파라미터는 `searchParams` 옵션으로 전달 (`undefined` 필드 자동 제외)

### 5. Barrel export

**새 파일: `app/shared/api/index.ts`**

모든 타입과 함수를 re-export.

## 수정 대상 파일 요약

| 파일 | 작업 |
|------|------|
| `wrangler.jsonc` | `API_BASE_URL` 환경변수 추가 |
| `app/shared/api/types.ts` | 새 파일 - API 응답 타입 |
| `app/shared/api/client.ts` | 새 파일 - fetch wrapper |
| `app/shared/api/universities.ts` | 새 파일 - 대학교 API 함수 |
| `app/shared/api/index.ts` | 새 파일 - barrel export |

> 주의: route 파일(`search.tsx`, `detail.tsx`)의 mock 데이터 교체는 이 작업 범위에 포함하지 않는다. API 함수만 구현한다.

## 검증 방법

1. `pnpm wrangler types` 실행하여 `Env` 타입 재생성
2. `pnpm typecheck` 실행하여 타입 에러 없음 확인
