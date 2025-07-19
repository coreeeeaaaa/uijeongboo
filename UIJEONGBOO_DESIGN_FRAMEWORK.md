# 🎨 UijeongBoo Design Framework

## 📋 목차
1. [프레임워크 개요](#프레임워크-개요)
2. [핵심 디자인 원칙](#핵심-디자인-원칙)
3. [컴포넌트 라이브러리](#컴포넌트-라이브러리)
4. [색상 시스템](#색상-시스템)
5. [반응형 디자인](#반응형-디자인)
6. [사용 가이드](#사용-가이드)

---

## 🎯 프레임워크 개요

**UijeongBoo Design Framework**는 미니멀리즘과 기능성을 중심으로 한 모던 UI 디자인 시스템입니다.

### 핵심 특징
- **미니멀 & 카드 스타일** 동적 전환
- **완전 투명 버튼** 시스템
- **제한적 색상 팔레트** (라임 포인트 컬러)
- **그림자 없는 플랫 디자인**
- **완벽한 반응형 텍스트 시스템**

---

## 🎨 핵심 디자인 원칙

### 1. 색상 제한 원칙
```css
/* ✅ 허용: 라임색은 오직 포인트 요소에만 */
.accent-primary { color: #32CD32; }          /* 활성 상태 */
.accent-bg { background: #32CD32; }          /* Active 태그, 토글 버튼 */

/* ✅ 기본 색상 팔레트 */
.bg-primary { background: #222222; }        /* 메인 배경 */
.bg-secondary { background: #333333; }      /* 카드/사이드바 */
.bg-tertiary { background: #444444; }       /* 호버/카드 내부 */
.text-primary { color: #eeeeee; }           /* 주요 텍스트 */
.text-secondary { color: #999999; }         /* 보조 텍스트 */
.text-muted { color: #666666; }             /* 비활성 텍스트 */
```

### 2. 투명 버튼 강제 적용
```css
/* 모든 버튼은 투명 배경 필수 */
.btn, button, .header-menu-item, .hamburger-container {
    background: transparent !important;
}

.btn:hover, button:hover {
    background: transparent !important;
}
```

### 3. 그림자 제거 원칙
```css
/* 모든 요소에서 그림자 완전 제거 */
.sidebar, .sidebar-right, .demo-section, .metric-card, .project-card {
    box-shadow: none;
}
```

---

## 🧩 컴포넌트 라이브러리

### 1. 헤더 시스템
```html
<header class="header">
    <div class="hamburger-container" onclick="toggleSidebar()">
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div class="site-title">사이트 제목</div>
    <nav class="header-menu">
        <a href="#" class="header-menu-item active">메뉴1</a>
        <a href="#" class="header-menu-item">메뉴2</a>
    </nav>
</header>
```

**특징:**
- 투명 배경 메뉴 아이템
- 호버시 밝아지고 굵어짐
- 모바일에서 자동 숨김

### 2. 사이드바 시스템
```html
<div class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-title">제목</div>
    </div>
    <div class="sidebar-content">
        <div class="nav-section">
            <div class="nav-section-title">섹션</div>
            <a href="#" class="nav-item active">항목1</a>
            <a href="#" class="nav-item">항목2</a>
        </div>
    </div>
</div>
```

**스타일 전환:**
```javascript
// 미니멀 ↔ 카드 스타일 동적 전환
function setSidebarStyle(style) {
    if (style === 'card') {
        content.classList.add('card-style');
    } else {
        content.classList.remove('card-style');
    }
}
```

### 3. 햄버거 애니메이션
```css
.hamburger-container.active .hamburger span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}
.hamburger-container.active .hamburger span:nth-child(2) {
    width: 0%; opacity: 0;
}
.hamburger-container.active .hamburger span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}
```

### 4. 8조각 피자 로고 시스템
```html
<!-- 6조각 채워진 8분원 로고 -->
<svg width="24" height="24" viewBox="0 0 100 100">
    <path d="M50,50 L14.29,32.5 A40,40 0 0,1 50,10 L50,50 Z" fill="#32CD32"/>
    <path d="M50,50 L50,10 A40,40 0 0,1 85.71,32.5 L50,50 Z" fill="#32CD32"/>
    <path d="M50,50 L85.71,32.5 A40,40 0 0,1 85.71,67.5 L50,50 Z" fill="#32CD32"/>
    <path d="M50,50 L85.71,67.5 A40,40 0 0,1 50,90 L50,50 Z" fill="#32CD32"/>
    <path d="M50,50 L50,90 A40,40 0 0,1 14.29,67.5 L50,50 Z" fill="#32CD32"/>
    <path d="M50,50 L14.29,67.5 A40,40 0 0,1 14.29,32.5 L50,50 Z" fill="#32CD32"/>
</svg>
```

**애니메이션:**
```css
.sidebar-toggle-right.active svg {
    transform: rotate(270deg);
}
```

### 5. 상태바 시스템
```html
<div class="status-bar">
    <div class="status-left">
        <div class="status-item">
            <div class="status-indicator"></div>
            <span>System Online</span>
        </div>
        <div class="status-item"><span>CPU: 12%</span></div>
        <div class="status-item"><span>Memory: 2.1GB / 8GB</span></div>
    </div>
    <div class="status-right">
        <div class="status-item"><span>Active Users: 5</span></div>
        <div class="status-item"><span id="current-time">--:--:--</span></div>
    </div>
</div>
```

### 6. 카드 컴포넌트
```html
<!-- 프로젝트 카드 -->
<div class="project-card" style="padding: 20px; background: #444444; border-radius: 8px; box-shadow: none;">
    <div style="display: flex; align-items: center; justify-content: space-between;">
        <h4>프로젝트명</h4>
        <span style="background: #32CD32; color: #000000; padding: 2px 8px; border-radius: 4px;">Active</span>
    </div>
    <p>프로젝트 설명</p>
</div>
```

---

## 📱 반응형 디자인

### 텍스트 줄바꿈 절대 방지 시스템
```css
/* 모든 텍스트 요소에 적용 */
.header .site-title,
.nav-item,
.system-item,
.status-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

### 단계별 축소 전략
```css
/* 768px 이하: 기본 모바일 */
@media (max-width: 768px) {
    .header-menu { display: none; }
    .status-bar { font-size: 9px; }
    .mobile-menu { display: block; }
}

/* 600px 이하: 약어 사용 */
@media (max-width: 600px) {
    .status-bar { font-size: 8px; }
    /* CPU → C:, Memory → M:, Network → N: */
}

/* 480px 이하: 초소형 */
@media (max-width: 480px) {
    .sidebar, .sidebar-right { width: 100vw; }
    .status-bar { font-size: 7px; }
}

/* 360px 이하: 극소형 */
@media (max-width: 360px) {
    .status-bar { font-size: 6px; }
    .status-item span { 
        max-width: 50px;
        text-overflow: ellipsis;
    }
}
```

### 모바일 네비게이션
```html
<!-- 모바일에서만 표시되는 헤더 메뉴 -->
<div class="nav-section mobile-menu">
    <div class="nav-section-title">Navigation</div>
    <a href="#" class="nav-item" onclick="showPage('dashboard'); closeSidebar();">Dashboard</a>
    <a href="#" class="nav-item" onclick="showPage('projects'); closeSidebar();">Projects</a>
    <a href="#" class="nav-item" onclick="showPage('settings'); closeSidebar();">Settings</a>
</div>
```

---

## 🚀 사용 가이드

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
```

### 2. JavaScript 초기화
```javascript
// 필수 초기화
document.addEventListener('DOMContentLoaded', function() {
    setSidebarStyle('minimal');
    updateStatusBar();
    setInterval(updateStatusBar, 5000);
});
```

### 3. 스타일 전환 함수
```javascript
function setSidebarStyle(style) {
    const leftContent = document.getElementById('leftSidebarContent');
    const rightContent = document.getElementById('rightSidebarContent');
    
    if (style === 'card') {
        leftContent.classList.add('card-style');
        rightContent.classList.add('card-style');
        document.getElementById('mainContent').classList.remove('minimal-style');
    } else {
        leftContent.classList.remove('card-style');
        rightContent.classList.remove('card-style');
        document.getElementById('mainContent').classList.add('minimal-style');
    }
}
```

### 4. 모달 시스템
```javascript
function showModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    if (modal) modal.classList.add('show');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    if (modal) modal.classList.remove('show');
}
```

---

## 🎭 아이콘 시스템

### 1. 8조각 피자 로고 변형
- `uijeongboo_8slice_missing1.png` - 6조각 채움 (기본)
- `uijeongboo_8slice_missing2.png` - 6조각 채움
- `uijeongboo_8slice_missing3.png` - 5조각 채움
- 기타 다양한 변형 사용 가능

### 2. 4분원 로고 시스템
- `uijeongboo_q1.png` - 1사분면
- `uijeongboo_q12.png` - 1,2사분면
- `uijeongboo_q123.png` - 1,2,3사분면
- `uijeongboo_q1234.png` - 전체

---

## ⚡ 성능 최적화

### CSS 최적화
```css
/* 애니메이션 최적화 */
.hamburger span {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
}

/* GPU 가속 활용 */
.sidebar {
    transform: translateX(-100%);
    will-change: transform;
}
```

### JavaScript 최적화
```javascript
// 디바운스된 리사이즈 핸들러
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateStatusBar, 100);
});
```

---

## 🛠️ 커스터마이징

### 색상 변경
```css
:root {
    --accent-color: #32CD32;      /* 라임 (변경 금지) */
    --bg-primary: #222222;        /* 메인 배경 */
    --bg-secondary: #333333;      /* 사이드바 */
    --text-primary: #eeeeee;      /* 주요 텍스트 */
}
```

### 애니메이션 타이밍 조정
```css
:root {
    --transition-fast: 0.15s ease;
    --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📦 프레임워크 구성 요소

### 필수 파일
1. `uijeongboo-framework.css` - 메인 스타일시트
2. `uijeongboo-framework.js` - 핵심 JavaScript
3. `sidebar-unified.html` - 완전한 데모 페이지

### 아이콘 에셋
1. `/pizza_icons/` - 8조각 피자 로고들
2. `/macos_icons/` - 4분원 로고들
3. `/logos/` - 다양한 크기별 파비콘

### 스크립트
1. `setup-design-system.sh` - 자동 설정
2. `auto-design-tracker.js` - 디자인 추적

---

## 🚨 중요 규칙

### ❌ 절대 금지사항
1. **라임색을 포인트 이외에 사용**
2. **버튼에 배경색 추가**
3. **그림자(box-shadow) 사용**
4. **텍스트 두 줄 넘김**
5. **이모지 사용 (예외 없음 - 절대 금지)**
6. **텍스트 오버플로우 처리 누락 (모든 텍스트에 ellipsis 필수)**
7. **애니메이션 품질 저하 (60개 카드, 120초+, 빈 공간 금지)**
8. **호버 효과 누락 (Interactive 요소는 반드시 호버 애니메이션)**

### ✅ 필수 준수사항
1. **투명 버튼 배경 유지**
2. **화면 크기별 텍스트 축소**
3. **모바일에서 헤더 메뉴 → 사이드바 이동**
4. **8조각 피자 로고 270도 회전**
5. **미니멀/카드 스타일 전환 지원**

---

## 🎯 완성도 체크리스트

- [x] 라임색 제한 적용
- [x] 투명 버튼 강제 적용
- [x] 그림자 완전 제거
- [x] 8조각 피자 로고 구현
- [x] 270도 회전 애니메이션
- [x] 미니멀/카드 스타일 전환
- [x] 모바일 반응형 디자인
- [x] 텍스트 줄바꿈 방지
- [x] 시스템 상태바
- [x] 페이지 네비게이션
- [x] 모달 시스템
- [x] 햄버거 X 애니메이션

**UijeongBoo Design Framework v1.0 완성** ✨