# UijeongBoo CSS Framework

A lightweight, performance-optimized CSS framework designed for MCP local services. Alternative to Tailwind CSS with zero dependencies and minimal footprint.

## Features

- **Ultra-lightweight**: < 15KB minified
- **Zero dependencies**: Pure CSS + optional vanilla JS
- **Tailwind-like utility classes**: Familiar syntax, better performance
- **Dark theme by default**: Optimized for developer tools
- **Strict design system**: Enforced consistency
- **MCP optimized**: Built for local services

## Quick Start

### CDN
```html
<link rel="stylesheet" href="https://unpkg.com/uijeongboo@latest/uijeongboo.min.css">
<script src="https://unpkg.com/uijeongboo@latest/uijeongboo.js"></script>
```

### NPM
```bash
npm install uijeongboo
```

### Local
```html
<link rel="stylesheet" href="uijeongboo.min.css">
<script src="uijeongboo.js"></script>
```

## Usage

### Layout
```html
<div class="container">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Title</h1>
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Grid System
```html
<div class="grid grid-cols-3 gap-md">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Components

#### Buttons
```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
```

#### Cards
```html
<div class="card">
  <h3 class="text-xl mb-sm">Card Title</h3>
  <p class="text-muted">Card content goes here</p>
</div>
```

#### Forms
```html
<input type="text" class="input" placeholder="Enter text">
<input type="email" class="input" placeholder="Email">
```

### Utility Classes

#### Spacing
- Padding: `p-xs`, `p-sm`, `p-md`, `p-lg`
- Margin: `m-xs`, `m-sm`, `m-md`, `m-lg`
- Directional: `px-md`, `py-md`, `mt-sm`, `mb-lg`

#### Typography
- Size: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- Weight: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- Alignment: `text-left`, `text-center`, `text-right`
- Transform: `uppercase`, `lowercase`, `capitalize`

#### Colors
- Background: `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-accent`
- Text: `text-primary`, `text-secondary`, `text-muted`, `text-accent`

#### Flexbox
- Display: `flex`, `flex-row`, `flex-col`
- Alignment: `items-start`, `items-center`, `items-end`
- Justify: `justify-start`, `justify-center`, `justify-end`, `justify-between`
- Flex: `flex-1`, `flex-wrap`

#### Effects
- Water text: `water-text` (hover effect)
- Transitions: `transition-fast`, `transition`, `transition-slow`

## Design System

### Colors
- Primary: `#32CD32` (Lime Green)
- Backgrounds: `#222222`, `#333333`, `#444444`
- Text: `#eeeeee`, `#cccccc`, `#999999`

### Rules
1. No shadows allowed
2. Transparent button backgrounds (except primary)
3. Dark theme only
4. Minimal borders
5. Text overflow with ellipsis

## JavaScript API

```javascript
// DOM Ready
UIJ.ready(() => {
  console.log('Ready!');
});

// Query selectors
const element = UIJ.$('.my-element');
const elements = UIJ.$$('.my-elements');

// Events
UIJ.on(document, 'click', '.btn', (e) => {
  console.log('Button clicked');
});

// Classes
UIJ.addClass(element, 'active');
UIJ.removeClass(element, 'active');
UIJ.toggleClass(element, 'active');

// Utilities
const debounced = UIJ.utils.debounce(fn, 300);
const throttled = UIJ.utils.throttle(fn, 300);
UIJ.utils.copyToClipboard('text');
```

## Building

```bash
# Install dependencies
npm install

# Build CSS
npm run build

# Watch for changes
npm run watch

# Run validation
npm run validate

# Start dev server
npm run serve
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers

## License

MIT License - Use freely in personal and commercial projects.

## Contributing

1. Follow the design rules in `UIJEONGBOO_DESIGN_RULES.md`
2. Run validation before submitting
3. Keep it lightweight and dependency-free