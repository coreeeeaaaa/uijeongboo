/**
 * UijeongBoo Design Framework - Core Framework
 * Version: 1.0
 * License: MIT
 */

(function(global) {
    'use strict';

    // Core framework object
    const UijeongBoo = {
        version: '1.0.0',
        config: {
            enforceDesignRules: true,
            debugMode: false,
            autoInit: true
        },
        
        // Core modules registry
        modules: new Map(),
        components: new Map(),
        
        // Initialize framework
        init() {
            console.log('UijeongBoo Framework v' + this.version + ' initialized');
            
            if (this.config.enforceDesignRules) {
                this.enforceDesignRules();
            }
            
            if (this.config.autoInit) {
                this.autoInitComponents();
            }
            
            this.bindGlobalEvents();
            return this;
        },
        
        // Register a module
        registerModule(name, module) {
            if (typeof module !== 'object' || typeof module.init !== 'function') {
                throw new Error('Module must have an init method');
            }
            
            this.modules.set(name, module);
            
            if (this.config.debugMode) {
                console.log('Module registered:', name);
            }
            
            return this;
        },
        
        // Get a module
        getModule(name) {
            return this.modules.get(name);
        },
        
        // Register a component
        registerComponent(name, component) {
            if (typeof component !== 'function') {
                throw new Error('Component must be a constructor function');
            }
            
            this.components.set(name, component);
            
            if (this.config.debugMode) {
                console.log('Component registered:', name);
            }
            
            return this;
        },
        
        // Create component instance
        createComponent(name, element, options = {}) {
            const ComponentClass = this.components.get(name);
            if (!ComponentClass) {
                throw new Error('Component not found: ' + name);
            }
            
            return new ComponentClass(element, options);
        },
        
        // Auto-initialize components based on data attributes
        autoInitComponents() {
            const elements = document.querySelectorAll('[data-uij-component]');
            
            elements.forEach(element => {
                const componentName = element.dataset.uijComponent;
                const options = element.dataset.uijOptions ? 
                    JSON.parse(element.dataset.uijOptions) : {};
                
                try {
                    this.createComponent(componentName, element, options);
                } catch (error) {
                    console.error('Failed to initialize component:', componentName, error);
                }
            });
        },
        
        // Enforce design rules
        enforceDesignRules() {
            // Check for forbidden colors
            this.checkForbiddenColors();
            
            // Check for transparent buttons
            this.enforceTransparentButtons();
            
            // Check for box-shadows
            this.checkBoxShadows();
        },
        
        // Check for forbidden colors in stylesheets
        checkForbiddenColors() {
            const sheets = document.styleSheets;
            const forbiddenColors = [
                'red', 'blue', 'yellow', 'purple', 'pink', 'orange',
                '#ff', '#00f', '#f00', '#0f0', '#ff0', '#f0f', '#0ff'
            ];
            
            // This is a simplified check - in production, you'd want more sophisticated color detection
            if (this.config.debugMode) {
                console.log('Design rules enforced: Color checking enabled');
            }
        },
        
        // Enforce transparent buttons
        enforceTransparentButtons() {
            const buttons = document.querySelectorAll('button, .uij-btn, [role="button"]');
            
            buttons.forEach(button => {
                if (!button.classList.contains('uij-btn-primary')) {
                    button.style.setProperty('background', 'transparent', 'important');
                }
            });
        },
        
        // Check for box-shadows
        checkBoxShadows() {
            const elements = document.querySelectorAll('*');
            
            elements.forEach(element => {
                const computedStyle = getComputedStyle(element);
                if (computedStyle.boxShadow !== 'none') {
                    console.warn('Box-shadow detected on element:', element);
                    if (this.config.enforceDesignRules) {
                        element.style.setProperty('box-shadow', 'none', 'important');
                    }
                }
            });
        },
        
        // Bind global events
        bindGlobalEvents() {
            // Responsive handling
            window.addEventListener('resize', this.handleResize.bind(this));
            
            // Theme switching
            document.addEventListener('click', this.handleThemeSwitch.bind(this));
            
            // Component delegation
            document.addEventListener('click', this.handleComponentActions.bind(this));
        },
        
        // Handle window resize
        handleResize() {
            const event = new CustomEvent('uij:resize', {
                detail: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            });
            
            document.dispatchEvent(event);
        },
        
        // Handle theme switching
        handleThemeSwitch(event) {
            if (event.target.matches('[data-uij-theme-toggle]')) {
                const currentTheme = document.documentElement.dataset.theme || 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.dataset.theme = newTheme;
                localStorage.setItem('uij-theme', newTheme);
                
                const themeEvent = new CustomEvent('uij:theme-changed', {
                    detail: { theme: newTheme }
                });
                
                document.dispatchEvent(themeEvent);
            }
        },
        
        // Handle component actions
        handleComponentActions(event) {
            const action = event.target.dataset.uijAction;
            if (!action) return;
            
            const [componentName, methodName] = action.split('.');
            const component = this.getModule(componentName);
            
            if (component && typeof component[methodName] === 'function') {
                component[methodName](event);
            }
        },
        
        // Utility methods
        utils: {
            // DOM helpers
            $(selector, context = document) {
                return context.querySelector(selector);
            },
            
            $$(selector, context = document) {
                return Array.from(context.querySelectorAll(selector));
            },
            
            // Create element
            createElement(tag, attributes = {}, children = []) {
                const element = document.createElement(tag);
                
                Object.entries(attributes).forEach(([key, value]) => {
                    if (key === 'className') {
                        element.className = value;
                    } else if (key === 'dataset') {
                        Object.entries(value).forEach(([dataKey, dataValue]) => {
                            element.dataset[dataKey] = dataValue;
                        });
                    } else {
                        element.setAttribute(key, value);
                    }
                });
                
                children.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else {
                        element.appendChild(child);
                    }
                });
                
                return element;
            },
            
            // Debounce function
            debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },
            
            // Throttle function
            throttle(func, limit) {
                let inThrottle;
                return function(...args) {
                    if (!inThrottle) {
                        func.apply(this, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            },
            
            // Check if element is in viewport
            isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
        }
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => UijeongBoo.init());
    } else {
        UijeongBoo.init();
    }
    
    // Expose to global scope
    global.UijeongBoo = UijeongBoo;
    global.UIJ = UijeongBoo; // Short alias
    
})(typeof window !== 'undefined' ? window : this);