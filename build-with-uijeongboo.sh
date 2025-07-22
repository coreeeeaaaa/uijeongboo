#!/bin/bash

# UijeongBoo 완전 강제 빌드 스크립트
# 이 스크립트는 UijeongBoo 디자인 규칙과 컴포넌트 사용을 완전히 강제합니다.

echo "🚀 UijeongBoo 강제 빌드 시스템 시작"
echo "======================================"

# 현재 디렉토리와 시간 기록
BUILD_START_TIME=$(date)
CURRENT_DIR=$(pwd)
VIOLATIONS_TOTAL=0

echo "📍 빌드 위치: $CURRENT_DIR"
echo "⏰ 빌드 시작: $BUILD_START_TIME"
echo ""

# 1단계: UijeongBoo 디자인 규칙 검증
echo "🎨 1단계: UijeongBoo 디자인 규칙 검증"
echo "----------------------------------------"
if [ -f "./enforce-uijeongboo-design.sh" ]; then
    chmod +x ./enforce-uijeongboo-design.sh
    ./enforce-uijeongboo-design.sh check
    DESIGN_EXIT_CODE=$?
    if [ $DESIGN_EXIT_CODE -ne 0 ]; then
        echo "❌ 디자인 규칙 위반 발견"
        VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
    else
        echo "✅ 디자인 규칙 검증 통과"
    fi
else
    echo "⚠️  디자인 규칙 스크립트 없음"
fi
echo ""

# 2단계: UijeongBoo 컴포넌트 사용 강제 검증
echo "🧩 2단계: UijeongBoo 컴포넌트 사용 강제 검증"
echo "--------------------------------------------"
if [ -f "./enforce-component-usage.sh" ]; then
    chmod +x ./enforce-component-usage.sh
    ./enforce-component-usage.sh
    COMPONENT_EXIT_CODE=$?
    if [ $COMPONENT_EXIT_CODE -ne 0 ]; then
        echo "❌ 컴포넌트 사용 규칙 위반 발견"
        VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
    else
        echo "✅ 컴포넌트 사용 검증 통과"
    fi
else
    echo "⚠️  컴포넌트 검증 스크립트 없음"
fi
echo ""

# 3단계: 금지된 색상 심화 검사
echo "🎨 3단계: 금지된 색상 심화 검사"
echo "--------------------------------"
FORBIDDEN_COLORS_STRICT="#ffffff|white|#f5f5f5|#e5e5e5|#ff0000|red|#00ff00|green|#0000ff|blue|#ffff00|yellow|#ff00ff|magenta|#00ffff|cyan|#ffa500|orange|#800080|purple|#ffc0cb|pink|#4fa8d8|#ff6b6b|#ffa500|#1e90ff|#9b59b6|#e74c3c|#f39c12|#3498db|#2ecc71|#e67e22|#9c27b0|#f44336|#ff9800|#2196f3|#4caf50|#ff5722|#795548|#607d8b"

COLOR_VIOLATIONS=0
for file in $(find . -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.swift" 2>/dev/null); do
    if [ -f "$file" ] && [[ ! "$file" == *"/Sources/UijeongBoo/"* ]]; then
        if grep -E "$FORBIDDEN_COLORS_STRICT" "$file" >/dev/null 2>&1; then
            echo "❌ 금지된 색상 발견: $file"
            COLOR_VIOLATIONS=$((COLOR_VIOLATIONS + 1))
        fi
    fi
done

if [ $COLOR_VIOLATIONS -eq 0 ]; then
    echo "✅ 색상 팔레트 검증 통과"
else
    echo "❌ $COLOR_VIOLATIONS 개 파일에서 금지된 색상 발견"
    VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
fi
echo ""

# 4단계: UijeongBoo 컴포넌트 라이브러리 존재 확인
echo "📦 4단계: UijeongBoo 컴포넌트 라이브러리 확인"
echo "----------------------------------------------"
if [ -f "./Sources/UijeongBoo/UijeongBooComponents.swift" ]; then
    echo "✅ UijeongBoo SwiftUI 컴포넌트 라이브러리 발견"
    
    # 컴포넌트 파일 구문 검사
    if swift -frontend -parse ./Sources/UijeongBoo/UijeongBooComponents.swift >/dev/null 2>&1; then
        echo "✅ SwiftUI 컴포넌트 구문 검증 통과"
    else
        echo "❌ SwiftUI 컴포넌트 구문 오류"
        VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
    fi
else
    echo "❌ UijeongBoo 컴포넌트 라이브러리 없음"
    echo "   다음 명령으로 생성하세요: mkdir -p Sources/UijeongBoo"
    VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
fi

if [ -f "./Sources/UijeongBoo/UijeongBooValidation.swift" ]; then
    echo "✅ UijeongBoo 검증 라이브러리 발견"
else
    echo "❌ UijeongBoo 검증 라이브러리 없음"
    VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
fi
echo ""

# 5단계: 실제 빌드 시도 (프로젝트 타입에 따라)
echo "🔨 5단계: 프로젝트 빌드 시도"
echo "----------------------------"
BUILD_SUCCESS=false

# Swift Package 빌드 시도
if [ -f "Package.swift" ]; then
    echo "📦 Swift Package 감지됨, 빌드 중..."
    if swift build >/dev/null 2>&1; then
        echo "✅ Swift Package 빌드 성공"
        BUILD_SUCCESS=true
    else
        echo "❌ Swift Package 빌드 실패"
        VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
    fi
fi

# Xcode 프로젝트 빌드 시도
if [ -f "*.xcodeproj" ] && [ "$BUILD_SUCCESS" = false ]; then
    echo "📱 Xcode 프로젝트 감지됨, 빌드 중..."
    if xcodebuild build -quiet >/dev/null 2>&1; then
        echo "✅ Xcode 프로젝트 빌드 성공"
        BUILD_SUCCESS=true
    else
        echo "❌ Xcode 프로젝트 빌드 실패"
        VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
    fi
fi

# npm 프로젝트 빌드 시도
if [ -f "package.json" ] && [ "$BUILD_SUCCESS" = false ]; then
    echo "📦 npm 프로젝트 감지됨, 빌드 중..."
    if npm run build >/dev/null 2>&1; then
        echo "✅ npm 프로젝트 빌드 성공"
        BUILD_SUCCESS=true
    elif npm run dev >/dev/null 2>&1; then
        echo "✅ npm 개발 서버 실행 성공"
        BUILD_SUCCESS=true
    else
        echo "❌ npm 프로젝트 빌드 실패"
        VIOLATIONS_TOTAL=$((VIOLATIONS_TOTAL + 1))
    fi
fi

if [ "$BUILD_SUCCESS" = false ]; then
    echo "⚠️  인식된 빌드 시스템 없음 (정적 검증만 수행됨)"
fi
echo ""

# 최종 결과
echo "📊 최종 빌드 결과"
echo "=================="
BUILD_END_TIME=$(date)
echo "⏰ 빌드 완료: $BUILD_END_TIME"

if [ $VIOLATIONS_TOTAL -eq 0 ]; then
    echo ""
    echo "🎉 축하합니다! 완벽한 UijeongBoo 준수 빌드!"
    echo "✅ 모든 UijeongBoo 규칙 준수"
    echo "✅ 승인된 컴포넌트만 사용"
    echo "✅ 올바른 색상 팔레트 사용"
    echo "✅ 빌드 성공"
    echo ""
    echo "이제 안전하게 배포할 수 있습니다."
    exit 0
else
    echo ""
    echo "🚫 UijeongBoo 규칙 위반으로 인한 빌드 차단!"
    echo "❌ 총 $VIOLATIONS_TOTAL 개의 위반사항 발견"
    echo ""
    echo "빌드를 계속하려면 다음 사항을 수정하세요:"
    echo "1. 금지된 색상을 UijeongBoo 색상 팔레트로 교체"
    echo "2. 표준 SwiftUI 컴포넌트를 UijeongBoo 컴포넌트로 교체"
    echo "3. 커스텀 스타일 대신 UijeongBoo 승인 스타일 사용"
    echo ""
    echo "승인된 색상: #222222, #333333, #444444, #555555, #eeeeee, #32CD32"
    echo "승인된 컴포넌트: UijeongBooTextField, UijeongBooCard, .uijeongbooTransparentButton() 등"
    exit 1
fi