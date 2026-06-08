# UijeongBoo v2.0

> Tailwind가 역겨워서 만든 완전한 CSS 프레임워크
> **Grayscale + 1 Primary Color. No Shadows. Transparent Buttons.**

[![Version](https://img.shields.io/badge/version-2.0.0-32CD32)](https://github.com/coreeeeaaaa/uijeongboo)
[![License](https://img.shields.io/badge/license-Apache--2.0-32CD32)](LICENSE)
[![CSS Size](https://img.shields.io/badge/size-250KB-32CD32)](uijeongboo-v2.min.css)

**📚 [Live Demo v2.0](https://coreeeeaaaa.github.io/uijeongboo/docs/index-v2.html)**

## 🎯 철학

- **Grayscale Only**: 모든 색상은 회색조 (#000 ~ #fff)
- **1 Primary Color**: 단 하나의 포인트 색상만 허용 (기본: 라임 #32CD32)
- **No Box-Shadow**: 플랫 디자인 강제
- **Transparent Buttons**: 모든 버튼 배경 투명 강제
- **Minimal & Clean**: 불필요한 장식 일절 금지

## 📦 설치

### CDN (권장)

```html
<link rel="stylesheet" href="https://coreeeeaaaa.github.io/uijeongboo/uijeongboo-v2.min.css">
```

### NPM

```bash
npm install uijeongboo
```

### 직접 다운로드

```bash
curl -O https://coreeeeaaaa.github.io/uijeongboo/uijeongboo-v2.min.css
```

## 🚀 빠른 시작

```html
<!DOCTYPE html>
<html lang="ko" data-theme="lime">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="uijeongboo-v2.min.css">
</head>
<body>
    <div class="uij-p-4">
        <h1 class="uij-text-4xl uij-text-accent">Hello UijeongBoo!</h1>
        <button class="btn">Transparent Button</button>
    </div>
</body>
</html>
```

## ✨ 주요 기능 (v2.0)

### 1. Width/Height Utilities (Tailwind 동등)

```html
<div class="uij-w-full uij-h-screen">Full width, full height</div>
<div class="uij-w-1/2 uij-h-64">Half width, 256px height</div>
<div class="uij-max-w-xl uij-min-h-screen">Max 576px, min full height</div>
```

**클래스 종류:**
- 고정: `.uij-w-0` ~ `.uij-w-96` (50+ classes)
- 비율: `.uij-w-1/2`, `.uij-w-1/3`, `.uij-w-1/4`, `.uij-w-1/12` 등
- 특수: `.uij-w-full`, `.uij-w-screen`, `.uij-w-min`, `.uij-w-max`

### 2. Responsive Utilities (모바일 우선)

```html
<div class="uij-w-full uij-sm:w-1/2 uij-md:w-1/3 uij-lg:w-1/4">
    반응형 너비
</div>
<p class="uij-text-sm uij-md:text-lg uij-lg:text-2xl">
    반응형 텍스트 크기
</p>
```

**브레이크포인트:**
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

### 3. Transform Utilities

```html
<div class="uij-scale-105">1.05배 확대</div>
<div class="uij-rotate-45">45도 회전</div>
<div class="uij-translate-x-4">4px 이동</div>
<button class="uij-hover:scale-110">호버 시 확대</button>
```

### 4. Optical Center (시각 보정)

```html
<button class="btn">
    <svg class="uij-play-icon">...</svg>
    Play
</button>
<!-- SVG 자동으로 translateX(2px) 적용 -->
```

### 5. Golden Ratio Grid

```html
<div class="uij-grid-golden-3">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
<!-- 황금비율(13px gap) 3컬럼 그리드 -->
```

### 6. 테마 전환 (5개 기본 제공)

```html
<html data-theme="lime">  <!-- 기본: 라임 -->
<html data-theme="red">   <!-- 빨강 -->
<html data-theme="blue">  <!-- 파랑 -->
<html data-theme="purple"><!-- 보라 -->
<html data-theme="orange"><!-- 주황 -->
```

또는 CSS로 직접 오버라이드:

```css
:root {
    --uij-primary: #FF6B6B; /* 원하는 색상 */
}
```

## 📐 유틸리티 클래스 전체 목록

### Spacing
```
.uij-p-{0-8}, .uij-m-{0-8}
.uij-px-{0-8}, .uij-py-{0-8}
.uij-pt-{0-8}, .uij-pr-{0-8}, .uij-pb-{0-8}, .uij-pl-{0-8}
```

### Typography
```
.uij-text-{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl}
.uij-font-{thin|light|normal|medium|semibold|bold|extrabold|black}
.uij-text-{left|center|right|justify}
.uij-truncate
```

### Colors (Grayscale + Primary만)
```
.uij-bg-{primary|secondary|tertiary}
.uij-text-{primary|secondary|muted|accent}
.uij-border-{primary|accent}
```

### Display
```
.uij-{block|inline-block|flex|grid|hidden}
.uij-{visible|invisible}
```

### Position
```
.uij-{static|fixed|absolute|relative|sticky}
.uij-top-{0|1|2|4|8}
.uij-z-{0|10|20|30|40|50}
```

### Flexbox
```
.uij-flex-{row|col}
.uij-justify-{start|center|end|between|around}
.uij-items-{start|center|end|stretch}
```

## 🎨 Figma 통합

### 1. Figma Tokens 플러그인 설치

Figma에서 **"Tokens Studio for Figma"** 또는 **"Design Tokens"** 플러그인 설치

### 2. JSON 파일 Import

```bash
# design-tokens-v2.json 다운로드
curl -O https://coreeeeaaaa.github.io/uijeongboo/design-tokens-v2.json
```

Figma 플러그인에서 `design-tokens-v2.json` import → 자동으로 Color/Spacing/Typography 스타일 생성

### 3. CSS Variables와 1:1 매핑

Figma의 `--uij-primary` → CSS의 `var(--uij-primary)` 자동 동기화

## 🛠️ 개발 환경 설정

### 빌드

```bash
git clone https://github.com/coreeeeaaaa/uijeongboo.git
cd uijeongboo
npm install

# 버그 수정 + NEW 유틸리티 통합
npm run build

# Minify
npm run minify

# 전체 빌드 (build + minify)
npm run build:full
```

### 로컬 서버

```bash
npm run serve
# http://localhost:8080/docs/index-v2.html
```

### 파일 감시

```bash
npm run watch
# css/**/*.css 변경 시 자동 빌드
```

## 📊 v2.0 주요 변경사항

### ✅ 버그 수정
- **[onclick] 셀렉터 110개 제거** (CSS 파싱 에러 원인)
- **htm → html 오타 수정**
- **ol 셀렉터 수정**

### ✨ 신규 기능
- **Width/Height Utilities** (50+ classes, Tailwind 동등)
- **Responsive Utilities** (100+ classes, sm/md/lg/xl)
- **Transform Utilities** (30+ classes, scale/rotate/translate)
- **Optical Center** (SVG/텍스트 자동 시각 보정)
- **Golden Ratio Grid** (황금비율 기반 그리드 시스템)
- **5개 테마** (Lime/Red/Blue/Purple/Orange)
- **Figma Tokens** (design-tokens-v2.json)

### 📈 통계
- **파일 크기**: 250KB (minified)
- **총 클래스**: 500+ utilities
- **브라우저 지원**: Chrome/Firefox/Safari/Edge 최신 2버전

## 📖 문서

- **Live Demo**: [https://coreeeeaaaa.github.io/uijeongboo/docs/index-v2.html](https://coreeeeaaaa.github.io/uijeongboo/docs/index-v2.html)
- **GitHub**: [https://github.com/coreeeeaaaa/uijeongboo](https://github.com/coreeeeaaaa/uijeongboo)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

## 🎯 사용 예시

### 기본 레이아웃

```html
<div class="uij-max-w-5xl uij-mx-auto uij-p-4">
    <header class="uij-flex uij-justify-between uij-items-center uij-mb-6">
        <h1 class="uij-text-3xl uij-text-accent">Logo</h1>
        <nav class="uij-flex uij-gap-golden-2">
            <a href="#" class="btn">Home</a>
            <a href="#" class="btn">About</a>
        </nav>
    </header>

    <main class="uij-grid-golden-3 uij-gap-golden-3">
        <div class="uij-bg-secondary uij-p-4 uij-rounded">Card 1</div>
        <div class="uij-bg-secondary uij-p-4 uij-rounded">Card 2</div>
        <div class="uij-bg-secondary uij-p-4 uij-rounded">Card 3</div>
    </main>
</div>
```

### 반응형 카드 그리드

```html
<div class="uij-grid uij-w-full uij-sm:w-1/2 uij-md:w-1/3 uij-lg:w-1/4 uij-gap-4">
    <div class="uij-bg-secondary uij-p-4 uij-hover:scale-105">
        <h3 class="uij-text-accent">Card Title</h3>
        <p class="uij-text-muted">Description</p>
    </div>
</div>
```

## 🚫 금지 사항

### ❌ 절대 금지
```css
/* ❌ 색상 (Grayscale + Lime 외) */
color: #FF0000;
background: blue;

/* ❌ Box Shadow */
box-shadow: 0 4px 6px rgba(0,0,0,0.1);

/* ❌ 버튼 배경 (transparent 외) */
button { background: #333; }
```

### ✅ 허용
```css
/* ✅ Grayscale */
color: #222222;
background: #eeeeee;

/* ✅ Primary Color */
color: var(--uij-primary);
border-color: #32CD32;

/* ✅ Transparent */
button { background: transparent; }
```

## 🤝 기여

Pull Request 환영합니다! 단, 다음 규칙을 준수해주세요:

1. **Grayscale + 1 Primary Color** 철학 유지
2. **No Box-Shadow** 절대 추가 금지
3. **Transparent Buttons** 강제 유지
4. 새 유틸리티 추가 시 Tailwind 네이밍 컨벤션 따르기

## 📄 라이선스

**Apache License 2.0** - 사용 시 반드시 출처 표기 필요

### 필수 표기사항

이 프레임워크를 사용할 경우 **반드시** 다음을 표기해야 합니다:

```
Powered by UijeongBoo CSS Framework
Copyright 2024-2025 coreeeeaaaa
Licensed under Apache License 2.0
```

### 표기 위치
- **웹앱**: Footer, 크레딧 페이지, 또는 console.log
- **문서**: Acknowledgments 또는 Dependencies 섹션
- **파생 작품**: NOTICE 파일 및 LICENSE 파일 포함 필수

### 면책 조항

⚠️ **이 소프트웨어는 "있는 그대로" 제공되며, 어떠한 보증도 제공하지 않습니다.**

- ❌ 보안 취약점에 대한 책임 없음
- ❌ 성능 문제에 대한 책임 없음
- ❌ 특정 목적 적합성 보증 없음
- ❌ 법적 책임 일체 없음

**사용자 책임:**
- ✅ 프로덕션 배포 전 보안 감사 필수
- ✅ 자체 환경에서 테스트 필수
- ✅ 관련 법규 준수 책임
- ✅ 사용으로 인한 모든 손해 책임

상세 내용은 [LICENSE](LICENSE) 및 [NOTICE](NOTICE) 파일을 참조하세요.

---

**Made with 🟢 (not ❤️) by coreeeeaaaa**
*Tailwind가 싫어서 만든 프레임워크*

Copyright 2024-2025 coreeeeaaaa. All rights reserved.
