/**
 * UijeongBoo Design Enforcer CLI Tool
 * Version: 1.0
 * License: MIT
 * 
 * Command-line tool for enforcing UijeongBoo design rules
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class UijeongBooEnforcerCLI {
    constructor() {
        this.violations = [];
        this.config = {
            allowedColors: [
                '#32CD32', '#32cd32', 'limegreen',
                '#222222', '#333333', '#444444', '#555555', '#666666',
                '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb',
                '#cccccc', '#dddddd', '#eeeeee', '#ffffff',
                '#000000', '#111111',
                'transparent', 'inherit', 'currentColor', 'none'
            ],
            forbiddenColors: [
                'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange',
                'cyan', 'magenta', 'brown', 'violet', 'indigo', 'teal',
                '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'
            ],
            forbiddenProperties: [
                'box-shadow', 'text-shadow'
            ],
            fileExtensions: ['.css', '.scss', '.sass', '.less', '.html', '.js', '.jsx', '.ts', '.tsx']
        };
    }
    
    // Main CLI entry point
    run(args) {
        const command = args[0];
        
        switch (command) {
            case 'audit':
                this.audit(args[1] || '.');
                break;
            case 'fix':
                this.fix(args[1] || '.');
                break;
            case 'watch':
                this.watch(args[1] || '.');
                break;
            case 'check-colors':
                this.checkColors(args[1] || '.');
                break;
            case 'enforce-buttons':
                this.enforceButtons(args[1] || '.');
                break;
            case 'help':
            default:
                this.showHelp();
        }
    }
    
    // Show help
    showHelp() {
        console.log(`
🎨 UijeongBoo Design Enforcer CLI

Usage: node enforcer-cli.js <command> [path]

Commands:
  audit           - Scan files for design rule violations
  fix             - Automatically fix violations where possible
  watch           - Watch files for violations in real-time
  check-colors    - Check for forbidden colors only
  enforce-buttons - Enforce transparent button backgrounds
  help            - Show this help message

Examples:
  node enforcer-cli.js audit ./src
  node enforcer-cli.js fix ./components
  node enforcer-cli.js watch .
        `);
    }
    
    // Audit files for violations
    audit(targetPath) {
        console.log('🔍 Auditing UijeongBoo design rules...');
        
        this.violations = [];
        this.scanDirectory(targetPath);
        
        this.reportViolations();
        
        if (this.violations.length === 0) {
            console.log('✅ No design rule violations found!');
            process.exit(0);
        } else {
            console.log(`❌ Found ${this.violations.length} violations`);
            process.exit(1);
        }
    }
    
    // Fix violations automatically
    fix(targetPath) {
        console.log('🔧 Fixing UijeongBoo design rule violations...');
        
        this.violations = [];
        this.scanDirectory(targetPath);
        
        if (this.violations.length === 0) {
            console.log('✅ No violations to fix!');
            return;
        }
        
        let fixedCount = 0;
        
        this.violations.forEach(violation => {
            if (this.fixViolation(violation)) {
                fixedCount++;
            }
        });
        
        console.log(`✅ Fixed ${fixedCount}/${this.violations.length} violations`);
    }
    
    // Watch files for violations
    watch(targetPath) {
        console.log('👀 Watching for UijeongBoo design rule violations...');
        
        const chokidar = require('chokidar');
        
        const watcher = chokidar.watch(targetPath, {
            ignored: /node_modules/,
            persistent: true
        });
        
        watcher.on('change', (filePath) => {
            console.log(`📝 File changed: ${filePath}`);
            this.auditFile(filePath);
        });
        
        console.log('Watching for changes... Press Ctrl+C to stop.');
    }
    
    // Check colors only
    checkColors(targetPath) {
        console.log('🎨 Checking color usage...');
        
        this.violations = [];
        this.scanDirectory(targetPath, ['color']);
        
        this.reportViolations();
    }
    
    // Enforce button transparency
    enforceButtons(targetPath) {
        console.log('🔘 Enforcing transparent button backgrounds...');
        
        this.violations = [];
        this.scanDirectory(targetPath, ['button']);
        
        this.reportViolations();
        
        // Auto-fix button violations
        let fixedCount = 0;
        this.violations.forEach(violation => {
            if (violation.type === 'button-background' && this.fixViolation(violation)) {
                fixedCount++;
            }
        });
        
        if (fixedCount > 0) {
            console.log(`✅ Fixed ${fixedCount} button background violations`);
        }
    }
    
    // Scan directory for files
    scanDirectory(dirPath, checkTypes = ['color', 'property', 'button']) {
        if (!fs.existsSync(dirPath)) {
            console.error(`❌ Path does not exist: ${dirPath}`);
            return;
        }
        
        const stats = fs.statSync(dirPath);
        
        if (stats.isFile()) {
            this.auditFile(dirPath, checkTypes);
        } else if (stats.isDirectory()) {
            const files = fs.readdirSync(dirPath);
            
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                const fileStats = fs.statSync(filePath);
                
                if (fileStats.isDirectory() && file !== 'node_modules') {
                    this.scanDirectory(filePath, checkTypes);
                } else if (fileStats.isFile()) {
                    this.auditFile(filePath, checkTypes);
                }
            });
        }
    }
    
    // Audit single file
    auditFile(filePath, checkTypes = ['color', 'property', 'button']) {
        const ext = path.extname(filePath).toLowerCase();
        
        if (!this.config.fileExtensions.includes(ext)) {
            return;
        }
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            if (checkTypes.includes('color')) {
                this.checkFileColors(filePath, content);
            }
            
            if (checkTypes.includes('property')) {
                this.checkFileForbiddenProperties(filePath, content);
            }
            
            if (checkTypes.includes('button')) {
                this.checkFileButtonBackgrounds(filePath, content);
            }
            
        } catch (error) {
            console.error(`❌ Error reading file ${filePath}:`, error.message);
        }
    }
    
    // Check file for forbidden colors
    checkFileColors(filePath, content) {
        const lines = content.split('\n');
        
        lines.forEach((line, lineNumber) => {
            // Check for hex colors
            const hexMatches = line.match(/#[0-9a-fA-F]{3,8}/g);
            if (hexMatches) {
                hexMatches.forEach(match => {
                    if (!this.isColorAllowed(match)) {
                        this.addViolation({
                            type: 'forbidden-color',
                            file: filePath,
                            line: lineNumber + 1,
                            value: match,
                            context: line.trim(),
                            message: `Forbidden color: ${match}`
                        });
                    }
                });
            }
            
            // Check for named colors
            this.config.forbiddenColors.forEach(color => {
                const regex = new RegExp(`\\b${color}\\b`, 'gi');
                if (regex.test(line)) {
                    this.addViolation({
                        type: 'forbidden-color',
                        file: filePath,
                        line: lineNumber + 1,
                        value: color,
                        context: line.trim(),
                        message: `Forbidden color: ${color}`
                    });
                }
            });
        });
    }
    
    // Check file for forbidden properties
    checkFileForbiddenProperties(filePath, content) {
        const lines = content.split('\n');
        
        lines.forEach((line, lineNumber) => {
            this.config.forbiddenProperties.forEach(prop => {
                const regex = new RegExp(`${prop}\\s*:`, 'i');
                if (regex.test(line) && !line.includes('none') && !line.includes('0')) {
                    this.addViolation({
                        type: 'forbidden-property',
                        file: filePath,
                        line: lineNumber + 1,
                        property: prop,
                        context: line.trim(),
                        message: `Forbidden property: ${prop}`
                    });
                }
            });
        });
    }
    
    // Check file for button background violations
    checkFileButtonBackgrounds(filePath, content) {
        const lines = content.split('\n');
        
        lines.forEach((line, lineNumber) => {
            // Check for button background declarations
            if (line.includes('button') || line.includes('.btn') || line.includes('.uij-btn')) {
                const nextLines = lines.slice(lineNumber, lineNumber + 10);
                
                nextLines.forEach((nextLine, offset) => {
                    if (nextLine.includes('background:') && 
                        !nextLine.includes('transparent') && 
                        !nextLine.includes('!important') &&
                        !nextLine.includes('#32CD32')) { // Allow lime for primary buttons
                        
                        this.addViolation({
                            type: 'button-background',
                            file: filePath,
                            line: lineNumber + offset + 1,
                            context: nextLine.trim(),
                            message: 'Button must have transparent background'
                        });
                    }
                });
            }
        });
    }
    
    // Check if color is allowed
    isColorAllowed(color) {
        const normalized = color.toLowerCase();
        
        // Check exact matches
        if (this.config.allowedColors.includes(normalized)) {
            return true;
        }
        
        // Check if it's grayscale
        if (this.isGrayscaleColor(normalized)) {
            return true;
        }
        
        return false;
    }
    
    // Check if color is grayscale
    isGrayscaleColor(color) {
        // Remove # if present
        const hex = color.replace('#', '');
        
        if (hex.length === 3) {
            // Short form like #fff
            const r = hex[0];
            return r === hex[1] && r === hex[2];
        } else if (hex.length === 6) {
            // Long form like #ffffff
            const r = hex.substr(0, 2);
            const g = hex.substr(2, 2);
            const b = hex.substr(4, 2);
            return r === g && g === b;
        }
        
        return false;
    }
    
    // Add violation
    addViolation(violation) {
        this.violations.push({
            ...violation,
            timestamp: Date.now()
        });
    }
    
    // Report violations
    reportViolations() {
        if (this.violations.length === 0) {
            return;
        }
        
        console.log('\n🚨 Design Rule Violations:');
        console.log('═'.repeat(60));
        
        this.violations.forEach((violation, index) => {
            console.log(`\n${index + 1}. ${violation.message}`);
            console.log(`   File: ${violation.file}:${violation.line}`);
            console.log(`   Type: ${violation.type}`);
            if (violation.value) {
                console.log(`   Value: ${violation.value}`);
            }
            if (violation.context) {
                console.log(`   Context: ${violation.context}`);
            }
        });
        
        console.log('\n═'.repeat(60));
        console.log(`Total violations: ${this.violations.length}`);
    }
    
    // Fix violation
    fixViolation(violation) {
        try {
            const content = fs.readFileSync(violation.file, 'utf8');
            const lines = content.split('\n');
            
            switch (violation.type) {
                case 'forbidden-color':
                    return this.fixColorViolation(violation, lines);
                case 'button-background':
                    return this.fixButtonViolation(violation, lines);
                case 'forbidden-property':
                    return this.fixPropertyViolation(violation, lines);
                default:
                    return false;
            }
        } catch (error) {
            console.error(`❌ Error fixing violation in ${violation.file}:`, error.message);
            return false;
        }
    }
    
    // Fix color violation
    fixColorViolation(violation, lines) {
        const lineIndex = violation.line - 1;
        const line = lines[lineIndex];
        
        let newLine = line;
        
        // Replace forbidden colors with grayscale equivalents
        if (violation.value.match(/#[0-9a-fA-F]{6}/)) {
            newLine = newLine.replace(violation.value, '#888888'); // Default gray
        } else {
            newLine = newLine.replace(violation.value, '#888888');
        }
        
        if (newLine !== line) {
            lines[lineIndex] = newLine;
            fs.writeFileSync(violation.file, lines.join('\n'));
            console.log(`✅ Fixed color in ${violation.file}:${violation.line}`);
            return true;
        }
        
        return false;
    }
    
    // Fix button violation
    fixButtonViolation(violation, lines) {
        const lineIndex = violation.line - 1;
        const line = lines[lineIndex];
        
        let newLine = line.replace(/background:\s*[^;]+;/, 'background: transparent !important;');
        
        if (newLine !== line) {
            lines[lineIndex] = newLine;
            fs.writeFileSync(violation.file, lines.join('\n'));
            console.log(`✅ Fixed button background in ${violation.file}:${violation.line}`);
            return true;
        }
        
        return false;
    }
    
    // Fix property violation
    fixPropertyViolation(violation, lines) {
        const lineIndex = violation.line - 1;
        const line = lines[lineIndex];
        
        let newLine = line.replace(new RegExp(`${violation.property}\\s*:[^;]+;`), `${violation.property}: none;`);
        
        if (newLine !== line) {
            lines[lineIndex] = newLine;
            fs.writeFileSync(violation.file, lines.join('\n'));
            console.log(`✅ Removed forbidden property in ${violation.file}:${violation.line}`);
            return true;
        }
        
        return false;
    }
}

// CLI Entry Point
if (require.main === module) {
    const args = process.argv.slice(2);
    const enforcer = new UijeongBooEnforcerCLI();
    enforcer.run(args);
}

module.exports = UijeongBooEnforcerCLI;