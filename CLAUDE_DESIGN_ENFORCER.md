# 🚨 CLAUDE CODE 디자인 강제화 절대 규칙

**이 파일은 모든 Claude Code 세션에서 반드시 읽어야 하는 강제 규칙입니다**

## ⚡ 즉시 실행 명령어 (MANDATORY)

```bash
# 1. 모든 디자인 작업 전 필수 실행
source /Users/a/personaluse/agents/uijeongboo/enforce-uijeongboo-design.sh check

# 2. 자동 감시 시작 (백그라운드)
node /Users/a/personaluse/agents/uijeongboo/auto-design-enforcer.js &

# 3. 디자인 규칙 확인
cat /Users/a/personaluse/agents/uijeongboo/UIJEONGBOO_DESIGN_RULES.md
```

## 🛡️ 절대 위반 금지 체크리스트

### ❌ 즉시 차단해야 할 행동들:
1. **이모지 사용** - 🚫❌✅ 등 모든 유니코드 이모지 절대 금지
2. **라임색 외 컬러 사용** - #32CD32 외 모든 색상 금지
3. **버튼 배경색 추가** - 모든 버튼은 transparent만 허용
4. **box-shadow 사용** - 플랫 디자인 강제
5. **텍스트 오버플로우 미처리** - 모든 텍스트에 ellipsis 필수

### ✅ 강제 적용해야 할 사항들:
1. **색상 팔레트 제한**: #222~#fff 그레이스케일 + #32CD32만
2. **투명 버튼**: `background: transparent !important`
3. **텍스트 처리**: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`
4. **애니메이션 품질**: Flowing Cards 최소 150개, 200초+ 지속
5. **호버 효과**: Interactive 요소 필수 cubic-bezier 전환

## 🤖 AI 에이전트 자동 강제화 시스템

### 1. 파일 생성/수정 시 자동 검증
```javascript
// 모든 CSS/HTML 파일 변경 시 즉시 실행
const enforcer = new UijeongBooEnforcer();
enforcer.enforceDesignRules(filePath);
```

### 2. 실시간 색상 검증
```bash
# 금지된 색상 패턴 감지 시 즉시 교체
grep -r "#ff\|#00\|#blue\|#red" --include="*.css" . && echo "❌ 금지된 색상 발견!"
```

### 3. 이모지 자동 제거
```javascript
// 모든 이모지 유니코드 자동 삭제
content.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]/gu, '');
```

## 📋 Claude Code 세션별 체크리스트

### 세션 시작 시:
- [ ] UIJEONGBOO_DESIGN_RULES.md 읽기 완료
- [ ] auto-design-enforcer.js 실행 중
- [ ] 현재 디렉토리 색상 검증 통과
- [ ] 설계 작업 전 디자인 규칙 숙지

### 코드 작성 중:
- [ ] 색상 사용 전 허용 색상 확인
- [ ] 텍스트 요소에 오버플로우 처리 추가
- [ ] 버튼 요소에 투명 배경 적용
- [ ] 애니메이션 품질 기준 준수

### 세션 종료 전:
- [ ] 전체 파일 디자인 검증 실행
- [ ] 위반 사항 자동 수정 확인
- [ ] 다음 세션을 위한 규칙 파일 업데이트

## 🔒 완전 자동화 강제 시스템

### 1. Shell 환경변수 설정
```bash
export UIJEONGBOO_ENFORCE=true
export UIJEONGBOO_AUTO_FIX=true
export UIJEONGBOO_STRICT_MODE=true
```

### 2. Git Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit
node /Users/a/personaluse/agents/uijeongboo/auto-design-enforcer.js --check-only
if [ $? -ne 0 ]; then
    echo "❌ UijeongBoo 디자인 규칙 위반으로 커밋 차단!"
    exit 1
fi
```

### 3. 에디터 자동 포맷팅
```json
// VS Code settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixUijeongbooViolations": true
  }
}
```

## 🚨 긴급 복구 명령어

```bash
# 모든 파일에서 위반사항 일괄 수정
find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs node /Users/a/personaluse/agents/uijeongboo/auto-design-enforcer.js --fix-all

# 색상 팔레트 강제 적용
sed -i 's/#[fF][fF][0-9a-fA-F]\{4\}/#666666/g' **/*.css
sed -i 's/#[0-9a-fA-F]\{2\}[fF][fF][0-9a-fA-F]\{2\}/#666666/g' **/*.css

# 이모지 일괄 제거
find . -name "*.html" -o -name "*.js" | xargs sed -i 's/[🚫❌✅⚡🎨📱💻🔒🚨]//g'
```

## 📊 위반 모니터링

### 실시간 로그 확인
```bash
tail -f /Users/a/personaluse/agents/uijeongboo/design-violations.log
```

### 위반 통계 리포트
```bash
node -e "
const fs = require('fs');
const logs = fs.readFileSync('./design-violations.log', 'utf8').split('\\n').filter(Boolean);
console.log('총 위반 건수:', logs.length);
console.log('최근 위반:', logs.slice(-5));
"
```

---

**⚠️ 경고: 이 규칙들은 절대 위반할 수 없으며, 모든 AI 에이전트가 반드시 준수해야 합니다.**

**🔄 자동 업데이트: 이 파일은 매 세션마다 자동으로 확인되며, 위반 시 즉시 수정됩니다.**