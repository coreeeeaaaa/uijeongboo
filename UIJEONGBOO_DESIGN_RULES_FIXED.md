# UijeongBoo 디자인 프레임워크 절대 규칙

## 절대 위반 금지 규칙 (NEVER VIOLATE)

### 1. 색상 제한 규칙 (ABSOLUTE)
- 라임 그린 (#32CD32)은 사이드바 버튼에만 사용
- 사용자가 명시적으로 요청할 때만 예외적으로 사용
- 허용 색상 팔레트:
  - #32CD32 (라임 그린 - 사이드바 버튼 전용)
  - #222222, #333333, #444444, #555555, #666666, #777777, #888888, #999999 (그레이)
  - #eeeeee (밝은 그레이)
  - transparent (투명)
- 흰색 (#ffffff) 완전 금지: 모든 배경에서 흰색 사용 절대 금지
- 절대 금지 색상: 빨강, 파랑, 노랑, 주황, 보라, 분홍, 흰색

### 2. 버튼 배경 투명화 강제
- 모든 버튼은 반드시 투명 배경 (`background: transparent`)
- 라임 배경 사용 완전 금지 (사이드바 버튼 제외)
- 호버 상태에서도 투명 배경 유지

### 3. 완전한 플랫 디자인 강제
- 모든 box-shadow 사용 금지
- 모든 border 사용 완전 금지 (카드, 입력창, 버튼, 아이콘)
- 카드 배경: #444444만 허용
- 입력창 배경: #333333만 허용
- 완전 플랫 디자인: 입체감, 깊이감, 테두리 모두 금지

### 4. 이모지 사용 절대 금지
- 모든 이모지 문자 사용 완전 금지
- HTML, CSS, JavaScript, 주석, 문서에서도 이모지 제거
- 순수 텍스트만 사용

### 5. 텍스트 오버플로우 처리 강제
- 모든 텍스트 요소에 오버플로우 처리 필수 적용
- 제목/타이틀: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`
- 설명/내용: `-webkit-line-clamp` 또는 `max-height` 제한
- 카드/컨테이너: `overflow: hidden` 필수

### 6. 카드형 메인 UI 구성 금지
- 메인 화면에서 카드 형태의 레이아웃 배치 금지
- 대신 리스트형 또는 그리드형 레이아웃 사용
- 단순하고 직관적인 인터페이스 우선

### 7. JavaScript 최소화 및 HTML/CSS 우선 원칙
- 모든 인터랙션을 HTML/CSS로 구현 (JavaScript 최소화)
- 메뉴 시스템: CSS `:target` 또는 `input[type="radio"]` 사용
- 모달/팝업: CSS `input[type="checkbox"]` + `label` 조합 활용
- JavaScript는 오직 필수 불가피한 경우만 (API 호출, 복잡한 계산)

### 8. 폰트 시스템
- SF Pro Display 우선 사용
- 시스템 폰트 fallback: `system-ui, sans-serif`
- 모노스페이스: `Monaco, Menlo, monospace`

## 강제 사용 스타일

```css
.uij-input {
    background: #333333;
    color: #eeeeee;
    border: none;
    padding: 12px;
    border-radius: 8px;
}

.uij-card {
    background: #444444;
    color: #eeeeee;
    border: none;
    padding: 16px;
    border-radius: 8px;
}

.uij-button {
    background: transparent;
    color: #eeeeee;
    border: 1px solid #555555;
    padding: 8px 16px;
}

.uij-button-primary {
    background: #32CD32;
    color: #000000;
    border: none;
}
```

## 절대 금지 스타일

```css
/* 절대 사용 금지 */
background: #ffffff;        /* 흰색 배경 금지 */
background: white;          /* 흰색 배경 금지 */
border: 1px solid #ddd;     /* 모든 보더 금지 */
box-shadow: any;            /* 모든 그림자 금지 */
padding: 24px;              /* 허용된 패딩 외 금지 */
color: #000000;             /* 순수 검정 텍스트 금지 */
```

이 규칙들은 절대 위반할 수 없는 핵심 원칙이며, 모든 에이전트가 반드시 준수해야 합니다.