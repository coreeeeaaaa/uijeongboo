# 🚨 UijeongBoo 강력한 디자인 규약 (절대 위반 금지)

## 📋 개요

UijeongBoo 디자인 프레임워크의 모든 규칙을 정의한 완전한 디자인 규약서입니다. 
**이 규칙들은 절대적이며, 어떠한 상황에서도 위반해서는 안 됩니다.**

---

## 🎨 색상 시스템 규칙

### 1. 포인트 컬러 제한
- **라임 그린 (#32CD32)만** 유일한 포인트 컬러로 사용 가능
- **다른 모든 컬러는 절대 금지**
- 브랜드 아이덴티티의 핵심 요소

### 2. 그레이스케일 팔레트
- **모든 기본 색상은 그레이스케일만** 허용
- 허용 색상 범위:
  - `#000000` ~ `#ffffff` (순수 그레이스케일)
  - `#222222` (배경 다크)
  - `#333333` (보조 배경)
  - `#444444` (경계선)
  - `#555555` ~ `#999999` (텍스트 계층)
  - `#cccccc` ~ `#eeeeee` (밝은 텍스트)

### 3. 색상 사용 금지 목록
- **빨강, 파랑, 노랑, 보라, 분홍 등 모든 컬러 금지**
- **그라데이션에서도 라임 그린 외 컬러 사용 금지**
- **투명도만 조절 가능** (rgba, opacity)

---

## 🔘 버튼 시스템 규칙

### 1. 투명 배경 강제
- **모든 버튼은 반드시 투명 배경** (`background: transparent !important`)
- **호버 상태에서도 투명 배경 유지**
- **Primary 버튼만 예외적으로 라임 배경 허용**

### 2. 버튼 상태별 규칙
```css
/* 기본 상태 */
.button {
    background: transparent !important;
    border: 1px solid #555555;
    color: #999999;
}

/* 호버 상태 */
.button:hover {
    background: transparent !important;
    border-color: #32CD32;
    color: #32CD32;
}

/* Primary 버튼 (유일한 예외) */
.button.primary {
    background: #32CD32 !important;
    color: #000000;
}
```

### 3. 버튼 효과 제한
- **box-shadow 사용 절대 금지**
- **border-radius는 12px 이하로 제한**
- **transform 효과만 허용** (scale, translate)

---

## 📏 레이아웃 및 UI 요소 규칙

### 1. 플랫 디자인 강제
- **모든 box-shadow 사용 금지**
- **입체감 효과 금지** (drop-shadow, inset 등)
- **완전한 평면 디자인만 허용**

### 2. 텍스트 및 아이콘 규칙
- **이모지 사용 절대 금지**
- **깔끔한 텍스트 기반 인터페이스**
- **아이콘은 단순한 기하학적 형태만 허용**

### 3. 글로우/번짐 효과 금지 규칙
- **text-shadow 사용 절대 금지**
- **blur 효과 사용 금지**
- **glow, 발광, 번짐 효과 완전 금지**
- **backdrop-filter: blur() 사용 금지**
- **filter: drop-shadow() 사용 금지**
- **모든 빛나는/반짝이는 효과 금지**

### 4. 정사각형 비율 강제
- **카드나 주요 UI 요소는 1:1 비율 유지**
- **직사각형보다 정사각형 선호**
- **일관된 비율 체계 유지**

---

## 🖱️ 인터랙션 및 애니메이션 규칙

### 1. 마우스 이벤트 처리
- **마우스 이탈시 원상복구 강제**
- **hover 효과는 mouseleave시 완전히 제거**
- **클릭 상태도 마우스 이탈시 해제**

### 2. 애니메이션 제한
- **자동 애니메이션 금지** - 사용자가 직접 제어해야 함
- **무한 루프 애니메이션 금지**
- **사용자 액션에 의한 애니메이션만 허용**

### 3. 전환 효과 규칙
```css
/* 허용되는 전환 효과 */
.element {
    transition: all 0.3s ease;
    transition: opacity 0.3s ease;
    transition: transform 0.3s ease;
}

/* 금지되는 효과 */
/* animation: autoMove infinite; - 금지 */
/* transform: rotateZ(360deg) infinite; - 금지 */
```

---

## 📜 스크롤 및 네비게이션 규칙

### 1. 스크롤바 디자인 규칙
- **스크롤바 배경은 투명** (`background: transparent`)
- **스크롤바는 항상 회색** (#999999 - 라임 그린 금지)
- **평상시에는 보이지 않음** (`opacity: 0`)
- **마우스 호버시에만 표시** (`opacity: 1`)
- **부드러운 전환 효과 필수** (`transition: opacity 0.3s ease`)

```css
/* 올바른 스크롤바 스타일 */
::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #999999;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.container:hover::-webkit-scrollbar-thumb {
    opacity: 1;
}
```

### 2. 가로 슬라이드 인터페이스 규칙
- **자동 애니메이션 금지** - 사용자가 직접 제어해야 함
- **수동 스크롤만 허용** - 마우스 휠이나 드래그로만 동작
- **고정된 상태 유지** - 평상시에는 움직이지 않음
- **shift 키 불필요** - 자연스러운 가로 스크롤 구현

### 3. 네비게이션 동작 규칙
- **클릭이나 드래그로만 이동**
- **자동 슬라이드 효과 금지**
- **사용자 의도에 따른 이동만 허용**

---

## 🎯 컴포넌트별 세부 규칙

### 1. 카드 컴포넌트
```css
/* 표준 카드 스타일 */
.card {
    width: 120px;
    height: 120px; /* 정사각형 비율 */
    border-radius: 12px;
    border: 1px solid #444444;
    background: transparent;
    /* box-shadow 금지 */
}

.card:hover {
    border-color: #32CD32;
    transform: translateY(-4px); /* 허용되는 효과 */
}
```

### 2. 입력 요소
- **placeholder는 그레이 색상만**
- **focus 상태에서 라임 그린 보더**
- **배경은 어두운 그레이 (#444444)**

### 3. 모달 및 오버레이
- **배경 오버레이는 반투명 검정**
- **모달 자체는 그레이 배경**
- **닫기 버튼은 투명 배경 원칙 준수**

---

## 🔧 기술적 구현 규칙

### 1. CSS 변수 사용
```css
:root {
    --uij-primary: #32CD32;        /* 유일한 컬러 */
    --uij-bg-primary: #222222;     /* 메인 배경 */
    --uij-bg-secondary: #333333;   /* 보조 배경 */
    --uij-text-primary: #eeeeee;   /* 주 텍스트 */
    --uij-text-muted: #999999;     /* 보조 텍스트 */
    --uij-border: #444444;         /* 경계선 */
}
```

### 2. 강제 적용 CSS
```css
/* 디자인 규칙 강제 적용 */
* {
    box-shadow: none !important;
}

button, .button {
    background: transparent !important;
}

button.primary, .button.primary {
    background: var(--uij-primary) !important;
}
```

### 3. JavaScript 규칙 검증
```javascript
// 실시간 디자인 규칙 검증
function enforceDesignRules() {
    // 금지된 색상 검사
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        const computedStyle = getComputedStyle(el);
        // 라임 그린 외 컬러 사용 검사
        // 투명 버튼 배경 검사
        // box-shadow 사용 검사
    });
}
```

---

## 🚫 절대 금지 목록

### 1. 색상 관련 금지사항
- ❌ 라임 그린 외 모든 컬러 사용
- ❌ RGB 컬러 값 사용 (그레이스케일 제외)
- ❌ HSL 컬러 값 사용 (그레이스케일 제외)
- ❌ 컬러 네이밍 (red, blue, yellow 등)

### 2. 효과 관련 금지사항
- ❌ box-shadow 속성 사용
- ❌ text-shadow 속성 사용
- ❌ drop-shadow 필터 사용
- ❌ 입체감을 주는 모든 효과

### 3. 콘텐츠 관련 금지사항
- ❌ 이모지 사용 (🎨, 😀, ⭐ 등)
- ❌ 특수 유니코드 문자 과용
- ❌ 화려한 아이콘이나 일러스트

### 4. 인터랙션 관련 금지사항
- ❌ 자동 실행 애니메이션
- ❌ 무한 루프 효과
- ❌ 사용자 의도 없는 움직임
- ❌ 깜빡임 효과

---

## ✅ 준수 확인 체크리스트

### 디자인 검토시 확인사항:
- [ ] 라임 그린 외 다른 컬러 사용하지 않았는가?
- [ ] 모든 버튼이 투명 배경인가?
- [ ] box-shadow를 사용하지 않았는가?
- [ ] 이모지를 사용하지 않았는가?
- [ ] 스크롤바가 회색이고 평상시 숨겨져 있는가?
- [ ] 자동 애니메이션을 사용하지 않았는가?
- [ ] 카드가 정사각형 비율인가?
- [ ] 마우스 이탈시 원상복구되는가?

### 개발 검토시 확인사항:
- [ ] CSS 변수를 올바르게 사용했는가?
- [ ] !important로 투명 배경을 강제했는가?
- [ ] 디자인 규칙 검증 스크립트가 동작하는가?
- [ ] 모든 인터랙션이 사용자 제어 하에 있는가?

---

## 🔄 자동 검증 시스템

### 1. 실시간 검증
```javascript
// DOM 변경 감시
const observer = new MutationObserver(enforceDesignRules);
observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
});
```

### 2. 빌드 시점 검증
```bash
# 디자인 규칙 검사
npm run design-audit

# 자동 수정
npm run design-fix

# 실시간 감시
npm run design-watch
```

---

## 📝 규칙 업데이트 정책

1. **규칙 추가**: 새로운 디자인 원칙이 생기면 이 문서에 즉시 반영
2. **규칙 수정**: 기존 규칙 변경시 하위 호환성 고려
3. **예외 처리**: 예외 상황은 명시적으로 문서화
4. **버전 관리**: 규칙 변경시 버전 업데이트

---

## ⚡ 긴급 규칙 위반시 대응

### 1. 위반 발견시
- 즉시 수정 작업 진행
- 영향 범위 파악
- 자동 검증 시스템 점검

### 2. 예방 조치
- 코드 리뷰시 디자인 규칙 확인
- 자동화된 검증 도구 사용
- 팀원 교육 및 공유

---

**UijeongBoo Design Framework v1.0**  
**강력한 디자인 규약 - 절대 위반 금지**

---

*이 문서는 UijeongBoo 디자인 시스템의 완전한 규칙서입니다.*  
*모든 개발자와 디자이너는 이 규칙을 반드시 준수해야 합니다.*