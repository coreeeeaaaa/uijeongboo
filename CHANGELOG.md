# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-30

### 🎉 Major Release - Complete Framework Overhaul

UijeongBoo v2.0은 Tailwind와 동등한 수준의 유틸리티 클래스 프레임워크로 완전히 재탄생했습니다.

### ✅ Fixed

#### CSS 파싱 에러 수정
- **[onclick] 셀렉터 110개 제거**: CSS 파서에서 오류를 일으키던 잘못된 속성 셀렉터 전부 제거
  - 예: `.uij-text-xl[onclick]` → `.uij-text-xl`
  - 영향받은 파일: `uijeongboo.css` 전역
- **htm → html 수정**: HTML 태그명 오타 수정
- **ol 셀렉터 수정**: `o` → `ol` 리스트 태그 오타 수정

### ✨ Added

#### 1. Width/Height Utilities (50+ classes)
- **고정 너비**: `.uij-w-0` ~ `.uij-w-96` (4px, 8px, 12px, ..., 384px)
- **비율 너비**: `.uij-w-1/2`, `.uij-w-1/3`, `.uij-w-1/4`, `.uij-w-1/12` 등 (분수 형식)
- **특수 너비**: `.uij-w-full`, `.uij-w-screen`, `.uij-w-min`, `.uij-w-max`, `.uij-w-fit`
- **Min/Max**: `.uij-min-w-*`, `.uij-max-w-{xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl}`
- **고정 높이**: `.uij-h-0` ~ `.uij-h-96`
- **비율 높이**: `.uij-h-1/2`, `.uij-h-1/3`, `.uij-h-1/4`, `.uij-h-1/6`
- **특수 높이**: `.uij-h-full`, `.uij-h-screen`, `.uij-h-auto`

#### 2. Responsive Utilities (100+ classes)
- **모바일 우선 설계**: 기본값 → sm → md → lg → xl
- **브레이크포인트**:
  - `sm`: 640px+
  - `md`: 768px+
  - `lg`: 1024px+
  - `xl`: 1280px+
- **반응형 클래스**: `.uij-sm:w-*`, `.uij-md:text-*`, `.uij-lg:p-*`, `.uij-xl:*`
- **적용 유형**: Width, Spacing, Typography, Display, Flexbox

#### 3. Transform Utilities (30+ classes)
- **Translate**: `.uij-translate-x-*`, `.uij-translate-y-*`, `.uij--translate-x-*` (음수)
- **Scale**: `.uij-scale-{0|50|75|90|95|100|105|110|125|150}`
- **Rotate**: `.uij-rotate-{0|45|90|180|270|360}`, `.uij--rotate-*` (음수)
- **Skew**: `.uij-skew-x-*`, `.uij-skew-y-*`
- **Transform Origin**: `.uij-origin-{center|top|bottom|left|right|top-left|...}`
- **Hover Transforms**: `.uij-hover:scale-105`, `.uij-hover:-translate-y-2`

#### 4. Optical Center (시각 보정)
- **자동 SVG 정렬**: `button svg`, `a svg` → `translateY(-1px)` 자동 적용
- **재생 버튼 보정**: `.uij-play-icon` → `translateX(2px)` (삼각형 중앙 정렬)
- **텍스트 정렬**: `.uij-optical-v`, `.uij-optical-h` (폰트 기준선 조정)
- **아이콘-텍스트 조합**: `.uij-icon-text` (Flexbox + gap + 자동 정렬)

#### 5. Golden Ratio Grid System
- **황금비율 그리드**: `.uij-grid-golden` (8컬럼, 13px gap)
- **변형 그리드**: `.uij-grid-golden-5` (5컬럼), `.uij-grid-golden-3` (3컬럼)
- **황금비율 Spacing**: `.uij-gap-golden-{1|2|3|4|5}` (8px, 13px, 21px, 34px, 55px)
- **CSS Variables**: `--uij-golden-1` ~ `--uij-golden-6`

#### 6. 테마 시스템 (5개 기본 제공)
- **Lime Theme** (기본): `#32CD32`
- **Red Theme**: `#FF6B6B`
- **Blue Theme**: `#4A90E2`
- **Purple Theme**: `#9B59B6`
- **Orange Theme**: `#F39C12`
- **사용법**: `<html data-theme="red">` 또는 CSS `:root` 오버라이드
- **CSS Variables**: `--uij-primary`, `--uij-primary-light`, `--uij-primary-dark`

#### 7. Display & Visibility Utilities
- **Display**: `.uij-block`, `.uij-inline`, `.uij-flex`, `.uij-grid`, `.uij-hidden`
- **Visibility**: `.uij-visible`, `.uij-invisible`
- **Overflow**: `.uij-overflow-{auto|hidden|visible|scroll}`, `.uij-overflow-x-auto`, `.uij-overflow-y-auto`

#### 8. Position Utilities (40+ classes)
- **Position**: `.uij-static`, `.uij-fixed`, `.uij-absolute`, `.uij-relative`, `.uij-sticky`
- **Inset**: `.uij-inset-0`, `.uij-inset-x-0`, `.uij-inset-y-0`
- **Individual**: `.uij-top-{0|1|2|4|8}`, `.uij-right-*`, `.uij-bottom-*`, `.uij-left-*`
- **Z-Index**: `.uij-z-{0|10|20|30|40|50|auto}`

#### 9. Figma Design Tokens Integration
- **design-tokens-v2.json** 파일 추가 (Design Tokens Community Group 표준 준수)
- **Figma 플러그인 호환**: "Tokens Studio for Figma" import 가능
- **토큰 종류**:
  - Color: primary, background, text, border
  - Spacing: xs~xxl, golden ratio
  - Typography: fontFamily, fontSize
  - Border Radius: sm~full
- **CSS Variables와 1:1 매핑**: Figma ↔ CSS 자동 동기화

### 📐 Changed

#### 빌드 시스템 개선
- **package.json v2.0.0**: 버전 업데이트 및 스크립트 개선
  - `npm run build`: 버그 수정 + NEW 유틸리티 통합
  - `npm run minify`: PostCSS + cssnano 압축
  - `npm run build:full`: 전체 빌드 (build + minify)
- **PostCSS 도입**: autoprefixer + cssnano 자동 적용
- **의존성 추가**: autoprefixer@^10.4.22, cssnano@^6.1.2

#### 파일 구조
- **uijeongboo-v2.css** (3437줄): 버그 수정 + NEW 유틸리티 통합본
- **uijeongboo-v2.min.css** (250KB): 압축 버전
- **NEW-UTILITIES.css** (568줄): 신규 유틸리티만 분리
- **uijeongboo-bugfix.css**: 버그 수정 버전 (백업용)

#### 문서 업데이트
- **README.md**: v2.0 기능 전부 반영, Tailwind 비교 추가
- **docs/index-v2.html**: 반응형 데모 페이지 (테마 스위처 포함)
- **CHANGELOG.md**: 상세 변경 로그 (본 파일)

### 📊 Statistics

- **총 클래스 수**: 500+ utilities
- **파일 크기**: 250KB (minified)
- **라인 수**: 3437 lines (v2.css)
- **브라우저 지원**: Chrome/Firefox/Safari/Edge 최신 2버전
- **CSS Parsing Errors**: 0 (110개 수정 완료)

### 🚀 Migration Guide (v1.x → v2.0)

#### Breaking Changes
없음. 기존 v1.x 클래스 전부 유지되며, 새 유틸리티만 추가됨.

#### Recommended Updates
```html
<!-- Before (v1.x) -->
<div style="width: 50%;">...</div>

<!-- After (v2.0) -->
<div class="uij-w-1/2">...</div>
```

```html
<!-- Before (v1.x) -->
<div class="responsive-text">...</div>

<!-- After (v2.0) -->
<div class="uij-text-sm uij-md:text-lg uij-lg:text-2xl">...</div>
```

#### 테마 전환 (신규)
```html
<!-- Lime (기본) -->
<html data-theme="lime">

<!-- 다른 테마로 전환 -->
<html data-theme="red">
```

또는 CSS로 직접 오버라이드:
```css
:root {
    --uij-primary: #your-color; /* 원하는 색상 */
}
```

### 📖 Documentation

- **Live Demo**: [https://coreeeeaaaa.github.io/uijeongboo/docs/index-v2.html](https://coreeeeaaaa.github.io/uijeongboo/docs/index-v2.html)
- **GitHub**: [https://github.com/coreeeeaaaa/uijeongboo](https://github.com/coreeeeaaaa/uijeongboo)
- **README**: [README.md](README.md)

---

## [1.0.0] - 2024-07-24

### Added
- 초기 릴리스
- Grayscale + Lime Color 디자인 시스템
- Transparent Button 강제
- 기본 컴포넌트 (Button, Card, Nav, Form, Animation)
- 물 차오르기 효과
- 전역 강제 시스템
- 검증 도구

### Design Philosophy
- Grayscale Only (#000 ~ #fff)
- 1 Primary Color (#32CD32 Lime)
- No Box-Shadow
- Transparent Buttons
- Minimal & Clean

---

**UijeongBoo v2.0** - Tailwind 대체 완성
