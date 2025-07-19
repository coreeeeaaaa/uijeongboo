#!/bin/bash

# SAAAAHA Design System Setup Script
# 다른 에이전트들이 디자인 시스템을 사용할 수 있도록 설정

echo "🎨 SAAAAHA Design System Setup"
echo "============================="

# 1. 환경 변수 설정
export SAAAAHA_DESIGN_PATH="/Users/a/personaluse/agents/saaaaha"
export SAAAAHA_MEMORY_FILE="$SAAAAHA_DESIGN_PATH/SAAAAHA_DESIGN_MEMORY.md"
export SAAAAHA_CONFIG_FILE="$SAAAAHA_DESIGN_PATH/.saaaaha-design/config.json"

# 2. 디자인 시스템 확인 함수
check_design_system() {
    echo "📋 Current Design System Status:"
    echo "- Memory file: $SAAAAHA_MEMORY_FILE"
    echo "- Config file: $SAAAAHA_CONFIG_FILE"
    echo "- Last updated: $(date)"
    echo ""
}

# 3. 새 피드백 추가 함수
add_feedback() {
    local feedback="$1"
    local date=$(date +"%Y-%m-%d")
    
    echo "### $date (New Feedback)" >> "$SAAAAHA_MEMORY_FILE"
    echo "- \"$feedback\"" >> "$SAAAAHA_MEMORY_FILE"
    echo "- **적용**: [에이전트가 기록]" >> "$SAAAAHA_MEMORY_FILE"
    echo "" >> "$SAAAAHA_MEMORY_FILE"
    
    echo "✅ Feedback added to design system"
}

# 4. CSS 링크 생성 함수
generate_css_link() {
    echo "<link rel=\"stylesheet\" href=\"file://$SAAAAHA_DESIGN_PATH/saaaaha-design-system/saaaaha.css\">"
}

# 5. 디자인 토큰 가져오기 함수
get_design_tokens() {
    echo "🎨 Design Tokens:"
    echo "- Primary: #32CD32 (Lime)"
    echo "- Secondary: #FF7F7F (Coral Pink)"
    echo "- Background: #111111, #222222, #333333, #444444"
    echo "- Text: #FFFFFF, #CCCCCC"
}

# 메인 실행
case "$1" in
    "check")
        check_design_system
        ;;
    "feedback")
        add_feedback "$2"
        ;;
    "css")
        generate_css_link
        ;;
    "tokens")
        get_design_tokens
        ;;
    *)
        echo "Usage: $0 {check|feedback|css|tokens}"
        echo "Examples:"
        echo "  $0 check                    # 디자인 시스템 상태 확인"
        echo "  $0 feedback '새로운 피드백'  # 피드백 추가"
        echo "  $0 css                      # CSS 링크 생성"
        echo "  $0 tokens                   # 디자인 토큰 출력"
        ;;
esac