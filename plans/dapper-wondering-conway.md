# 언어 자격증 "없음" 옵션 추가 및 점수 필드 비활성화

## Context

현재 "보유한 언어 자격증" Select에는 실제 자격증 종류만 있고, 자격증이 없는 경우를 나타내는 옵션이 없다. 사용자가 자격증이 없을 때 "없음"을 기본 선택값으로 제공하고, 이 경우 점수 입력란을 비활성화해야 한다.

## 변경 파일 및 내용

### 1. `app/shared/constants/language-certificates.json`
- 배열 맨 앞에 `{ "label": "없음", "languageGroup": "NONE", "value": "NONE" }` 추가

### 2. `app/routes/home.tsx`
- `languageCert` 초기값을 `""` → `"NONE"`으로 변경 (34번 라인)
- 자격증 변경 핸들러 추가: "NONE" 선택 시 `score`를 `""` 으로 초기화
- 점수 NumberInput에 `disabled={languageCert === "NONE"}` 추가 (101번 라인)
- `handleSubmit`에서 `languageCert`가 `"NONE"`이면 URL 파라미터에 포함하지 않음 (43번 라인)

### 3. `app/shared/components/search-filter-bar.tsx`
- 점수 NumberInput에 `disabled={languageCert === "NONE"}` 추가 (80번 라인)
- "없음" 선택 시 점수 초기화를 위해 `onLanguageCertChange` 래핑: `languageCert`가 "NONE"으로 변경되면 `onScoreChange("")` 호출

### 4. `app/routes/search.tsx`
- `languageCert` 초기값: URL 파라미터 없을 때 `"NONE"` 기본값 (108번 라인)
- `handleSearch`에서 `languageCert`가 `"NONE"`이면 URL 파라미터에 포함하지 않음 (118번 라인)
- 결과 요약 텍스트에서 `languageCert`가 `"NONE"`이면 표시하지 않음 (173번 라인)

## 검증

- 홈 페이지: 초기 상태에서 "없음"이 선택되어 있고, 점수 필드가 비활성화 상태인지 확인
- 홈 페이지: 자격증 선택 시 점수 필드 활성화, "없음" 재선택 시 점수 초기화 및 비활성화 확인
- 검색 페이지: SearchFilterBar에서 동일한 동작 확인
- URL 파라미터: "없음" 선택 시 languageCert/score가 URL에 포함되지 않는지 확인
