# ComboBox 개선: 입력 제한 및 자동 suggestions 표시

## Context

전공과 희망 나라 필드는 미리 정의된 목록(majors.json, countries.json)에서만 선택해야 하지만, 현재 ComboBox는 자유 입력을 허용한다. 또한 포커스 시 입력값이 있을 때만 드롭다운이 열리므로, 빈 상태에서 클릭하면 어떤 옵션이 있는지 알 수 없다.

## 변경 사항

### 1. ComboBox: 포커스 시 항상 suggestions 표시
- **파일**: `app/shared/ui/primitives/combobox.tsx` (line 108)
- **변경**: `onFocus={() => value && setIsOpen(true)}` → `onFocus={() => setIsOpen(true)}`
- 빈 입력 상태에서도 포커스하면 전체 목록이 표시됨 (빈 문자열은 모든 항목과 매치)

### 2. home.tsx: `restrictToSuggestions` 추가
- **파일**: `app/routes/home.tsx` (line 78, 123)
- 전공 ComboBox와 희망 나라 ComboBox에 `restrictToSuggestions` prop 추가

### 3. search-filter-bar.tsx: `restrictToSuggestions` 추가
- **파일**: `app/shared/components/search-filter-bar.tsx` (line 54, 95)
- 전공 ComboBox와 희망 나라 ComboBox에 `restrictToSuggestions` prop 추가

## 검증

- 포커스 시 빈 상태에서 전체 suggestions 목록이 표시되는지 확인
- suggestions에 없는 값 입력 후 blur 시 값이 초기화되는지 확인
- 키보드 네비게이션(화살표, Enter, Escape)이 정상 동작하는지 확인
