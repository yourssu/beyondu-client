# beyondu-data에서 전공, 언어 자격증, 희망 나라 JSON 추출

## Context

beyondu-client의 검색 필터(전공, 언어 자격증, 나라)에 사용할 정적 데이터가 필요하다. 현재 `languageCertOptions`만 하드코딩되어 있고(`app/shared/types/filter.ts`), 전공 suggestions와 나라 suggestions는 빈 배열이다. `../beyondu-data/data/test_beyondu.db` SQLite DB에서 실제 데이터를 추출하여 JSON 파일로 생성한다.

## 생성할 파일

모두 `app/shared/constants/` 디렉토리에 생성:

### 1. `countries.json` — 희망 나라 목록 (53개국)

DB의 `university.nation` 컬럼에서 DISTINCT 값 추출. 가나다순 정렬.

```json
["과테말라", "그리스", "네덜란드", "대만", "독일", ...]
```

### 2. `language-certificates.json` — 언어 자격증 목록 (10종)

DB의 `language_requirement` 테이블에서 `exam_type`, `language_group` 추출.

```json
[
  { "label": "TOEFL", "value": "TOEFL", "languageGroup": "ENGLISH" },
  { "label": "IELTS", "value": "IELTS", "languageGroup": "ENGLISH" },
  { "label": "TOEIC", "value": "TOEIC", "languageGroup": "ENGLISH" },
  { "label": "TOEFL ITP", "value": "TOEFL_ITP", "languageGroup": "ENGLISH" },
  { "label": "DUOLINGO", "value": "DUOLINGO", "languageGroup": "ENGLISH" },
  { "label": "HSK", "value": "HSK", "languageGroup": "CHINESE" },
  { "label": "JLPT", "value": "JLPT", "languageGroup": "JAPANESE" },
  { "label": "JPT", "value": "JPT", "languageGroup": "JAPANESE" },
  { "label": "DELF", "value": "DELF", "languageGroup": "FRENCH" },
  { "label": "ZD", "value": "ZD", "languageGroup": "GERMAN" }
]
```

### 3. `majors.json` — 전공(학과) 목록

DB의 `university.available_majors` 자유 텍스트를 파싱하여 공통 전공 카테고리 추출.

- `★ 수학가능학과:` 뒤의 콤마 구분 텍스트에서 학과명 추출
- 중복 제거 및 정규화 (예: "Arts and Sciences" ↔ "Arts & Science" 통합)
- 파싱 결과가 불충분하면 사용자에게 추출된 목록과 함께 확인 요청

```json
["Arts and Sciences", "Business", "Education", "Engineering", ...]
```

## 구현 단계

1. `app/shared/constants/` 디렉토리 생성
2. `sqlite3`로 DB 쿼리 실행하여 데이터 추출
3. 나라 목록 → `countries.json` 작성
4. 언어 자격증 목록 → `language-certificates.json` 작성
5. `available_majors` 전체 텍스트 파싱 → 전공 카테고리 추출 → `majors.json` 작성
   - 파싱 결과 검토 후 사용자에게 확인 (필요 시)

## 수정 대상 파일

- **신규**: `app/shared/constants/countries.json`
- **신규**: `app/shared/constants/language-certificates.json`
- **신규**: `app/shared/constants/majors.json`

## 검증

- 각 JSON 파일이 유효한 JSON인지 확인
- 나라 53개, 언어 자격증 10종이 모두 포함되었는지 확인
- 전공 카테고리가 누락 없이 추출되었는지 사용자와 확인
