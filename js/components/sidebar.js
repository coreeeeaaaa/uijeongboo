/**
 * UijeongBoo Sidebar Component
 * Version: 1.0
 * License: MIT
 */

(function(global) {
    'use strict';

    class UijeongBooSidebar {
        constructor(element, options = {}) {
            this.element = element;
            this.options = {
                autoClose: true,
                backdrop: true,
                breakpoint: 768,
                position: 'left',
                width: '280px',
                overlay: true,
                ...options
            };
            
            this.isOpen = false;
            this.overlay = null;
            this.hamburger = null;
            
            this.init();
        }
        
        init() {
            this.setupSidebar();
            this.createOverlay();
            this.findHamburger();
            this.bindEvents();
            this.handleResize();
            
            console.log('UijeongBoo Sidebar initialized');
        }
        
        setupSidebar() {
            // Ensure sidebar has proper classes
            if (!this.element.classList.contains('uij-sidebar')) {
                this.element.classList.add('uij-sidebar');
            }
            
            // Set position
            this.element.style.position = 'fixed';
            this.element.style.top = '0';
            this.element.style.height = '100vh';
            this.element.style.width = this.options.width;
            this.element.style.zIndex = 'var(--uij-z-fixed, 1005)';
            this.element.style.transition = 'transform var(--uij-transition-slow, 0.4s cubic-bezier(0.4, 0, 0.2, 1))';
            
            // Set initial position based on options
            if (this.options.position === 'left') {
                this.element.style.left = '0';
                this.element.style.transform = 'translateX(-100%)';
            } else {
                this.element.style.right = '0';
                this.element.style.transform = 'translateX(100%)';
            }
            
            // Ensure background follows design rules
            this.element.style.background = 'var(--uij-bg-secondary, #333333)';
            this.element.style.borderRight = '1px solid var(--uij-border, #444444)';
        }
        
        createOverlay() {
            if (!this.options.overlay) return;
            
            this.overlay = document.createElement('div');
            this.overlay.className = 'uij-sidebar-overlay';
            this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: var(--uij-z-fixed, 1004);
                opacity: 0;
                visibility: hidden;
                transition: all var(--uij-transition-normal, 0.25s);
                cursor: pointer;
            `;
            
            document.body.appendChild(this.overlay);
        }
        
        findHamburger() {
            // Find hamburger button
            this.hamburger = document.querySelector('.uij-hamburger-container') ||
                            document.querySelector('[data-uij-action="sidebar.toggle"]') ||
                            document.querySelector('.hamburger-container');
            
            if (this.hamburger) {
                // Ensure hamburger follows design rules
                this.hamburger.style.setProperty('background', 'transparent', 'important');
                this.hamburger.style.border = 'none';
            }
        }
        
        bindEvents() {
            // Hamburger click
            if (this.hamburger) {
                this.hamburger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggle();
                });
            }
            
            // Overlay click
            if (this.overlay) {
                this.overlay.addEventListener('click', () => {
                    if (this.options.backdrop) {
                        this.close();
                    }
                });
            }
            
            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
            
            // Window resize
            window.addEventListener('resize', this.handleResize.bind(this));
            
            // Navigation links
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('.uij-nav-item') && this.options.autoClose) {
                    this.close();
                }
            });
            
            // Custom events
            document.addEventListener('uij:sidebar-open', () => this.open());
            document.addEventListener('uij:sidebar-close', () => this.close());
            document.addEventListener('uij:sidebar-toggle', () => this.toggle());
        }
        
        handleResize() {
            const width = window.innerWidth;
            
            if (width > this.options.breakpoint) {
                // Desktop behavior
                if (this.isOpen && this.options.autoClose) {
                    this.close();
                }
            } else {
                // Mobile behavior - ensure proper mobile styles
                this.element.style.width = width <= 480 ? '100vw' : this.options.width;
            }
        }
        
        open() {
            if (this.isOpen) return;
            
            this.isOpen = true;
            
            // Add active class to hamburger
            if (this.hamburger) {
                this.hamburger.classList.add('active');
            }
            
            // Add open class to sidebar
            this.element.classList.add('open');
            this.element.style.transform = 'translateX(0)';
            
            // Show overlay
            if (this.overlay) {
                this.overlay.style.visibility = 'visible';
                this.overlay.style.opacity = '1';
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Dispatch event
            const event = new CustomEvent('uij:sidebar-opened', {
                detail: { sidebar: this }
            });
            document.dispatchEvent(event);
            
            console.log('Sidebar opened');
        }
        
        close() {
            if (!this.isOpen) return;
            
            this.isOpen = false;
            
            // Remove active class from hamburger
            if (this.hamburger) {
                this.hamburger.classList.remove('active');
            }
            
            // Remove open class from sidebar
            this.element.classList.remove('open');
            
            // Hide sidebar
            if (this.options.position === 'left') {
                this.element.style.transform = 'translateX(-100%)';
            } else {
                this.element.style.transform = 'translateX(100%)';
            }
            
            // Hide overlay
            if (this.overlay) {
                this.overlay.style.visibility = 'hidden';
                this.overlay.style.opacity = '0';
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Dispatch event
            const event = new CustomEvent('uij:sidebar-closed', {
                detail: { sidebar: this }
            });
            document.dispatchEvent(event);
            
            console.log('Sidebar closed');
        }
        
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }
        
        destroy() {
            // Remove overlay
            if (this.overlay) {
                this.overlay.remove();
            }
            
            // Remove event listeners
            window.removeEventListener('resize', this.handleResize);
            
            // Reset body styles
            document.body.style.overflow = '';
            
            // Reset sidebar styles
            this.element.classList.remove('open');
            this.element.style.transform = '';
            
            console.log('Sidebar destroyed');
        }
        
        // Public API
        getState() {
            return {
                isOpen: this.isOpen,
                options: this.options,
                element: this.element
            };
        }
        
        setOption(key, value) {
            this.options[key] = value;
            
            // Re-initialize if needed
            if (key === 'width') {
                this.element.style.width = value;
            }
        }
    }
    
    // Auto-initialize sidebars
    function autoInitSidebars() {
        const sidebars = document.querySelectorAll('.uij-sidebar, [data-uij-component="sidebar"]');
        
        sidebars.forEach(sidebar => {
            if (!sidebar._uijSidebar) {
                const options = sidebar.dataset.uijOptions ? 
                    JSON.parse(sidebar.dataset.uijOptions) : {};
                sidebar._uijSidebar = new UijeongBooSidebar(sidebar, options);
            }
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitSidebars);
    } else {
        autoInitSidebars();
    }
    
    // Register component
    if (global.UijeongBoo) {
        global.UijeongBoo.registerComponent('sidebar', UijeongBooSidebar);
    }
    
    // Expose to global scope
    global.UijeongBooSidebar = UijeongBooSidebar;
    
})(typeof window !== 'undefined' ? window : this);