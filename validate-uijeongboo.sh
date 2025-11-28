#!/bin/bash

echo "🔍 UijeongBoo 디자인 규칙 검증 중..."

# 위반 사항 카운터
violations=0

# 1. 흰색 배경 검사
echo "1. 흰색 배경 검사..."
white_bg=$(grep -r "#ffffff\|background.*white\|background:.*white" --include="*.css" --include="*.html" . 2>/dev/null)
if [ ! -z "$white_bg" ]; then
    echo "❌ 흰색 배경 발견:"
    echo "$white_bg"
    ((violations++))
else
    echo "✅ 흰색 배경 없음"
fi

# 2. 보더 검사
echo "2. 보더 사용 검사..."
borders=$(grep -r "border:" --include="*.css" --include="*.html" . | grep -v "border: none" | grep -v "border-radius" 2>/dev/null)
if [ ! -z "$borders" ]; then
    echo "❌ 금지된 보더 발견:"
    echo "$borders"
    ((violations++))
else
    echo "✅ 금지된 보더 없음"
fi

# 3. 그림자 검사
echo "3. 그림자 효과 검사..."
shadows=$(grep -r "box-shadow\|text-shadow\|drop-shadow" --include="*.css" --include="*.html" . | grep -v "none" 2>/dev/null)
if [ ! -z "$shadows" ]; then
    echo "❌ 금지된 그림자 발견:"
    echo "$shadows"
    ((violations++))
else
    echo "✅ 금지된 그림자 없음"
fi

# 4. 그라데이션 검사
echo "4. 그라데이션 효과 검사..."
gradients=$(grep -r "linear-gradient\|radial-gradient" --include="*.css" --include="*.html" . 2>/dev/null)
if [ ! -z "$gradients" ]; then
    echo "❌ 금지된 그라데이션 발견:"
    echo "$gradients"
    ((violations++))
else
    echo "✅ 금지된 그라데이션 없음"
fi

# 5. 입력창 배경 검사
echo "5. 입력창 배경 검사..."
input_bg=$(grep -r "input.*background" --include="*.css" --include="*.html" . | grep -v "#333333" 2>/dev/null)
if [ ! -z "$input_bg" ]; then
    echo "⚠️  입력창 배경 확인 필요:"
    echo "$input_bg"
fi

# 결과 출력
echo ""
if [ $violations -eq 0 ]; then
    echo "🎉 모든 UijeongBoo 규칙을 준수합니다!"
    exit 0
else
    echo "❌ $violations 개의 규칙 위반이 발견되었습니다."
    echo "위의 위반 사항을 수정해주세요."
    exit 1
fi