# UijeongBoo 컴포넌트 통합 가이드

## 🔧 컴포넌트 사용법

### 기본 설정
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your App</title>
    
    <!-- UijeongBoo Framework -->
    <link rel="stylesheet" href="uijeongboo.min.css">
    <script src="uijeongboo.js"></script>
</head>
```

## 📦 사용 가능한 컴포넌트

### 1. 기본 UI 컴포넌트
- ✅ **Buttons**: `btn`, `btn-primary`, `btn-ghost`, `btn-sm`, `btn-lg`
- ✅ **Cards**: `card`, `card-hover`
- ✅ **Forms**: `input`, 폼 검증
- ✅ **Typography**: 텍스트 크기, 색상, 정렬

### 2. 레이아웃 컴포넌트
- ✅ **Container**: `container`, `container-sm`, `container-lg`
- ✅ **Flexbox**: `flex`, `items-center`, `justify-between`
- ✅ **Grid**: `grid`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- ✅ **Spacing**: `p-xs`, `p-sm`, `p-md`, `m-auto` 등

### 3. 인터랙티브 컴포넌트
- ✅ **Water Text**: `water-text` (호버 효과)
- ✅ **Smooth Scroll**: 자동 스크롤 링크
- ✅ **Mobile Menu**: 반응형 메뉴
- ✅ **Form Validation**: 자동 검증

### 4. 유틸리티 클래스
- ✅ **Colors**: `bg-primary`, `text-accent`, `border-accent`
- ✅ **Transitions**: `transition-fast`, `transition`, `transition-slow`
- ✅ **Responsive**: `sm:flex`, `md:grid-cols-3`, `lg:text-2xl`

## 🎯 사용 예시

### 기본 레이아웃
```html
<div class="container">
    <header class="flex justify-between items-center py-md">
        <h1 class="text-2xl font-bold">제목</h1>
        <nav class="flex gap-sm">
            <button class="btn">메뉴1</button>
            <button class="btn btn-primary">메뉴2</button>
        </nav>
    </header>
    
    <main class="grid grid-cols-3 gap-md">
        <div class="card">카드 1</div>
        <div class="card">카드 2</div>
        <div class="card">카드 3</div>
    </main>
</div>
```

### 인터랙티브 요소
```html
<h1 class="water-text text-3xl">호버해보세요</h1>
<button class="btn card-hover">호버 카드 효과</button>
<input type="text" class="input" placeholder="자동 검증">
```

## ⚡ JavaScript API

```javascript
// DOM Ready
UIJ.ready(() => {
    console.log('프레임워크 로드됨');
});

// 클래스 조작
UIJ.addClass(element, 'active');
UIJ.toggleClass(element, 'hidden');

// 유틸리티
const debounced = UIJ.utils.debounce(fn, 300);
UIJ.utils.copyToClipboard('텍스트');
```

## 🚀 완전 준비된 기능들

✅ **즉시 사용 가능**: CSS 링크만 추가하면 바로 작동  
✅ **테일윈드 호환**: 기존 테일윈드 문법 95% 동일  
✅ **반응형 완비**: 모바일/태블릿/데스크톱 지원  
✅ **다크테마 기본**: 개발자 도구에 최적화  
✅ **성능 최적화**: 15KB 경량화, GPU 가속  
✅ **MCP 최적화**: 로컬 환경 완벽 지원