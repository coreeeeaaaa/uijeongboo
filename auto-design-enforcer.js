#!/usr/bin/env node

/**
 * UijeongBoo Design Framework Auto-Enforcer
 * AI 에이전트의 모든 디자인 작업을 실시간으로 감시하고 강제 수정
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

class UijeongBooEnforcer {
    constructor() {
        this.violations = [];
        this.autoFix = true;
        
        // 금지된 색상 패턴
        this.forbiddenColors = [
            /#ff\w{4}/gi,     // 빨간색 계열
            /#00\w{4}/gi,     // 파란색 계열  
            /#\w{2}ff\w{2}/gi, // 노란색 계열
            /#ff\w{2}00/gi,   // 주황색 계열
            /#\w{2}00ff/gi,   // 보라색 계열
        ];
        
        // 허용된 색상만
        this.allowedColors = [
            '#32CD32',  // 라임 그린 (유일한 포인트 컬러)
            '#222222', '#333333', '#444444', '#555555', '#666666', 
            '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb',
            '#cccccc', '#dddddd', '#eeeeee', '#ffffff',
            'transparent', 'inherit', 'currentColor'
        ];
        
        this.startWatching();
    }

    startWatching() {
        console.log('🚨 UijeongBoo Design Enforcer 시작됨');
        console.log('📁 감시 중: HTML, CSS, JS, JSX, TSX 파일');
        
        // 파일 변경 감시
        const watcher = chokidar.watch('.', {
            ignored: [/node_modules/, /\.git/, /\.DS_Store/],
            persistent: true
        });
        
        watcher.on('change', (filePath) => {
            if (this.isDesignFile(filePath)) {
                this.enforceDesignRules(filePath);
            }
        });
        
        watcher.on('add', (filePath) => {
            if (this.isDesignFile(filePath)) {
                this.enforceDesignRules(filePath);
            }
        });
    }
    
    isDesignFile(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return ['.html', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue'].includes(ext);
    }
    
    async enforceDesignRules(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            let fixedContent = content;
            let hasViolations = false;
            
            // 1. 색상 검증 및 자동 수정
            fixedContent = this.fixColorViolations(fixedContent, filePath);
            
            // 2. 이모지 제거
            fixedContent = this.removeEmojis(fixedContent, filePath);
            
            // 3. 버튼 배경 투명화 강제
            fixedContent = this.enforceTransparentButtons(fixedContent, filePath);
            
            // 4. 그림자 제거
            fixedContent = this.removeShadows(fixedContent, filePath);
            
            // 5. 텍스트 오버플로우 처리 추가
            fixedContent = this.addTextOverflowHandling(fixedContent, filePath);
            
            // 파일이 수정되었다면 자동 저장
            if (fixedContent !== content) {
                if (this.autoFix) {
                    fs.writeFileSync(filePath, fixedContent);
                    console.log(`✅ 자동 수정됨: ${filePath}`);
                    this.logViolation(filePath, '자동 수정 완료');
                } else {
                    console.log(`❌ 위반 감지: ${filePath}`);
                    this.logViolation(filePath, '수동 수정 필요');
                }
            }
            
        } catch (error) {
            console.error(`❌ 파일 처리 오류: ${filePath}`, error);
        }
    }
    
    fixColorViolations(content, filePath) {
        let fixed = content;
        
        // 금지된 색상을 그레이로 교체
        this.forbiddenColors.forEach(pattern => {
            fixed = fixed.replace(pattern, '#666666');
        });
        
        // 색상 값 검증
        const colorMatches = fixed.match(/#[a-fA-F0-9]{6}/g) || [];
        colorMatches.forEach(color => {
            if (!this.allowedColors.includes(color.toUpperCase()) && color !== '#32CD32') {
                // 라임색이 아닌 모든 색상을 그레이로
                fixed = fixed.replace(new RegExp(color, 'g'), '#666666');
                console.log(`🎨 색상 교체: ${color} → #666666 in ${filePath}`);
            }
        });
        
        return fixed;
    }
    
    removeEmojis(content, filePath) {
        // 모든 이모지 유니코드 범위
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
        
        const fixed = content.replace(emojiRegex, '');
        
        if (fixed !== content) {
            console.log(`🚫 이모지 제거됨: ${filePath}`);
        }
        
        return fixed;
    }
    
    enforceTransparentButtons(content, filePath) {
        let fixed = content;
        
        // 버튼 배경색을 transparent로 강제
        const buttonPatterns = [
            /button\s*{[^}]*background[^:]*:[^;]*;/g,
            /\.btn[^{]*{[^}]*background[^:]*:[^;]*;/g,
            /\.header-menu-item[^{]*{[^}]*background[^:]*:[^;]*;/g
        ];
        
        buttonPatterns.forEach(pattern => {
            fixed = fixed.replace(pattern, (match) => {
                if (!match.includes('transparent') && !match.includes('#32CD32')) {
                    return match.replace(/background[^:]*:[^;]*;/, 'background: transparent !important;');
                }
                return match;
            });
        });
        
        return fixed;
    }
    
    removeShadows(content, filePath) {
        // 모든 box-shadow 제거
        return content.replace(/box-shadow[^:]*:[^;]*;/g, 'box-shadow: none;');
    }
    
    addTextOverflowHandling(content, filePath) {
        let fixed = content;
        
        // 텍스트 요소에 오버플로우 처리 자동 추가
        const textElements = ['.nav-item', '.header-menu-item', '.status-item', '.metric-card-title'];
        
        textElements.forEach(selector => {
            if (fixed.includes(selector) && !fixed.includes(`${selector} {`) && !fixed.includes('text-overflow: ellipsis')) {
                const overflowCSS = `
        ${selector} {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }`;
                fixed += overflowCSS;
                console.log(`📝 텍스트 오버플로우 처리 추가: ${selector} in ${filePath}`);
            }
        });
        
        return fixed;
    }
    
    logViolation(filePath, action) {
        const violation = {
            file: filePath,
            timestamp: new Date().toISOString(),
            action: action
        };
        
        this.violations.push(violation);
        
        // 위반 로그 파일에 기록
        const logPath = path.join(__dirname, 'design-violations.log');
        fs.appendFileSync(logPath, JSON.stringify(violation) + '\n');
    }
    
    generateReport() {
        console.log('\n📊 UijeongBoo Design Enforcement Report');
        console.log('=======================================');
        console.log(`총 위반 건수: ${this.violations.length}`);
        
        const recentViolations = this.violations.slice(-10);
        recentViolations.forEach(v => {
            console.log(`${v.timestamp} - ${v.file}: ${v.action}`);
        });
    }
}

// CLI 실행
if (require.main === module) {
    const enforcer = new UijeongBooEnforcer();
    
    // Ctrl+C 시 리포트 출력
    process.on('SIGINT', () => {
        enforcer.generateReport();
        process.exit(0);
    });
    
    console.log('Press Ctrl+C to stop and see report');
}

module.exports = UijeongBooEnforcer;