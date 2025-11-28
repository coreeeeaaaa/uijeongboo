# UijeongBoo Component Usage Guide for AI Agents

## 🎯 Overview
This guide explains how AI agents should use UijeongBoo components to ensure consistency and proper implementation.

## 📁 Component Structure

```
components/interactive/
├── index.html              # Complete components showcase
├── hamburger-menus.html     # 10 hamburger menu animations
├── buttons.html             # 20+ button components & animations
├── sidebars.html           # Navigation, accordions, tabs, dropdowns
├── modals.html             # Modals, tooltips, overlays
├── players.html            # Video/audio players, visualizers
├── animations.html         # CSS animations, loading spinners
└── cards.html              # Card layouts, galleries, carousels
```

## 🚨 CRITICAL RULES FOR AI AGENTS

### 1. NEVER CREATE CUSTOM COMPONENTS
- **ALWAYS use existing UijeongBoo components**
- **NEVER build custom UI elements from scratch**
- **NEVER use external libraries** (Bootstrap, Material-UI, Tailwind, etc.)

### 2. Component Selection Process

#### Step 1: Check Component Library First
```bash
# Always check these files first:
1. components/interactive/index.html    # Browse all available components
2. Find the closest matching component
3. Use the exact HTML/CSS from the component file
```

#### Step 2: Copy Exact Code
```html
<!-- CORRECT: Copy exact code from component files -->
<input type="checkbox" id="hamburger-1" class="hamburger-checkbox">
<label for="hamburger-1" class="hamburger-menu classic-x">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
</label>

<!-- WRONG: Creating custom components -->
<div class="custom-menu-button">...</div>
```

#### Step 3: Adapt Only Colors/Sizing
```css
/* ALLOWED: Minor adaptations */
.hamburger-menu {
    width: 60px;  /* Change size */
    height: 60px; /* Change size */
}

/* FORBIDDEN: Changing structure or adding shadows */
.hamburger-menu {
    box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* NEVER ADD SHADOWS */
    background: linear-gradient(...);        /* NEVER ADD GRADIENTS */
}
```

## 🔧 Implementation Methods

### Method 1: Direct Integration (Recommended)
```html
<!-- Copy component HTML directly into your page -->
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/core/variables.css">
    <link rel="stylesheet" href="css/core/reset.css">
    <link rel="stylesheet" href="css/core/typography.css">
    <style>
        /* Copy component CSS here */
        .hamburger-checkbox { display: none; }
        .hamburger-menu { /* component styles */ }
    </style>
</head>
<body>
    <!-- Copy component HTML here -->
    <input type="checkbox" id="hamburger-1" class="hamburger-checkbox">
    <label for="hamburger-1" class="hamburger-menu classic-x">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    </label>
</body>
</html>
```

### Method 2: iframe Embedding
```html
<!-- Embed complete component in iframe -->
<iframe src="components/interactive/hamburger-menus.html" 
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>
```

### Method 3: Reference and Adaptation
```html
<!-- Reference main_page.html for integration examples -->
<a href="#" class="nav-item" onclick="showComponent('components/interactive/buttons.html')">
    View Buttons
</a>
```

## 🎨 UijeongBoo Design System Rules

### Mandatory Color Palette
```css
/* ONLY use these colors */
--uij-bg-primary: #222222;     /* Main background */
--uij-bg-secondary: #333333;   /* Card backgrounds */
--uij-bg-tertiary: #444444;    /* Input backgrounds */
--uij-border: #555555;         /* Border color */
--uij-text-primary: #eeeeee;   /* Main text */
--uij-text-secondary: #cccccc; /* Secondary text */
--uij-primary: #32CD32;        /* ONLY accent color allowed */
```

### Forbidden Elements
```css
/* NEVER use these */
❌ box-shadow: any;
❌ background: white, #ffffff, #f5f5f5;
❌ color: blue, red, green, yellow (except #32CD32);
❌ border-radius with shadows;
❌ gradients (linear-gradient, radial-gradient);
```

### Required Button Style
```css
/* ALL buttons must use this pattern */
.uij-button {
    background: transparent !important;
    color: #eeeeee;
    border: 2px solid #555555;
    border-radius: 8px;
    padding: 12px 24px;
    transition: all 0.3s ease;
}

.uij-button:hover {
    border-color: #32CD32;
    color: #32CD32;
}

.uij-button.primary {
    background: #32CD32 !important;
    color: #000000;
    border-color: #32CD32;
}
```

## 📋 Quick Reference for Common Components

### Navigation/Sidebar
```html
<!-- Use components/interactive/sidebars.html -->
<div class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-title">Title</div>
    </div>
    <div class="sidebar-content">
        <!-- Navigation items -->
    </div>
</div>
```

### Buttons & Icons
```html
<!-- Use components/interactive/buttons.html -->
<!-- Gear button example -->
<input type="checkbox" id="gear-btn-1" class="sidebar-button-checkbox">
<label for="gear-btn-1" class="sidebar-button gear-rotate">
    <div class="gear-icon">
        <div class="gear-teeth"></div>
        <div class="gear-center"></div>
    </div>
</label>
```

### Modals & Popups
```html
<!-- Use components/interactive/modals.html -->
<input type="checkbox" id="modal-1" class="css-modal-checkbox">
<label for="modal-1" class="css-modal-btn">Open Modal</label>
<div class="css-modal-overlay">
    <div class="css-modal">
        <!-- Modal content -->
    </div>
</div>
```

### Media Players
```html
<!-- Use components/interactive/players.html -->
<div class="video-player">
    <input type="checkbox" id="video-play" class="video-checkbox">
    <label for="video-play" class="video-controls">
        <!-- Player controls -->
    </label>
</div>
```

## 🚀 Integration with main_page.html

The `main_page.html` now includes direct links to all components:

1. **Open main_page.html** in browser
2. **Click sidebar** → "Components Library"
3. **Select any component** to view in iframe
4. **Copy code** from component files for your projects

## ⚠️ Validation Commands

Before deploying, run these validation scripts:

```bash
# Check for design rule violations
./enforce-uijeongboo-design.sh

# Check for component usage compliance  
./enforce-component-usage.sh

# Validate UijeongBoo compliance
./validate-uijeongboo.sh
```

## 🎯 Success Criteria for AI Agents

✅ **Compliant Implementation:**
- Uses only components from `components/interactive/`
- Follows exact HTML/CSS structure from component files
- Uses only UijeongBoo color palette
- No custom UI elements created
- No external libraries imported

❌ **Non-Compliant Implementation:**
- Creates custom buttons, modals, sidebars
- Uses forbidden colors or effects
- Imports Bootstrap, Material-UI, etc.
- Adds shadows, gradients, or bright colors
- Ignores component library structure

## 🔗 Quick Links

- **Main Integration:** `/main_page.html`
- **Component Showcase:** `/components/interactive/index.html`
- **Design Rules:** `/UIJEONGBOO_DESIGN_RULES.md`
- **Validation Scripts:** `/enforce-*.sh`

Remember: **The goal is consistency, not creativity. Use existing components, don't create new ones.**