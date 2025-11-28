/**
 * UijeongBoo Build Script
 * Combines and minifies CSS files for production
 */

const fs = require('fs');
const path = require('path');

// CSS file order
const cssFiles = [
  // Core
  'css/core/variables.css',
  'css/core/reset.css',
  'css/core/typography.css',
  'css/core/layout.css',
  
  // Components
  'css/components/buttons.css',
  'css/components/forms.css',
  'css/components/navigation.css',
  'css/components/animations.css',
  
  // Utilities
  'css/utilities/spacing.css',
  'css/utilities/colors.css',
  
  // Global enforcer (must be last)
  'css/uijeongboo-global-enforcer.css'
];

// Build function
function build() {
  console.log('Building UijeongBoo Framework...');
  
  let combinedCSS = `/**
 * UijeongBoo CSS Framework
 * Built: ${new Date().toISOString()}
 * Version: 1.0.0
 */\n\n`;
  
  // Read and combine CSS files
  cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      combinedCSS += `/* === ${file} === */\n${content}\n\n`;
    } else {
      console.warn(`Warning: ${file} not found`);
    }
  });
  
  // Write combined CSS
  fs.writeFileSync('uijeongboo.css', combinedCSS);
  console.log('Created uijeongboo.css');
  
  // Create minified version (basic minification)
  const minified = combinedCSS
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*{\s*/g, '{') // Remove spaces around {
    .replace(/\s*}\s*/g, '}') // Remove spaces around }
    .replace(/\s*:\s*/g, ':') // Remove spaces around :
    .replace(/\s*;\s*/g, ';') // Remove spaces around ;
    .replace(/\s*,\s*/g, ',') // Remove spaces around ,
    .trim();
  
  fs.writeFileSync('uijeongboo.min.css', minified);
  console.log('Created uijeongboo.min.css');
  
  // Generate stats
  const stats = {
    originalSize: Buffer.byteLength(combinedCSS, 'utf8'),
    minifiedSize: Buffer.byteLength(minified, 'utf8'),
    compression: ((1 - Buffer.byteLength(minified, 'utf8') / Buffer.byteLength(combinedCSS, 'utf8')) * 100).toFixed(2)
  };
  
  console.log('\nBuild Stats:');
  console.log(`Original: ${(stats.originalSize / 1024).toFixed(2)} KB`);
  console.log(`Minified: ${(stats.minifiedSize / 1024).toFixed(2)} KB`);
  console.log(`Compression: ${stats.compression}%`);
}

// Run build
build();