/**
 * UijeongBoo Dual Sidebar System
 * Version: 2.0 - Complete Left + Right Sidebar System
 * Replaces previous generic sidebar class to match specific dual-sidebar HTML structure.
 */

(function() {
    'use strict';

    let leftSidebarOpen = false;
    let rightSidebarOpen = false;

    // Initialize sidebar system
    function initSidebars() {
        const leftSidebar = document.getElementById('leftSidebar');
        const rightSidebar = document.getElementById('rightSidebar');
        const overlay = document.querySelector('.uij-sidebar-overlay');
        const toggleButtons = document.querySelectorAll('.uij-sidebar-toggle');
        const closeButtons = document.querySelectorAll('.uij-sidebar-close');
        const navItems = document.querySelectorAll('.uij-nav-item');

        // Note: Sidebars might be loaded asynchronously, so we might need to retry or wait for an event
        if (!leftSidebar && !rightSidebar) {
            // If not found, they might not be loaded yet. 
            // The index.html triggers 'uij:components-ready' when loaded.
            // We will listen for that event at the document level as well.
            return;
        }

        console.log('Initializing UijeongBoo Dual Sidebar System...');

        // Toggle button handlers
        toggleButtons.forEach(btn => {
            // Remove old listeners to prevent duplicates if re-initialized
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior if it's a link
                const side = newBtn.dataset.sidebar;
                if (side === 'left') {
                    toggleLeftSidebar();
                } else if (side === 'right') {
                    toggleRightSidebar();
                }
            });
        });

        // Re-select buttons after replacement
        const activeToggleButtons = document.querySelectorAll('.uij-sidebar-toggle');

        // Close button handlers
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const side = btn.dataset.sidebar;
                if (side === 'left') {
                    toggleLeftSidebar();
                } else if (side === 'right') {
                    toggleRightSidebar();
                }
            });
        });

        // Overlay click
        if (overlay) {
            overlay.addEventListener('click', closeAllSidebars);
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllSidebars();
            }
        });

        // Nav item clicks
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Only prevent default if it's a placeholder link
                if(item.getAttribute('href') === '#') {
                    e.preventDefault();
                }

                // Remove active from same sidebar
                const sidebar = item.closest('.uij-sidebar-left, .uij-sidebar-right');
                if (sidebar) {
                    const sidebarItems = sidebar.querySelectorAll('.uij-nav-item');
                    sidebarItems.forEach(si => si.classList.remove('active'));
                }

                // Add active to clicked
                item.classList.add('active');

                // Close on mobile
                if (window.innerWidth <= 768) {
                    setTimeout(closeAllSidebars, 200);
                }

                // Dispatch event
                const event = new CustomEvent('uij:sidebar-nav-changed', {
                    detail: {
                        activeItem: item,
                        href: item.getAttribute('href'),
                        text: item.textContent.trim()
                    }
                });
                document.dispatchEvent(event);
            });
        });

        // Window resize
        window.addEventListener('resize', handleResize);

        console.log('UijeongBoo Dual Sidebar System initialized successfully');
    }

    // Toggle left sidebar
    function toggleLeftSidebar() {
        const sidebar = document.getElementById('leftSidebar');
        const toggle = document.querySelector('.uij-sidebar-toggle-left');
        const overlay = document.querySelector('.uij-sidebar-overlay');

        if (!sidebar) return;

        leftSidebarOpen = !leftSidebarOpen;

        if (leftSidebarOpen) {
            sidebar.classList.add('open');
            if (toggle) toggle.classList.add('active');
            document.body.classList.add('left-sidebar-open');

            if (window.innerWidth <= 768 && overlay) {
                overlay.classList.add('show');
            }

            const event = new CustomEvent('uij:sidebar-opened', {
                detail: { sidebar: 'left' }
            });
            document.dispatchEvent(event);
        } else {
            sidebar.classList.remove('open');
            if (toggle) toggle.classList.remove('active');
            document.body.classList.remove('left-sidebar-open');

            if (!rightSidebarOpen && overlay) {
                overlay.classList.remove('show');
            }

            const event = new CustomEvent('uij:sidebar-closed', {
                detail: { sidebar: 'left' }
            });
            document.dispatchEvent(event);
        }
    }

    // Toggle right sidebar
    function toggleRightSidebar() {
        const sidebar = document.getElementById('rightSidebar');
        const toggle = document.querySelector('.uij-sidebar-toggle-right');
        const overlay = document.querySelector('.uij-sidebar-overlay');

        if (!sidebar) return;

        rightSidebarOpen = !rightSidebarOpen;

        if (rightSidebarOpen) {
            sidebar.classList.add('open');
            if (toggle) toggle.classList.add('active');
            document.body.classList.add('right-sidebar-open');

            if (window.innerWidth <= 768 && overlay) {
                overlay.classList.add('show');
            }

            const event = new CustomEvent('uij:sidebar-opened', {
                detail: { sidebar: 'right' }
            });
            document.dispatchEvent(event);
        } else {
            sidebar.classList.remove('open');
            if (toggle) toggle.classList.remove('active');
            document.body.classList.remove('right-sidebar-open');

            if (!leftSidebarOpen && overlay) {
                overlay.classList.remove('show');
            }

            const event = new CustomEvent('uij:sidebar-closed', {
                detail: { sidebar: 'right' }
            });
            document.dispatchEvent(event);
        }
    }

    // Close all sidebars
    function closeAllSidebars() {
        if (leftSidebarOpen) {
            toggleLeftSidebar();
        }
        if (rightSidebarOpen) {
            toggleRightSidebar();
        }
    }

    // Handle window resize
    function handleResize() {
        const overlay = document.querySelector('.uij-sidebar-overlay');

        if (window.innerWidth > 768) {
            if (!leftSidebarOpen && !rightSidebarOpen && overlay) {
                overlay.classList.remove('show');
            }
        } else if ((leftSidebarOpen || rightSidebarOpen) && overlay) {
            overlay.classList.add('show');
        }
    }

    // Listen for components ready event from index.html
    document.addEventListener('uij:components-ready', () => {
        console.log('Components ready event received, initializing sidebars...');
        initSidebars();
    });

    // Initialize on DOM ready as fallback (if components are not async loaded)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebars);
    } else {
        initSidebars();
    }

    // Expose functions globally for external control
    window.toggleLeftSidebar = toggleLeftSidebar;
    window.toggleRightSidebar = toggleRightSidebar;
    window.closeAllSidebars = closeAllSidebars;
    window.initSidebars = initSidebars;

})();