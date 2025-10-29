# UijeongBoo

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://coreeeeaaaa.github.io/uijeongboo/)

A modular design system with CSS utilities and JavaScript SDK.

## 📦 Installation

```html
<link rel="stylesheet" href="uijeongboo.css">
<script type="module" src="web_sdk/uijeongboo-web-sdk.js"></script>
```

## 🎨 CSS Classes

### Layout
- `flex`, `grid`, `block`, `hidden`
- `flex-col`, `items-center`, `justify-between`
- `grid-cols-1` to `grid-cols-12`
- `relative`, `absolute`, `fixed`

### Spacing
- `p-0` to `p-8`, `m-0` to `m-6`
- `px-1`, `py-2`, `mx-auto`, `my-3`
- `mt-1`, `mr-2`, `mb-3`, `ml-4`

### Colors
- `bg-lime`, `bg-gray-100` to `bg-gray-400`
- `text-lime`, `text-white`, `text-black`
- `border-lime`, `border-gray-300`

### Typography
- `text-xs` to `text-5xl`
- `font-normal`, `font-bold`
- `text-center`, `text-left`, `text-right`

## 🔧 SDK

```javascript
import { UijeongBooSDK } from './web_sdk/uijeongboo-web-sdk.js';

const sdk = new UijeongBooSDK();
const button = sdk.button('Click', 'primary');
const card = sdk.card('Title', 'Content');
```

## 📁 Components

- Buttons, Cards, Modals, Tabs
- Accordions, Tooltips, Forms
- Navigation, Layout components

## 🚀 Live Demo

[View Demo](https://coreeeeaaaa.github.io/uijeongboo/)