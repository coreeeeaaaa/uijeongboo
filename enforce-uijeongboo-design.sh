#!/bin/bash
# UijeongBoo Design System Environment Setup Script

UIJEONGBOO_ROOT="/Users/a/personaluse/agents/uijeongboo"
UIJEONGBOO_ENV="$UIJEONGBOO_ROOT/uijeongboo-design-env"

setup_enforcement() {
    echo "🚀 Setting up UijeongBoo Design System enforcement..."
    
    # Create backup of current shell profile
    if [ -f ~/.zshrc ]; then
        cp ~/.zshrc ~/.zshrc.backup.$(date +%Y%m%d_%H%M%S)
        echo "📋 Backed up existing .zshrc"
    fi
    
    # Add UijeongBoo environment variables to .zshrc
    cat >> ~/.zshrc << 'EOF'

# UijeongBoo Design System Auto-Enforcement
export UIJEONGBOO_ENFORCE=true
export UIJEONGBOO_DESIGN_PATH="/Users/a/personaluse/agents/uijeongboo"
export UIJEONGBOO_PRIMARY_COLOR="#32CD32"

# Auto-activate UijeongBoo design system for design-related work
uijeongboo_check() {
    if [[ "$PWD" == *"uijeongboo"* ]] || [[ "$PWD" == *"design"* ]]; then
        if [ -f "/Users/a/personaluse/agents/uijeongboo/uijeongboo-design-env/bin/activate-uijeongboo.sh" ]; then
            source /Users/a/personaluse/agents/uijeongboo/uijeongboo-design-env/bin/activate-uijeongboo.sh
        fi
    fi
}

# Run check on directory change
chpwd() {
    uijeongboo_check
}

# Alias for manual activation
alias uijeongboo="source /Users/a/personaluse/agents/uijeongboo/uijeongboo-design-env/bin/activate-uijeongboo.sh"
EOF
    
    echo "✅ UijeongBoo enforcement added to .zshrc"
    echo "🔄 Run 'source ~/.zshrc' or restart terminal to activate"
}

remove_enforcement() {
    echo "🧹 Removing UijeongBoo Design System enforcement..."
    
    # Remove UijeongBoo section from .zshrc
    if [ -f ~/.zshrc ]; then
        sed -i.bak '/# UijeongBoo Design System Auto-Enforcement/,/alias uijeongboo=/d' ~/.zshrc
        echo "✅ Removed UijeongBoo enforcement from .zshrc"
    fi
}

check_status() {
    echo "📊 UijeongBoo Design System Status:"
    echo "===================================="
    
    if [ "$UIJEONGBOO_ENFORCE" = "true" ]; then
        echo "✅ Enforcement: ACTIVE"
    else
        echo "❌ Enforcement: INACTIVE"
    fi
    
    if [ -f "$UIJEONGBOO_ROOT/UIJEONGBOO_DESIGN_RULES.md" ]; then
        echo "✅ Design Rules: Found"
    else
        echo "❌ Design Rules: Missing"
    fi
    
    if [ -d "$UIJEONGBOO_ENV" ]; then
        echo "✅ Virtual Environment: Found"
    else
        echo "❌ Virtual Environment: Missing"
    fi
    
    echo "📁 Design Path: $UIJEONGBOO_DESIGN_PATH"
    echo "🎨 Primary Color: $UIJEONGBOO_PRIMARY_COLOR"
    
    # 색상 검증
    echo ""
    echo "🔍 현재 디렉토리 검증 중..."
    FORBIDDEN_COLORS="#ff4444|#ffaa00|#4fa8d8|#ff6b6b|#ffa500|#1e90ff|#9b59b6|#e74c3c|#f39c12|#3498db|#2ecc71|#e67e22|#9c27b0|#f44336|#ff9800|#2196f3|#4caf50|#ff5722|#795548|#607d8b"
    
    if grep -r -E "$FORBIDDEN_COLORS" --include="*.html" --include="*.css" --include="*.js" . 2>/dev/null; then
        echo "❌ 금지된 색상 발견!"
    else
        echo "✅ 색상 팔레트 준수"
    fi
}

case "$1" in
    setup)
        setup_enforcement
        ;;
    remove)
        remove_enforcement
        ;;
    check|status)
        check_status
        ;;
    *)
        echo "Usage: $0 {setup|remove|check}"
        echo ""
        echo "Commands:"
        echo "  setup  - Install UijeongBoo design system enforcement"
        echo "  remove - Remove UijeongBoo design system enforcement"
        echo "  check  - Check enforcement status"
        exit 1
        ;;
esac