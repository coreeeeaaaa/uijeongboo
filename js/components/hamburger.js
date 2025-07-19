/**
 * UijeongBoo Hamburger Menu Component
 * Version: 1.0
 * License: MIT
 */

(function(global) {
    'use strict';

    class UijeongBooHamburger {
        constructor(element, options = {}) {
            this.element = element;
            this.options = {
                target: null, // Target sidebar or menu
                animation: 'smooth',
                activeClass: 'active',
                ...options
            };
            
            this.isActive = false;
            this.target = null;
            
            this.init();
        }
        
        init() {
            this.setupHamburger();
            this.findTarget();
            this.createHamburgerBars();
            this.bindEvents();
            this.enforceDesignRules();
            
            console.log('UijeongBoo Hamburger initialized');
        }
        
        setupHamburger() {
            // Ensure hamburger has proper classes
            if (!this.element.classList.contains('uij-hamburger-container')) {
                this.element.classList.add('uij-hamburger-container');
            }
            
            // Enforce design rules - CRITICAL
            this.element.style.setProperty('background', 'transparent', 'important');
            this.element.style.setProperty('border', 'none', 'important');
            this.element.style.cursor = 'pointer';
            this.element.style.outline = 'none';
            
            // Set default styles
            const defaultStyles = {
                position: 'fixed',
                top: '8px',
                left: '8px',
                width: '48px',
                height: '48px',
                borderRadius: 'var(--uij-radius-lg, 12px)',
                zIndex: 'var(--uij-z-modal, 1010)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--uij-transition-normal, 0.25s cubic-bezier(0.4, 0, 0.2, 1))',
                color: 'var(--uij-text-muted, #999999)'
            };
            
            Object.entries(defaultStyles).forEach(([property, value]) => {
                const camelCase = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                if (!this.element.style[camelCase]) {
                    this.element.style[camelCase] = value;
                }
            });
        }
        
        findTarget() {
            if (this.options.target) {
                if (typeof this.options.target === 'string') {
                    this.target = document.querySelector(this.options.target);
                } else {
                    this.target = this.options.target;
                }
            } else {
                // Auto-find sidebar
                this.target = document.querySelector('.uij-sidebar') ||
                             document.querySelector('[data-uij-component="sidebar"]');
            }
        }
        
        createHamburgerBars() {
            // Check if hamburger bars already exist
            let hamburgerIcon = this.element.querySelector('.uij-hamburger');
            
            if (!hamburgerIcon) {
                hamburgerIcon = document.createElement('div');
                hamburgerIcon.className = 'uij-hamburger';
                
                // Create the three bars
                for (let i = 0; i < 3; i++) {
                    const bar = document.createElement('span');
                    hamburgerIcon.appendChild(bar);
                }
                
                this.element.appendChild(hamburgerIcon);
            }
            
            // Style the hamburger icon
            const iconStyles = {
                width: '24px',
                height: '18px',
                position: 'relative',
                transform: 'rotate(0deg)',
                transition: '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            };
            
            Object.entries(iconStyles).forEach(([property, value]) => {
                const camelCase = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                hamburgerIcon.style[camelCase] = value;
            });
            
            // Style the bars
            const bars = hamburgerIcon.querySelectorAll('span');
            bars.forEach((bar, index) => {
                const barStyles = {
                    display: 'block',
                    position: 'absolute',
                    height: '3px',
                    width: '100%',
                    background: 'currentColor',
                    borderRadius: '2px',
                    opacity: '1',
                    left: '0',
                    transform: 'rotate(0deg)',
                    transition: 'var(--uij-transition-normal, 0.25s)',
                    transformOrigin: 'center'
                };
                
                Object.entries(barStyles).forEach(([property, value]) => {
                    const camelCase = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    bar.style[camelCase] = value;
                });
                
                // Set position for each bar
                const positions = ['0px', '8px', '16px'];
                bar.style.top = positions[index];
                
                if (index === 0) {
                    bar.style.transformOrigin = 'left center';
                } else if (index === 1) {
                    bar.style.transformOrigin = 'left center';
                } else {
                    bar.style.transformOrigin = 'left center';
                }
            });
            
            this.hamburgerIcon = hamburgerIcon;
            this.bars = bars;
        }
        
        bindEvents() {
            // Click event
            this.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
            
            // Hover effects
            this.element.addEventListener('mouseenter', () => {
                if (!this.isActive) {
                    this.element.style.transform = 'translateY(-2px)';
                    this.element.style.color = 'var(--uij-text-primary, #eeeeee)';
                }
            });
            
            this.element.addEventListener('mouseleave', () => {
                if (!this.isActive) {
                    this.element.style.transform = '';
                    this.element.style.color = 'var(--uij-text-muted, #999999)';
                }
            });
            
            // Listen for sidebar events
            document.addEventListener('uij:sidebar-opened', () => {
                this.setActive(true);
            });
            
            document.addEventListener('uij:sidebar-closed', () => {
                this.setActive(false);
            });
            
            // Custom events
            document.addEventListener('uij:hamburger-activate', () => this.setActive(true));
            document.addEventListener('uij:hamburger-deactivate', () => this.setActive(false));
            document.addEventListener('uij:hamburger-toggle', () => this.toggle());
        }
        
        enforceDesignRules() {
            // Continuously enforce transparent background
            const enforceTransparency = () => {
                this.element.style.setProperty('background', 'transparent', 'important');
                this.element.style.setProperty('border', 'none', 'important');
            };
            
            // Initial enforcement
            enforceTransparency();
            
            // Watch for style changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && 
                        (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                        enforceTransparency();
                    }
                });
            });
            
            observer.observe(this.element, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
        
        toggle() {
            this.setActive(!this.isActive);
            
            // If we have a target, trigger its toggle
            if (this.target && this.target._uijSidebar) {
                this.target._uijSidebar.toggle();
            } else if (this.target) {
                // Dispatch custom event for manual handling
                const event = new CustomEvent('uij:hamburger-clicked', {
                    detail: { hamburger: this, target: this.target }
                });
                document.dispatchEvent(event);
            }
        }
        
        setActive(active) {
            this.isActive = active;
            
            if (active) {
                this.element.classList.add(this.options.activeClass);
                this.element.style.color = 'var(--uij-primary, #32CD32)';
                this.animateToX();
            } else {
                this.element.classList.remove(this.options.activeClass);
                this.element.style.color = 'var(--uij-text-muted, #999999)';
                this.animateToHamburger();
            }
            
            // Dispatch event
            const eventType = active ? 'uij:hamburger-activated' : 'uij:hamburger-deactivated';
            const event = new CustomEvent(eventType, {
                detail: { hamburger: this, isActive: this.isActive }
            });
            document.dispatchEvent(event);
        }
        
        animateToX() {
            if (!this.bars) return;
            
            // Transform to X shape
            this.bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            this.bars[1].style.width = '0%';
            this.bars[1].style.opacity = '0';
            this.bars[1].style.transform = 'scale(0)';
            this.bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        }
        
        animateToHamburger() {
            if (!this.bars) return;
            
            // Transform back to hamburger
            this.bars[0].style.transform = 'rotate(0deg) translate(0, 0)';
            this.bars[1].style.width = '100%';
            this.bars[1].style.opacity = '1';
            this.bars[1].style.transform = 'scale(1)';
            this.bars[2].style.transform = 'rotate(0deg) translate(0, 0)';
        }
        
        destroy() {
            // Remove event listeners would require storing references
            // For now, just reset state
            this.setActive(false);
            
            console.log('Hamburger destroyed');
        }
        
        // Public API
        getState() {
            return {
                isActive: this.isActive,
                target: this.target,
                options: this.options,
                element: this.element
            };
        }
        
        setTarget(target) {
            this.target = target;
        }
    }
    
    // Auto-initialize hamburgers
    function autoInitHamburgers() {
        const hamburgers = document.querySelectorAll('.uij-hamburger-container, .hamburger-container, [data-uij-component="hamburger"]');
        
        hamburgers.forEach(hamburger => {
            if (!hamburger._uijHamburger) {
                const options = hamburger.dataset.uijOptions ? 
                    JSON.parse(hamburger.dataset.uijOptions) : {};
                hamburger._uijHamburger = new UijeongBooHamburger(hamburger, options);
            }
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitHamburgers);
    } else {
        autoInitHamburgers();
    }
    
    // Register component
    if (global.UijeongBoo) {
        global.UijeongBoo.registerComponent('hamburger', UijeongBooHamburger);
    }
    
    // Expose to global scope
    global.UijeongBooHamburger = UijeongBooHamburger;
    
})(typeof window !== 'undefined' ? window : this);