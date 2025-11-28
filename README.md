# UijeongBoo CSS Framework

> Tailwind가 싫어서 만든 순수 CSS 프레임워크

**📚 [Live Demo & Documentation](https://coreeeeaaaa.github.io/uijeongboo/)**

미니멀 다크 테마 디자인 시스템. 라임 그린 포인트 컬러와 투명 버튼 시스템을 특징으로 합니다.

## 설치

### CDN 사용

```html
<!-- UijeongBoo CSS -->
<link rel="stylesheet" href="https://coreeeeaaaa.github.io/uijeongboo/uijeongboo.css">

<!-- UijeongBoo JavaScript -->
<script src="https://coreeeeaaaa.github.io/uijeongboo/uijeongboo.js"></script>
```

### 다운로드

[uijeongboo.css](https://github.com/coreeeeaaaa/uijeongboo/raw/main/uijeongboo.css) (87KB)

## 빠른 시작

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UijeongBoo Example</title>
    <link rel="stylesheet" href="https://coreeeeaaaa.github.io/uijeongboo/uijeongboo.css">
</head>
<body>
    <div class="container">
        <h1>UijeongBoo Framework</h1>
        <button class="btn primary">Primary Button</button>
        <button class="btn">Secondary Button</button>
    </div>
    <script src="https://coreeeeaaaa.github.io/uijeongboo/uijeongboo.js"></script>
</body>
</html>
```

## 주요 특징

### 미니멀 디자인
- **그레이스케일 팔레트** (#222222 ~ #eeeeee)
- **라임 그린 포인트 컬러** (#32CD32)
- **플랫 디자인** (box-shadow 없음)
- **투명 버튼 시스템**

### 완벽한 컴포넌트
- 버튼 (primary, secondary, outline, ghost)
- 카드 레이아웃
- 네비게이션 (헤더, 사이드바)
- 폼 요소
- 애니메이션

### 반응형 디자인
- 모바일부터 데스크톱까지 완벽 대응
- Flexbox 및 Grid 레이아웃
- 터치 친화적 인터페이스

## 디자인 규칙

### 색상 제한
- **라임 그린 (#32CD32)만** 포인트 컬러로 사용
- **그레이스케일만** 허용
- 자동 디자인 규칙 강제화

### 버튼 시스템
- 모든 버튼은 **투명 배경** (`background: transparent`)
- Primary 버튼만 예외적으로 라임 배경
- 호버 효과는 테두리 색상 변경

### 기타
- **box-shadow 사용 금지**
- **이모지 사용 금지**
- 깔끔한 텍스트 기반 디자인

## 컴포넌트 예시

### 버튼

```html
<!-- 기본 버튼 -->
<button class="btn primary">Primary Button</button>
<button class="btn">Secondary Button</button>
<button class="btn outline">Outline Button</button>

<!-- 크기 변형 -->
<button class="btn primary sm">Small</button>
<button class="btn primary lg">Large</button>
```

### 카드

```html
<div class="card">
    <h3>Card Title</h3>
    <p>Card description text goes here.</p>
    <button class="btn primary">Action</button>
</div>
```

### 네비게이션

```html
<nav class="navbar">
    <div class="navbar-brand">UijeongBoo</div>
    <div class="navbar-menu">
        <a href="#" class="navbar-item">Home</a>
        <a href="#" class="navbar-item">About</a>
        <a href="#" class="navbar-item">Contact</a>
    </div>
</nav>
```

## 데모 보기

모든 컴포넌트의 실제 동작을 확인하세요:

- [버튼 컴포넌트](https://coreeeeaaaa.github.io/uijeongboo/components/interactive/buttons.html)
- [카드 컴포넌트](https://coreeeeaaaa.github.io/uijeongboo/components/interactive/cards.html)
- [애니메이션](https://coreeeeaaaa.github.io/uijeongboo/components/interactive/animations.html)
- [미디어 플레이어](https://coreeeeaaaa.github.io/uijeongboo/components/interactive/players.html)
- [모달 대화상자](https://coreeeeaaaa.github.io/uijeongboo/components/interactive/modals.html)
- [사이드바](https://coreeeeaaaa.github.io/uijeongboo/components/interactive/sidebars.html)

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이센스

Apache License 2.0

## 기여

이슈와 풀 리퀘스트는 언제나 환영합니다.

---

**UijeongBoo Design Framework** - Tailwind가 싫어서 만든 프레임워크
