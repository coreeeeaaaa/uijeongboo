# SAAAAHA 디자인 시스템 강제화 가이드

## 🚨 에이전트에게 강제화하는 방법

### 1. 모든 대화 시작 시 필수 프롬프트 추가
```markdown
**절대 규칙**: 디자인 작업 전 반드시 실행
1. cat /Users/a/personaluse/agents/saaaaha/SAAAAHA_DESIGN_MEMORY.md
2. 디자인 관련 대화 감지 시 자동 피드백 저장
3. 라임(#32CD32), 코랄핑크(#FF7F7F) 색상 준수
```

### 2. Claude Code 설정 파일에 추가
`~/.claude-code/settings.json`
```json
{
  "design_system": {
    "enforce": true,
    "memory_file": "/Users/a/personaluse/agents/saaaaha/SAAAAHA_DESIGN_MEMORY.md",
    "auto_check": true
  }
}
```

### 3. 프로젝트별 강제화
프로젝트 루트에 `.saaaaha-design` 파일 생성:
```bash
# 이 파일이 있으면 디자인 시스템 자동 적용
echo "ENFORCE_SAAAAHA_DESIGN=true" > .saaaaha-design
```

### 4. Git Hook 설정 (강제화)
```bash
#!/bin/bash
# .git/hooks/pre-commit

# CSS 파일 변경 시 디자인 시스템 검증
if git diff --cached --name-only | grep -E '\.(css|scss|tsx|jsx)$'; then
  echo "🎨 Checking SAAAAHA Design System compliance..."
  
  # 금지된 색상 체크
  if git diff --cached | grep -E '#(?!32CD32|FF7F7F|111111|222222|333333|444444|FFFFFF|CCCCCC)'; then
    echo "❌ Forbidden colors detected! Only use SAAAAHA color palette."
    exit 1
  fi
  
  echo "✅ Design system compliance verified"
fi
```

## 🤖 에이전트 자동화 스크립트
```bash
#!/bin/bash
# auto-enforce-design.sh

# 매 대화마다 자동 실행
export SAAAAHA_ENFORCE=true

# 디자인 시스템 체크
if [ "$SAAAAHA_ENFORCE" = "true" ]; then
  echo "🎨 SAAAAHA Design System Auto-Enforced"
  cat /Users/a/personaluse/agents/saaaaha/SAAAAHA_DESIGN_MEMORY.md
fi
```

## 🔒 완전 강제화 (극단적 방법)
```bash
# 시스템 PATH에 추가하여 모든 명령어 가로채기
echo 'alias css-edit="saaaaha-design-check && css-edit"' >> ~/.bashrc
echo 'alias npm="saaaaha-design-check && npm"' >> ~/.bashrc
```