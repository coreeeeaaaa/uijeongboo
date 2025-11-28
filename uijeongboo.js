/**
 * UijeongBoo JavaScript Module
 * Lightweight JS for MCP local services
 * Zero dependencies, minimal footprint
 */

(function(window, document) {
  'use strict';

  // Framework namespace
  const UIJ = window.UIJ = {
    version: '1.0.0',
    config: {
      prefix: 'uij-',
      enforceRules: true,
      debug: false
    }
  };

  // DOM Ready handler
  UIJ.ready = function(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  // Query selector wrapper
  UIJ.$ = function(selector, context = document) {
    return context.querySelector(selector);
  };

  UIJ.$$ = function(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  };

  // Event delegation
  UIJ.on = function(element, event, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      element.addEventListener(event, handler);
    } else {
      element.addEventListener(event, function(e) {
        if (e.target.matches(selector)) {
          handler.call(e.target, e);
        }
      });
    }
  };

  // Class utilities
  UIJ.addClass = function(element, className) {
    element.classList.add(className);
  };

  UIJ.removeClass = function(element, className) {
    element.classList.remove(className);
  };

  UIJ.toggleClass = function(element, className) {
    element.classList.toggle(className);
  };

  UIJ.hasClass = function(element, className) {
    return element.classList.contains(className);
  };

  // Style enforcement
  UIJ.enforceStyles = function() {
    if (!UIJ.config.enforceRules) return;

    // Enforce button transparency
    UIJ.$$('button:not(.btn-primary), .btn:not(.btn-primary)').forEach(btn => {
      if (getComputedStyle(btn).backgroundColor !== 'transparent') {
        btn.style.setProperty('background', 'transparent', 'important');
      }
    });

    // Enforce text overflow on headings
    UIJ.$$('h1, h2, h3, h4, h5, h6').forEach(heading => {
      heading.style.overflow = 'hidden';
      heading.style.textOverflow = 'ellipsis';
      heading.style.whiteSpace = 'nowrap';
    });

    // Remove shadows
    UIJ.$$('*').forEach(el => {
      const styles = getComputedStyle(el);
      if (styles.boxShadow !== 'none') {
        el.style.setProperty('box-shadow', 'none', 'important');
      }
    });
  };

  // Component initializers
  UIJ.components = {
    // Smooth scroll for anchors
    smoothScroll: function() {
      UIJ.on(document, 'click', 'a[href^="#"]', function(e) {
        const target = UIJ.$(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },

    // Water text effect
    waterText: function() {
      UIJ.$$('.water-text').forEach(el => {
        if (!UIJ.hasClass(el, 'water-initialized')) {
          UIJ.addClass(el, 'water-initialized');
        }
      });
    },

    // Mobile menu toggle
    mobileMenu: function() {
      UIJ.on(document, 'click', '.mobile-menu-toggle', function() {
        const menu = UIJ.$('.mobile-menu');
        if (menu) {
          UIJ.toggleClass(menu, 'active');
        }
      });
    },

    // Form validation
    formValidation: function() {
      UIJ.on(document, 'submit', 'form[data-validate]', function(e) {
        const inputs = UIJ.$$('input[required]', this);
        let valid = true;

        inputs.forEach(input => {
          if (!input.value.trim()) {
            valid = false;
            UIJ.addClass(input, 'error');
          } else {
            UIJ.removeClass(input, 'error');
          }
        });

        if (!valid) {
          e.preventDefault();
        }
      });
    }
  };

  // Performance observer
  UIJ.observePerformance = function() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            UIJ.addClass(entry.target, 'in-view');
          }
        });
      });

      UIJ.$$('[data-observe]').forEach(el => observer.observe(el));
    }
  };

  // Initialize framework
  UIJ.init = function() {
    UIJ.ready(() => {
      // Run style enforcement
      UIJ.enforceStyles();

      // Initialize components
      Object.values(UIJ.components).forEach(component => component());

      // Start performance observer
      UIJ.observePerformance();

      // Set up mutation observer for dynamic content
      if ('MutationObserver' in window) {
        const observer = new MutationObserver(() => {
          UIJ.enforceStyles();
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'style']
        });
      }

      if (UIJ.config.debug) {
        console.log('UijeongBoo Framework initialized', UIJ.version);
      }
    });
  };

  // Auto-initialize
  UIJ.init();

  // Utility functions for external use
  UIJ.utils = {
    debounce: function(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },

    throttle: function(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    formatNumber: function(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    copyToClipboard: function(text) {
      if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
      }
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

})(window, document);