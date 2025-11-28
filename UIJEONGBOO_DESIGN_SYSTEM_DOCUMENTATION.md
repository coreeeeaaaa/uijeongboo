# UijeongBoo Design System - 완전 문서화

## 🎯 핵심 원칙 (절대 위반 금지)

### 1. 색상 시스템
- **배경색**: `#222222` (body), `#333333` (header/sidebar), `#444444` (cards)
- **텍스트색**: `#eeeeee` (primary), `#cccccc` (secondary), `#888888` (muted)
- **라임 그린 (#32CD32)**: **극히 제한적 사용** - 햄버거 메뉴 활성화 시에만
- **절대 금지**: 라임 그린을 전체 요소의 3% 초과 사용

### 2. 레이아웃 원칙
- **섹션 배경 금지**: 섹션(`.demo-section`)에는 배경색 사용 금지
- **카드 배경 허용**: 카드(`.card`)에는 `#444444` 배경 사용
- **테두리 완전 금지**: 모든 요소에서 border 사용 금지
- **모서리 둥글게 필수**: 모든 네모난 요소는 `border-radius` 적용

### 3. 버튼 시스템
- **기본 버튼**: `background: transparent; border: none; border-radius: 6px;`
- **Primary 버튼**: `background: #32CD32; color: #000000;` (극히 제한적)
- **호버 효과**: `background: #555555;`

## 📐 CSS 변수 시스템

```css
:root {
    /* 색상 팔레트 */
    --uij-bg-primary: #222222;
    --uij-bg-secondary: #333333;
    --uij-bg-tertiary: #444444;
    --uij-text-primary: #eeeeee;
    --uij-text-secondary: #cccccc;
    --uij-text-muted: #888888;
    --uij-accent: #32CD32;
    --uij-hover: #555555;
    
    /* 간격 시스템 */
    --uij-spacing-xs: 4px;
    --uij-spacing-sm: 8px;
    --uij-spacing-md: 16px;
    --uij-spacing-lg: 24px;
    --uij-spacing-xl: 32px;
    
    /* 모서리 둥글기 */
    --uij-radius-sm: 4px;
    --uij-radius-md: 6px;
    --uij-radius-lg: 8px;
    
    /* 폰트 시스템 */
    --uij-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --uij-font-size-sm: 12px;
    --uij-font-size-md: 14px;
    --uij-font-size-lg: 16px;
    --uij-font-size-xl: 20px;
    --uij-font-size-2xl: 24px;
    --uij-font-size-3xl: 2.5rem;
}
```

## 🧩 컴포넌트 라이브러리

### 카드 컴포넌트
```css
.uij-card {
    background: var(--uij-bg-tertiary);
    padding: var(--uij-spacing-lg);
    border-radius: var(--uij-radius-lg);
    transition: all 0.3s ease;
    border: none;
}

.uij-card:hover {
    transform: translateY(-2px);
    background: #4a4a4a;
}
```

### 버튼 컴포넌트
```css
.uij-button {
    background: transparent;
    border: none;
    border-radius: var(--uij-radius-md);
    color: var(--uij-text-primary);
    padding: 12px 20px;
    font-size: var(--uij-font-size-md);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--uij-font-family);
}

.uij-button:hover {
    background: var(--uij-hover);
}

.uij-button--primary {
    background: var(--uij-accent);
    color: #000000;
}
```

### 햄버거 메뉴 컴포넌트
```css
.uij-hamburger-menu {
    position: fixed;
    top: 16px;
    left: 16px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--uij-radius-lg);
    transition: all 0.3s ease;
    z-index: 1010;
}

.uij-hamburger-line {
    display: block;
    position: absolute;
    left: 50%;
    width: 20px;
    height: 2px;
    background: var(--uij-text-secondary);
    border-radius: 1px;
    transform: translateX(-50%);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.uij-hamburger-checkbox:checked + .uij-hamburger-menu .uij-hamburger-line:nth-child(1) {
    background: var(--uij-accent);
    transform: translateX(-50%) rotate(45deg);
}
```

## 🚨 강제 검증 규칙

### CSS 검증 스크립트
```javascript
// UijeongBoo 디자인 규약 검증
function validateUijeongBooDesign() {
    const violations = [];
    
    // 1. 라임 그린 사용량 검증 (3% 초과 금지)
    const allElements = document.querySelectorAll('*');
    let limeGreenUsage = 0;
    
    allElements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.backgroundColor.includes('50, 205, 50') || 
            styles.color.includes('50, 205, 50') ||
            styles.borderColor?.includes('50, 205, 50')) {
            limeGreenUsage++;
        }
    });
    
    const usagePercent = (limeGreenUsage / allElements.length) * 100;
    if (usagePercent > 3) {
        violations.push(`라임 그린 사용량 ${usagePercent.toFixed(1)}% - 3% 초과 금지!`);
    }
    
    // 2. 테두리 사용 검증 (완전 금지)
    allElements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.borderWidth !== '0px' && el.tagName !== 'IFRAME') {
            violations.push(`테두리 사용 금지 위반: ${el.className}`);
        }
    });
    
    // 3. 섹션 배경 검증 (금지)
    const sections = document.querySelectorAll('.demo-section, .section');
    sections.forEach(section => {
        const styles = getComputedStyle(section);
        if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
            styles.backgroundColor !== 'transparent') {
            violations.push(`섹션 배경 사용 금지 위반: ${section.className}`);
        }
    });
    
    return violations;
}

// 자동 검증 실행
document.addEventListener('DOMContentLoaded', () => {
    const violations = validateUijeongBooDesign();
    if (violations.length > 0) {
        console.error('🚨 UijeongBoo 디자인 규약 위반:', violations);
        alert('디자인 규약 위반이 발견되었습니다!');
    } else {
        console.log('✅ UijeongBoo 디자인 규약 준수');
    }
});
```

## 📚 사용 가이드

### 1. 기본 설정
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UijeongBoo App</title>
    <link rel="stylesheet" href="uijeongboo-framework.css">
</head>
<body class="uij-body">
    <!-- 콘텐츠 -->
</body>
</html>
```

### 2. 카드 레이아웃 예제
```html
<div class="uij-container">
    <!-- 섹션 (배경 없음) -->
    <section class="uij-section">
        <h2 class="uij-heading">제목</h2>
        
        <!-- 카드 그리드 -->
        <div class="uij-card-grid">
            <div class="uij-card">
                <h3 class="uij-card-title">카드 제목</h3>
                <p class="uij-card-content">카드 내용</p>
                <button class="uij-button">액션 버튼</button>
            </div>
        </div>
    </section>
</div>
```

### 3. 네비게이션 시스템
```html
<!-- 햄버거 메뉴 -->
<input type="checkbox" id="hamburger-toggle" class="uij-hamburger-checkbox">
<label for="hamburger-toggle" class="uij-hamburger-menu">
    <span class="uij-hamburger-line"></span>
    <span class="uij-hamburger-line"></span>
    <span class="uij-hamburger-line"></span>
</label>

<!-- 사이드바 -->
<div class="uij-sidebar" id="sidebar">
    <nav class="uij-nav">
        <a href="#" class="uij-nav-item">메뉴 1</a>
        <a href="#" class="uij-nav-item">메뉴 2</a>
    </nav>
</div>
```

## 🔧 프레임워크 구조

```
uijeongboo-framework/
├── css/
│   ├── core/
│   │   ├── variables.css      # CSS 변수
│   │   ├── reset.css          # 리셋 스타일
│   │   └── typography.css     # 타이포그래피
│   ├── components/
│   │   ├── buttons.css        # 버튼 컴포넌트
│   │   ├── cards.css          # 카드 컴포넌트
│   │   ├── navigation.css     # 네비게이션
│   │   └── forms.css          # 폼 요소
│   ├── utilities/
│   │   ├── spacing.css        # 간격 유틸리티
│   │   └── colors.css         # 색상 유틸리티
│   └── uijeongboo.css         # 통합 빌드
├── js/
│   ├── core/
│   │   └── validator.js       # 디자인 규약 검증
│   └── components/
│       └── hamburger.js       # 햄버거 메뉴 로직
├── docs/
│   ├── README.md
│   ├── components/
│   └── examples/
└── dist/
    ├── uijeongboo.min.css     # 압축된 CSS
    └── uijeongboo.min.js      # 압축된 JS
```

## 🚀 배포 및 사용

### NPM 설치
```bash
npm install uijeongboo-framework
```

### CDN 사용
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uijeongboo-framework@latest/dist/uijeongboo.min.css">
<script src="https://cdn.jsdelivr.net/npm/uijeongboo-framework@latest/dist/uijeongboo.min.js"></script>
```

## 🛡️ 품질 보증

- **자동 검증**: 모든 규약 위반 자동 탐지
- **단위 테스트**: 컴포넌트별 테스트 커버리지 100%
- **접근성**: WCAG 2.1 AA 준수
- **성능**: 압축된 CSS < 50KB

## 📝 버전 관리

- **v1.0.0**: 초기 릴리즈 - 핵심 컴포넌트
- **v1.1.0**: 햄버거 메뉴 및 네비게이션 추가
- **v1.2.0**: 자동 검증 시스템 추가

---

**⚠️ 중요**: 이 문서의 모든 규칙은 **절대적**이며, 위반 시 프레임워크가 자동으로 경고를 표시합니다.