/**
 * UijeongBoo Adaptive Design SDK
 * 사용자 디자인 선호도 점진적 학습 시스템
 */

class UijeongBooAdaptiveSDK {
    constructor() {
        this.preferences = {
            colors: {},
            spacing: {},
            typography: {},
            interactions: {},
            layouts: {}
        };
        
        this.usage = {
            components: {},
            patterns: {},
            combinations: {}
        };
        
        this.adaptations = {
            colorScheme: 'auto',
            spacing: 'auto',
            typography: 'auto'
        };
        
        this.learningEnabled = true;
        this.confidenceThreshold = 0.7;
        
        this.init();
    }

    // 초기화
    init() {
        this.loadPreferences();
        this.setupLearning();
        this.startObservation();
        
        console.log('🎨 UijeongBoo Adaptive SDK 활성화');
    }

    // 사용자 선호도 로드
    loadPreferences() {
        try {
            const stored = localStorage.getItem('uijeongboo-preferences');
            if (stored) {
                const data = JSON.parse(stored);
                this.preferences = { ...this.preferences, ...data.preferences };
                this.usage = { ...this.usage, ...data.usage };
                this.adaptations = { ...this.adaptations, ...data.adaptations };
            }
        } catch (e) {
            console.log('새로운 사용자 - 학습 시작');
        }
    }

    // 선호도 저장
    savePreferences() {
        const data = {
            preferences: this.preferences,
            usage: this.usage,
            adaptations: this.adaptations,
            lastUpdated: Date.now()
        };
        
        localStorage.setItem('uijeongboo-preferences', JSON.stringify(data));
    }

    // 학습 시스템 설정
    setupLearning() {
        // 색상 선호도 학습
        this.observeColorUsage();
        
        // 레이아웃 패턴 학습
        this.observeLayoutPatterns();
        
        // 인터랙션 선호도 학습
        this.observeInteractions();
        
        // 타이포그래피 선호도 학습
        this.observeTypography();
    }

    // 색상 사용 패턴 관찰
    observeColorUsage() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    this.analyzeColorUsage(mutation.target);
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class', 'style']
        });
    }

    // 색상 사용 분석
    analyzeColorUsage(element) {
        const classes = element.className.split(' ');
        const colorClasses = classes.filter(cls => 
            cls.includes('bg-') || cls.includes('text-') || cls.includes('border-')
        );

        colorClasses.forEach(colorClass => {
            if (!this.usage.components[colorClass]) {
                this.usage.components[colorClass] = 0;
            }
            this.usage.components[colorClass]++;
        });

        // 임계값 도달 시 선호도 업데이트
        this.updateColorPreferences();
    }

    // 색상 선호도 업데이트
    updateColorPreferences() {
        const usage = this.usage.components;
        const total = Object.values(usage).reduce((sum, count) => sum + count, 0);

        if (total > 50) { // 충분한 데이터 수집 후
            Object.entries(usage).forEach(([className, count]) => {
                const frequency = count / total;
                if (frequency > 0.1) { // 10% 이상 사용
                    this.preferences.colors[className] = frequency;
                }
            });

            this.adaptDesignSystem();
        }
    }

    // 레이아웃 패턴 관찰
    observeLayoutPatterns() {
        const layouts = document.querySelectorAll('.flex, .grid, .container');
        
        layouts.forEach(layout => {
            const pattern = this.analyzeLayoutPattern(layout);
            if (pattern) {
                if (!this.usage.patterns[pattern]) {
                    this.usage.patterns[pattern] = 0;
                }
                this.usage.patterns[pattern]++;
            }
        });
    }

    // 레이아웃 패턴 분석
    analyzeLayoutPattern(element) {
        const classes = element.className.split(' ');
        
        if (classes.includes('flex')) {
            const flexPattern = classes.filter(cls => 
                cls.includes('justify-') || cls.includes('items-') || cls.includes('flex-')
            ).join(' ');
            return `flex-${flexPattern}`;
        }

        if (classes.includes('grid')) {
            const gridPattern = classes.filter(cls => 
                cls.includes('grid-cols-') || cls.includes('gap-')
            ).join(' ');
            return `grid-${gridPattern}`;
        }

        return null;
    }

    // 인터랙션 선호도 관찰
    observeInteractions() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, button, [role="button"]')) {
                this.recordInteraction('button-click', e.target);
            }
        });

        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('.card-hover, .water-text')) {
                this.recordInteraction('hover-effect', e.target);
            }
        });
    }

    // 인터랙션 기록
    recordInteraction(type, element) {
        const key = `${type}-${element.className}`;
        if (!this.usage.interactions[key]) {
            this.usage.interactions[key] = 0;
        }
        this.usage.interactions[key]++;

        // 실시간 적응
        this.adaptInteractionStyle(type, element);
    }

    // 타이포그래피 관찰
    observeTypography() {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
        
        textElements.forEach(element => {
            const style = window.getComputedStyle(element);
            const fontSize = style.fontSize;
            const fontWeight = style.fontWeight;
            
            const typoKey = `${element.tagName.toLowerCase()}-${fontSize}-${fontWeight}`;
            if (!this.usage.typography[typoKey]) {
                this.usage.typography[typoKey] = 0;
            }
            this.usage.typography[typoKey]++;
        });
    }

    // 디자인 시스템 적응
    adaptDesignSystem() {
        this.adaptColorScheme();
        this.adaptSpacing();
        this.adaptTypography();
        this.savePreferences();
    }

    // 색상 스키마 적응
    adaptColorScheme() {
        const preferredColors = Object.entries(this.preferences.colors)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        if (preferredColors.length > 0) {
            // 선호하는 색상 조합으로 CSS 변수 업데이트
            this.updateCSSVariables('colors', preferredColors);
        }
    }

    // 간격 적응
    adaptSpacing() {
        const spacingUsage = Object.entries(this.usage.components)
            .filter(([key]) => key.includes('p-') || key.includes('m-'))
            .sort(([,a], [,b]) => b - a);

        if (spacingUsage.length > 0) {
            this.updateCSSVariables('spacing', spacingUsage);
        }
    }

    // 타이포그래피 적응
    adaptTypography() {
        const typoUsage = Object.entries(this.usage.typography)
            .sort(([,a], [,b]) => b - a);

        if (typoUsage.length > 0) {
            this.updateCSSVariables('typography', typoUsage);
        }
    }

    // CSS 변수 업데이트
    updateCSSVariables(category, preferences) {
        const root = document.documentElement;
        
        switch (category) {
            case 'colors':
                // 사용자 선호 색상을 보조 색상으로 설정
                preferences.forEach(([colorClass, frequency], index) => {
                    if (frequency > 0.2) {
                        root.style.setProperty(`--uij-adaptive-${index}`, this.extractColorValue(colorClass));
                    }
                });
                break;
                
            case 'spacing':
                // 자주 사용하는 간격을 기본값으로
                const mostUsedSpacing = preferences[0][0];
                if (mostUsedSpacing.includes('p-md') || mostUsedSpacing.includes('m-md')) {
                    root.style.setProperty('--uij-adaptive-spacing', 'var(--uij-space-md)');
                }
                break;
        }
    }

    // 색상 값 추출
    extractColorValue(colorClass) {
        const colorMap = {
            'bg-primary': 'var(--uij-bg-primary)',
            'bg-secondary': 'var(--uij-bg-secondary)',
            'text-accent': 'var(--uij-primary)',
            'text-primary': 'var(--uij-text-primary)'
        };
        
        return colorMap[colorClass] || 'var(--uij-primary)';
    }

    // 인터랙션 스타일 적응
    adaptInteractionStyle(type, element) {
        if (type === 'hover-effect') {
            // 호버 효과 강화
            element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    // 관찰 시작
    startObservation() {
        // 5분마다 자동 저장
        setInterval(() => {
            this.savePreferences();
        }, 300000);

        // 10초마다 적응
        setInterval(() => {
            if (this.learningEnabled) {
                this.adaptDesignSystem();
            }
        }, 10000);
    }

    // 학습 상태 조회
    getLearningStatus() {
        const totalUsage = Object.values(this.usage.components).reduce((sum, count) => sum + count, 0);
        const confidence = Math.min(totalUsage / 100, 1); // 100회 사용시 100% 신뢰도
        
        return {
            totalInteractions: totalUsage,
            confidence: confidence,
            adaptations: Object.keys(this.adaptations).length,
            topPreferences: this.getTopPreferences()
        };
    }

    // 상위 선호도 조회
    getTopPreferences() {
        return {
            colors: Object.entries(this.preferences.colors)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3),
            patterns: Object.entries(this.usage.patterns)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
        };
    }

    // 수동 선호도 설정
    setPreference(category, key, value) {
        if (!this.preferences[category]) {
            this.preferences[category] = {};
        }
        this.preferences[category][key] = value;
        this.adaptDesignSystem();
    }

    // 학습 리셋
    resetLearning() {
        this.preferences = { colors: {}, spacing: {}, typography: {}, interactions: {}, layouts: {} };
        this.usage = { components: {}, patterns: {}, combinations: {} };
        localStorage.removeItem('uijeongboo-preferences');
        console.log('🔄 학습 데이터 초기화됨');
    }
}

// 전역 인스턴스 생성
window.UijeongBooSDK = new UijeongBooAdaptiveSDK();

// 사용자 API
window.UIJ = window.UIJ || {};
window.UIJ.adaptive = {
    getStatus: () => window.UijeongBooSDK.getLearningStatus(),
    setPreference: (category, key, value) => window.UijeongBooSDK.setPreference(category, key, value),
    reset: () => window.UijeongBooSDK.resetLearning(),
    enable: () => window.UijeongBooSDK.learningEnabled = true,
    disable: () => window.UijeongBooSDK.learningEnabled = false
};

console.log('🧠 UijeongBoo Adaptive SDK 로드 완료');
console.log('사용법: UIJ.adaptive.getStatus() - 학습 상태 확인');