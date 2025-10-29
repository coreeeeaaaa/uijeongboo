/**
 * UijeongBoo Unified SDK
 * Apache License 2.0
 * Version: 1.0.0
 *
 * Unified SDK combining web components and design system functionality
 * ES Module compatible, with proper error handling
 */

export class UijeongBooSDK {
    constructor(config = {}) {
        this.version = '1.0.0';
        this.config = {
            autoInit: true,
            enforceRules: true,
            prefix: 'uij-',
            theme: 'dark',
            allowedColors: [], // Custom colors within guidelines
            customComponents: {}, // Custom component definitions
            ...config
        };

        // Unified design tokens
        this.designTokens = {
            colors: {
                primary: '#32CD32',      // Lime green - only accent color allowed
                background: '#222222',   // Dark background
                surface: '#333333',      // Card/input backgrounds
                card: '#444444',         // Card backgrounds
                text: '#eeeeee',         // Primary text
                muted: '#888888',        // Muted text
                border: '#555555',       // Borders
                coralPink: '#FF7F7F',    // Additional accent (limited use)
                gray: {
                    100: '#111111',
                    200: '#222222',
                    300: '#333333',
                    400: '#444444',
                    500: '#555555',
                    600: '#666666',
                    700: '#777777',
                    800: '#888888',
                    900: '#999999',
                    text: '#cccccc'
                }
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '32px',
                xxl: '48px'
            },
            typography: {
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                sizes: {
                    xs: '12px',
                    sm: '14px',
                    md: '16px',
                    lg: '18px',
                    xl: '20px',
                    xxl: '24px',
                    '3xl': '30px',
                    '4xl': '36px',
                    '5xl': '48px',
                    '6xl': '60px'
                },
                weights: {
                    thin: 100,
                    light: 300,
                    normal: 400,
                    medium: 500,
                    semibold: 600,
                    bold: 700,
                    extrabold: 800,
                    black: 900
                }
            },
            borderRadius: {
                none: '0px',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                full: '9999px',
                macOS: '20%'
            },
            shadows: {
                none: 'none',
                minimal: '0 2px 8px rgba(0,0,0,0.4)'
            },
            transitions: {
                fast: '150ms ease',
                normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
                slow: '500ms ease'
            },
            zIndex: {
                dropdown: 1000,
                fixed: 1005,
                modal: 1010,
                popover: 1020,
                tooltip: 1030
            }
        };

        // Error handling
        this.errors = [];
        this.warnings = [];

        if (this.config.autoInit) {
            this.init().catch(err => this.handleError('Initialization failed', err));
        }
    }

    // Error handling methods
    handleError(message, error = null) {
        const err = {
            message,
            error: error?.message || error,
            timestamp: new Date().toISOString(),
            stack: error?.stack
        };
        this.errors.push(err);
        console.error('[UijeongBoo SDK]', message, error);
        return err;
    }

    handleWarning(message) {
        const warning = {
            message,
            timestamp: new Date().toISOString()
        };
        this.warnings.push(warning);
        console.warn('[UijeongBoo SDK]', message);
        return warning;
    }

    // Initialization
    async init() {
        try {
            this.injectStyles();
            this.enforceDesignRules();
            this.setupTheme(this.config.theme);
            console.log(`UijeongBoo SDK v${this.version} initialized`);
        } catch (error) {
            this.handleError('Failed to initialize SDK', error);
        }
    }

    // Style injection
    injectStyles() {
        if (document.querySelector('style[data-uij-sdk]')) {
            return; // Already injected
        }

        const style = document.createElement('style');
        style.setAttribute('data-uij-sdk', 'true');
        style.textContent = `
            /* UijeongBoo SDK Core Styles */
            .uij-hidden { display: none !important; }
            .uij-block { display: block !important; }
            .uij-inline-block { display: inline-block !important; }
            .uij-flex { display: flex !important; }
            .uij-grid { display: grid !important; }

            /* Suggested design guidelines (not enforced) */
            button:not(.btn-primary), .btn:not(.btn-primary),
            input[type="button"]:not(.btn-primary), input[type="submit"]:not(.btn-primary),
            a.btn:not(.btn-primary) {
                background: transparent;
                border: 2px solid ${this.designTokens.colors.primary};
                border-radius: 8px;
                color: ${this.designTokens.colors.primary};
            }

            .btn-primary {
                background: ${this.designTokens.colors.primary};
                color: #000000;
                border: 2px solid ${this.designTokens.colors.primary};
                border-radius: 8px;
            }

            /* Suggested text overflow (can be overridden) */
            h1, h2, h3, h4, h5, h6 {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            p, .description, .text-content {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        `;

        document.head.appendChild(style);
    }

    // Design rule enforcement
    enforceDesignRules() {
        if (!this.config.enforceRules) return;

        // Monitor for violations
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.checkElementCompliance(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    checkElementCompliance(element) {
        // Check for design guidelines (warnings only, no forced removal)
        const computed = getComputedStyle(element);

        if (computed.boxShadow !== 'none') {
            this.handleWarning(`Box-shadow detected on ${element.tagName.toLowerCase()} - consider removing for flat design`);
        }

        if (computed.backgroundImage && computed.backgroundImage !== 'none' && !computed.backgroundImage.includes('linear-gradient')) {
            this.handleWarning(`Background image detected on ${element.tagName.toLowerCase()} - ensure it fits design guidelines`);
        }

        // Suggest color scheme adherence
        if (computed.color && !this.isAllowedColor(computed.color)) {
            this.handleWarning(`Non-grayscale color detected: ${computed.color} - consider using allowed colors`);
        }
    }

    isAllowedColor(color) {
        // Base allowed colors (grays and lime green)
        const baseAllowed = ['#32cd32', '#32CD32', '#eeeeee', '#cccccc', '#999999', '#888888', '#666666', '#555555', '#444444', '#333333', '#222222'];
        // Allow custom colors if configured
        const customColors = this.config.allowedColors || [];
        const allAllowed = [...baseAllowed, ...customColors];
        return allAllowed.includes(color.toLowerCase());
    }

    // Theme management
    setupTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        const themeStyles = {
            dark: {
                '--uij-bg-primary': '#222222',
                '--uij-bg-secondary': '#333333',
                '--uij-text-primary': '#eeeeee',
                '--uij-text-secondary': '#cccccc'
            },
            light: {
                '--uij-bg-primary': '#ffffff',
                '--uij-bg-secondary': '#f8f9fa',
                '--uij-text-primary': '#212529',
                '--uij-text-secondary': '#495057'
            }
        };

        const styles = themeStyles[theme] || themeStyles.dark;
        Object.entries(styles).forEach(([prop, value]) => {
            document.documentElement.style.setProperty(prop, value);
        });
    }

    // Component creation methods
    createCustomComponent(name, template, options = {}) {
        try {
            if (!this.config.customComponents[name]) {
                throw new Error(`Custom component '${name}' not defined`);
            }
            const component = this.config.customComponents[name](options);
            return component;
        } catch (error) {
            this.handleError(`Failed to create custom component '${name}'`, error);
            return null;
        }
    }

    createCustomComponent(name, template, options = {}) {
        try {
            if (!this.config.customComponents[name]) {
                throw new Error(`Custom component '${name}' not defined`);
            }
            const component = this.config.customComponents[name](options);
            return component;
        } catch (error) {
            this.handleError(`Failed to create custom component '${name}'`, error);
            return null;
        }
    }

    button(text, variant = 'default', options = {}) {
        try {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.className = `uij-btn uij-btn-${variant}`;
            btn.setAttribute('type', options.type || 'button');

            if (options.onClick && typeof options.onClick === 'function') {
                btn.addEventListener('click', options.onClick);
            }

            return btn;
        } catch (error) {
            this.handleError('Failed to create button component', error);
            return null;
        }
    }

    card(headerText, bodyText, options = {}) {
        try {
            const card = document.createElement('div');
            card.className = 'uij-card';

            if (headerText) {
                const header = document.createElement('div');
                header.className = 'uij-card-header';
                header.textContent = headerText;
                card.appendChild(header);
            }

            if (bodyText) {
                const body = document.createElement('div');
                body.className = 'uij-card-body';
                body.textContent = bodyText;
                card.appendChild(body);
            }

            return card;
        } catch (error) {
            this.handleError('Failed to create card component', error);
            return null;
        }
    }

    tooltip(triggerElement, text, position = 'top', options = {}) {
        try {
            const wrapper = document.createElement('div');
            wrapper.className = 'uij-tooltip';

            if (typeof triggerElement === 'string') {
                const trigger = document.createElement('span');
                trigger.textContent = triggerElement;
                trigger.style.cursor = 'help';
                wrapper.appendChild(trigger);
            } else if (triggerElement instanceof HTMLElement) {
                wrapper.appendChild(triggerElement);
            } else {
                throw new Error('Trigger must be a string or HTMLElement');
            }

            const tooltipContent = document.createElement('div');
            tooltipContent.className = `uij-tooltip-content ${position}`;
            tooltipContent.textContent = text;
            tooltipContent.setAttribute('role', 'tooltip');
            tooltipContent.setAttribute('aria-hidden', 'true');

            if (options.size) {
                tooltipContent.classList.add(options.size);
            }

            if (options.alwaysVisible) {
                wrapper.classList.add('always-visible');
                tooltipContent.setAttribute('aria-hidden', 'false');
            }

            wrapper.appendChild(tooltipContent);

            // Add accessibility attributes
            wrapper.setAttribute('aria-describedby', `tooltip-${Date.now()}`);
            tooltipContent.id = wrapper.getAttribute('aria-describedby');

            return wrapper;
        } catch (error) {
            this.handleError('Failed to create tooltip component', error);
            return null;
        }
    }

    tabs(tabsData, options = {}) {
        try {
            const container = document.createElement('div');
            container.className = 'uij-tabs';

            if (options.variant) {
                container.classList.add(options.variant);
            }

            // Create tab list
            const tabList = document.createElement('ul');
            tabList.className = 'uij-tab-list';
            tabList.setAttribute('role', 'tablist');

            // Create tab panels container
            const panelsContainer = document.createElement('div');
            panelsContainer.className = 'uij-tab-panels';

            tabsData.forEach((tabData, index) => {
                const tabId = `tab-${Date.now()}-${index}`;
                const panelId = `panel-${Date.now()}-${index}`;

                // Create tab
                const tabItem = document.createElement('li');
                const tabButton = document.createElement('button');
                tabButton.className = `uij-tab ${options.size || ''}`;
                tabButton.textContent = tabData.title;
                tabButton.setAttribute('role', 'tab');
                tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
                tabButton.setAttribute('aria-controls', panelId);
                tabButton.setAttribute('id', tabId);
                tabButton.setAttribute('tabindex', index === 0 ? '0' : '-1');

                if (index === 0) {
                    tabButton.classList.add('active');
                }

                tabItem.appendChild(tabButton);
                tabList.appendChild(tabItem);

                // Create panel
                const panel = document.createElement('div');
                panel.className = 'uij-tab-panel';
                panel.setAttribute('role', 'tabpanel');
                panel.setAttribute('aria-labelledby', tabId);
                panel.setAttribute('id', panelId);

                if (typeof tabData.content === 'string') {
                    panel.innerHTML = tabData.content;
                } else if (tabData.content instanceof HTMLElement) {
                    panel.appendChild(tabData.content);
                }

                if (index === 0) {
                    panel.classList.add('active');
                }

                panelsContainer.appendChild(panel);
            });

            container.appendChild(tabList);
            container.appendChild(panelsContainer);

            // Add event listeners for tab switching
            const tabs = container.querySelectorAll('.uij-tab');
            const panels = container.querySelectorAll('.uij-tab-panel');

            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => this.switchTab(container, index));
                tab.addEventListener('keydown', (e) => this.handleTabKeydown(e, container, index));
            });

            return container;
        } catch (error) {
            this.handleError('Failed to create tabs component', error);
            return null;
        }
    }

    switchTab(container, activeIndex) {
        const tabs = container.querySelectorAll('.uij-tab');
        const panels = container.querySelectorAll('.uij-tab-panel');

        tabs.forEach((tab, index) => {
            const isActive = index === activeIndex;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panels.forEach((panel, index) => {
            panel.classList.toggle('active', index === activeIndex);
        });
    }

    handleTabKeydown(e, container, index) {
        const tabs = container.querySelectorAll('.uij-tab');
        let newIndex = index;

        switch (e.key) {
            case 'ArrowLeft':
                newIndex = Math.max(0, index - 1);
                break;
            case 'ArrowRight':
                newIndex = Math.min(tabs.length - 1, index + 1);
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = tabs.length - 1;
                break;
            default:
                return;
        }

        e.preventDefault();
        this.switchTab(container, newIndex);
        tabs[newIndex].focus();
    }

    accordion(items, options = {}) {
        try {
            const container = document.createElement('div');
            container.className = 'uij-accordion';

            if (options.variant) {
                container.classList.add(options.variant);
            }

            if (options.allowMultiple) {
                container.setAttribute('aria-multiselectable', 'true');
            }

            items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'uij-accordion-item';

                const headerId = `accordion-header-${Date.now()}-${index}`;
                const panelId = `accordion-panel-${Date.now()}-${index}`;

                // Create header
                const header = document.createElement('button');
                header.className = 'uij-accordion-header';
                header.textContent = item.title;
                header.setAttribute('aria-expanded', 'false');
                header.setAttribute('aria-controls', panelId);
                header.setAttribute('id', headerId);
                header.setAttribute('type', 'button');

                // Create panel
                const panel = document.createElement('div');
                panel.className = 'uij-accordion-panel';
                panel.setAttribute('aria-hidden', 'true');
                panel.setAttribute('aria-labelledby', headerId);
                panel.setAttribute('id', panelId);

                if (typeof item.content === 'string') {
                    panel.innerHTML = item.content;
                } else if (item.content instanceof HTMLElement) {
                    panel.appendChild(item.content);
                }

                itemDiv.appendChild(header);
                itemDiv.appendChild(panel);
                container.appendChild(itemDiv);
            });

            // Add event listeners
            const headers = container.querySelectorAll('.uij-accordion-header');
            headers.forEach((header, index) => {
                header.addEventListener('click', () => this.toggleAccordionPanel(container, index));
                header.addEventListener('keydown', (e) => this.handleAccordionKeydown(e, container, index));
            });

            return container;
        } catch (error) {
            this.handleError('Failed to create accordion component', error);
            return null;
        }
    }

    toggleAccordionPanel(container, index) {
        const headers = container.querySelectorAll('.uij-accordion-header');
        const panels = container.querySelectorAll('.uij-accordion-panel');
        const allowMultiple = container.hasAttribute('aria-multiselectable');

        const header = headers[index];
        const panel = panels[index];
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        if (!allowMultiple) {
            // Close all other panels
            headers.forEach((h, i) => {
                if (i !== index) {
                    h.setAttribute('aria-expanded', 'false');
                    panels[i].setAttribute('aria-hidden', 'true');
                }
            });
        }

        header.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        panel.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    }

    handleAccordionKeydown(e, container, index) {
        const headers = container.querySelectorAll('.uij-accordion-header');
        let newIndex = index;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.toggleAccordionPanel(container, index);
                return;
            case 'ArrowUp':
                newIndex = Math.max(0, index - 1);
                break;
            case 'ArrowDown':
                newIndex = Math.min(headers.length - 1, index + 1);
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = headers.length - 1;
                break;
            default:
                return;
        }

        e.preventDefault();
        headers[newIndex].focus();
    }

    // Theme management methods
    setTheme(theme) {
        try {
            if (!['dark', 'light'].includes(theme)) {
                throw new Error('Theme must be "dark" or "light"');
            }
            document.documentElement.setAttribute('data-theme', theme);
            this.config.theme = theme;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('uij-theme', theme);
            }
            return true;
        } catch (error) {
            this.handleError('Failed to set theme', error);
            return false;
        }
    }

    getTheme() {
        return this.config.theme;
    }

    toggleTheme() {
        try {
            const newTheme = this.config.theme === 'dark' ? 'light' : 'dark';
            return this.setTheme(newTheme);
        } catch (error) {
            this.handleError('Failed to toggle theme', error);
            return false;
        }
    }

    initTheme() {
        try {
            const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('uij-theme') : null;
            const initialTheme = savedTheme || this.config.theme || 'dark';
            this.setTheme(initialTheme);
            return true;
        } catch (error) {
            this.handleError('Failed to initialize theme', error);
            return false;
        }
    }

    themeToggle(options = {}) {
        try {
            const button = document.createElement('button');
            button.className = `uij-btn ${options.variant || 'secondary'}`;
            button.setAttribute('aria-label', 'Toggle theme');
            button.setAttribute('type', 'button');

            const updateButton = () => {
                const isDark = this.config.theme === 'dark';
                button.textContent = isDark ? '☀️ Light' : '🌙 Dark';
                button.setAttribute('aria-pressed', isDark ? 'false' : 'true');
            };

            updateButton();

            button.addEventListener('click', () => {
                this.toggleTheme();
                updateButton();
                if (options.onToggle) {
                    options.onToggle(this.config.theme);
                }
            });

            return button;
        } catch (error) {
            this.handleError('Failed to create theme toggle component', error);
            return null;
        }
    }

    input(type = 'text', placeholder = '', options = {}) {
        try {
            const input = document.createElement('input');
            input.type = type;
            input.placeholder = placeholder;
            input.className = 'uij-input';

            if (options.value) input.value = options.value;
            if (options.required) input.required = true;

            return input;
        } catch (error) {
            this.handleError('Failed to create input component', error);
            return null;
        }
    }

    // Utility methods
    getToken(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.designTokens);
    }

    validateDesign() {
        const violations = [];

        // Check for forbidden elements/styles
        document.querySelectorAll('*').forEach(el => {
            const styles = getComputedStyle(el);

            if (styles.boxShadow !== 'none') {
                violations.push({
                    element: el,
                    violation: 'box-shadow',
                    value: styles.boxShadow
                });
            }

            if (styles.backgroundImage.includes('linear-gradient') || styles.backgroundImage.includes('radial-gradient')) {
                violations.push({
                    element: el,
                    violation: 'gradient',
                    value: styles.backgroundImage
                });
            }
        });

        return violations;
    }

    // Cleanup
    destroy() {
        // Remove injected styles
        const style = document.querySelector('style[data-uij-sdk]');
        if (style) style.remove();

        // Clear errors/warnings
        this.errors = [];
        this.warnings = [];

        console.log('UijeongBoo SDK destroyed');
    }
}

// Default export for ES modules
export default UijeongBooSDK;

// Backward compatibility
if (typeof window !== 'undefined') {
    window.UijeongBooSDK = UijeongBooSDK;
}