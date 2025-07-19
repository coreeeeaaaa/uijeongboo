# 🎨 UijeongBoo 디자인 프레임워크 절대 규칙

## 🚨 절대 위반 금지 규칙 (NEVER VIOLATE)

### 1. 색상 제한 규칙 (ABSOLUTE)
- **라임 그린 (#32CD32)만** 포인트 컬러로 사용 가능
- **허용 색상 팔레트 (완전 제한)**:
  - #32CD32 (라임 그린 - 포인트 전용)
  - #222222, #333333, #444444, #555555, #666666, #777777, #888888, #999999 (그레이)
  - #eeeeee, #ffffff (밝은 그레이/화이트)
  - transparent (투명)
- **절대 금지 색상**: 빨강, 파랑, 노랑, 주황, 보라, 분홍 등 모든 컬러
- **위반 발견 시 즉시 그레이스케일로 교체 필수**

### 2. 버튼 배경 투명화 강제
- **모든 버튼은 반드시 투명 배경** (`background: transparent !important`)
- Primary 버튼만 예외적으로 라임 배경 허용
- 호버 상태에서도 투명 배경 유지
- `!important` 사용하여 강제 적용

### 3. 그림자 금지
- **모든 box-shadow 사용 금지**
- 플랫 디자인 강제 적용
- 깊이감은 색상 변화로만 표현

### 4. 이모지 사용 절대 금지 (CRITICAL)
- **모든 이모지 문자 사용 완전 금지** (🚫❌✅⚡🎨📱💻 등 모든 유니코드 이모지)
- **AI 에이전트는 이모지를 절대 생성하지 말 것**
- **HTML, CSS, JavaScript, 주석, 문서에서도 이모지 제거**
- **순수 텍스트만 사용 - 아이콘은 SVG나 폰트 아이콘으로 대체**
- **위반 시 즉시 수정 필요**

### 5. 텍스트 오버플로우 처리 강제 (CRITICAL)
- **모든 텍스트 요소에 오버플로우 처리 필수 적용**
- **제목/타이틀: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`**
- **설명/내용: `-webkit-line-clamp` 또는 `max-height` 제한**
- **카드/컨테이너: `overflow: hidden` 필수**
- **텍스트가 밀리거나 가려지는 현상 절대 금지**
- **모든 해상도에서 완벽한 텍스트 표시 보장**

### 6. 애니메이션 품질 강제 규칙 (CRITICAL)
- **Flowing Cards 무한 애니메이션 필수 요구사항**:
  - **한 줄당 최소 60개 카드** 생성으로 완전한 무한 루프
  - **실제 카드 데이터 순환 반복** (`i % cardData.length`)
  - **애니메이션 속도: 최소 120초** (너무 빠른 애니메이션 금지)
  - **시작부터 끝까지 빈 공간 절대 금지** (`translateX(-50%)` 시작)
  - **화면 가득 찬 상태만 표시**
- **Interactive 요소 호버 효과 필수**:
  - **메트릭 카드**: `translateY(-4px) scale(1.02)` + 라임 글로우
  - **차트 바**: `scaleY(1.1) scaleX(1.05)` + 라임 그라데이션
  - **전환 시간**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` 사용 필수
- **카드 호버 효과**: 애니메이션 멈춤 금지, 선택 효과만 적용

### 7. 폰트 시스템
- **SF Pro Display** 우선 사용
- 시스템 폰트 fallback: `system-ui, sans-serif`
- 모노스페이스: `Monaco, Menlo, monospace`

## 📁 모듈화 구조 규칙

### CSS 파일 구조
```
css/
├── core/
│   ├── variables.css      # CSS 변수 정의
│   ├── reset.css         # 리셋 스타일
│   ├── typography.css    # 타이포그래피
│   └── layout.css        # 레이아웃 시스템
├── components/
│   ├── buttons.css       # 버튼 컴포넌트
│   ├── navigation.css    # 네비게이션
│   ├── forms.css         # 폼 요소
│   ├── cards.css         # 카드 컴포넌트
│   └── animations.css    # 애니메이션
└── utilities/
    ├── spacing.css       # 여백 유틸리티
    ├── colors.css        # 색상 유틸리티
    └── responsive.css    # 반응형 유틸리티
```

### JavaScript 모듈 구조
```
js/
├── core/
│   ├── framework.js      # 프레임워크 코어
│   ├── design-enforcer.js # 디자인 규칙 강제
│   └── config.js         # 설정 관리
├── components/
│   ├── sidebar.js        # 사이드바 로직
│   ├── hamburger.js      # 햄버거 메뉴
│   ├── tabs.js           # 탭 컴포넌트
│   └── modal.js          # 모달 컴포넌트
└── utils/
    ├── dom.js            # DOM 조작
    ├── events.js         # 이벤트 관리
    └── responsive.js     # 반응형 유틸리티
```

### HTML 컴포넌트 구조
```
components/
├── layout/
│   ├── header.html       # 헤더 컴포넌트
│   ├── sidebar.html      # 사이드바 컴포넌트
│   └── footer.html       # 푸터 컴포넌트
├── ui/
│   ├── buttons.html      # 버튼 변형들
│   ├── forms.html        # 폼 요소들
│   ├── cards.html        # 카드 레이아웃
│   └── navigation.html   # 네비게이션 메뉴
└── examples/
    ├── dashboard.html    # 대시보드 예제
    ├── landing.html      # 랜딩 페이지
    └── app.html          # 앱 레이아웃
```

## 🤖 에이전트 규칙 강제화

### 필수 체크리스트
에이전트가 디자인 작업 시 반드시 확인해야 할 항목:

1. **색상 검증**
   - 라임 그린 (#32CD32) 외 색상 사용 여부
   - 그레이스케일 팔레트 준수 여부

2. **버튼 검증**
   - 모든 버튼의 투명 배경 적용 여부
   - `!important` 선언 포함 여부

3. **구조 검증**
   - 모듈화된 파일 구조 준수 여부
   - 의존성 관계 명확성

4. **반응형 검증**
   - 모바일/태블릿/데스크톱 호환성
   - 텍스트 크기 자동 조정

### 자동 검증 스크립트
```bash
# 색상 검증
grep -r "#(?!32CD32|222222|333333|444444|555555|666666|777777|888888|999999|aaaaaa|bbbbbb|cccccc|dddddd|eeeeee|ffffff)" --include="*.css" .

# 버튼 배경 검증
grep -r "background.*!important" --include="*.css" . | grep -v "transparent"

# 그림자 검증
grep -r "box-shadow" --include="*.css" .
```

## 📖 사용자 가이드

### 기본 사용법
1. CSS 파일들을 순서대로 로드
2. HTML에 `uij-` 접두사 클래스 사용
3. JavaScript 모듈 필요시 개별 import
4. 반응형 클래스 조합하여 사용

### 커스터마이징 가이드
- CSS 변수 오버라이드로 테마 변경
- 모듈별 개별 로드로 번들 크기 최적화
- 컴포넌트 조합으로 복잡한 UI 구성

## 🔧 유지보수 규칙

### 파일 수정 시
1. 해당 모듈만 수정하여 영향 범위 최소화
2. 변경사항은 반드시 문서화
3. 하위 호환성 유지
4. 테스트 페이지에서 검증 후 적용

### 새 컴포넌트 추가 시
1. 기존 패턴 준수
2. 디자인 규칙 강제 적용
3. 반응형 고려
4. 예제 코드 함께 제공

### 7. UI 우선순위 원칙 (CRITICAL)
- **아이콘이 텍스트보다 무조건 우선순위**
- **음악 재생 버튼에 "재생" 글자 절대 금지** → 플레이 아이콘만
- **정지 버튼에 "정지" 글자 절대 금지** → 스탑 아이콘만  
- **일시정지에 "일시정지" 글자 절대 금지** → 포즈 아이콘만
- **모든 기능은 아이콘으로 표현, 텍스트 설명 완전 금지**
- **사용성 디자인이 설명보다 무조건 우선순위**
- **직관적 아이콘으로 기능 표현, 텍스트 라벨 의존 금지**

### 8. 아이콘 디자인 제한 (ABSOLUTE)
- **플랫하고 단순한 아이콘만 허용**
- **복잡한 아이콘 절대 금지**
- **입체감 있는 아이콘 절대 금지**
- **기하학적, 미니멀 형태만 허용**
- **24x24px 표준 크기, 선 굵기 2px 이하**
- **단색 fill 또는 stroke만 허용**

### 9. 그라데이션 완전 금지 (ABSOLUTE)
- **모든 그라데이션 효과 절대 금지**
- **linear-gradient 사용 절대 금지**
- **radial-gradient 사용 절대 금지**
- **단색(solid color) 또는 투명(transparent)만 허용**
- **색상 전환은 hover 상태 변화로만 표현**

### 10. 그림자 효과 완전 금지 (강화)
- **모든 요소 뒤 그림자 절대 금지**
- **버튼 그림자 절대 금지**
- **카드 그림자 절대 금지**
- **텍스트 그림자(text-shadow) 절대 금지**
- **드롭 섀도우(drop-shadow) 절대 금지**
- **완전한 플랫 디자인 강제 적용**

### 11. 레이아웃 정렬 완벽성 강제 (CRITICAL)
- **중심축에 벗어난 배열 절대 금지**
- **위치가 서로 겹치거나 어긋나는 것 절대 금지**
- **요소가 밀려나거나 삐져나오는 것 절대 금지**
- **모든 요소 픽셀 단위 완벽 정렬 필수**
- **Grid/Flexbox 정확한 사용으로 완벽한 배치**
- **모든 해상도에서 레이아웃 무결성 보장**

### 12. 레이아웃 안정성 강제 (CRITICAL)
- **요소 변화시 레이아웃 밀림 절대 금지**
- **hover/select 상태에서 레이아웃 변동 금지**
- **섹션 구분선이 움직이거나 밀리는 것 금지**
- **상태 변화시 다른 요소에 영향 주는 것 금지**
- **덜덜 떨리거나 불안정한 애니메이션 금지**
- **안정적인 transform만 사용 (translate, scale)**
- **layout reflow 발생시키는 속성 변경 금지**

```css
/* 올바른 호버 효과 - 레이아웃 안정 */
.button {
    transform: translateY(0);
    transition: transform 0.3s ease;
}
.button:hover {
    transform: translateY(-2px); /* 다른 요소에 영향 없음 */
}

/* 금지된 효과 - 레이아웃 밀림 발생 */
.button:hover {
    margin-top: -2px;     /* 금지 - 다른 요소 밀림 */
    padding: 20px;        /* 금지 - 크기 변화 */
    border-width: 5px;    /* 금지 - 경계선 변화 */
}
```

### 13. 애니메이션 품질 강제 (CRITICAL)
- **버벅거리고 끊기는 애니메이션 절대 금지**
- **60fps 부드러운 애니메이션만 허용**
- **GPU 가속 속성만 사용** (transform, opacity)
- **will-change 속성으로 성능 최적화 필수**
- **정확한 연동성 없는 애니메이션 금지**
- **끊김 없는 무한 루프 보장**

```css
/* 올바른 고성능 애니메이션 */
.element {
    will-change: transform, opacity;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.element:hover {
    transform: translateY(-2px) scale(1.02);
}

/* 금지된 저성능 애니메이션 */
.element:hover {
    width: 200px;         /* 금지 - layout reflow */
    height: 100px;        /* 금지 - layout reflow */
    left: 10px;           /* 금지 - layout reflow */
}
```

### 14. 색상 대비 강제 (CRITICAL)
- **배경색과 글자색 구분 안되는 것 절대 금지**
- **모든 텍스트 최소 4.5:1 대비율 필수**
- **요소 간 색상 구분 명확성 보장**
- **접근성 기준 WCAG 2.1 AA 준수**
- **잘 안보이는 색상 조합 완전 금지**

```css
/* 올바른 색상 대비 */
.text-on-dark {
    background: #222222;
    color: #eeeeee;       /* 충분한 대비 */
}
.text-on-light {
    background: #eeeeee;
    color: #222222;       /* 충분한 대비 */
}

/* 금지된 색상 조합 */
.bad-contrast {
    background: #333333;
    color: #555555;       /* 금지 - 대비 부족 */
}
```

### 15. 수평 스크롤 갤러리 규칙 (CRITICAL)
- **수평 스크롤 갤러리는 호버 시 가로 스크롤 필수**
- **마우스를 갤러리 영역에 올리고 스크롤하면 자동 가로 스크롤**
- **다른 부분은 세로 스크롤, 갤러리만 가로 스크롤**
- **직접 호버해서 해당 영역에서 스크롤하면 가로 변환**
- **기본 세로 스크롤 동작 방해 금지**

```javascript
/* 필수 JavaScript 구현 */
gallery.addEventListener('wheel', (e) => {
    e.preventDefault();           // 기본 세로 스크롤 막기
    gallery.scrollLeft += e.deltaY; // 가로 스크롤로 변환
});
```

```css
/* 수평 갤러리 필수 스타일 */
.horizontal-gallery {
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    gap: 20px;
    scrollbar-width: thin;
    scrollbar-color: #999999 transparent;
}

.horizontal-gallery::-webkit-scrollbar-thumb {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.horizontal-gallery:hover::-webkit-scrollbar-thumb {
    opacity: 1;
}
```

이 규칙들은 **절대 위반할 수 없는 핵심 원칙**이며, 모든 에이전트와 사용자가 반드시 준수해야 합니다.