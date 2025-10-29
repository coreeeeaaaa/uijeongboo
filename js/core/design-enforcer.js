/**
 * UijeongBoo Design Enforcer - Strict Design Rules Implementation
 * Version: 1.0
 * License: MIT
 */

(function(global) {
    'use strict';

    const DesignEnforcer = {
        // Design rules configuration
        rules: {
            allowedColors: [
                '#32CD32', // Lime green - ONLY allowed color accent
                '#222222', '#333333', '#444444', '#555555', '#666666', // Dark grays
                '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb', // Mid grays
                '#cccccc', '#dddddd', '#eeeeee', '#ffffff', // Light grays
                '#000000', '#111111', // Black variants
                'transparent', 'inherit', 'currentColor'
            ],
            
            forbiddenColors: [
                'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange',
                'cyan', 'magenta', 'brown', 'violet', 'indigo', 'teal',
                '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'
            ],
            
            requiredTransparentElements: [
                'button', '.uij-btn', '[role="button"]', '.hamburger-container',
                '.header-menu-item', '.nav-item'
            ],
            
            forbiddenProperties: [
                'box-shadow', 'text-shadow'
            ]
        },
        
        // Violation tracking
        violations: [],
        
        // Initialize enforcer
        init() {
            console.log('UijeongBoo Design Enforcer initialized');
            
            this.enforceOnLoad();
            this.watchForChanges();
            this.preventViolations();
            
            return this;
        },
        
        // Enforce rules on page load
        enforceOnLoad() {
            // Wait for all stylesheets to load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(() => this.performFullAudit(), 100);
                });
            } else {
                setTimeout(() => this.performFullAudit(), 100);
            }
        },
        
        // Watch for DOM changes
        watchForChanges() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.auditElement(node);
                                this.auditDescendants(node);
                            }
                        });
                    } else if (mutation.type === 'attributes') {
                        if (mutation.attributeName === 'style' || 
                            mutation.attributeName === 'class') {
                            this.auditElement(mutation.target);
                        }
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        },
        
        // Prevent violations through event interception
        preventViolations() {
            // Intercept style changes
            this.interceptStyleChanges();
            
            // Intercept CSS rule insertions
            this.interceptCSSRules();
        },
        
        // Perform full page audit
        performFullAudit() {
            this.violations = [];
            
            // Audit all elements
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => this.auditElement(element));
            
            // Audit stylesheets
            this.auditStylesheets();
            
            // Report violations
            this.reportViolations();
            
            // Auto-fix violations if enabled
            if (UijeongBoo.config.autoFixViolations !== false) {
                this.autoFixViolations();
            }
        },
        
        // Audit single element
        auditElement(element) {
            const computedStyle = getComputedStyle(element);
            
            // Check background color
            this.checkColorProperty(element, 'background-color', computedStyle.backgroundColor);
            
            // Check color
            this.checkColorProperty(element, 'color', computedStyle.color);
            
            // Check border color
            this.checkColorProperty(element, 'border-color', computedStyle.borderColor);
            
            // Check forbidden properties
            this.checkForbiddenProperties(element, computedStyle);
            
            // Check transparent buttons
            this.checkTransparentButtons(element, computedStyle);
        },
        
        // Audit element descendants
        auditDescendants(element) {
            const descendants = element.querySelectorAll('*');
            descendants.forEach(desc => this.auditElement(desc));
        },
        
        // Check color property
        checkColorProperty(element, property, value) {
            if (!value || value === 'none') return;
            
            const normalizedColor = this.normalizeColor(value);
            
            if (!this.isColorAllowed(normalizedColor)) {
                this.addViolation({
                    type: 'forbidden-color',
                    element: element,
                    property: property,
                    value: value,
                    normalizedValue: normalizedColor,
                    message: `Forbidden color detected: ${value} on ${property}`
                });
            }
        },
        
        // Check forbidden properties
        checkForbiddenProperties(element, computedStyle) {
            this.rules.forbiddenProperties.forEach(prop => {
                const value = computedStyle.getPropertyValue(prop);
                if (value && value !== 'none') {
                    this.addViolation({
                        type: 'forbidden-property',
                        element: element,
                        property: prop,
                        value: value,
                        message: `Forbidden property detected: ${prop}: ${value}`
                    });
                }
            });
        },
        
        // Check transparent buttons
        checkTransparentButtons(element, computedStyle) {
            const isButton = this.rules.requiredTransparentElements.some(selector => {
                return element.matches(selector);
            });
            
            if (isButton) {
                const bgColor = computedStyle.backgroundColor;
                const normalizedBg = this.normalizeColor(bgColor);
                
                // Allow lime background only for primary buttons
                if (normalizedBg !== 'transparent' && 
                    normalizedBg !== 'rgba(0, 0, 0, 0)' && 
                    !element.classList.contains('primary') &&
                    !element.classList.contains('uij-btn-primary')) {
                    
                    this.addViolation({
                        type: 'non-transparent-button',
                        element: element,
                        property: 'background-color',
                        value: bgColor,
                        message: `Button must have transparent background: ${bgColor}`
                    });
                }
            }
        },
        
        // Audit stylesheets
        auditStylesheets() {
            try {
                for (let i = 0; i < document.styleSheets.length; i++) {
                    const sheet = document.styleSheets[i];
                    this.auditStylesheet(sheet);
                }
            } catch (error) {
                console.warn('Could not audit some stylesheets due to CORS restrictions');
            }
        },
        
        // Audit single stylesheet
        auditStylesheet(sheet) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (let i = 0; i < rules.length; i++) {
                    this.auditCSSRule(rules[i]);
                }
            } catch (error) {
                // CORS or other restrictions
                console.warn('Could not access stylesheet rules:', error.message);
            }
        },
        
        // Audit CSS rule
        auditCSSRule(rule) {
            if (rule.type === CSSRule.STYLE_RULE) {
                const style = rule.style;
                
                // Check colors
                ['color', 'background-color', 'border-color'].forEach(prop => {
                    const value = style.getPropertyValue(prop);
                    if (value) {
                        const normalizedColor = this.normalizeColor(value);
                        if (!this.isColorAllowed(normalizedColor)) {
                            this.addViolation({
                                type: 'css-forbidden-color',
                                rule: rule,
                                property: prop,
                                value: value,
                                selector: rule.selectorText,
                                message: `Forbidden color in CSS: ${prop}: ${value} in ${rule.selectorText}`
                            });
                        }
                    }
                });
                
                // Check forbidden properties
                this.rules.forbiddenProperties.forEach(prop => {
                    const value = style.getPropertyValue(prop);
                    if (value && value !== 'none') {
                        this.addViolation({
                            type: 'css-forbidden-property',
                            rule: rule,
                            property: prop,
                            value: value,
                            selector: rule.selectorText,
                            message: `Forbidden property in CSS: ${prop}: ${value} in ${rule.selectorText}`
                        });
                    }
                });
            }
        },
        
        // Normalize color value
        normalizeColor(color) {
            if (!color) return '';
            
            // Handle rgb/rgba
            if (color.startsWith('rgb')) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = color;
                return ctx.fillStyle.toLowerCase();
            }
            
            return color.toLowerCase().trim();
        },
        
        // Check if color is allowed
        isColorAllowed(color) {
            if (!color || color === 'none') return true;
            
            // Check exact matches
            if (this.rules.allowedColors.some(allowed => 
                color === allowed.toLowerCase())) {
                return true;
            }
            
            // Check if it's a grayscale color
            if (this.isGrayscaleColor(color)) {
                return true;
            }
            
            // Check if it's the lime accent
            if (color === '#32cd32' || color === 'rgb(50, 205, 50)') {
                return true;
            }
            
            return false;
        },
        
        // Check if color is grayscale
        isGrayscaleColor(color) {
            // Simple check for grayscale - all RGB values should be equal
            const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
                const [, r, g, b] = rgbMatch.map(Number);
                return r === g && g === b;
            }
            
            // Check hex grayscale
            const hexMatch = color.match(/^#([0-9a-f]{2})\1\1$/);
            return !!hexMatch;
        },
        
        // Add violation
        addViolation(violation) {
            this.violations.push({
                ...violation,
                timestamp: Date.now(),
                id: this.generateViolationId()
            });
        },
        
        // Generate violation ID
        generateViolationId() {
            return 'violation_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },
        
        // Report violations
        reportViolations() {
            if (this.violations.length === 0) {
                console.log('✅ No design rule violations found');
                return;
            }
            
            console.group('🚨 UijeongBoo Design Rule Violations (' + this.violations.length + ')');
            
            this.violations.forEach(violation => {
                console.warn(violation.message, violation);
            });
            
            console.groupEnd();
            
            // Dispatch custom event
            const event = new CustomEvent('uij:design-violations', {
                detail: { violations: this.violations }
            });
            document.dispatchEvent(event);
        },
        
        // Auto-fix violations
        autoFixViolations() {
            console.log('🔧 Auto-fixing design violations...');
            
            this.violations.forEach(violation => {
                try {
                    this.fixViolation(violation);
                } catch (error) {
                    console.error('Failed to fix violation:', violation.id, error);
                }
            });
        },
        
        // Fix individual violation
        fixViolation(violation) {
            switch (violation.type) {
                case 'forbidden-color':
                    this.fixForbiddenColor(violation);
                    break;
                case 'non-transparent-button':
                    this.fixNonTransparentButton(violation);
                    break;
                case 'forbidden-property':
                    this.fixForbiddenProperty(violation);
                    break;
            }
        },
        
        // Fix forbidden color
        fixForbiddenColor(violation) {
            if (violation.property === 'color') {
                violation.element.style.setProperty('color', 'var(--uij-text-primary)', 'important');
            } else if (violation.property === 'background-color') {
                violation.element.style.setProperty('background-color', 'transparent', 'important');
            } else if (violation.property === 'border-color') {
                violation.element.style.setProperty('border-color', 'var(--uij-border)', 'important');
            }
        },
        
        // Fix non-transparent button
        fixNonTransparentButton(violation) {
            violation.element.style.setProperty('background-color', 'transparent', 'important');
        },
        
        // Fix forbidden property
        fixForbiddenProperty(violation) {
            violation.element.style.setProperty(violation.property, 'none', 'important');
        },
        
        // Intercept style changes
        interceptStyleChanges() {
            const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
            
            CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
                // Check if this violates design rules
                if (property === 'background-color' || property === 'color' || property === 'border-color') {
                    const normalizedColor = DesignEnforcer.normalizeColor(value);
                    if (!DesignEnforcer.isColorAllowed(normalizedColor)) {
                        console.warn('Design rule violation prevented:', property, value);
                        return;
                    }
                }
                
                if (DesignEnforcer.rules.forbiddenProperties.includes(property)) {
                    console.warn('Forbidden property prevented:', property, value);
                    return;
                }
                
                return originalSetProperty.call(this, property, value, priority);
            };
        },
        
        // Intercept CSS rule insertions
        interceptCSSRules() {
            // This is more complex and might not be necessary for most use cases
            // Implementation would involve intercepting insertRule methods
        },
        
        // Public API
        api: {
            audit() {
                DesignEnforcer.performFullAudit();
            },
            
            getViolations() {
                return DesignEnforcer.violations;
            },
            
            clearViolations() {
                DesignEnforcer.violations = [];
            },
            
            isColorAllowed(color) {
                return DesignEnforcer.isColorAllowed(color);
            }
        }
    };
    
    // Register as module
    if (global.UijeongBoo) {
        global.UijeongBoo.registerModule('designEnforcer', DesignEnforcer);
    }
    
    // Initialize if framework is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => DesignEnforcer.init());
    } else {
        DesignEnforcer.init();
    }
    
    // Expose to global scope
    global.UijeongBooDesignEnforcer = DesignEnforcer;
    
})(typeof window !== 'undefined' ? window : this);