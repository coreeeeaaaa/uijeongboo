# UijeongBoo Design System Framework

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://coreeeeaaaa.github.io/uijeongboo/)

A comprehensive, Tailwind CSS replacement with your personal design preferences baked in.

## 🚀 Live Demo

[View Live Demo](https://coreeeeaaaa.github.io/uijeongboo/) - Interactive examples and component showcase

## 🎯 Tailwind Replacement Features

### ✅ Complete Layout System
```html
<!-- Flexbox -->
<div class="flex items-center justify-between">
<div class="flex-col gap-3">

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">

<!-- Positioning -->
<div class="relative">
  <div class="absolute top-0 right-0">
```

### ✅ Comprehensive Spacing
```html
<!-- Margins & Padding -->
<div class="p-4 mt-2 mb-3">
<div class="mx-auto pt-6">

<!-- Directional -->
<div class="pl-2 pr-4 mt-3 mb-1">
```

### ✅ Typography System
```html
<!-- Sizes -->
<h1 class="text-4xl font-bold">
<p class="text-base leading-normal">

<!-- Alignment -->
<div class="text-center tracking-wide">
```

### ✅ Interactive States
```html
<!-- Hover & Focus -->
<button class="hover:bg-lime focus:ring">
<div class="cursor-pointer select-none">
```

### ✅ Your Design Preferences Built-in
- **Colors**: Lime (#32CD32) + Coral Pink (#FF7F7F) + Dark grays
- **No emojis**: Clean text-only interface
- **Minimal shadows**: Only `0 2px 8px rgba(0,0,0,0.4)`
- **Perfect circles**: Anti-aliased rendering
- **8px spacing**: Mathematical precision

## 🚀 Usage Examples

### Button Component
```html
<button class="
  bg-lime text-black
  px-4 py-2 
  rounded-md
  hover:bg-gray-400
  transition-smooth
  cursor-pointer
">
  Click Me
</button>
```

### Layout Example
```html
<div class="flex flex-col min-h-screen">
  <header class="bg-gray-200 p-4 border-b">
    <div class="flex items-center justify-between max-w-full mx-auto">
      <h1 class="text-xl font-semibold">App Title</h1>
      <nav class="flex gap-4">
        <a href="#" class="text-lime hover:text-coral-pink">Link</a>
      </nav>
    </div>
  </header>
  
  <main class="flex-1 p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gray-300 p-4 rounded-lg">
        <h2 class="text-lg font-medium mb-2">Card Title</h2>
        <p class="text-sm opacity-75">Card content</p>
      </div>
    </div>
  </main>
</div>
```

## 📦 Installation

```html
<!-- Single CSS file - no build process needed -->
<link rel="stylesheet" href="path/to/uijeongboo.css">
```

### SDK Usage

```javascript
import { UijeongBooSDK } from './web_sdk/uijeongboo-web-sdk.js';

const sdk = new UijeongBooSDK();
const button = sdk.button('Click me', 'primary');
document.body.appendChild(button);
```

## 🎨 Available Classes

### Layout
- Display: `block`, `flex`, `grid`, `hidden`
- Flexbox: `flex-col`, `items-center`, `justify-between`
- Grid: `grid-cols-1` to `grid-cols-12`, `gap-1` to `gap-4`
- Position: `relative`, `absolute`, `fixed`, `sticky`

### Sizing
- Width: `w-full`, `w-1/2`, `w-1/3`, `w-1/4`, `w-3/4`
- Height: `h-full`, `h-screen`, `min-h-screen`

### Spacing (8px system)
- Padding: `p-0` to `p-8`, `pt-1`, `pr-2`, etc.
- Margin: `m-0` to `m-6`, `mt-1`, `mx-auto`, etc.

### Colors (Your palette)
- Background: `bg-lime`, `bg-coral-pink`, `bg-gray-100` to `bg-gray-400`
- Text: `text-lime`, `text-coral-pink`, `text-white`
- Borders: `border-lime`, `border-gray-300`

### Typography
- Size: `text-xs` to `text-5xl`
- Weight: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- Align: `text-left`, `text-center`, `text-right`

### Interactive
- Hover: `hover:bg-lime`, `hover:text-lime`
- Focus: `focus:ring`, `focus:outline-none`
- Cursor: `cursor-pointer`, `cursor-not-allowed`

## 🔥 Why Replace Tailwind?

1. **Your preferences baked-in**: No more repeating color codes
2. **No build process**: Single CSS file
3. **Lightweight**: Only what you need
4. **Consistent**: Enforces your design rules
5. **No external dependencies**: Self-contained

## 🎯 Perfect for

- Personal projects with consistent design
- Avoiding Tailwind's complexity
- Teams that need design consistency
- Projects where build process is unwanted

---

**Ready to use as complete Tailwind replacement!** 🎨