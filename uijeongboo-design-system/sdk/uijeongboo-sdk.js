/**
 * SAAAAHA Design System SDK
 * Version: 1.0.0
 * 
 * Provides programmatic access to SAAAAHA design tokens and components
 */

class SaaaahaSDK {
    constructor(options = {}) {
        this.version = '1.0.0';
        this.enforceMode = options.enforce || false;
        
        // Core design tokens
        this.colors = {
            lime: '#32CD32',
            coralPink: '#FF7F7F',
            gray100: '#111111',
            gray200: '#222222', 
            gray300: '#333333',
            gray400: '#444444',
            white: '#FFFFFF',
            grayText: '#CCCCCC'
        };
        
        this.spacing = {
            xs: '4px',
            sm: '8px', 
            md: '16px',
            lg: '24px',
            xl: '32px'
        };
        
        this.borderRadius = {
            none: '0',
            sm: '4px',
            md: '8px',
            lg: '12px',
            macOS: '20%'  // macOS style radius
        };
        
        this.shadows = {
            minimal: '0 2px 8px rgba(0,0,0,0.4)',
            none: 'none'
        };
        
        this.transitions = {
            fast: '150ms ease',
            normal: '300ms ease',
            slow: '500ms ease'
        };
        
        this.init();
    }
    
    init() {
        if (typeof document !== 'undefined') {
            this.injectBaseStyles();
            this.setupColorValidation();
            
            if (this.enforceMode) {
                this.enforceDesignSystem();
            }
        }
    }
    
    /**
     * Inject base SAAAAHA styles into the document
     */
    injectBaseStyles() {
        const styleId = 'saaaaha-base-styles';
        
        if (document.getElementById(styleId)) {
            return; // Already injected
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            :root {
                --saaaaha-lime: ${this.colors.lime};
                --saaaaha-coral-pink: ${this.colors.coralPink};
                --saaaaha-gray-100: ${this.colors.gray100};
                --saaaaha-gray-200: ${this.colors.gray200};
                --saaaaha-gray-300: ${this.colors.gray300};
                --saaaaha-gray-400: ${this.colors.gray400};
                --saaaaha-white: ${this.colors.white};
                --saaaaha-gray-text: ${this.colors.grayText};
                
                --saaaaha-spacing-xs: ${this.spacing.xs};
                --saaaaha-spacing-sm: ${this.spacing.sm};
                --saaaaha-spacing-md: ${this.spacing.md};
                --saaaaha-spacing-lg: ${this.spacing.lg};
                --saaaaha-spacing-xl: ${this.spacing.xl};
                
                --saaaaha-radius-macos: ${this.borderRadius.macOS};
                --saaaaha-shadow-minimal: ${this.shadows.minimal};
                --saaaaha-transition-normal: ${this.transitions.normal};
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
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Create a SAAAAHA-compliant button
     */
    createButton(text, variant = 'primary') {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = variant === 'secondary' 
            ? 'saaaaha-flat-button saaaaha-secondary-button'
            : 'saaaaha-flat-button';
        return button;
    }
    
    /**
     * Create a SAAAAHA-compliant panel
     */
    createPanel(content) {
        const panel = document.createElement('div');
        panel.className = 'saaaaha-dark-panel';
        if (typeof content === 'string') {
            panel.innerHTML = content;
        } else {
            panel.appendChild(content);
        }
        return panel;
    }
    
    /**
     * Create a section divider
     */
    createDivider() {
        const hr = document.createElement('hr');
        hr.className = 'saaaaha-section-divider';
        return hr;
    }
    
    /**
     * Validate colors against SAAAAHA palette
     */
    validateColors(cssText) {
        const allowedColors = Object.values(this.colors);
        const colorRegex = /#[a-fA-F0-9]{6}/g;
        const foundColors = cssText.match(colorRegex) || [];
        
        const violations = foundColors.filter(color => 
            !allowedColors.includes(color.toUpperCase())
        );
        
        return {
            valid: violations.length === 0,
            violations: violations,
            allowedColors: allowedColors
        };
    }
    
    /**
     * Setup automatic color validation
     */
    setupColorValidation() {
        if (this.enforceMode) {
            // Monitor style changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.tagName === 'STYLE') {
                                const validation = this.validateColors(node.textContent);
                                if (!validation.valid) {
                                    console.warn('🎨 SAAAAHA: Color violations detected:', validation.violations);
                                }
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.head, { childList: true });
        }
    }
    
    /**
     * Enforce design system rules
     */
    enforceDesignSystem() {
        console.log('🎨 SAAAAHA Design System Enforcement Active');
        
        // Check existing styles
        const styleSheets = Array.from(document.styleSheets);
        styleSheets.forEach((sheet, index) => {
            try {
                const rules = Array.from(sheet.cssRules || []);
                rules.forEach((rule) => {
                    if (rule.style) {
                        const validation = this.validateColors(rule.cssText);
                        if (!validation.valid) {
                            console.warn(`🎨 SAAAAHA: Stylesheet ${index} contains invalid colors:`, validation.violations);
                        }
                    }
                });
            } catch (e) {
                // Cross-origin stylesheets can't be accessed
            }
        });
    }
    
    /**
     * Apply auto-styling to elements
     */
    autoApply() {
        // Auto-apply to buttons
        const buttons = document.querySelectorAll('button:not(.saaaaha-flat-button)');
        buttons.forEach(button => {
            button.classList.add('saaaaha-flat-button');
        });
        
        // Auto-apply to panels/cards
        const panels = document.querySelectorAll('.panel, .card, .modal:not(.saaaaha-dark-panel)');
        panels.forEach(panel => {
            panel.classList.add('saaaaha-dark-panel');
        });
    }
    
    /**
     * Get status information
     */
    getStatus() {
        return {
            version: this.version,
            enforceMode: this.enforceMode,
            colorsLoaded: Object.keys(this.colors).length,
            stylesInjected: !!document.getElementById('saaaaha-base-styles')
        };
    }
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.SaaaahaSDK = SaaaahaSDK;
    
    // Auto-initialize with basic settings
    window.saaaaha = new SaaaahaSDK({
        enforce: window.SAAAAHA_ENFORCE || false
    });
    
    console.log('🎨 SAAAAHA Design System SDK loaded');
}

// Export for Node.js/modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SaaaahaSDK;
}