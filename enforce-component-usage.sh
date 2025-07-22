#!/bin/bash

# UijeongBoo Component Usage Enforcement Script
# 이 스크립트는 오직 승인된 UijeongBoo 컴포넌트만 사용되도록 강제합니다.

echo "🔍 UijeongBoo 컴포넌트 사용 검증 중..."

# 금지된 SwiftUI 컴포넌트 패턴들
FORBIDDEN_PATTERNS=(
    "\.buttonStyle\(\.bordered\)"
    "\.buttonStyle\(\.plain\)"
    "\.buttonStyle\(\.borderless\)"
    "\.buttonStyle\(\.automatic\)"
    "Color\.white"
    "Color\.black" 
    "Color\.blue"
    "Color\.red"
    "Color\.green"
    "Color\.yellow"
    "Color\.orange"
    "Color\.purple"
    "Color\.pink"
    "\.background\(Color\."
    "Background\(Color\."
    "\.foregroundColor\(\.white\)"
    "\.foregroundColor\(\.black\)"
    "\.foregroundColor\(\.blue\)"
    "\.foregroundColor\(\.red\)"
    "TextField\("
    "SecureField\("
    "Button\("
    "Toggle\("
    "NavigationView"
    "List\s*\{"
)

# 필수 UijeongBoo 컴포넌트 사용 패턴들
REQUIRED_PATTERNS=(
    "uijeongbooTransparentButton\(\)"
    "uijeongbooActiveButton\(\)"
    "Color\.uijeongboo"
    "UijeongBooTextField"
    "UijeongBooSecureField"
    "UijeongBooCard"
    "UijeongBooNavigationView"
    "UijeongBooList"
    "UijeongBooToggle"
)

VIOLATIONS_FOUND=0

# Swift 파일들 검사
echo "📁 Swift 파일들 검사 중..."
for file in $(find . -name "*.swift" -not -path "./Sources/UijeongBoo/*" 2>/dev/null); do
    if [ -f "$file" ]; then
        echo "  검사 중: $file"
        
        # 금지된 패턴 검사
        for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
            if grep -E "$pattern" "$file" >/dev/null 2>&1; then
                echo "❌ 금지된 패턴 발견: $pattern in $file"
                echo "   라인: $(grep -n -E "$pattern" "$file")"
                VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
            fi
        done
        
        # 버튼이 있는 경우 UijeongBoo 버튼 스타일 사용 확인
        if grep -E "Button\(" "$file" >/dev/null 2>&1; then
            if ! grep -E "uijeongbooTransparentButton|uijeongbooActiveButton" "$file" >/dev/null 2>&1; then
                echo "❌ Button 발견되었으나 UijeongBoo 버튼 스타일 미사용: $file"
                VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
            fi
        fi
        
        # TextField 사용 시 UijeongBooTextField 확인
        if grep -E "TextField\(" "$file" >/dev/null 2>&1; then
            if ! grep -E "UijeongBooTextField" "$file" >/dev/null 2>&1; then
                echo "❌ TextField 발견되었으나 UijeongBooTextField 미사용: $file"
                VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
            fi
        fi
    fi
done

# HTML/CSS 파일들에서 금지된 색상 검사
echo "📁 HTML/CSS 파일들 색상 검사 중..."
FORBIDDEN_COLORS="#ffffff|white|#f5f5f5|#e5e5e5|#ff0000|red|#00ff00|green|#0000ff|blue|#ffff00|yellow|#ff00ff|magenta|#00ffff|cyan|#ffa500|orange|#800080|purple|#ffc0cb|pink"

for file in $(find . -name "*.html" -o -name "*.css" -o -name "*.js" 2>/dev/null); do
    if [ -f "$file" ]; then
        if grep -E "$FORBIDDEN_COLORS" "$file" >/dev/null 2>&1; then
            echo "❌ 금지된 색상 발견: $file"
            echo "   라인: $(grep -n -E "$FORBIDDEN_COLORS" "$file" | head -3)"
            VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
        fi
    fi
done

# 결과 출력
echo ""
echo "============================================"
if [ $VIOLATIONS_FOUND -eq 0 ]; then
    echo "✅ 모든 검증 통과! UijeongBoo 컴포넌트만 사용됨"
    echo "============================================"
    exit 0
else
    echo "❌ $VIOLATIONS_FOUND 개의 위반사항 발견!"
    echo ""
    echo "해결 방법:"
    echo "1. 금지된 SwiftUI 컴포넌트 대신 UijeongBoo 컴포넌트 사용"
    echo "2. 표준 색상 대신 Color.uijeongboo* 색상 사용"
    echo "3. 커스텀 버튼 스타일 대신 .uijeongbooTransparentButton() 또는 .uijeongbooActiveButton() 사용"
    echo ""
    echo "승인된 UijeongBoo 컴포넌트 목록:"
    echo "- UijeongBooTextField (TextField 대신)"
    echo "- UijeongBooSecureField (SecureField 대신)"
    echo "- UijeongBooCard (Card 컨테이너용)"
    echo "- UijeongBooNavigationView (NavigationView 대신)"
    echo "- UijeongBooList (List 대신)"
    echo "- UijeongBooToggle (Toggle 대신)"
    echo "- .uijeongbooTransparentButton() (투명 버튼용)"
    echo "- .uijeongbooActiveButton() (액티브 버튼용)"
    echo "- Color.uijeongbooBackground, Color.uijeongbooText 등"
    echo "============================================"
    exit 1
fi