#!/usr/bin/env node
/**
 * SAAAAHA Design System Build Script
 * Creates minified distribution files
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../dist');
const srcFile = path.join(__dirname, 'saaaaha-sdk.js');

// Create dist directory
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Simple minification (remove comments and extra whitespace)
function minify(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '')          // Remove line comments
        .replace(/\s+/g, ' ')             // Compress whitespace
        .replace(/;\s*}/g, ';}')          // Clean up before closing braces
        .trim();
}

try {
    // Read source file
    const sourceCode = fs.readFileSync(srcFile, 'utf8');
    
    // Create minified JS
    const minifiedJS = minify(sourceCode);
    fs.writeFileSync(path.join(buildDir, 'saaaaha.min.js'), minifiedJS);
    
    // Create CSS-only version
    const cssOnlyContent = `
/* SAAAAHA Design System CSS v1.0.0 */
:root {
    --saaaaha-lime: #32CD32;
    --saaaaha-coral-pink: #FF7F7F;
    --saaaaha-gray-100: #111111;
    --saaaaha-gray-200: #222222;
    --saaaaha-gray-300: #333333;
    --saaaaha-gray-400: #444444;
    --saaaaha-white: #FFFFFF;
    --saaaaha-gray-text: #CCCCCC;
    --saaaaha-spacing-xs: 4px;
    --saaaaha-spacing-sm: 8px;
    --saaaaha-spacing-md: 16px;
    --saaaaha-spacing-lg: 24px;
    --saaaaha-spacing-xl: 32px;
    --saaaaha-radius-macos: 20%;
    --saaaaha-shadow-minimal: 0 2px 8px rgba(0,0,0,0.4);
    --saaaaha-transition-normal: 300ms ease;
}

.saaaaha-flat-button {
    background: var(--saaaaha-lime);
    color: var(--saaaaha-gray-100);
    border: none;
    padding: var(--saaaaha-spacing-sm) var(--saaaaha-spacing-md);
    border-radius: var(--saaaaha-radius-macos);
    cursor: pointer;
    transition: var(--saaaaha-transition-normal);
    font-weight: 500;
}

.saaaaha-flat-button:hover {
    transform: translateY(-1px);
    box-shadow: var(--saaaaha-shadow-minimal);
}

.saaaaha-secondary-button {
    background: var(--saaaaha-coral-pink);
    color: var(--saaaaha-white);
}

.saaaaha-dark-panel {
    background: var(--saaaaha-gray-200);
    color: var(--saaaaha-white);
    border: 1px solid var(--saaaaha-gray-300);
    border-radius: var(--saaaaha-radius-macos);
    padding: var(--saaaaha-spacing-md);
}

.saaaaha-section-divider {
    border: none;
    border-top: 1px solid var(--saaaaha-gray-300);
    margin: var(--saaaaha-spacing-md) 0;
}
`.trim();
    
    fs.writeFileSync(path.join(buildDir, 'saaaaha.css'), cssOnlyContent);
    fs.writeFileSync(path.join(buildDir, 'saaaaha.min.css'), cssOnlyContent.replace(/\s+/g, ' ').replace(/;\s*}/g, ';}'));
    
    // Create build info
    const buildInfo = {
        version: '1.0.0',
        buildDate: new Date().toISOString(),
        files: {
            js: 'saaaaha.min.js',
            css: 'saaaaha.min.css'
        },
        colors: {
            primary: '#32CD32',
            secondary: '#FF7F7F'
        }
    };
    
    fs.writeFileSync(path.join(buildDir, 'build-info.json'), JSON.stringify(buildInfo, null, 2));
    
    console.log('✅ SAAAAHA Design System build completed!');
    console.log('📁 Files created:');
    console.log('   - saaaaha.min.js');
    console.log('   - saaaaha.css');
    console.log('   - saaaaha.min.css');
    console.log('   - build-info.json');
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}