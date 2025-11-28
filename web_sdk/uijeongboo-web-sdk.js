/**
 * UijeongBoo Web SDK
 * Tailwind CSS 대체용 경량 프레임워크
 * 완전 독립형, 외부 의존성 없음
 */

class UijeongBooWebSDK {
    constructor(config = {}) {
        this.version = '1.0.0';
        this.config = {
            autoInit: true,
            enforceRules: true,
            prefix: 'uij-',
            theme: 'dark',
            ...config
        };
        
        this.designTokens = {
            colors: {
                primary: '#32CD32',
                background: '#222222',
                surface: '#333333',
                card: '#444444',
                text: '#eeeeee',
                muted: '#888888',
                border: '#555555'
            },
            spacing: {
                xs: '4px', sm: '8px', md: '16px', 
                lg: '24px', xl: '32px', xxl: '48px'
            },
            typography: {
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                sizes: {
                    xs: '12px', sm: '14px', md: '16px', 
                    lg: '18px', xl: '20px', xxl: '24px'
                }
            },
            borderRadius: {
                none: '0px', sm: '2px', md: '4px', lg: '6px'
            }
        };
        
        if (this.config.autoInit) {
            this.init();
        }
    }
    
    init() {
        this.injectStyles();
        this.initializeComponents();
        this.enforceDesignRules();
        console.log(`🎨 UijeongBoo Web SDK v${this.version} initialized`);
    }
    
    injectStyles() {
        const styleId = 'uijeongboo-web-sdk-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = this.generateCSS();
        document.head.appendChild(style);
    }
    
    generateCSS() {
        const { colors, spacing, typography, borderRadius } = this.designTokens;
        
        return `
            /* UijeongBoo Web SDK - Base Styles */
            .${this.config.prefix}container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 ${spacing.md};
                background: ${colors.background};
                color: ${colors.text};
                font-family: ${typography.fontFamily};
            }
            
            /* Buttons */
            .${this.config.prefix}btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: ${spacing.sm} ${spacing.md};
                background: transparent;
                color: ${colors.text};
                border: 1px solid ${colors.border};
                border-radius: ${borderRadius.sm};
                font-family: ${typography.fontFamily};
                font-size: ${typography.sizes.md};
                cursor: pointer;
                transition: all 0.2s ease;
                text-decoration: none;
            }
            
            .${this.config.prefix}btn:hover {
                background: ${colors.surface};
                border-color: ${colors.primary};
            }
            
            .${this.config.prefix}btn-primary {
                background: ${colors.primary};
                color: #000000;
                border-color: ${colors.primary};
            }
            
            .${this.config.prefix}btn-primary:hover {
                background: #28a428;
                border-color: #28a428;
            }
            
            /* Cards */
            .${this.config.prefix}card {
                background: ${colors.card};
                border: 1px solid ${colors.border};
                border-radius: ${borderRadius.md};
                padding: ${spacing.lg};
                margin-bottom: ${spacing.md};
                overflow: hidden;
            }
            
            .${this.config.prefix}card-header {
                font-size: ${typography.sizes.lg};
                font-weight: 600;
                margin-bottom: ${spacing.md};
                color: ${colors.text};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .${this.config.prefix}card-content {
                color: ${colors.text};
                line-height: 1.6;
            }
            
            /* Forms */
            .${this.config.prefix}input {
                width: 100%;
                padding: ${spacing.sm} ${spacing.md};
                background: ${colors.surface};
                color: ${colors.text};
                border: 1px solid ${colors.border};
                border-radius: ${borderRadius.sm};
                font-family: ${typography.fontFamily};
                font-size: ${typography.sizes.md};
                transition: border-color 0.2s ease;
            }
            
            .${this.config.prefix}input:focus {
                outline: none;
                border-color: ${colors.primary};
            }
            
            .${this.config.prefix}input::placeholder {
                color: ${colors.muted};
            }
            
            /* Layout */
            .${this.config.prefix}grid {
                display: grid;
                gap: ${spacing.md};
            }
            
            .${this.config.prefix}grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
            .${this.config.prefix}grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
            .${this.config.prefix}grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
            
            .${this.config.prefix}flex {
                display: flex;
                gap: ${spacing.md};
            }
            
            .${this.config.prefix}flex-col { flex-direction: column; }
            .${this.config.prefix}flex-center { justify-content: center; align-items: center; }
            .${this.config.prefix}flex-between { justify-content: space-between; }
            
            /* Spacing utilities */
            .${this.config.prefix}p-xs { padding: ${spacing.xs}; }
            .${this.config.prefix}p-sm { padding: ${spacing.sm}; }
            .${this.config.prefix}p-md { padding: ${spacing.md}; }
            .${this.config.prefix}p-lg { padding: ${spacing.lg}; }
            .${this.config.prefix}p-xl { padding: ${spacing.xl}; }
            
            .${this.config.prefix}m-xs { margin: ${spacing.xs}; }
            .${this.config.prefix}m-sm { margin: ${spacing.sm}; }
            .${this.config.prefix}m-md { margin: ${spacing.md}; }
            .${this.config.prefix}m-lg { margin: ${spacing.lg}; }
            .${this.config.prefix}m-xl { margin: ${spacing.xl}; }
            
            /* Typography */
            .${this.config.prefix}text-xs { font-size: ${typography.sizes.xs}; }
            .${this.config.prefix}text-sm { font-size: ${typography.sizes.sm}; }
            .${this.config.prefix}text-md { font-size: ${typography.sizes.md}; }
            .${this.config.prefix}text-lg { font-size: ${typography.sizes.lg}; }
            .${this.config.prefix}text-xl { font-size: ${typography.sizes.xl}; }
            
            .${this.config.prefix}text-primary { color: ${colors.primary}; }
            .${this.config.prefix}text-muted { color: ${colors.muted}; }
            
            /* Anti-Tailwind Rules */
            .${this.config.prefix}no-shadow { box-shadow: none !important; }
            .${this.config.prefix}flat { box-shadow: none !important; }
        `;
    }
    
    initializeComponents() {
        // 자동으로 기본 클래스 적용
        document.querySelectorAll('button:not([class])').forEach(btn => {
            btn.classList.add(`${this.config.prefix}btn`);
        });
        
        document.querySelectorAll('input:not([class])').forEach(input => {
            input.classList.add(`${this.config.prefix}input`);
        });
    }
    
    enforceDesignRules() {
        if (!this.config.enforceRules) return;
        
        // 금지된 스타일 자동 제거
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        this.enforceElementRules(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // 초기 적용
        document.querySelectorAll('*').forEach(el => {
            this.enforceElementRules(el);
        });
    }
    
    enforceElementRules(element) {
        const style = element.style;
        
        // 금지된 배경색 수정
        if (style.background === 'white' || style.background === '#ffffff') {
            style.background = this.designTokens.colors.background;
        }
        
        // 그림자 제거
        if (style.boxShadow) {
            style.boxShadow = 'none';
        }
        
        // 파란색 제거
        if (style.color && style.color.includes('blue')) {
            style.color = this.designTokens.colors.text;
        }
    }
    
    // Tailwind 대체 유틸리티 메서드들
    create(tag, classes = '', content = '') {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (content) element.textContent = content;
        return element;
    }
    
    button(text, variant = 'default') {
        const classes = variant === 'primary' 
            ? `${this.config.prefix}btn ${this.config.prefix}btn-primary`
            : `${this.config.prefix}btn`;
        return this.create('button', classes, text);
    }
    
    card(title, content) {
        const card = this.create('div', `${this.config.prefix}card`);
        const header = this.create('div', `${this.config.prefix}card-header`, title);
        const body = this.create('div', `${this.config.prefix}card-content`, content);
        card.appendChild(header);
        card.appendChild(body);
        return card;
    }
    
    input(type = 'text', placeholder = '') {
        const input = this.create('input', `${this.config.prefix}input`);
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }
    
    grid(columns = 1) {
        return this.create('div', `${this.config.prefix}grid ${this.config.prefix}grid-cols-${columns}`);
    }
    
    flex(direction = 'row') {
        const classes = direction === 'col' 
            ? `${this.config.prefix}flex ${this.config.prefix}flex-col`
            : `${this.config.prefix}flex`;
        return this.create('div', classes);
    }
    
    // 개발자용 API
    getDesignTokens() {
        return this.designTokens;
    }
    
    validateElement(element) {
        const violations = [];
        const style = getComputedStyle(element);
        
        if (style.background === 'rgb(255, 255, 255)') {
            violations.push('흰색 배경 사용 금지');
        }
        
        if (style.boxShadow !== 'none') {
            violations.push('그림자 효과 사용 금지');
        }
        
        return violations;
    }
}

// 전역 인스턴스
if (typeof window !== 'undefined') {
    window.UijeongBoo = UijeongBooWebSDK;
    
    // 자동 초기화 (옵션)
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.uijeongbooSDK) {
            window.uijeongbooSDK = new UijeongBooWebSDK();
        }
    });
}

// Node.js 환경 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UijeongBooWebSDK;
}