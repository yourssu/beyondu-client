# 생성한 상수 JSON을 검색 필터 폼에 연결

## Context

`app/shared/constants/`에 `countries.json`, `language-certificates.json`, `majors.json`을 생성했지만, 아직 검색 폼에 연결되지 않았다. `SearchFilterBar` 컴포넌트는 이미 `majorSuggestions`, `countrySuggestions`, `languageCertOptions` props를 받을 수 있게 설계되어 있으나, `search.tsx`에서 전달하지 않고 있다.

## 수정 대상 파일

### 1. `app/routes/search.tsx` — 상수 import 및 props 전달

- `countries.json`, `language-certificates.json`, `majors.json` import
- `SearchFilterBar`에 `majorSuggestions`, `countrySuggestions`, `languageCertOptions` props 추가
- 기존 `filter.ts`의 `languageCertOptions` import 제거

### 2. `app/shared/types/filter.ts` — 하드코딩된 `languageCertOptions` 삭제

- `languageCertOptions` 상수 제거 (JSON 상수로 대체됨)
- `FilterFormData` 타입은 유지

## 구현 단계

1. `search.tsx`에서 3개 JSON 상수를 import
2. `SearchFilterBar`에 `majorSuggestions={majors}`, `countrySuggestions={countries}`, `languageCertOptions={languageCertificates}` 전달
3. `filter.ts`에서 `languageCertOptions` export 제거
4. `filter.ts`의 `languageCertOptions`를 참조하는 곳이 없는지 확인

## 검증

- `search.tsx`에서 필터 폼이 올바르게 렌더링되는지 확인
- Combobox에 전공/나라 suggestions가 표시되는지 확인
- Select에 10종 언어 자격증이 표시되는지 확인
