# 🎨 UijeongBoo Design Framework

모듈화된 미니멀 다크 테마 디자인 시스템. 라임 그린 포인트 컬러와 투명 버튼 시스템을 특징으로 합니다.

## 🚨 핵심 디자인 규칙 (절대 위반 금지)

### 색상 제한
- **라임 그린 (#32CD32)만** 포인트 컬러로 사용 가능
- **모든 다른 색상은 그레이스케일만** 허용
- 자동 디자인 규칙 강제화 시스템 내장

### 버튼 시스템
- **모든 버튼은 반드시 투명 배경** (`background: transparent !important`)
- Primary 버튼만 예외적으로 라임 배경 허용
- 호버 상태에서도 투명 배경 유지

### 기타 규칙
- **모든 box-shadow 사용 금지** (플랫 디자인)
- **이모지 사용 금지** (깔끔한 텍스트 기반)

### 테마 시스템
- **다크 모드 기본**: 깔끔한 다크 테마
- **라이트 모드 지원**: 그레이스케일 기반 라이트 테마
- **자동 저장**: localStorage로 테마 상태 유지
- **동적 전환**: JavaScript로 실시간 테마 변경

### 스크롤바 디자인 규칙
- **스크롤바 배경은 투명** (`background: transparent`)
- **스크롤바는 항상 회색** (#999999 - 라임 그린 금지)
- **평상시에는 보이지 않음** (`opacity: 0`)
- **마우스 호버시에만 표시** (`opacity: 1`)
- 부드러운 전환 효과 필수 (`transition: opacity 0.3s ease`)

### 가로 슬라이드 인터페이스 규칙
- **자동 애니메이션 금지** - 사용자가 직접 제어해야 함
- **수동 스크롤만 허용** - 마우스 휠이나 드래그로만 동작
- **고정된 상태 유지** - 평상시에는 움직이지 않음
- **shift 키 불필요** - 자연스러운 가로 스크롤 구현

### 카드/요소 크기 및 비율 규칙
- **정사각형 비율 강제** - 카드나 주요 요소는 1:1 비율 유지
- **마우스 이탈시 원상복구** - hover 효과는 mouseleave시 완전히 제거
- **크기 최적화** - 화면 공간을 효율적으로 사용하는 적절한 크기 유지

## 🎯 빠른 시작

### HTML에 포함
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UijeongBoo 앱</title>
    <link rel="stylesheet" href="uijeongboo.min.css">
</head>
<body>
    <div class="uij-container">
        <button class="uij-btn primary">클릭하세요</button>
    </div>
    <script src="uijeongboo.js"></script>
</body>
</html>
```

### SDK로 프로그래밍적 사용
```javascript
import { UijeongBooSDK } from './web_sdk/uijeongboo-web-sdk.js';

const sdk = new UijeongBooSDK();

// 테마 초기화
sdk.initTheme();

// 컴포넌트 생성
const button = sdk.button('클릭', 'primary');
const card = sdk.card('제목', '내용');
const tabs = sdk.tabs([
  { title: '탭1', content: '<p>내용1</p>' },
  { title: '탭2', content: '<p>내용2</p>' }
]);

// 테마 토글
const themeToggle = sdk.themeToggle();
document.body.appendChild(themeToggle);

// DOM에 추가
document.body.appendChild(button);
document.body.appendChild(card);
document.body.appendChild(tabs);
```

## 📁 모듈화 구조

```
uijeongboo/
## 🧩 컴포넌트 라이브러리

### 코어 컴포넌트
- **버튼**: 기본, 프라이머리, 세컨더리, 아웃라인, 고스트 (크기: sm/lg/xl)
- **카드**: 헤더, 바디, 푸터 지원
- **툴팁**: 호버/포커스 툴팁, ARIA 지원
- **탭**: 키보드 내비게이션, 다중 스타일 (기본/필/수직)
- **아코디언**: 확장/축소, 다중 선택 지원

### 폼 컴포넌트
- **입력 필드**: 텍스트, 이메일, 패스워드 (크기: sm/lg/xl)
- **체크박스/라디오**: 접근성 지원, 크기 변형
- **셀렉트**: 커스텀 스타일, 옵션 그룹화
- **토글 스위치**: 온/오프 상태, 크기 변형
- **파일 입력**: 드래그 앤 드롭 지원

### 레이아웃 컴포넌트
- **모달**: 다양한 크기, 접근성 지원
- **드롭다운**: 메뉴 시스템, 키보드 내비게이션
- **네비게이션**: 사이드바, 헤더, 푸터

### 유틸리티
- **반응형 그리드**: 12열 시스템, 갭 조절
- **플렉스박스 유틸리티**: 정렬, 방향, 랩핑
- **간격 유틸리티**: 패딩, 마진 클래스
- **애니메이션**: 페이드, 슬라이드, 바운스
- **아이콘**: CSS 기반 아이콘 시스템

## 📁 모듈화 구조

```
uijeongboo/
├── css/
│   ├── core/                    # 핵심 스타일
│   │   ├── variables.css        # CSS 변수
│   │   ├── reset.css           # 리셋 스타일
│   │   ├── typography.css      # 타이포그래피
│   │   └── layout.css          # 레이아웃 시스템
│   ├── components/             # 컴포넌트 스타일
│   │   ├── buttons.css         # 버튼 컴포넌트
│   │   ├── navigation.css      # 네비게이션
│   │   ├── forms.css          # 폼 요소
│   │   └── animations.css     # 애니메이션
│   └── utilities/             # 유틸리티 클래스
│       ├── spacing.css        # 여백 관리
│       └── colors.css         # 색상 유틸리티
├── js/
│   ├── core/                  # 프레임워크 코어
│   │   ├── framework.js       # 메인 프레임워크
│   │   └── design-enforcer.js # 디자인 규칙 강제화
│   ├── components/            # 컴포넌트 로직
│   │   ├── sidebar.js         # 사이드바
│   │   └── hamburger.js       # 햄버거 메뉴
│   └── utils/                 # 유틸리티
│       └── enforcer-cli.js    # CLI 도구
├── components/                # HTML 컴포넌트
│   ├── layout/               # 레이아웃 컴포넌트
│   │   ├── header.html       # 헤더
│   │   └── sidebar.html      # 사이드바
│   └── ui/                   # UI 컴포넌트
│       └── buttons.html      # 버튼 모음
└── index.html                # 메인 데모 페이지
```

## 🚀 빠른 시작

### 1. 기본 사용법

```html
<!DOCTYPE html>
<html data-theme="dark">
<head>
    <!-- UijeongBoo Core CSS (순서대로 로드) -->
    <link rel="stylesheet" href="css/core/variables.css">
    <link rel="stylesheet" href="css/core/reset.css">
    <link rel="stylesheet" href="css/core/typography.css">
    <link rel="stylesheet" href="css/core/layout.css">
    
    <!-- 필요한 컴포넌트 CSS -->
    <link rel="stylesheet" href="css/components/buttons.css">
    <link rel="stylesheet" href="css/components/navigation.css">
    
    <!-- 유틸리티 CSS -->
    <link rel="stylesheet" href="css/utilities/spacing.css">
    <link rel="stylesheet" href="css/utilities/colors.css">
</head>
<body>
    <!-- 컴포넌트 사용 -->
    <button class="uij-btn primary">Primary Button</button>
    <button class="uij-btn secondary">Secondary Button</button>
    
    <!-- JavaScript (순서대로 로드) -->
    <script src="js/core/framework.js"></script>
    <script src="js/core/design-enforcer.js"></script>
    <script src="js/components/sidebar.js"></script>
</body>
</html>
```

### 2. 컴포넌트 include 방식

```javascript
// 컴포넌트 동적 로드
async function loadComponent(url, targetId) {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
}

// 헤더와 사이드바 로드
await loadComponent('./components/layout/header.html', 'header');
await loadComponent('./components/layout/sidebar.html', 'sidebar');
```

## 🔧 디자인 규칙 강제화 도구

### NPM Scripts

```bash
# 디자인 규칙 검사
npm run audit

# 자동 수정
npm run fix

# 실시간 감시
npm run watch

# 색상만 검사
npm run check-colors

# 버튼 배경 강제화
npm run enforce-buttons

# 개발 서버 실행
npm run dev
```

### CLI 직접 사용

```bash
# 프로젝트 검사
node js/utils/enforcer-cli.js audit ./src

# 위반사항 자동 수정
node js/utils/enforcer-cli.js fix ./components

# 실시간 감시
node js/utils/enforcer-cli.js watch .
```

## 📝 컴포넌트 사용법

### 버튼 컴포넌트

```html
<!-- 기본 버튼들 -->
<button class="uij-btn primary">Primary</button>
<button class="uij-btn secondary">Secondary</button>
<button class="uij-btn outline">Outline</button>
<button class="uij-btn ghost">Ghost</button>

<!-- 크기 변형 -->
<button class="uij-btn primary sm">Small</button>
<button class="uij-btn primary lg">Large</button>

<!-- 아이콘 버튼 -->
<button class="uij-btn icon primary">⚙️</button>

<!-- 버튼 그룹 -->
<div class="uij-btn-group">
    <button class="uij-btn secondary">Left</button>
    <button class="uij-btn secondary">Center</button>
    <button class="uij-btn secondary">Right</button>
</div>
```

### 사이드바 컴포넌트

```html
<!-- 사이드바 -->
<aside class="uij-sidebar" data-uij-component="sidebar">
    <div class="uij-sidebar-header">
        <h2 class="uij-sidebar-title">Navigation</h2>
    </div>
    <div class="uij-sidebar-content">
        <nav class="uij-nav-section">
            <a href="#" class="uij-nav-item active">Dashboard</a>
            <a href="#" class="uij-nav-item">Projects</a>
        </nav>
    </div>
</aside>
```

### 헤더 컴포넌트

```html
<!-- 헤더 -->
<header class="uij-header">
    <button class="uij-hamburger-container" data-uij-component="hamburger">
        <div class="uij-hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </button>
    <h1 class="uij-header-title">UijeongBoo</h1>
    <nav class="uij-header-menu">
        <a href="#" class="uij-header-menu-item">Home</a>
        <a href="#" class="uij-header-menu-item">About</a>
    </nav>
</header>
```

## 🎨 유틸리티 클래스

### 색상

```html
<!-- 텍스트 색상 (그레이스케일 + 라임만) -->
<p class="uij-text-primary">Primary text</p>
<p class="uij-text-secondary">Secondary text</p>
<p class="uij-text-muted">Muted text</p>
<p class="uij-text-accent">Accent text (lime)</p>

<!-- 배경색 -->
<div class="uij-bg-primary">Primary background</div>
<div class="uij-bg-secondary">Secondary background</div>
<div class="uij-bg-accent">Accent background (lime)</div>
```

### 여백

```html
<!-- 마진 -->
<div class="uij-m-4">Margin 16px</div>
<div class="uij-mx-auto">Center horizontally</div>
<div class="uij-mt-8">Margin top 32px</div>

<!-- 패딩 -->
<div class="uij-p-4">Padding 16px</div>
<div class="uij-px-6">Horizontal padding 24px</div>
<div class="uij-py-2">Vertical padding 8px</div>
```

### 레이아웃

```html
<!-- Flexbox -->
<div class="uij-flex uij-justify-center uij-items-center">
    <p>Centered content</p>
</div>

<!-- Grid -->
<div class="uij-grid uij-grid-cols-3 uij-gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

## 🔍 자동 강제화 시스템

UijeongBoo는 실시간으로 디자인 규칙 위반을 감지하고 자동으로 수정합니다:

### JavaScript 강제화

```javascript
// 자동으로 로드되는 강제화 시스템
document.addEventListener('DOMContentLoaded', () => {
    // 금지된 색상 검사
    UijeongBooDesignEnforcer.checkForbiddenColors();
    
    // 투명 버튼 강제화
    UijeongBooDesignEnforcer.enforceTransparentButtons();
    
    // box-shadow 제거
    UijeongBooDesignEnforcer.removeForbiddenProperties();
});
```

### 실시간 감시

```javascript
// DOM 변경 감시
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
            enforceDesignRules(mutation.target);
        }
    });
});
```

## 🌙 테마 시스템

```html
<!-- 다크 테마 (기본) -->
<html data-theme="dark">

<!-- 라이트 테마 (그레이스케일 유지) -->
<html data-theme="light">
```

```javascript
// 테마 전환
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.dataset.theme || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = newTheme;
}
```

## 📱 반응형 디자인

모든 컴포넌트는 모바일부터 데스크톱까지 완벽하게 반응합니다:

```css
/* 모바일 */
@media (max-width: 480px) {
    .uij-sidebar { width: 100vw; }
    .uij-btn { width: 100%; }
}

/* 태블릿 */
@media (max-width: 768px) {
    .uij-header-menu { display: none; }
    .uij-sidebar { width: 280px; }
}
```

## 🤖 에이전트 가이드

다른 에이전트가 이 프레임워크를 사용할 때 반드시 지켜야 할 규칙:

### 1. 디자인 규칙 체크
```bash
# 작업 전 반드시 실행
npm run audit

# 작업 중 실시간 감시
npm run watch
```

### 2. 금지된 작업
- 라임 그린 외 색상 사용 금지
- 버튼 배경색 설정 금지
- box-shadow 속성 사용 금지
- 이모지 사용 금지

### 3. 권장 작업 흐름
1. 기존 컴포넌트 재사용
2. 디자인 규칙 준수 확인
3. 모듈화된 구조 유지
4. 반응형 고려

## 📄 라이센스

MIT License

## 🙋‍♂️ 지원

문제가 발생하면 다음을 확인하세요:

1. `npm run audit`로 디자인 규칙 위반 확인
2. 콘솔에서 UijeongBoo 에러 메시지 확인
3. 브라우저 개발자 도구에서 CSS 로드 상태 확인

---

**UijeongBoo Design Framework v1.0** - 모듈화된 미니멀 디자인 시스템