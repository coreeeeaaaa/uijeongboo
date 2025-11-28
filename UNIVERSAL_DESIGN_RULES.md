# 🎯 범용 디자인 프레임워크 핵심 규칙

## 🚨 절대 위반 금지 규칙 (UNIVERSAL)

### 1. 완벽한 중앙정렬 강제 (CRITICAL)
- **모든 아이콘/기호는 `transform: translate(-50%, -50%)` 필수**
- **원형/사각형 컨테이너 내부 요소 픽셀 단위 정렬**
- **왼쪽 쏠림, 오른쪽 쏠림 현상 절대 금지**

```css
.center-element {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```

### 2. 레이아웃 안정성 절대 보장 (CRITICAL)
- **호버/선택 시 다른 요소 밀림 현상 절대 금지**
- **`transform: scale()` 사용 금지 → 레이아웃 파괴**
- **안정적인 `opacity`, `transform: translateY()` 만 허용**
- **덜덜 떨림, 불안정한 애니메이션 금지**

```css
/* 올바른 호버 효과 */
.stable-hover:hover {
    opacity: 0.8;
    transform: translateY(-2px); /* 다른 요소에 영향 없음 */
}

/* 금지된 효과 */
.forbidden:hover {
    transform: scale(1.1); /* 금지 - 레이아웃 밀림 */
    margin: 10px;          /* 금지 - 주변 요소 영향 */
}
```

### 3. 색상 대비 4.5:1 이상 강제 (CRITICAL)
- **배경과 텍스트 명확한 구분 필수**
- **같은 명도대 조합 절대 금지**
- **어두운 배경 = 밝은 텍스트**
- **밝은 배경 = 어두운 텍스트**

```css
/* 안전한 대비 조합 */
.dark-theme { background: #222; color: #eee; }
.light-theme { background: #eee; color: #222; }

/* 금지된 조합 */
.bad-contrast { background: #333; color: #444; } /* 금지 */
```

### 4. 텍스트 오버플로우 처리 필수 (CRITICAL)
- **모든 텍스트 요소에 ellipsis 처리 강제**
- **텍스트 밀림 현상 절대 금지**
- **반응형에서 텍스트 깨짐 방지**

```css
.text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}
```

### 5. 아이콘 표시 완전성 보장 (CRITICAL)
- **모든 아이콘이 화면에 표시되어야 함**
- **기본 CSS 스타일 누락으로 인한 렌더링 실패 금지**
- **아이콘별 기본 크기, 색상 정의 필수**

```css
.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    /* 기본 스타일 필수 */
}
```

### 6. 그림자 효과 완전 금지 (CRITICAL)
- **모든 `box-shadow` 사용 금지**
- **`filter: drop-shadow()` 금지**
- **완전한 플랫 디자인 강제**
- **깊이감은 색상 변화로만 표현**

```css
/* 올바른 플랫 디자인 */
.flat-card {
    background: #333;
    border: 1px solid #444;
    /* box-shadow: none; */
}
```

### 7. 투명 배경 버튼 강제 (CRITICAL)
- **모든 버튼은 `background: transparent` 필수**
- **Primary 버튼만 accent 색상 허용**
- **투명도 효과 대신 단색 사용**

```css
.button {
    background: transparent !important;
    border: 1px solid #666;
    color: #eee;
}

.button-primary {
    background: #32CD32 !important; /* 예외적 허용 */
    color: #000;
}
```

### 8. 복잡한 애니메이션 금지 (CRITICAL)
- **3D 효과 (`perspective`, `preserve-3d`) 금지**
- **복잡한 키프레임 애니메이션 금지**
- **과도한 CSS 체크박스 해킹 금지**
- **단순하고 부드러운 전환만 허용**

```css
/* 허용되는 단순 애니메이션 */
.simple-animation {
    transition: opacity 0.3s ease;
}

/* 금지된 복잡한 효과 */
.forbidden {
    perspective: 1000px;              /* 금지 */
    transform-style: preserve-3d;     /* 금지 */
    animation: complex-spin 2s infinite; /* 금지 */
}
```

### 9. 이모지 사용 절대 금지 (CRITICAL)
- **모든 유니코드 이모지 완전 차단**
- **아이콘은 CSS 또는 SVG로만 구현**
- **순수 텍스트 + 기하학적 아이콘만 허용**

### 10. Border 연결성 보장 (CRITICAL)
- **끊어지거나 각진 border 금지**
- **모서리 radius 값 일치 필수**
- **seamless한 연결성 보장**

```css
.connected-container {
    border-radius: 12px;
    overflow: hidden; /* 내부 요소 잘림 방지 */
}

.connected-section {
    border-radius: 12px 12px 0 0; /* 연결 부분만 둥글게 */
}
```

---

## 📋 핵심 체크리스트

**모든 UI 구현 시 필수 확인사항:**

### ✅ 필수 검증 항목
1. **중앙정렬** - 모든 아이콘 `translate(-50%, -50%)` 적용?
2. **레이아웃 안정성** - 호버 시 다른 요소 밀림 없음?
3. **색상 대비** - 배경과 텍스트 명확히 구분됨?
4. **텍스트 처리** - 긴 텍스트 ellipsis 적용?
5. **아이콘 표시** - 모든 아이콘 화면에 보임?
6. **플랫 디자인** - box-shadow 완전 제거?
7. **투명 배경** - 버튼 배경 투명 처리?
8. **단순 애니메이션** - 복잡한 3D 효과 없음?
9. **텍스트만** - 이모지 완전 제거?
10. **연결성** - border 끊김 없이 부드럽게 연결?

### 🚫 절대 금지 항목
- `transform: scale()` (레이아웃 파괴)
- `box-shadow` (플랫 디자인 위반)
- 같은 명도 색상 조합 (가독성 문제)
- 복잡한 3D 애니메이션 (과도한 복잡성)
- 이모지 사용 (일관성 파괴)
- 텍스트 오버플로우 미처리 (깨진 레이아웃)

---

## 🎯 적용 우선순위

### Priority 1 (즉시 수정 필요)
1. 중앙정렬 문제
2. 레이아웃 안정성 문제
3. 아이콘 표시 문제

### Priority 2 (품질 개선)
4. 색상 대비 문제
5. 텍스트 오버플로우
6. 그림자 효과 제거

### Priority 3 (최적화)
7. 복잡한 애니메이션 단순화
8. 투명 배경 적용
9. Border 연결성 개선

---

이 규칙들은 **어떤 프로젝트에든 적용 가능한 범용 원칙**이며, 
**사용자 경험과 디자인 품질을 보장**하는 핵심 요소들입니다.