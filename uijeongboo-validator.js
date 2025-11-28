/**
 * UijeongBoo Design Framework Validator
 * 디자인 규약 강제 검증 시스템
 */

class UijeongBooValidator {
    constructor() {
        this.violations = [];
        this.rules = {
            limeGreenLimit: 3, // 라임 그린 사용량 3% 제한
            forbiddenColors: [], // 금지된 색상들
            requiredBorderRadius: true, // 모서리 둥글게 필수
            forbiddenBorders: true, // 테두리 사용 금지
            forbiddenSectionBg: true // 섹션 배경 금지
        };
    }

    /**
     * 전체 디자인 규약 검증
     */
    validateAll() {
        this.violations = [];
        
        this.checkLimeGreenUsage();
        this.checkBorderUsage();
        this.checkSectionBackgrounds();
        this.checkBorderRadius();
        
        return this.generateReport();
    }

    /**
     * 라임 그린 사용량 검증 (3% 제한)
     */
    checkLimeGreenUsage() {
        const allElements = document.querySelectorAll('*');
        let limeGreenCount = 0;
        let totalElements = allElements.length;

        allElements.forEach((el, index) => {
            const styles = getComputedStyle(el);
            const hasLimeGreen = this.hasLimeGreenColor(styles);
            
            if (hasLimeGreen) {
                limeGreenCount++;
                console.log(`라임 그린 발견: ${el.tagName}.${el.className}`, el);
            }
        });

        const usagePercent = (limeGreenCount / totalElements) * 100;
        
        if (usagePercent > this.rules.limeGreenLimit) {
            this.violations.push({
                type: 'LIME_GREEN_OVERUSE',
                severity: 'ERROR',
                message: `라임 그린 사용량 ${usagePercent.toFixed(1)}% - ${this.rules.limeGreenLimit}% 초과 금지!`,
                elements: limeGreenCount,
                percentage: usagePercent.toFixed(1)
            });
        }
    }

    /**
     * 라임 그린 색상 감지
     */
    hasLimeGreenColor(styles) {
        const limeGreenRgb = '50, 205, 50';
        const limeGreenHex = '#32cd32';
        
        return (
            styles.backgroundColor.includes(limeGreenRgb) ||
            styles.color.includes(limeGreenRgb) ||
            styles.borderColor?.includes(limeGreenRgb) ||
            styles.backgroundColor.toLowerCase().includes(limeGreenHex) ||
            styles.color.toLowerCase().includes(limeGreenHex) ||
            styles.borderColor?.toLowerCase().includes(limeGreenHex)
        );
    }

    /**
     * 테두리 사용 검증 (완전 금지)
     */
    checkBorderUsage() {
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach((el) => {
            const styles = getComputedStyle(el);
            const hasBorder = styles.borderWidth !== '0px' && 
                             styles.borderStyle !== 'none' &&
                             el.tagName !== 'IFRAME'; // iframe은 예외
            
            if (hasBorder) {
                this.violations.push({
                    type: 'FORBIDDEN_BORDER',
                    severity: 'ERROR',
                    message: `테두리 사용 금지 위반: ${el.tagName}.${el.className}`,
                    element: el,
                    borderWidth: styles.borderWidth
                });
            }
        });
    }

    /**
     * 섹션 배경 검증 (금지)
     */
    checkSectionBackgrounds() {
        const sections = document.querySelectorAll('.demo-section, .section, .uij-section, [class*="section"]');
        
        sections.forEach((section) => {
            const styles = getComputedStyle(section);
            const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                                 styles.backgroundColor !== 'transparent' &&
                                 styles.backgroundColor !== 'initial';
            
            if (hasBackground) {
                this.violations.push({
                    type: 'FORBIDDEN_SECTION_BACKGROUND',
                    severity: 'ERROR',
                    message: `섹션 배경 사용 금지 위반: ${section.className}`,
                    element: section,
                    backgroundColor: styles.backgroundColor
                });
            }
        });
    }

    /**
     * 모서리 둥글기 검증 (필수)
     */
    checkBorderRadius() {
        const cards = document.querySelectorAll('.card, .uij-card, .stat-card, .uij-stat-card, button, .button, .uij-button');
        
        cards.forEach((card) => {
            const styles = getComputedStyle(card);
            const hasRadius = styles.borderRadius !== '0px';
            
            if (!hasRadius) {
                this.violations.push({
                    type: 'MISSING_BORDER_RADIUS',
                    severity: 'WARNING',
                    message: `모서리 둥글게 누락: ${card.tagName}.${card.className}`,
                    element: card
                });
            }
        });
    }

    /**
     * 검증 결과 리포트 생성
     */
    generateReport() {
        const errors = this.violations.filter(v => v.severity === 'ERROR');
        const warnings = this.violations.filter(v => v.severity === 'WARNING');
        
        const report = {
            valid: this.violations.length === 0,
            totalViolations: this.violations.length,
            errors: errors.length,
            warnings: warnings.length,
            violations: this.violations,
            summary: this.generateSummary()
        };

        return report;
    }

    /**
     * 요약 메시지 생성
     */
    generateSummary() {
        if (this.violations.length === 0) {
            return '✅ UijeongBoo 디자인 규약을 완벽하게 준수합니다!';
        }

        const errors = this.violations.filter(v => v.severity === 'ERROR');
        const warnings = this.violations.filter(v => v.severity === 'WARNING');

        let summary = '🚨 UijeongBoo 디자인 규약 위반이 발견되었습니다:\n\n';
        
        if (errors.length > 0) {
            summary += `❌ 오류 ${errors.length}개:\n`;
            errors.forEach(error => {
                summary += `  • ${error.message}\n`;
            });
            summary += '\n';
        }

        if (warnings.length > 0) {
            summary += `⚠️ 경고 ${warnings.length}개:\n`;
            warnings.forEach(warning => {
                summary += `  • ${warning.message}\n`;
            });
        }

        return summary;
    }

    /**
     * 실시간 모니터링 시작
     */
    startMonitoring() {
        // DOM 변경 감지
        const observer = new MutationObserver(() => {
            setTimeout(() => {
                const report = this.validateAll();
                if (!report.valid) {
                    console.warn('🚨 UijeongBoo 디자인 규약 위반 감지!', report);
                }
            }, 100);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        console.log('🎯 UijeongBoo 실시간 모니터링 시작');
    }
}

// 전역 인스턴스 생성
window.UijeongBooValidator = new UijeongBooValidator();

// DOM 로딩 완료 후 자동 검증
document.addEventListener('DOMContentLoaded', () => {
    const validator = window.UijeongBooValidator;
    const report = validator.validateAll();
    
    if (report.valid) {
        console.log('✅ UijeongBoo 디자인 규약 준수');
        console.log(report.summary);
    } else {
        console.error('🚨 UijeongBoo 디자인 규약 위반 발견!');
        console.log(report.summary);
        
        // 개발 환경에서 알림 표시
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            alert(`UijeongBoo 디자인 규약 위반!\n\n${report.summary}`);
        }
    }

    // 실시간 모니터링 시작
    validator.startMonitoring();
});

// 수동 검증 함수 (콘솔에서 사용)
window.validateUijeongBoo = () => {
    const report = window.UijeongBooValidator.validateAll();
    console.log('=== UijeongBoo 디자인 검증 결과 ===');
    console.log(report.summary);
    console.log('상세 정보:', report);
    return report;
};