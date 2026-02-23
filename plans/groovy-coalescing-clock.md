# Home 폼 유효성 검사 추가

## Context

현재 home route의 "맞춤 학교 찾아보기" 버튼은 폼 필드가 비어있어도 클릭할 수 있다.
모든 텍스트 입력 필드가 채워지지 않으면 버튼을 비활성화하고, 안내 문구를 표시해야 한다.

## 수정 파일

- `app/routes/home.tsx`

## 구현 내용

### 1. 폼 완성 여부 파생 변수 추가

5개 텍스트 필드(`major`, `gpa`, `languageCert`, `score`, `country`)가 모두 비어있지 않은지 검사하는 `isFormComplete` 변수를 추가한다. 체크박스(`requireReview`)는 boolean 토글이므로 검사 대상에서 제외한다.

```tsx
const isFormComplete = major && gpa && languageCert && score && country;
```

### 2. 버튼 위에 안내 문구 표시

`!isFormComplete`일 때 버튼 바로 위에 빨간색 텍스트를 표시한다. 기존 `animate-error-in` 애니메이션은 사용하지 않는다 (항상 표시되는 상태이므로).

```tsx
{!isFormComplete && (
  <p className="text-center text-red-500 text-style-caption">
    빈칸에 정보를 입력해주세요
  </p>
)}
```

### 3. 버튼 비활성화

`disabled` prop을 추가한다. 기존 Button 컴포넌트에 이미 `disabled:pointer-events-none disabled:opacity-50` 스타일이 적용되어 있으므로 추가 작업 불필요.

```tsx
<Button
  disabled={!isFormComplete}
  fullWidth
  onClick={handleSubmit}
  rightIcon={<ArrowRight className="size-5" />}
  size="lg"
>
  맞춤 학교 찾아보기
</Button>
```

## 검증

- 모든 필드를 비웠을 때: 버튼 비활성화 + 빨간 텍스트 표시
- 일부 필드만 채웠을 때: 버튼 비활성화 + 빨간 텍스트 표시
- 모든 필드를 채웠을 때: 버튼 활성화 + 빨간 텍스트 사라짐
- 체크박스는 검사 대상이 아님을 확인
