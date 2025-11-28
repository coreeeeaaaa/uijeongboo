# 🎯 범용 UX 최적화 디자인 규칙

## 🚨 필수 접근성 준수 규칙 (CRITICAL)

### 1. WCAG 2.1 AA 색상 대비율 강제 (CRITICAL)
- **모든 텍스트는 4.5:1 이상 대비율 필수**
- **대형 텍스트(24px+)는 3:1 이상 필수**
- **상태 변화 시에도 대비율 유지**
- **색상만으로 정보 전달 금지**

```css
/* 안전한 대비율 조합 */
.accessible-text {
    background: #000000; /* 검정 */
    color: #ffffff;      /* 흰색 - 21:1 대비율 */
}

.high-contrast {
    background: #222222; /* 어두운 회색 */
    color: #eeeeee;      /* 밝은 회색 - 11.8:1 대비율 */
}

/* 금지된 조합 */
.bad-contrast {
    background: #555555; /* 중간 회색 */
    color: #777777;      /* 비슷한 회색 - 2.1:1 대비율 위반 */
}
```

### 2. 키보드 내비게이션 완전 지원 (CRITICAL)
- **모든 인터랙티브 요소 Tab 순서 보장**
- **Enter, Space 키 활성화 지원**
- **포커스 시각적 표시 필수**
- **키보드만으로 모든 기능 접근 가능**

```css
/* 키보드 포커스 필수 스타일 */
.interactive-element:focus {
    outline: 2px solid #32CD32 !important;
    outline-offset: 2px;
    /* outline: none 절대 금지 */
}

/* 포커스 가능한 모든 요소 */
button, a, input, select, textarea, [tabindex] {
    outline: none; /* 금지 */
}

button:focus, a:focus {
    outline: 2px solid #32CD32;
    outline-offset: 2px;
}
```

### 3. 스크린 리더 완전 지원 (CRITICAL)
- **모든 이미지에 alt 속성 필수**
- **aria-label, aria-describedby 적절히 사용**
- **heading 구조 논리적 배치 (h1 → h2 → h3)**
- **상태 변화 aria-live로 알림**

```html
<!-- 올바른 접근성 마크업 -->
<img src="chart.png" alt="2024년 매출 증가 차트, 전년 대비 15% 상승">
<button aria-label="메뉴 닫기" aria-expanded="false">×</button>
<div aria-live="polite" id="status-update"></div>

<!-- 금지된 마크업 -->
<img src="image.png"> <!-- alt 없음 -->
<div onclick="close()">×</div> <!-- 버튼이 아닌 div 사용 -->
```

### 4. 터치 타겟 크기 보장 (CRITICAL)
- **모든 터치 타겟 최소 44x44px**
- **인접 타겟 간 8px 이상 간격**
- **터치 영역과 시각적 영역 일치**

```css
.touch-target {
    min-width: 44px;
    min-height: 44px;
    margin: 4px; /* 인접 요소와 간격 */
    padding: 12px;
    
    /* 터치 영역 확장 */
    position: relative;
}

.touch-target::before {
    content: '';
    position: absolute;
    top: -8px; left: -8px;
    right: -8px; bottom: -8px;
    /* 시각적으로 보이지 않지만 터치 영역 확장 */
}
```

---

## ⚡ 성능 최적화 규칙 (CRITICAL)

### 5. 완전한 플랫 디자인 강제 (CRITICAL)
- **모든 그라데이션 사용 금지**
- **모든 그림자 효과 금지**
- **모든 입체 효과 금지**
- **hover/select 시에도 그림자/그라데이션 절대 금지**
- **아웃라인 변화와 텍스트 밝기 변화만 허용**

```css
/* 올바른 플랫 디자인 */
.flat-element {
    background: #333333; /* 단색만 허용 */
    border: 1px solid #444444;
    color: #cccccc;
    transition: border-color 0.3s ease, color 0.3s ease;
}

/* 허용되는 호버 효과 - 아웃라인과 텍스트만 */
.flat-element:hover {
    border-color: #32CD32; /* 아웃라인 진하게 */
    color: #eeeeee;        /* 텍스트 밝게 */
    /* 그 외 모든 효과 금지 */
}

.flat-element:focus {
    outline: 2px solid #32CD32; /* 아웃라인만 */
    outline-offset: 2px;
}

/* 절대 금지된 효과들 */
.forbidden-effects {
    background: linear-gradient(45deg, #333, #555); /* 금지 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);         /* 금지 */
    filter: drop-shadow(2px 2px 4px #000);         /* 금지 */
    text-shadow: 1px 1px 2px #000;                 /* 금지 */
    border-image: linear-gradient();                /* 금지 */
}

/* 호버/선택 시에도 금지 */
.forbidden-hover:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);    /* 금지 */
    background: linear-gradient(#444, #555);   /* 금지 */
    filter: brightness(1.1);                  /* 금지 */
    text-shadow: 0 1px 2px #000;              /* 금지 */
}
```

### 6. 레이아웃 절대 고정 원칙 (CRITICAL)
- **호버/선택 시 다른 요소 밀림 현상 절대 금지**
- **그리드 안정성: 섹션과 그리드가 흔들리지 않음**
- **transform scale()만 허용 - translateY() 금지**
- **레이아웃에 영향주지 않는 효과만 사용**

```css
/* 올바른 레이아웃 고정 호버 효과 */
.stable-hover {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.stable-hover:hover {
    transform: scale(1.05); /* 레이아웃에 영향 없음 */
    opacity: 0.9;
}

/* 절대 금지된 레이아웃 파괴 효과 */
.forbidden-hover:hover {
    transform: translateY(-4px); /* 금지 - 아래 요소 밀림 */
    margin: 10px;                /* 금지 - 주변 요소 영향 */
    padding: 20px;               /* 금지 - 크기 변화 */
    width: 110%;                 /* 금지 - 레이아웃 파괴 */
}
```

### 7. 60fps 애니메이션 보장 (CRITICAL)
- **transform과 opacity만 애니메이션**
- **position, width, height 애니메이션 금지**
- **GPU 가속 transform만 허용**

```css
/* 허용되는 GPU 가속 애니메이션 */
.gpu-animation {
    transition: transform 0.3s ease, opacity 0.3s ease;
    will-change: transform, opacity;
}

.gpu-animation:hover {
    transform: scale(1.05); /* GPU 가속 */
    opacity: 0.8;
}

/* 금지된 애니메이션 */
.forbidden-animation {
    transition: left 0.3s ease;    /* 금지 - 리플로우 */
    transition: width 0.3s ease;   /* 금지 - 리페인트 */
    transition: margin 0.3s ease;  /* 금지 - 레이아웃 변경 */
}
```

### 7. 레이아웃 여백 강제 적용 (CRITICAL)
- **모든 요소 간 최소 16px 여백 필수**
- **구석 몰림 현상 절대 금지**
- **균등한 패딩/마진 적용**
- **시각적 호흡감 보장**

```css
/* 올바른 여백 적용 */
.layout-container {
    padding: 20px;
    margin: 16px;
    gap: 16px; /* flex/grid에서 최소 간격 */
}

.content-section {
    margin-bottom: 24px;
    padding: 16px;
    /* 요소들이 구석에 몰리지 않도록 */
}

/* 금지된 밀집 레이아웃 */
.cramped-layout {
    padding: 0;     /* 금지 - 여백 없음 */
    margin: 0;      /* 금지 - 간격 없음 */
    gap: 0;         /* 금지 - 요소 밀착 */
}

/* 구석 몰림 금지 */
.corner-cramped {
    position: absolute;
    top: 0; left: 0;     /* 금지 - 구석 밀착 */
    right: 0; bottom: 0; /* 금지 - 전체 점유 */
}
```

### 8. 모션 민감도 고려 (CRITICAL)
- **prefers-reduced-motion 반드시 지원**
- **모션 민감 사용자 위해 애니메이션 비활성화**
- **필수 정보는 모션 없이도 전달**

```css
/* 모션 민감도 고려 */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* 기본 애니메이션 */
.animated-element {
    transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
    .animated-element {
        transition: none; /* 애니메이션 완전 비활성화 */
    }
}
```

### 9. 메모리 누수 방지 (CRITICAL)
- **이벤트 리스너 정리 필수**
- **타이머 정리 필수**
- **DOM 참조 정리 필수**

```javascript
// 올바른 이벤트 관리
class ComponentManager {
    constructor() {
        this.handleScroll = this.handleScroll.bind(this);
        this.animationId = null;
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
    
    destroy() {
        // 반드시 정리
        window.removeEventListener('scroll', this.handleScroll);
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    handleScroll() {
        if (this.animationId) return;
        this.animationId = requestAnimationFrame(() => {
            // 스크롤 처리
            this.animationId = null;
        });
    }
}
```

---

## 📱 모바일 호환성 규칙 (CRITICAL)

### 10. 터치 제스처 완전 지원 (CRITICAL)
- **마우스 전용 이벤트 금지**
- **터치 이벤트 우선 구현**
- **터치와 마우스 동시 지원**

```javascript
// 올바른 터치/마우스 지원
class TouchHandler {
    constructor(element) {
        this.element = element;
        this.isTouch = false;
        
        // 터치 우선 감지
        this.element.addEventListener('touchstart', this.handleStart.bind(this), { passive: true });
        this.element.addEventListener('mousedown', this.handleStart.bind(this));
        
        // 통합 이벤트 처리
        this.element.addEventListener('touchmove', this.handleMove.bind(this), { passive: true });
        this.element.addEventListener('mousemove', this.handleMove.bind(this));
    }
    
    handleStart(e) {
        this.isTouch = e.type === 'touchstart';
        // 터치와 마우스 통합 처리
        const clientX = this.isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = this.isTouch ? e.touches[0].clientY : e.clientY;
    }
}

// 금지된 마우스 전용 코드
element.addEventListener('mouseover', handler); // 금지 - 터치에서 작동 안함
element.addEventListener('mouseenter', handler); // 금지 - 터치 미지원
```

### 11. 반응형 디자인 완전성 (CRITICAL)
- **320px부터 완벽 지원**
- **터치 영역 모바일에서 확대**
- **텍스트 크기 모바일 최적화**

```css
/* 완전한 반응형 */
.responsive-container {
    min-width: 320px;
    max-width: 100%;
    padding: 16px;
}

@media (max-width: 480px) {
    .responsive-container {
        padding: 12px;
    }
    
    /* 모바일에서 터치 영역 확대 */
    .touch-button {
        min-height: 48px; /* 데스크톱 44px → 모바일 48px */
        font-size: 16px;   /* iOS 줌 방지 */
    }
    
    /* 텍스트 가독성 보장 */
    body {
        font-size: 16px; /* 최소 크기 */
        line-height: 1.5;
    }
}
```

---

## 🔧 사용자 경험 개선 규칙

### 12. 로딩 상태 표시 필수 (HIGH)
- **모든 비동기 작업에 로딩 표시**
- **예상 대기 시간 안내**
- **진행률 표시 권장**

```css
.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: #999999;
}

.loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #333333;
    border-top: 3px solid #32CD32;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

### 13. 에러 처리 완전성 (HIGH)
- **모든 실패 케이스 처리**
- **사용자 친화적 에러 메시지**
- **복구 방법 제시**

```javascript
// 완전한 에러 처리
async function loadData() {
    try {
        showLoading();
        const data = await fetchData();
        hideLoading();
        return data;
    } catch (error) {
        hideLoading();
        showError('데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.', {
            retry: () => loadData(),
            dismiss: true
        });
    }
}
```

### 14. 사용자 피드백 시스템 (MEDIUM)
- **모든 액션에 즉시 피드백**
- **성공/실패 명확한 표시**
- **진행 상태 시각적 표현**

```css
.feedback-success {
    background: #32CD32;
    color: #000000;
    padding: 12px 16px;
    border-radius: 6px;
    animation: slideIn 0.3s ease;
}

.feedback-error {
    background: #ff4444;
    color: #ffffff;
    padding: 12px 16px;
    border-radius: 6px;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
```

---

## 📋 UX 최적화 체크리스트

### ✅ 필수 검증 항목
1. **레이아웃 고정** - 호버해도 다른 요소들이 밀리지 않음?
2. **그리드 안정성** - 섹션과 그리드가 흔들리지 않음?
3. **플랫 디자인** - 그라데이션/그림자/입체효과 완전 제거?
4. **레이아웃 여백** - 모든 요소 간 16px 이상 여백?
5. **접근성** - WCAG 2.1 AA 준수?
6. **키보드** - Tab으로 모든 기능 접근 가능?
7. **터치** - 모바일에서 모든 제스처 작동?
8. **성능** - 60fps 애니메이션 보장?
9. **반응형** - 320px~2560px 완벽 지원?
10. **로딩** - 모든 대기 상태 표시?
11. **에러** - 모든 실패 케이스 처리?
12. **피드백** - 모든 액션에 즉시 반응?

### 🚫 절대 금지 항목
- **레이아웃 파괴 애니메이션** (`translateY`, `margin`, `padding` 변경)
- **다른 요소 밀림 현상** (호버 시 레이아웃 변화)
- **그리드 불안정성** (섹션과 그리드 흔들림)
- **모든 그라데이션 효과** (`linear-gradient`, `radial-gradient`)
- **모든 그림자 효과** (`box-shadow`, `text-shadow`, `drop-shadow`)
- **모든 입체 효과** (`perspective`, `transform-style: preserve-3d`)
- **hover/select/focus 시 그림자/그라데이션** (상태 변화에서도 금지)
- **brightness, contrast, saturate 필터** (시각적 왜곡 금지)
- **구석 몰림 레이아웃** (`padding: 0`, `margin: 0`, `gap: 0`)
- `outline: none` (키보드 접근성 파괴)
- 마우스 전용 이벤트 (터치 미지원)
- 색상만으로 정보 전달 (색맹 사용자 배제)
- 44px 미만 터치 타겟 (조작 어려움)
- prefers-reduced-motion 무시 (모션 민감 사용자 배제)
- 에러 처리 누락 (앱 크래시)
- 로딩 상태 미표시 (사용자 혼란)

### ✅ 허용되는 호버/선택 효과 (레이아웃 고정)
- **transform: scale()** (레이아웃에 영향 없는 크기 변화)
- **opacity 변화** (투명도 조절)
- **border-color 변화** (아웃라인 색상 변경)
- **color 변화** (텍스트 밝기 조절)
- **outline 추가/변경** (포커스 표시)

---

## 🎯 적용 우선순위

### Priority 1 (절대 필수)
1. 레이아웃 절대 고정 (호버해도 다른 요소 밀림 금지)
2. 그리드 안정성 보장 (섹션과 그리드 흔들림 금지)
3. 완전한 플랫 디자인 강제 (그라데이션/그림자/입체효과 금지)
4. 레이아웃 여백 강제 적용 (구석 몰림 금지)

### Priority 2 (사용성 필수)
5. WCAG 2.1 AA 접근성 준수
6. 키보드 내비게이션 완전 지원
7. 터치 디바이스 완전 지원
8. 60fps 성능 보장

### Priority 3 (경험 개선)
9. 반응형 디자인 완전성
10. 로딩 상태 표시
11. 에러 처리 완전성

---

이 규칙들은 **법적 접근성 요구사항을 충족**하고 **모든 사용자가 차별 없이 이용할 수 있는** 웹 인터페이스를 보장하는 핵심 원칙들입니다.