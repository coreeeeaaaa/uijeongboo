# 🎨 UijeongBoo 디자인 프레임워크 절대 규칙

## 🚨 절대 위반 금지 규칙 (NEVER VIOLATE)

### 1. 색상 제한 규칙 (ABSOLUTE)
- **라임 그린 (#32CD32)만** 포인트 컬러로 사용 가능
- **허용 색상 팔레트 (완전 제한)**:
  - #32CD32 (라임 그린 - 포인트 전용)
  - #222222, #333333, #444444, #555555, #666666, #777777, #888888, #999999 (그레이)
  - #eeeeee (밝은 그레이만 허용)
  - transparent (투명)
- **흰색 (#ffffff) 완전 금지**: 입력창, 카드, 배경 등 모든 곳에서 흰색 사용 절대 금지
- **절대 금지 색상**: 빨강, 파랑, 노랑, 주황, 보라, 분홍, **흰색** 등 모든 컬러
- **위반 발견 시 즉시 그레이스케일로 교체 필수**

### 2. 버튼 배경 투명화 강제
- **모든 버튼은 반드시 투명 배경** (`background: transparent !important`)
- Primary 버튼만 예외적으로 라임 배경 허용
- 호버 상태에서도 투명 배경 유지
- `!important` 사용하여 강제 적용

### 3. 완전한 플랫 디자인 강제 (CRITICAL)
- **모든 box-shadow 사용 금지**
- **모든 border 사용 완전 금지** (카드, 입력창, 버튼, 아이콘, 모든 요소)
- **테두리는 개발자 허락 시에만 예외적으로 사용 가능**
- **아이콘에 테두리 절대 금지** - 기본적으로 완전 금지
- **모든 padding 최소화** (4px, 8px, 12px, 16px만 허용)
- **카드 배경: #444444만 허용** (흰색, 회색 배경 금지)
- **입력창 배경: #333333만 허용** (흰색 배경 절대 금지)
- **완전 플랫 디자인**: 입체감, 깊이감, 테두리 모두 금지
- **깊이감은 오직 색상 변화로만 표현**
- **섹션 내부 카드/아이템은 배경색 제거** (미니멀 디자인 원칙)
- **채팅 메시지는 배경색만으로 구분** (테두리/사이드 보더 금지)
- **모든 요소는 border-radius: 8px 적용** (둥근 모서리 필수)

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

### 6. 메뉴 호버 안정성 절대 규칙 (CRITICAL)
- **메뉴 호버 시 떨림/흔들림 절대 금지**
- **font-weight 변경으로 인한 레이아웃 변화 금지**
- **transform, translateY 등으로 인한 위치 이동 금지**
- **호버 시 크기/위치 변화 없이 색상 변경만 허용**
- **안정적이고 부드러운 호버 효과만 사용**
- **메뉴 아이템 크기 고정 필수**

### 7. 완벽한 중앙 정렬 절대 규칙 (CRITICAL)
- **모든 아이콘/버튼은 완벽한 수학적 중앙 정렬 필수**
- **절대 위치(left: Npx, top: Npx) 사용 금지**
- **반드시 `left: 50%; top: 50%; transform: translate(-50%, -50%)` 사용**
- **재생 버튼 삼각형: `translateX(2px)` 추가로 시각적 중앙 보정**
- **원형 버튼 내 아이콘들은 픽셀 단위 정확성 필수**
- **한쪽으로 기울어진 아이콘/버튼 절대 금지**
- **모든 UI 요소의 기하학적 중심 일치 강제**

### 8. 프론트엔드 사용성 극대화 절대 강력 규칙 (ULTIMATE CRITICAL)
- **절대로 로딩 화면을 만들지 마세요**
- **사용자는 구동을 원하는 것이지, 구동을 방해하는 것을 원하지 않습니다**
- **앱은 항상 바로 최근 사용하던 화면으로 즉시 이동해야 합니다**
- **인증 상태 확인 중이어도 UI는 즉시 표시되어야 합니다**

#### 🚀 프론트엔드 최적화 절대 원칙
- **순간적 경량화**: 수만개 글자 로딩도 즉시 처리 (청크화/가상스크롤)
- **경량화 + 고도화 + 고속화 동시 달성 필수**
- **브라우저 메모리 사용 최소화 강제**
- **시스템 메모리 사용 최소화 강제**
- **백엔드 버벅거림과 무관하게 프론트엔드 사용자 경험 극대화 최우선**

#### 🎯 백엔드 독립성 보장
- **백엔드 연동을 프론트엔드가 기다리게 절대 금지**
- **모든 로딩/스피너는 최대 1초까지만 허용**
- **1초 내 완료 불가 시 프론트엔드 먼저 구동 필수**
- **캐시/임시데이터 활용으로 즉시 UI 표시 강제**
- **최경량화된 첫 페이지로 즉시 서비스 이용 가능해야 함**
- **백엔드 저장/로딩/구동 지연과 무관하게 프론트엔드는 즉시 반응**
- **표면적 사용자 경험은 항상 완벽해야 함**

#### ⚡ 성능 및 안정성 보장
- **버퍼링, 대기, 지연 등 모든 사용성 방해 요소 금지**
- **로컬시스템과 충돌 절대 금지**
- **브라우저와 충돌 절대 금지** 
- **실제 프로젝트/서버와 충돌 절대 금지**
- **청크화/가상스크롤로 대용량 데이터 처리**
- **메모리 효율성과 사용성 극대화 동시 달성**

### 9. UijeongBoo 컴포넌트 강제 사용 절대 규칙 (ULTIMATE CRITICAL)
- **사이드바, 버튼, 애니메이션 등 모든 UI는 오직 UijeongBoo 컴포넌트만 사용**
- **왼쪽/오른쪽 사이드바는 승인된 컴포넌트에서만 선택**
- **채팅 UI는 승인된 채팅 컴포넌트에서만 선택**
- **애니메이션은 승인된 애니메이션 라이브러리에서만 선택**
- **버튼은 승인된 버튼 컴포넌트에서만 선택**

### 9.1 표준 사이드바 레이아웃 절대 규칙 (MANDATORY)
- **왼쪽 사이드바: 기능, 프로그램 내부 기능, 필요한 도구들**
  - 컴포넌트 라이브러리, 데모 페이지, 도구, 메인 기능
- **오른쪽 사이드바: 시스템 관리, 로그인, 회원 관리, 결제 관리**  
  - 사용자 계정, 권한 관리, 결제/청구, 시스템 설정
- **이 레이아웃은 모든 UijeongBoo 기반 프로젝트에서 절대 준수**
- **사이드바 용도 변경이나 역할 바꾸기 절대 금지**

#### 🚫 컴포넌트 외부 요소 절대 금지
- **컴포넌트에 없는 UI 요소 생성 완전 금지**
- **커스텀 사이드바/버튼/애니메이션 제작 절대 금지**
- **외부 라이브러리 UI 컴포넌트 사용 절대 금지**
- **Bootstrap, Material-UI, Tailwind 등 외부 컴포넌트 금지**

#### ⚡ 승인된 컴포넌트 기반 확장 원칙
- **필요한 요소가 없을 경우: 컴포넌트 내 비슷한 요소를 기반으로 적용**
- **기존 컴포넌트의 변형만 허용 (색상/크기 조정 등)**
- **새로운 UI 패턴은 기존 컴포넌트 조합으로만 구현**
- **승인된 컴포넌트의 CSS 속성 변경을 통한 확장만 허용**
- **UijeongBoo 디자인 시스템 내에서만 모든 UI 구성**

#### 🔒 절대적 강력 규제
- **개발자는 오직 승인된 컴포넌트 라이브러리에서만 선택 가능**
- **컴포넌트 라이브러리 외부의 모든 UI 시도 즉시 차단**
- **디자인 시스템 무결성 보장을 위한 완전 통제**
- **일관성 있는 사용자 경험 강제 보장**

### 10. JavaScript 최소화 및 HTML/CSS 우선 원칙 (CRITICAL)
- **모든 인터랙션을 HTML/CSS로 구현** (JavaScript 최소화)
- **메뉴 시스템**: CSS `:target` 또는 `input[type="radio"]` 사용
- **모달/팝업**: CSS `input[type="checkbox"]` + `label` 조합 활용
- **탭 시스템**: CSS `input[type="radio"]` + `label` 조합 활용
- **아코디언**: CSS `details` + `summary` 태그 또는 체크박스 활용
- **호버 효과**: 순수 CSS `:hover`, `:focus`, `:active` 사용
- **상태 관리**: CSS `input` 상태와 `~`, `+` 선택자 활용
- **JavaScript는 오직 필수 불가피한 경우만** (API 호출, 복잡한 계산 등)
- **DOM 조작 최소화**, CSS 상태 변경 우선
- **이벤트 리스너 대신 CSS 상태 선택자 활용**

### 7. 애니메이션 품질 강제 규칙 (CRITICAL)
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

### HTML/CSS 우선 구현 패턴 (FRAMEWORK STANDARD)

#### 메뉴 시스템 표준 패턴
```html
<!-- CSS만으로 메뉴 시스템 구현 -->
<div class="uij-menu-system">
    <input type="radio" name="menu" id="dashboard" checked>
    <input type="radio" name="menu" id="projects">
    <input type="radio" name="menu" id="settings">
    
    <nav class="uij-menu">
        <label for="dashboard" class="uij-menu-item">Dashboard</label>
        <label for="projects" class="uij-menu-item">Projects</label>
        <label for="settings" class="uij-menu-item">Settings</label>
    </nav>
    
    <div class="uij-pages">
        <div class="uij-page" id="dashboard-content">Dashboard Content</div>
        <div class="uij-page" id="projects-content">Projects Content</div>
        <div class="uij-page" id="settings-content">Settings Content</div>
    </div>
</div>
```

#### 모달/팝업 표준 패턴
```html
<!-- CSS만으로 모달 구현 -->
<input type="checkbox" id="modal-toggle" class="uij-modal-toggle">
<label for="modal-toggle" class="uij-modal-trigger">Open Modal</label>
<div class="uij-modal">
    <div class="uij-modal-content">
        <label for="modal-toggle" class="uij-modal-close">×</label>
        <p>Modal Content</p>
    </div>
</div>
```

#### 사이드바 표준 패턴
```html
<!-- CSS만으로 사이드바 구현 -->
<input type="checkbox" id="sidebar-toggle" class="uij-sidebar-toggle">
<label for="sidebar-toggle" class="uij-sidebar-trigger">메뉴</label>
<div class="uij-sidebar">
    <nav class="uij-sidebar-nav">
        <a href="#" class="uij-nav-item">Menu 1</a>
        <a href="#" class="uij-nav-item">Menu 2</a>
    </nav>
</div>
<div class="uij-overlay"></div>
```

### JavaScript 최소화 구조 (사용시에만)
```
js/
├── core/
│   ├── framework.js      # 프레임워크 코어 (필수시만)
│   └── config.js         # 설정 관리 (필수시만)
├── api/
│   ├── data.js           # 데이터 처리 (필수시만)
│   └── communication.js  # 서버 통신 (필수시만)
└── utils/
    ├── validation.js     # 입력 검증 (필수시만)
    └── calculation.js    # 복잡한 계산 (필수시만)
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

---

## 📋 최종 검증 체크리스트 (CRITICAL)

### ✅ 필수 확인 항목 (AI 에이전트용)
1. **흰색 배경 완전 제거** - 모든 #ffffff, white 배경 검색 및 삭제
2. **입력창 다크 테마 강제** - 모든 input 요소 #333333 배경 적용
3. **카드 다크 테마 강제** - 모든 카드 요소 #444444 배경 적용  
4. **모든 border 완전 제거** - 카드, 입력창, 컨테이너 border 삭제
5. **이모지 제거 완료** - 모든 파일에서 이모지 검색 및 제거
6. **텍스트 오버플로우 처리** - 모든 텍스트 요소 ellipsis 적용
7. **색상 팔레트 엄격 준수** - 라임 그린과 그레이스케일만 사용
8. **버튼 투명 배경 강제** - Primary 제외 모든 버튼 transparent
9. **그림자 완전 제거** - 모든 box-shadow, text-shadow 속성 삭제
10. **완전 플랫 디자인** - 입체감, 깊이감, 테두리 모두 제거

### 🚫 절대 금지 검증 (NEVER ALLOW)
```css
/* AI 에이전트는 이런 코드를 절대 생성하지 말 것 */
background: #ffffff;           /* 흰색 배경 금지 */
background: white;             /* 흰색 배경 금지 */
border: 1px solid #ddd;        /* 모든 보더 금지 */
box-shadow: 0 2px 4px rgba;    /* 모든 그림자 금지 */
padding: 24px;                 /* 비허용 패딩 금지 */
color: #ff0000;                /* 비허용 색상 금지 */
```

### ✅ 강제 사용 검증 (MUST USE)
```css
/* AI 에이전트는 이런 코드만 생성할 것 */
.input-element {
    background: #333333 !important;
    color: #eeeeee !important;
    border: none !important;
}

.card-element {
    background: #444444 !important;
    color: #eeeeee !important;
    border: none !important;
    padding: 16px !important;
}

.button-element {
    background: transparent !important;
    color: #eeeeee !important;
    border: 1px solid #555555 !important;
}
```

### 🔍 자동 검증 명령어
```bash
# 흰색 배경 검사
grep -r "#ffffff\|white" --include="*.css" .

# 보더 검사  
grep -r "border:" --include="*.css" .

# 그림자 검사
grep -r "box-shadow\|text-shadow" --include="*.css" .

# 이모지 검사
grep -r "[\u{1F600}-\u{1F64F}]" --include="*.html" --include="*.js" .
```

이 체크리스트를 **모든 AI 에이전트가 코드 생성 전에 반드시 확인**해야 합니다.

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

### 9. 입력창 및 폼 요소 강제 규칙 (CRITICAL)
- **모든 입력창 배경: #333333 고정**
- **입력창 텍스트 색상: #eeeeee 고정**
- **placeholder 색상: #888888 고정**
- **모든 border 제거**: `border: none !important`
- **focus 시에도 border 금지**: `outline: 2px solid #32CD32`만 허용
- **흰색 배경 절대 금지** - 입력창에서 흰색 배경 사용 시즉시 수정

### 10. 카드 및 컨테이너 강제 규칙 (CRITICAL)
- **모든 카드 배경: #444444 고정**
- **카드 텍스트: #eeeeee 고정**
- **모든 border, box-shadow 제거**
- **카드 간격: 16px gap만 허용**
- **패딩: 16px 고정** (8px, 12px, 20px 등 금지)
- **border-radius: 8px 또는 12px만 허용**

### 11. 절대 금지 스타일 목록 (NEVER USE)
```css
/* 절대 사용 금지 */
background: #ffffff;        /* 흰색 배경 금지 */
background: white;          /* 흰색 배경 금지 */
border: 1px solid #ddd;     /* 모든 보더 금지 */
border: 1px solid #ccc;     /* 모든 보더 금지 */
border: 1px solid #999;     /* 모든 보더 금지 */
box-shadow: any;            /* 모든 그림자 금지 */
padding: 24px;              /* 허용된 패딩 외 금지 */
padding: 20px;              /* 허용된 패딩 외 금지 */
color: #000000;             /* 순수 검정 텍스트 금지 */
```

### 12. 강제 적용 스타일 (MUST USE)
```css
/* 반드시 사용해야 할 스타일 */
.uij-input {
    background: #333333 !important;
    color: #eeeeee !important;
    border: none !important;
    padding: 12px !important;
    border-radius: 8px !important;
}

.uij-card {
    background: #444444 !important;
    color: #eeeeee !important;
    border: none !important;
    padding: 16px !important;
    border-radius: 8px !important;
}

.uij-button {
    background: transparent !important;
    color: #eeeeee !important;
    border: 1px solid #555555 !important;
    padding: 8px 16px !important;
}

.uij-button-primary {
    background: #32CD32 !important;
    color: #000000 !important;
    border: none !important;
}
```

### 13. 그라데이션 완전 금지 (ABSOLUTE)
- **모든 그라데이션 효과 절대 금지**
- **linear-gradient 사용 절대 금지**
- **radial-gradient 사용 절대 금지**
- **단색(solid color) 또는 투명(transparent)만 허용**
- **색상 전환은 hover 상태 변화로만 표현**

### 10. 그림자/빛번짐 효과 완전 금지 (강화)
- **모든 요소 뒤 그림자 절대 금지**
- **버튼 그림자 절대 금지**
- **카드 그림자 절대 금지**
- **텍스트 그림자(text-shadow) 절대 금지**
- **드롭 섀도우(drop-shadow) 절대 금지**
- **빛번짐 효과 절대 금지**
- **글로우(glow) 효과 절대 금지**
- **블러(blur) 효과 절대 금지**
- **완전한 플랫 디자인 강제 적용**

```css
/* 절대 금지되는 그림자/빛번짐 효과들 */

/* 금지: box-shadow 모든 형태 */
.forbidden-shadow {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);     /* 금지 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);     /* 금지 */
    box-shadow: 0 0 20px rgba(50,205,50,0.5);  /* 금지 - 라임 글로우도 금지 */
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); /* 금지 - 내부 그림자도 금지 */
}

/* 금지: text-shadow 모든 형태 */
.forbidden-text-shadow {
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);  /* 금지 */
    text-shadow: 0 0 10px #32CD32;             /* 금지 - 텍스트 글로우도 금지 */
}

/* 금지: filter 그림자 효과들 */
.forbidden-filter {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); /* 금지 */
    filter: blur(2px);                              /* 금지 */
    filter: glow(color=#32CD32, strength=3);        /* 금지 */
}

/* 금지: backdrop-filter 빛번짐 */
.forbidden-backdrop {
    backdrop-filter: blur(10px);    /* 금지 */
}

/* 올바른 플랫 디자인 - 그림자 없음 */
.correct-flat-design {
    /* 그림자 대신 색상 변화로 깊이감 표현 */
    background: #333333;
    border: 1px solid #444444;
    /* box-shadow: none; - 기본값이므로 생략 가능 */
}

.correct-hover-effect {
    /* 그림자 대신 transform으로 효과 */
    transform: translateY(-2px);
    background: #444444; /* 색상 변화만 */
}
```

**완전 금지 목록:**
- `box-shadow` (모든 형태)
- `text-shadow` (모든 형태)  
- `filter: drop-shadow()`
- `filter: blur()`
- `filter: glow()`
- `backdrop-filter: blur()`
- 모든 빛번짐, 글로우, 블러 효과
- 내부 그림자(inset shadow)도 금지

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
- **4.5:1 이상 대비율 강제 - 계산으로 검증 필수**
- **배경과 텍스트가 명확히 구분되어야 함**
- **읽기 어려운 모든 조합 자동 차단**

**허용되는 안전한 조합만:**
```css
/* 강제 승인된 조합들만 사용 */
.dark-bg-light-text {
    background: #222222;    /* 어두운 배경 */
    color: #eeeeee;         /* 밝은 텍스트 */
}
.light-bg-dark-text {
    background: #eeeeee;    /* 밝은 배경 */
    color: #222222;         /* 어두운 텍스트 */
}
.dark-bg-accent {
    background: #222222;    /* 어두운 배경 */
    color: #32CD32;         /* 라임 강조 */
}
.transparent-accent {
    background: transparent;
    color: #32CD32;         /* 라임만 */
}
```

**절대 원칙:**
- **어두운 배경(#222-#555) = 밝은 텍스트(#eee-#fff) 필수**
- **밝은 배경(#eee-#fff) = 어두운 텍스트(#222-#555) 필수**  
- **같은 명도대 조합 완전 금지**
- **대비율 4.5:1 미만 모든 조합 자동 거부**

/* 버튼별 강제 색상 조합 */
.primary-button {
    background: #32CD32 !important;
    color: #000000 !important;   /* 라임 배경에 검정 글씨 */
}
.secondary-button {
    background: transparent !important;
    color: #eeeeee !important;
    border: 1px solid #eeeeee !important;
}
.outline-button {
    background: transparent !important;
    color: #32CD32 !important;
    border: 1px solid #32CD32 !important;
}
.ghost-button {
    background: transparent !important;
    color: #999999 !important;
}
.danger-button {
    background: transparent !important;
    color: #eeeeee !important;
    border: 1px solid #eeeeee !important;
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

### 16. 접근성 UI 표시 완전 금지 (CRITICAL)
- **브라우저 접근성 도구 표시 완전 금지**
- **탭 순서 표시 아이콘 절대 금지**
- **포커스 링 제거 필수**
- **접근성 오버레이 숨김 필수**
- **깔끔한 UI 유지 강제**
- **모든 브라우저 확장 프로그램 접근성 표시 차단**

```css
/* 접근성 UI 완전 제거 */
*:focus {
    outline: none !important;
    box-shadow: none !important;
}

*:focus-visible {
    outline: none !important;
}

*[tabindex] {
    outline: none !important;
}

/* 브라우저 확장 프로그램 접근성 요소 숨김 */
[data-*^="accessibility"],
[class*="accessibility"],
[id*="accessibility"],
[class*="focus"],
[data-*^="focus"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
}

/* 접근성 오버레이 완전 차단 */
body::after,
body::before,
html::after,
html::before {
    display: none !important;
}
```

### 17. 원형 요소 중앙정렬 강제 (CRITICAL)
- **모든 원형 요소(border-radius: 50%) 내부 완벽 중앙정렬 필수**
- **글자, 기호, 아이콘이 정확히 중앙에 위치해야 함**
- **베이스라인 문제로 인한 쏠림 현상 절대 금지**
- **원형 버튼, 아바타, 아이콘 모두 적용**
- **픽셀 단위 완벽 정렬 보장**

```css
/* 원형 요소 필수 중앙정렬 */
.circle-element,
[style*="border-radius: 50%"],
[style*="border-radius:50%"] {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
    text-align: center !important;
}

/* 원형 버튼 완벽 중앙정렬 */
.circle-button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50%;
    line-height: 1 !important;
    font-family: monospace; /* 등폭 폰트로 정확한 정렬 */
}

/* 원형 내부 텍스트/기호 중앙정렬 */
.circle-button::before,
.circle-button::after {
    position: absolute;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
}

/* 특수 기호들 중앙정렬 */
.play-button::after {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-40%, -50%) !important; /* 플레이 버튼은 시각적 중앙 */
}

/* 일시정지 기호 (||) 중앙정렬 */
.pause-button::after,
.pause-button::before {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
}
```

**강제 적용 규칙:**
- 모든 원형 요소는 `display: flex + align-items: center + justify-content: center` 필수
- `line-height: 1` 강제 적용으로 베이스라인 문제 해결
- `transform: translate(-50%, -50%)` 사용하여 정확한 픽셀 정렬
- 등폭 폰트 사용으로 기호 정렬 정확성 보장

### 18. 무한 스크롤/플로잉 애니메이션 강제 (CRITICAL)
- **모든 무한 스크롤과 플로잉 애니메이션은 시작과 끝이 없어야 함**
- **완벽한 순환 루프 필수 - 빈 공간이나 끊김 절대 금지**
- **기존 요소들을 순환 반복하여 무한 효과 생성**
- **시각적으로 연속성이 보장되어야 함**
- **애니메이션 재시작이나 갑작스런 점프 금지**

```css
/* 무한 플로잉 애니메이션 필수 구조 */
.flowing-container {
    overflow: hidden;
    display: flex;
    width: 100%;
}

.flowing-content {
    display: flex;
    animation: infiniteFlow linear infinite;
    /* 요소들이 끊김없이 연결되도록 충분한 개수 생성 */
}

@keyframes infiniteFlow {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
```

```javascript
/* JavaScript로 순환 요소 생성 필수 */
function createInfiniteFlow(container, items, itemWidth) {
    const containerWidth = container.offsetWidth;
    const totalNeeded = Math.ceil(containerWidth / itemWidth) * 3; // 3배수로 여유있게
    
    // 기존 아이템들을 순환 반복
    for (let i = 0; i < totalNeeded; i++) {
        const item = items[i % items.length].cloneNode(true);
        container.appendChild(item);
    }
}
```

**필수 요구사항:**
- **시작점과 끝점이 완벽하게 연결되어 무한 루프**
- **기존 데이터 순환 반복** (`i % dataArray.length`)
- **빈 공간 없이 화면 가득 채움**
- **부드러운 애니메이션 속도** (최소 60초 이상)
- **끊김 없는 연속성** 보장

**금지 사항:**
- 애니메이션 중간에 빈 공간 발생
- 갑작스러운 재시작이나 점프
- 요소 부족으로 인한 끊김 현상
- 너무 빠른 애니메이션 속도

### 19. Border 연결성 완전 강제 (CRITICAL)
- **모든 border들은 끊기지 않고 부드럽게 연결되어야 함**
- **모서리가 둥글게 처리되면서 완벽하게 연결 필수**
- **끊어지거나 어색한 border 처리 절대 금지**
- **seamless한 border 연속성 강제**
- **모든 경계선의 완벽한 시각적 통일성 보장**

### 20. 채팅/메시지 UI 그림자 완전 금지 (CRITICAL)
- **모든 메시지 박스 그림자 효과 절대 금지**
- **채팅 컨테이너 drop-shadow 완전 차단**
- **카드형 메시지의 모든 그림자 제거 필수**
- **완전한 플랫 메시지 디자인 강제**
- **그림자 대신 border와 배경색 변화로만 구분**

```css
/* 올바른 플랫 채팅 메시지 디자인 */
.message-container {
    background: #333333;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 8px;
    /* box-shadow: none; - 그림자 완전 금지 */
}

.user-message {
    background: #444444;
    border: 1px solid #555555;
    color: #eeeeee;
    margin-left: auto;
    max-width: 80%;
}

.ai-message {
    background: #333333;
    border: 1px solid #32CD32;
    color: #eeeeee;
    margin-right: auto;
    max-width: 80%;
}

/* 절대 금지된 그림자 효과들 */
.forbidden-message {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);     /* 금지 */
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); /* 금지 */
    box-shadow: 0 4px 12px rgba(50,205,50,0.3); /* 금지 - 라임 글로우도 금지 */
}

.forbidden-chat-container {
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); /* 금지 - 내부 그림자 */
    backdrop-filter: blur(10px);                  /* 금지 - 블러 효과 */
}
```

**강제 적용 원칙:**
- **완전한 플랫 디자인** - 모든 그림자 효과 제거
- **border + 배경색만으로 구분** - 그림자 없이도 명확한 구분
- **라임 그린 accent만 허용** - 그림자 대신 테두리 색상으로 강조
- **rgba 투명도 금지** - 모든 그림자/글로우 효과 차단

```css
/* 올바른 부드러운 모서리 처리 */
.card-container {
    border-radius: 12px;          /* 일관된 모서리 반경 */
    overflow: hidden;             /* 내부 요소 잘림 방지 */
    border: 1px solid #444444;    /* 연속된 경계선 */
}

.image-area {
    border-radius: 12px 12px 0 0; /* 상단만 둥글게 */
    border: none;                  /* 중복 경계선 제거 */
    display: block;                /* 빈 공간 제거 */
}

.content-area {
    border-radius: 0 0 12px 12px;  /* 하단만 둥글게 */
    border-top: 1px solid #444444; /* 구분선만 */
}

/* 금지된 각진/끊긴 처리들 */
.broken-container {
    border-radius: 0;              /* 금지 - 완전 각진 모서리 */
    border: 1px solid #444444;
    border-bottom: none;           /* 금지 - 경계선 끊김 */
}

.jagged-image {
    border-radius: 8px;            /* 금지 - 불일치하는 반경 */
    border: 2px solid #555555;     /* 금지 - 중복 경계선 */
}

.disconnected-section {
    margin-top: 2px;               /* 금지 - 끊김 유발하는 여백 */
    border-top: 1px solid #333333; /* 금지 - 색상 불일치 */
}
```

**강제 적용 규칙:**
- **border-radius 값 완벽 일치** - 연결되는 요소들의 모서리 반경 통일
- **경계선 연속성 보장** - 끊어지거나 색상이 다른 경계선 금지
- **overflow: hidden 필수** - 내부 요소가 삐져나와 각져 보이는 현상 방지
- **seamless 연결** - 카드 내부 구역들의 완벽한 시각적 연결
- **일관된 spacing** - 불규칙한 여백으로 인한 끊김 현상 방지

**절대 금지 사항:**
- 경계선이 중간에 끊어지는 디자인
- 서로 다른 border-radius 값으로 인한 각짐
- 컨테이너와 내부 요소의 불일치하는 모서리 처리
- 색상이나 굵기가 다른 경계선의 혼재
- 여백으로 인해 연결성이 깨지는 레이아웃

### 21. 캐러셀/슬라이더 완전성 강제 (CRITICAL)
- **모든 슬라이드에 대한 CSS 규칙 완전 구현 필수**
- **누락된 :checked 상태 처리 절대 금지**
- **복잡한 3D 효과 대신 단순한 슬라이드 전환만 허용**
- **perspective, transform-style: preserve-3d 사용 금지**
- **과도한 CSS 체크박스 해킹 금지**

```css
/* 올바른 단순 캐러셀 */
.simple-carousel {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    scroll-behavior: smooth;
    /* 3D 효과 없는 단순한 구조 */
}

.carousel-item {
    flex: 0 0 300px;
    background: #333333;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    /* transform: none; - 복잡한 3D 변환 금지 */
}

/* 금지된 복잡한 3D 캐러셀 */
.forbidden-carousel {
    perspective: 1000px;              /* 금지 */
    transform-style: preserve-3d;     /* 금지 */
}

.forbidden-card {
    transform: rotateY(45deg) translateZ(100px); /* 금지 - 복잡한 3D */
    backface-visibility: hidden;      /* 금지 */
}
```

**강제 원칙:**
- **모든 슬라이드 상태 완전 구현** - 누락 금지
- **단순한 가로 스크롤 방식** - 3D 효과 금지  
- **CSS 체크박스 해킹 최소화** - 과도한 복잡성 차단
- **scroll-behavior: smooth** - 자연스러운 전환

### 22. 복잡한 실시간 효과 완전 금지 (CRITICAL)
- **"AI 대화 실시간 효과" 같은 복잡한 시뮬레이션 절대 금지**
- **typing 효과, 실시간 애니메이션 금지**
- **과도한 CSS 체크박스 해킹 금지**
- **단순하고 정적인 UI만 허용**

### 23. 음악/미디어 플레이어 중앙정렬 강제 (CRITICAL)
- **일시정지 버튼(||)이 왼쪽으로 쏠리는 현상 절대 금지**
- **재생 버튼 중앙정렬 완벽 보장**
- **모든 미디어 컨트롤 픽셀 단위 정렬**

### 24. 검색 아이콘 완벽 중앙정렬 강제 (CRITICAL)
- **모든 검색 아이콘 `translate(-50%, -50%)` 필수**
- **잘못된 `translate(-60%, -60%)` 사용 금지**
- **검색 핸들 위치 정확한 배치**

### 25. 선택/호버 시 레이아웃 밀림 금지 (CRITICAL)
- **요소 선택 시 다른 요소 밀리는 현상 금지**
- **호버 상태에서 덜덜 떨림 금지**
- **안정적인 transform만 사용**

### 26. 색상 대비 4.5:1 이상 강제 (CRITICAL)
- **검정 배경 + 검정 글씨 조합 절대 금지**
- **밝은 배경 + 밝은 글씨 조합 절대 금지**
- **대비율 계산으로 자동 검증**
- **읽기 어려운 모든 조합 차단**

### 27. 수평 스크롤 갤러리 호버 전환 강제 (CRITICAL)
- **갤러리 영역 호버 시 가로 스크롤 필수**
- **세로 스크롤을 가로로 자동 변환**
- **wheel 이벤트 preventDefault 필수**

### 28. 접근성 UI 완전 차단 (CRITICAL)
- **탭 순서 아이콘 절대 표시 금지**
- **브라우저 접근성 도구 숨김**
- **깔끔한 UI 유지 강제**

### 29. 무한 애니메이션 순환 보장 (CRITICAL)
- **시작과 끝 없는 완벽한 순환**
- **기존 데이터 반복으로 무한 효과**
- **빈 공간이나 끊김 절대 금지**

### 30. 복잡한 "개시발스러운" 효과 금지 (CRITICAL)
- **이상하고 복잡한 CSS 애니메이션 금지**
- **과도한 JavaScript 의존성 금지**
- **UIJEONGBOO 미니멀 원칙 준수**

이 규칙들은 **절대 위반할 수 없는 핵심 원칙**이며, 모든 에이전트와 사용자가 반드시 준수해야 합니다.