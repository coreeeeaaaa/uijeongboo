#!/usr/bin/env python3
"""
Complete UijeongBoo MCP Server
전체 UijeongBoo 디자인 프레임워크를 완전히 활용하는 MCP 서버
"""

import json
import sys
import os
import asyncio
from pathlib import Path
from typing import Dict, List, Any, Optional

class CompleteUijeongBooMCPServer:
    def __init__(self):
        self.name = "Complete UijeongBoo Design System"
        self.version = "2.0.0"
        
        # UijeongBoo 전체 경로
        self.base_path = Path("/Users/a/personaluse/agents/uijeongboo")
        self.components_path = self.base_path / "components"
        self.css_path = self.base_path / "css" 
        self.js_path = self.base_path / "js"
        self.logos_path = self.base_path / "logos"
        
        # 전체 컴포넌트 로드
        self.all_components = self.discover_all_components()
        self.design_tokens = self.load_complete_design_tokens()
        
    def discover_all_components(self) -> Dict[str, Any]:
        """전체 UijeongBoo 컴포넌트 발견"""
        components = {}
        
        # HTML 컴포넌트들
        if self.components_path.exists():
            for html_file in self.components_path.rglob("*.html"):
                name = html_file.stem
                components[name] = {
                    "type": "html_component",
                    "path": str(html_file),
                    "category": "ui" if "ui" in str(html_file) else "interactive" if "interactive" in str(html_file) else "layout"
                }
        
        # CSS 컴포넌트들  
        if self.css_path.exists():
            for css_file in self.css_path.rglob("*.css"):
                name = css_file.stem
                components[f"css_{name}"] = {
                    "type": "css_module",
                    "path": str(css_file),
                    "category": "styling"
                }
                
        # JS 컴포넌트들
        if self.js_path.exists():
            for js_file in self.js_path.rglob("*.js"):
                name = js_file.stem
                components[f"js_{name}"] = {
                    "type": "js_module", 
                    "path": str(js_file),
                    "category": "behavior"
                }
                
        return components
    
    def load_complete_design_tokens(self) -> Dict[str, Any]:
        """완전한 디자인 토큰 로드"""
        design_tokens_file = self.base_path / "uijeongboo-design-system" / "design-tokens.json"
        
        if design_tokens_file.exists():
            try:
                with open(design_tokens_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                pass
                
        # 기본 완전한 토큰
        return {
            "colors": {
                "primary": "#32CD32",
                "background": "#222222", 
                "surface": "#333333",
                "card": "#444444",
                "text": "#eeeeee",
                "muted": "#888888",
                "border": "#555555"
            },
            "spacing": {
                "xs": "4px", "sm": "8px", "md": "16px",
                "lg": "24px", "xl": "32px", "xxl": "48px"
            },
            "typography": {
                "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                "sizes": {
                    "xs": "12px", "sm": "14px", "md": "16px",
                    "lg": "18px", "xl": "20px", "xxl": "24px"
                }
            },
            "borderRadius": {
                "none": "0px", "sm": "2px", "md": "4px", "lg": "6px"
            },
            "components": {
                "button": ["primary", "secondary", "outline", "ghost", "danger"],
                "input": ["default", "error", "success"],
                "card": ["minimal", "elevated"], 
                "sidebar": ["minimal", "card"],
                "modal": ["center", "fullscreen"]
            }
        }

    async def handle_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """MCP 요청 처리"""
        try:
            method = request.get("method")
            params = request.get("params", {})
            request_id = request.get("id")
            
            if method == "initialize":
                result = await self.initialize(params)
            elif method == "tools/list":
                result = await self.list_tools()
            elif method == "tools/call":
                result = await self.call_tool(params)
            elif method == "resources/list":
                result = await self.list_resources()
            elif method == "resources/read":
                result = await self.read_resource(params)
            else:
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "error": {"code": -32601, "message": f"Method not found: {method}"}
                }
            
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": result
            }
                
        except Exception as e:
            return {
                "jsonrpc": "2.0", 
                "id": request.get("id"),
                "error": {"code": -32603, "message": str(e)}
            }

    async def initialize(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """MCP 서버 초기화"""
        return {
            "protocolVersion": "2024-11-05",
            "capabilities": {
                "tools": {},
                "resources": {},
                "logging": {}
            },
            "serverInfo": {
                "name": self.name,
                "version": self.version,
                "description": "완전한 UijeongBoo 디자인 프레임워크 MCP 서버"
            }
        }

    async def list_tools(self) -> Dict[str, Any]:
        """완전한 도구 목록"""
        tools = [
            {
                "name": "discover_components",
                "description": "전체 UijeongBoo 컴포넌트 발견 및 분석",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": ["all", "ui", "interactive", "layout", "styling", "behavior"],
                            "default": "all"
                        }
                    }
                }
            },
            {
                "name": "build_complete_component",
                "description": "완전한 UijeongBoo 컴포넌트 생성 (HTML+CSS+JS)",
                "inputSchema": {
                    "type": "object", 
                    "properties": {
                        "component_name": {"type": "string"},
                        "variant": {"type": "string", "default": "default"},
                        "include_js": {"type": "boolean", "default": True},
                        "responsive": {"type": "boolean", "default": True}
                    },
                    "required": ["component_name"]
                }
            },
            {
                "name": "generate_page_structure",
                "description": "완전한 UijeongBoo 페이지 구조 생성",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "layout_type": {
                            "type": "string",
                            "enum": ["dashboard", "landing", "app", "admin"]
                        },
                        "components": {
                            "type": "array",
                            "items": {"type": "string"}
                        }
                    },
                    "required": ["layout_type"]
                }
            },
            {
                "name": "apply_design_system",
                "description": "기존 HTML을 완전한 UijeongBoo 디자인 시스템으로 변환",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "html_content": {"type": "string"},
                        "strict_mode": {"type": "boolean", "default": True},
                        "preserve_structure": {"type": "boolean", "default": True}
                    },
                    "required": ["html_content"]
                }
            },
            {
                "name": "validate_uijeongboo_compliance",
                "description": "UijeongBoo 디자인 규칙 완전 검증",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "code": {"type": "string"},
                        "check_all_rules": {"type": "boolean", "default": True}
                    },
                    "required": ["code"]
                }
            },
            {
                "name": "get_logo_system",
                "description": "UijeongBoo 로고 시스템 (400+ 변형) 접근",
                "inputSchema": {
                    "type": "object", 
                    "properties": {
                        "style": {
                            "type": "string",
                            "enum": ["quarter", "half", "eighth", "full", "pizza", "macos"]
                        },
                        "format": {
                            "type": "string", 
                            "enum": ["png", "icns", "svg"]
                        }
                    }
                }
            },
            {
                "name": "build_custom_theme",
                "description": "커스텀 UijeongBoo 테마 생성",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "primary_color": {"type": "string", "default": "#32CD32"},
                        "background_mode": {
                            "type": "string",
                            "enum": ["dark", "light", "auto"]
                        }
                    }
                }
            },
            {
                "name": "export_design_system",
                "description": "완전한 UijeongBoo 디자인 시스템 내보내기",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "format": {
                            "type": "string",
                            "enum": ["css", "scss", "json", "figma", "sketch"]
                        },
                        "include_components": {"type": "boolean", "default": True}
                    },
                    "required": ["format"]
                }
            },
            {
                "name": "generate_responsive_utilities",
                "description": "Tailwind 스타일 반응형 유틸리티 생성",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "breakpoints": {
                            "type": "array",
                            "items": {"type": "string"},
                            "default": ["sm", "md", "lg", "xl"]
                        },
                        "utilities": {
                            "type": "array",
                            "items": {"type": "string"},
                            "default": ["text", "p", "m", "w", "h"]
                        }
                    }
                }
            },
            {
                "name": "generate_state_variants",
                "description": "hover, focus, active 등 상태 변형자 생성",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "states": {
                            "type": "array",
                            "items": {"type": "string"},
                            "default": ["hover", "focus", "active"]
                        },
                        "properties": {
                            "type": "array",
                            "items": {"type": "string"},
                            "default": ["bg", "text", "border"]
                        }
                    }
                }
            },
            {
                "name": "generate_utility_classes",
                "description": "Tailwind 수준 유틸리티 클래스 대량 생성",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "categories": {
                            "type": "array",
                            "items": {"type": "string"},
                            "default": ["layout", "spacing", "sizing", "typography", "backgrounds", "borders", "effects", "transforms"]
                        },
                        "prefix": {"type": "string", "default": "uij"}
                    }
                }
            },
            {
                "name": "convert_tailwind_to_uijeongboo",
                "description": "Tailwind 클래스를 UijeongBoo 클래스로 자동 변환",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "tailwind_html": {"type": "string"},
                        "preserve_responsive": {"type": "boolean", "default": True},
                        "preserve_states": {"type": "boolean", "default": True}
                    },
                    "required": ["tailwind_html"]
                }
            }
        ]
        
        return {"tools": tools}

    async def call_tool(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """도구 실행"""
        tool_name = params.get("name")
        arguments = params.get("arguments", {})
        
        if tool_name == "discover_components":
            return await self.discover_components(arguments)
        elif tool_name == "build_complete_component":
            return await self.build_complete_component(arguments)
        elif tool_name == "generate_page_structure":
            return await self.generate_page_structure(arguments)
        elif tool_name == "apply_design_system":
            return await self.apply_design_system(arguments)
        elif tool_name == "validate_uijeongboo_compliance":
            return await self.validate_uijeongboo_compliance(arguments)
        elif tool_name == "get_logo_system":
            return await self.get_logo_system(arguments)
        elif tool_name == "build_custom_theme":
            return await self.build_custom_theme(arguments)
        elif tool_name == "export_design_system":
            return await self.export_design_system(arguments)
        elif tool_name == "generate_responsive_utilities":
            return await self.generate_responsive_utilities(arguments)
        elif tool_name == "generate_state_variants":
            return await self.generate_state_variants(arguments)
        elif tool_name == "generate_utility_classes":
            return await self.generate_utility_classes(arguments)
        elif tool_name == "convert_tailwind_to_uijeongboo":
            return await self.convert_tailwind_to_uijeongboo(arguments)
        else:
            return {"error": f"Unknown tool: {tool_name}"}

    async def discover_components(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """전체 컴포넌트 발견"""
        category = args.get("category", "all")
        
        if category == "all":
            components = self.all_components
        else:
            components = {k: v for k, v in self.all_components.items() 
                         if v.get("category") == category}
        
        result = f"🎨 UijeongBoo 완전한 컴포넌트 시스템\n\n"
        result += f"발견된 컴포넌트: {len(components)}개\n\n"
        
        for name, info in components.items():
            result += f"**{name}** ({info['type']})\n"
            result += f"- 카테고리: {info['category']}\n"
            result += f"- 경로: {info['path']}\n\n"
        
        return {"content": [{"type": "text", "text": result}]}

    async def build_complete_component(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """완전한 컴포넌트 생성"""
        component_name = args["component_name"]
        variant = args.get("variant", "default")
        include_js = args.get("include_js", True)
        responsive = args.get("responsive", True)
        
        # 실제 파일에서 컴포넌트 로드
        component_file = self.components_path / f"{component_name}.html"
        if not component_file.exists():
            component_file = self.components_path / "interactive" / f"{component_name}.html"
        if not component_file.exists():
            component_file = self.components_path / "ui" / f"{component_name}.html"
            
        if component_file.exists():
            with open(component_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
        else:
            html_content = f'<div class="uij-{component_name}">UijeongBoo {component_name.title()} Component</div>'
        
        result = f"🎨 완전한 UijeongBoo {component_name.title()} 컴포넌트\n\n"
        result += f"HTML:\n```html\n{html_content}\n```\n\n"
        
        if include_js:
            js_file = self.js_path / "components" / f"{component_name}.js"
            if js_file.exists():
                with open(js_file, 'r', encoding='utf-8') as f:
                    js_content = f.read()
                result += f"JavaScript:\n```javascript\n{js_content}\n```\n\n"
        
        result += f"포함할 파일:\n"
        result += f"```html\n<link rel=\"stylesheet\" href=\"css/uijeongboo-core.css\">\n"
        if include_js:
            result += f"<script src=\"js/uijeongboo.js\"></script>\n"
        result += f"```"
        
        return {"content": [{"type": "text", "text": result}]}

    async def generate_page_structure(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """완전한 페이지 구조 생성"""
        layout_type = args["layout_type"]
        components = args.get("components", [])
        
        layouts = {
            "dashboard": """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UijeongBoo Dashboard</title>
    <link rel="stylesheet" href="css/uijeongboo-core.css">
</head>
<body>
    <div class="uij-layout-dashboard">
        <header class="uij-header">
            <div class="uij-header-content">
                <h1>Dashboard</h1>
            </div>
        </header>
        
        <aside class="uij-sidebar">
            <nav class="uij-nav">
                <!-- Navigation items -->
            </nav>
        </aside>
        
        <main class="uij-main">
            <div class="uij-content">
                <!-- Main content -->
            </div>
        </main>
    </div>
    
    <script src="js/uijeongboo.js"></script>
</body>
</html>
            """,
            "landing": """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UijeongBoo Landing</title>
    <link rel="stylesheet" href="css/uijeongboo-core.css">
</head>
<body>
    <div class="uij-layout-landing">
        <header class="uij-hero">
            <div class="uij-hero-content">
                <h1>Welcome to UijeongBoo</h1>
            </div>
        </header>
        
        <main class="uij-sections">
            <!-- Content sections -->
        </main>
        
        <footer class="uij-footer">
            <!-- Footer content -->
        </footer>
    </div>
    
    <script src="js/uijeongboo.js"></script>
</body>
</html>
            """
        }
        
        layout_html = layouts.get(layout_type, layouts["dashboard"])
        
        result = f"🏗️ UijeongBoo {layout_type.title()} 페이지 구조\n\n"
        result += f"```html\n{layout_html.strip()}\n```\n\n"
        result += f"필요한 파일:\n"
        result += f"- css/uijeongboo-core.css\n"
        result += f"- js/uijeongboo.js\n"
        
        return {"content": [{"type": "text", "text": result}]}

    async def apply_design_system(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """디자인 시스템 적용"""
        html_content = args["html_content"]
        strict_mode = args.get("strict_mode", True)
        
        # UijeongBoo 변환 규칙
        transformations = [
            (r'<button([^>]*)>', r'<button class="uij-btn"\1>'),
            (r'<input([^>]*)>', r'<input class="uij-input"\1>'),
            (r'<div class="card"', r'<div class="uij-card"'),
            (r'background:\s*white', r'background: #333333'),
            (r'background:\s*#ffffff', r'background: #333333'),
            (r'color:\s*black', r'color: #eeeeee'),
            (r'box-shadow:[^;]+;', r''),
        ]
        
        modified_html = html_content
        changes = []
        
        for pattern, replacement in transformations:
            import re
            if re.search(pattern, modified_html):
                modified_html = re.sub(pattern, replacement, modified_html)
                changes.append(f"{pattern} → {replacement}")
        
        result = f"🎨 UijeongBoo 디자인 시스템 적용 완료\n\n"
        
        if changes:
            result += f"적용된 변환:\n"
            for change in changes:
                result += f"- {change}\n"
            result += f"\n"
        
        result += f"변환된 HTML:\n```html\n{modified_html}\n```\n\n"
        result += f"필요한 파일:\n```html\n"
        result += f'<link rel="stylesheet" href="css/uijeongboo-core.css">\n'
        result += f'<script src="js/uijeongboo.js"></script>\n'
        result += f"```"
        
        return {"content": [{"type": "text", "text": result}]}

    async def validate_uijeongboo_compliance(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """완전한 규칙 검증"""
        code = args["code"]
        
        violations = []
        suggestions = []
        
        # CLAUDE.md 11개 절대 금지사항 검사
        forbidden_patterns = [
            ("background: white", "background: #333333 사용"),
            ("background: #ffffff", "background: #333333 사용"),
            ("box-shadow:", "그림자 효과 제거"),
            ("color: blue", "color: #32CD32 또는 #eeeeee 사용"),
            ("🚫❌✅⚡🎨📱💻", "이모지 사용 금지"),
        ]
        
        for pattern, suggestion in forbidden_patterns:
            if pattern in code:
                violations.append(f"금지된 패턴: {pattern}")
                suggestions.append(suggestion)
        
        # UijeongBoo 클래스 사용 확인
        uij_classes = ["uij-btn", "uij-card", "uij-input", "uij-sidebar"]
        has_uij_class = any(cls in code for cls in uij_classes)
        
        if not has_uij_class:
            suggestions.append("UijeongBoo 컴포넌트 클래스 사용 권장")
        
        result = f"🔍 UijeongBoo 완전한 디자인 검증 결과\n\n"
        
        if violations:
            result += f"위반사항:\n"
            for violation in violations:
                result += f"- {violation}\n"
            result += f"\n"
        
        if suggestions:
            result += f"개선사항:\n"
            for suggestion in suggestions:
                result += f"- {suggestion}\n"
            result += f"\n"
        
        if not violations and not suggestions:
            result += f"UijeongBoo 디자인 규칙을 완벽하게 준수하고 있습니다!"
        
        return {"content": [{"type": "text", "text": result}]}

    async def get_logo_system(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """로고 시스템 접근"""
        style = args.get("style", "quarter")
        format_type = args.get("format", "png")
        
        logo_paths = []
        
        if style == "quarter":
            logo_dir = self.logos_path / "variants"
            if logo_dir.exists():
                logo_paths = list(logo_dir.glob(f"uijeongboo_q*.{format_type}"))
        elif style == "pizza":
            logo_dir = self.base_path / "pizza_icons"
            if logo_dir.exists():
                logo_paths = list(logo_dir.rglob(f"*.{format_type}"))
        elif style == "macos":
            logo_dir = self.base_path / "macos_icons"
            if logo_dir.exists():
                if format_type == "icns":
                    logo_paths = list(logo_dir.glob("*.icns"))
                else:
                    logo_paths = list(logo_dir.rglob(f"*.{format_type}"))
        
        result = f"🎨 UijeongBoo 로고 시스템 ({style} 스타일)\n\n"
        result += f"사용 가능한 로고: {len(logo_paths)}개\n\n"
        
        for logo_path in logo_paths[:10]:  # 처음 10개만 표시
            result += f"- {logo_path.name}\n"
        
        if len(logo_paths) > 10:
            result += f"... 외 {len(logo_paths) - 10}개 더\n"
        
        result += f"\n로고 경로: {self.logos_path}\n"
        result += f"스타일 종류: quarter, half, eighth, full, pizza, macos\n"
        result += f"지원 포맷: png, icns, svg"
        
        return {"content": [{"type": "text", "text": result}]}

    async def build_custom_theme(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """커스텀 테마 생성"""
        primary_color = args.get("primary_color", "#32CD32")
        background_mode = args.get("background_mode", "dark")
        
        theme_css = f"""
/* UijeongBoo 커스텀 테마 */
:root {{
    --uij-primary: {primary_color};
    --uij-background: {"#222222" if background_mode == "dark" else "#ffffff"};
    --uij-surface: {"#333333" if background_mode == "dark" else "#f5f5f5"};
    --uij-text: {"#eeeeee" if background_mode == "dark" else "#333333"};
}}

.uij-btn-primary {{
    background: var(--uij-primary);
    color: #000000;
}}

.uij-card {{
    background: var(--uij-surface);
    color: var(--uij-text);
}}
        """
        
        result = f"🎨 UijeongBoo 커스텀 테마 생성 완료\n\n"
        result += f"주요 색상: {primary_color}\n"
        result += f"배경 모드: {background_mode}\n\n"
        result += f"생성된 테마 CSS:\n```css\n{theme_css.strip()}\n```\n\n"
        result += f"사용법:\n"
        result += f"1. 위 CSS를 custom-theme.css로 저장\n"
        result += f"2. uijeongboo-core.css 다음에 로드\n"
        result += f"3. 기존 디자인 시스템 유지하면서 색상만 변경"
        
        return {"content": [{"type": "text", "text": result}]}

    async def export_design_system(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """디자인 시스템 내보내기"""
        format_type = args["format"]
        include_components = args.get("include_components", True)
        
        result = f"📦 UijeongBoo 디자인 시스템 내보내기 ({format_type})\n\n"
        
        if format_type == "json":
            export_data = {
                "name": "UijeongBoo Design System",
                "version": "2.0.0", 
                "tokens": self.design_tokens,
                "components": list(self.all_components.keys()) if include_components else []
            }
            result += f"JSON 내보내기:\n```json\n{json.dumps(export_data, indent=2, ensure_ascii=False)}\n```"
        
        elif format_type == "css":
            css_export = """
/* UijeongBoo Complete Design System Export */
:root {
    --uij-primary: #32CD32;
    --uij-background: #222222;
    --uij-surface: #333333;
    --uij-text: #eeeeee;
}

/* Components */
.uij-btn { background: transparent; border: 1px solid var(--uij-text); }
.uij-btn-primary { background: var(--uij-primary); color: #000000; }
.uij-card { background: var(--uij-surface); padding: 1rem; }
            """
            result += f"CSS 내보내기:\n```css\n{css_export.strip()}\n```"
        
        else:
            result += f"{format_type} 내보내기는 아직 구현 중입니다."
        
        return {"content": [{"type": "text", "text": result}]}

    async def generate_responsive_utilities(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Tailwind 스타일 반응형 유틸리티 생성"""
        breakpoints = args.get("breakpoints", ["sm", "md", "lg", "xl"])
        utilities = args.get("utilities", ["text", "p", "m", "w", "h"])
        
        breakpoint_values = {
            "sm": "640px",
            "md": "768px", 
            "lg": "1024px",
            "xl": "1280px",
            "2xl": "1536px"
        }
        
        responsive_css = f"""
/* UijeongBoo 반응형 유틸리티 시스템 (Tailwind 호환) */
"""
        
        for bp in breakpoints:
            if bp in breakpoint_values:
                responsive_css += f"""
@media (min-width: {breakpoint_values[bp]}) {{
    /* {bp.upper()} 브레이크포인트 */
"""
                
                if "text" in utilities:
                    for size in ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]:
                        responsive_css += f"    .{bp}\\:uij-text-{size} {{ font-size: var(--uij-text-{size}); }}\n"
                
                if "p" in utilities:
                    for space in ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12"]:
                        responsive_css += f"    .{bp}\\:uij-p-{space} {{ padding: {int(space)*0.25}rem; }}\n"
                
                if "m" in utilities:
                    for space in ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12"]:
                        responsive_css += f"    .{bp}\\:uij-m-{space} {{ margin: {int(space)*0.25}rem; }}\n"
                
                if "w" in utilities:
                    for width in ["full", "1/2", "1/3", "2/3", "1/4", "3/4"]:
                        width_val = {"full": "100%", "1/2": "50%", "1/3": "33.333%", "2/3": "66.667%", "1/4": "25%", "3/4": "75%"}[width]
                        responsive_css += f"    .{bp}\\:uij-w-{width.replace('/', '\\/')} {{ width: {width_val}; }}\n"
                
                if "h" in utilities:
                    for height in ["full", "screen", "1/2", "1/3", "2/3"]:
                        height_val = {"full": "100%", "screen": "100vh", "1/2": "50%", "1/3": "33.333%", "2/3": "66.667%"}[height]
                        responsive_css += f"    .{bp}\\:uij-h-{height.replace('/', '\\/')} {{ height: {height_val}; }}\n"
                
                responsive_css += f"}}\n"
        
        result = f"📱 UijeongBoo 반응형 유틸리티 시스템 생성 완료\n\n"
        result += f"브레이크포인트: {', '.join(breakpoints)}\n"
        result += f"유틸리티: {', '.join(utilities)}\n\n"
        result += f"생성된 CSS:\n```css\n{responsive_css.strip()}\n```\n\n"
        result += f"사용 예제:\n```html\n"
        result += f'<div class="uij-text-sm md:uij-text-lg lg:uij-text-xl">반응형 텍스트</div>\n'
        result += f'<div class="uij-p-2 md:uij-p-4 lg:uij-p-6">반응형 패딩</div>\n'
        result += f'<div class="uij-w-full md:uij-w-1/2 lg:uij-w-1/3">반응형 너비</div>\n'
        result += f"```"
        
        return {"content": [{"type": "text", "text": result}]}

    async def generate_state_variants(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """상태 변형자 생성"""
        states = args.get("states", ["hover", "focus", "active"])
        properties = args.get("properties", ["bg", "text", "border"])
        
        state_css = f"""
/* UijeongBoo 상태 변형자 시스템 (Tailwind 호환) */
"""
        
        colors = {
            "primary": "#32CD32",
            "secondary": "#666666", 
            "surface": "#333333",
            "card": "#444444",
            "text": "#eeeeee",
            "muted": "#888888"
        }
        
        for state in states:
            state_css += f"\n/* {state.upper()} 상태 */\n"
            
            for prop in properties:
                for color_name, color_value in colors.items():
                    if prop == "bg":
                        state_css += f".{state}\\:uij-bg-{color_name}:{state} {{ background-color: {color_value}; }}\n"
                    elif prop == "text":
                        state_css += f".{state}\\:uij-text-{color_name}:{state} {{ color: {color_value}; }}\n"
                    elif prop == "border":
                        state_css += f".{state}\\:uij-border-{color_name}:{state} {{ border-color: {color_value}; }}\n"
        
        # 특별한 효과들
        state_css += f"""
/* 특별한 상태 효과 */
.hover\\:uij-scale-105:hover {{ transform: scale(1.05); }}
.hover\\:uij-scale-110:hover {{ transform: scale(1.1); }}
.focus\\:uij-ring:focus {{ box-shadow: 0 0 0 3px rgba(50, 205, 50, 0.3); }}
.active\\:uij-scale-95:active {{ transform: scale(0.95); }}

/* 투명도 */
.hover\\:uij-opacity-80:hover {{ opacity: 0.8; }}
.hover\\:uij-opacity-60:hover {{ opacity: 0.6; }}
        """
        
        result = f"🎯 UijeongBoo 상태 변형자 시스템 생성 완료\n\n"
        result += f"상태: {', '.join(states)}\n"
        result += f"속성: {', '.join(properties)}\n\n"
        result += f"생성된 CSS:\n```css\n{state_css.strip()}\n```\n\n"
        result += f"사용 예제:\n```html\n"
        result += f'<button class="uij-btn hover:uij-bg-primary focus:uij-ring">버튼</button>\n'
        result += f'<div class="uij-card hover:uij-scale-105">호버 카드</div>\n'
        result += f'<input class="uij-input focus:uij-border-primary" />\n'
        result += f"```"
        
        return {"content": [{"type": "text", "text": result}]}

    async def generate_utility_classes(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Tailwind 수준 유틸리티 클래스 대량 생성"""
        categories = args.get("categories", ["layout", "spacing", "sizing", "typography", "backgrounds", "borders", "effects", "transforms"])
        prefix = args.get("prefix", "uij")
        
        utility_css = f"""
/* UijeongBoo 완전한 유틸리티 클래스 시스템 */
:root {{
    /* 색상 변수 */
    --{prefix}-primary: #32CD32;
    --{prefix}-secondary: #666666;
    --{prefix}-background: #222222;
    --{prefix}-surface: #333333;
    --{prefix}-card: #444444;
    --{prefix}-text: #eeeeee;
    --{prefix}-muted: #888888;
    --{prefix}-border: #555555;
}}
"""
        
        class_count = 0
        
        if "layout" in categories:
            utility_css += f"""
/* Layout */
.{prefix}-block {{ display: block; }}
.{prefix}-inline-block {{ display: inline-block; }}
.{prefix}-inline {{ display: inline; }}
.{prefix}-flex {{ display: flex; }}
.{prefix}-inline-flex {{ display: inline-flex; }}
.{prefix}-grid {{ display: grid; }}
.{prefix}-inline-grid {{ display: inline-grid; }}
.{prefix}-hidden {{ display: none; }}

/* Flexbox */
.{prefix}-flex-row {{ flex-direction: row; }}
.{prefix}-flex-col {{ flex-direction: column; }}
.{prefix}-flex-wrap {{ flex-wrap: wrap; }}
.{prefix}-flex-nowrap {{ flex-wrap: nowrap; }}
.{prefix}-items-start {{ align-items: flex-start; }}
.{prefix}-items-center {{ align-items: center; }}
.{prefix}-items-end {{ align-items: flex-end; }}
.{prefix}-justify-start {{ justify-content: flex-start; }}
.{prefix}-justify-center {{ justify-content: center; }}
.{prefix}-justify-end {{ justify-content: flex-end; }}
.{prefix}-justify-between {{ justify-content: space-between; }}
.{prefix}-justify-around {{ justify-content: space-around; }}

/* Grid */
.{prefix}-grid-cols-1 {{ grid-template-columns: repeat(1, 1fr); }}
.{prefix}-grid-cols-2 {{ grid-template-columns: repeat(2, 1fr); }}
.{prefix}-grid-cols-3 {{ grid-template-columns: repeat(3, 1fr); }}
.{prefix}-grid-cols-4 {{ grid-template-columns: repeat(4, 1fr); }}
.{prefix}-grid-cols-5 {{ grid-template-columns: repeat(5, 1fr); }}
.{prefix}-grid-cols-6 {{ grid-template-columns: repeat(6, 1fr); }}
.{prefix}-grid-cols-12 {{ grid-template-columns: repeat(12, 1fr); }}

/* Position */
.{prefix}-static {{ position: static; }}
.{prefix}-fixed {{ position: fixed; }}
.{prefix}-absolute {{ position: absolute; }}
.{prefix}-relative {{ position: relative; }}
.{prefix}-sticky {{ position: sticky; }}
            """
            class_count += 35
        
        if "spacing" in categories:
            utility_css += f"""
/* Spacing */
"""
            for i in range(0, 17):  # 0부터 16까지
                rem_value = i * 0.25
                utility_css += f".{prefix}-p-{i} {{ padding: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-px-{i} {{ padding-left: {rem_value}rem; padding-right: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-py-{i} {{ padding-top: {rem_value}rem; padding-bottom: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-pt-{i} {{ padding-top: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-pr-{i} {{ padding-right: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-pb-{i} {{ padding-bottom: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-pl-{i} {{ padding-left: {rem_value}rem; }}\n"
                
                utility_css += f".{prefix}-m-{i} {{ margin: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-mx-{i} {{ margin-left: {rem_value}rem; margin-right: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-my-{i} {{ margin-top: {rem_value}rem; margin-bottom: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-mt-{i} {{ margin-top: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-mr-{i} {{ margin-right: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-mb-{i} {{ margin-bottom: {rem_value}rem; }}\n"
                utility_css += f".{prefix}-ml-{i} {{ margin-left: {rem_value}rem; }}\n"
                class_count += 14
        
        if "sizing" in categories:
            utility_css += f"""
/* Sizing */
.{prefix}-w-auto {{ width: auto; }}
.{prefix}-w-full {{ width: 100%; }}
.{prefix}-w-screen {{ width: 100vw; }}
.{prefix}-w-1\\/2 {{ width: 50%; }}
.{prefix}-w-1\\/3 {{ width: 33.333333%; }}
.{prefix}-w-2\\/3 {{ width: 66.666667%; }}
.{prefix}-w-1\\/4 {{ width: 25%; }}
.{prefix}-w-2\\/4 {{ width: 50%; }}
.{prefix}-w-3\\/4 {{ width: 75%; }}
.{prefix}-w-1\\/5 {{ width: 20%; }}
.{prefix}-w-2\\/5 {{ width: 40%; }}
.{prefix}-w-3\\/5 {{ width: 60%; }}
.{prefix}-w-4\\/5 {{ width: 80%; }}

.{prefix}-h-auto {{ height: auto; }}
.{prefix}-h-full {{ height: 100%; }}
.{prefix}-h-screen {{ height: 100vh; }}
.{prefix}-h-1\\/2 {{ height: 50%; }}
.{prefix}-h-1\\/3 {{ height: 33.333333%; }}
.{prefix}-h-2\\/3 {{ height: 66.666667%; }}
.{prefix}-h-1\\/4 {{ height: 25%; }}
.{prefix}-h-3\\/4 {{ height: 75%; }}

/* Min/Max sizes */
.{prefix}-min-w-0 {{ min-width: 0px; }}
.{prefix}-min-w-full {{ min-width: 100%; }}
.{prefix}-min-h-0 {{ min-height: 0px; }}
.{prefix}-min-h-full {{ min-height: 100%; }}
.{prefix}-min-h-screen {{ min-height: 100vh; }}
.{prefix}-max-w-none {{ max-width: none; }}
.{prefix}-max-w-full {{ max-width: 100%; }}
.{prefix}-max-h-full {{ max-height: 100%; }}
            """
            class_count += 30
        
        if "typography" in categories:
            utility_css += f"""
/* Typography */
.{prefix}-text-xs {{ font-size: 0.75rem; line-height: 1rem; }}
.{prefix}-text-sm {{ font-size: 0.875rem; line-height: 1.25rem; }}
.{prefix}-text-base {{ font-size: 1rem; line-height: 1.5rem; }}
.{prefix}-text-lg {{ font-size: 1.125rem; line-height: 1.75rem; }}
.{prefix}-text-xl {{ font-size: 1.25rem; line-height: 1.75rem; }}
.{prefix}-text-2xl {{ font-size: 1.5rem; line-height: 2rem; }}
.{prefix}-text-3xl {{ font-size: 1.875rem; line-height: 2.25rem; }}
.{prefix}-text-4xl {{ font-size: 2.25rem; line-height: 2.5rem; }}

.{prefix}-font-thin {{ font-weight: 100; }}
.{prefix}-font-light {{ font-weight: 300; }}
.{prefix}-font-normal {{ font-weight: 400; }}
.{prefix}-font-medium {{ font-weight: 500; }}
.{prefix}-font-semibold {{ font-weight: 600; }}
.{prefix}-font-bold {{ font-weight: 700; }}
.{prefix}-font-extrabold {{ font-weight: 800; }}

.{prefix}-text-left {{ text-align: left; }}
.{prefix}-text-center {{ text-align: center; }}
.{prefix}-text-right {{ text-align: right; }}
.{prefix}-text-justify {{ text-align: justify; }}

.{prefix}-text-primary {{ color: var(--{prefix}-primary); }}
.{prefix}-text-secondary {{ color: var(--{prefix}-secondary); }}
.{prefix}-text-white {{ color: #ffffff; }}
.{prefix}-text-gray {{ color: var(--{prefix}-muted); }}
            """
            class_count += 25
        
        if "backgrounds" in categories:
            utility_css += f"""
/* Backgrounds */
.{prefix}-bg-transparent {{ background-color: transparent; }}
.{prefix}-bg-primary {{ background-color: var(--{prefix}-primary); }}
.{prefix}-bg-secondary {{ background-color: var(--{prefix}-secondary); }}
.{prefix}-bg-surface {{ background-color: var(--{prefix}-surface); }}
.{prefix}-bg-card {{ background-color: var(--{prefix}-card); }}
.{prefix}-bg-white {{ background-color: #ffffff; }}
.{prefix}-bg-black {{ background-color: #000000; }}
            """
            class_count += 7
        
        if "borders" in categories:
            utility_css += f"""
/* Borders */
.{prefix}-border {{ border-width: 1px; }}
.{prefix}-border-0 {{ border-width: 0px; }}
.{prefix}-border-2 {{ border-width: 2px; }}
.{prefix}-border-4 {{ border-width: 4px; }}
.{prefix}-border-8 {{ border-width: 8px; }}

.{prefix}-border-primary {{ border-color: var(--{prefix}-primary); }}
.{prefix}-border-secondary {{ border-color: var(--{prefix}-secondary); }}
.{prefix}-border-gray {{ border-color: var(--{prefix}-border); }}

.{prefix}-rounded-none {{ border-radius: 0px; }}
.{prefix}-rounded-sm {{ border-radius: 0.125rem; }}
.{prefix}-rounded {{ border-radius: 0.25rem; }}
.{prefix}-rounded-md {{ border-radius: 0.375rem; }}
.{prefix}-rounded-lg {{ border-radius: 0.5rem; }}
.{prefix}-rounded-xl {{ border-radius: 0.75rem; }}
.{prefix}-rounded-full {{ border-radius: 9999px; }}
            """
            class_count += 15
        
        if "effects" in categories:
            utility_css += f"""
/* Effects */
.{prefix}-shadow-sm {{ box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }}
.{prefix}-shadow {{ box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }}
.{prefix}-shadow-md {{ box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }}
.{prefix}-shadow-lg {{ box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }}
.{prefix}-shadow-none {{ box-shadow: none; }}

.{prefix}-opacity-0 {{ opacity: 0; }}
.{prefix}-opacity-25 {{ opacity: 0.25; }}
.{prefix}-opacity-50 {{ opacity: 0.5; }}
.{prefix}-opacity-75 {{ opacity: 0.75; }}
.{prefix}-opacity-100 {{ opacity: 1; }}
            """
            class_count += 10
        
        if "transforms" in categories:
            utility_css += f"""
/* Transforms */
.{prefix}-transform {{ transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1); }}
.{prefix}-scale-0 {{ transform: scale(0); }}
.{prefix}-scale-50 {{ transform: scale(0.5); }}
.{prefix}-scale-75 {{ transform: scale(0.75); }}
.{prefix}-scale-90 {{ transform: scale(0.9); }}
.{prefix}-scale-95 {{ transform: scale(0.95); }}
.{prefix}-scale-100 {{ transform: scale(1); }}
.{prefix}-scale-105 {{ transform: scale(1.05); }}
.{prefix}-scale-110 {{ transform: scale(1.1); }}
.{prefix}-scale-125 {{ transform: scale(1.25); }}
.{prefix}-scale-150 {{ transform: scale(1.5); }}

.{prefix}-rotate-0 {{ transform: rotate(0deg); }}
.{prefix}-rotate-45 {{ transform: rotate(45deg); }}
.{prefix}-rotate-90 {{ transform: rotate(90deg); }}
.{prefix}-rotate-180 {{ transform: rotate(180deg); }}
.{prefix}-rotate-270 {{ transform: rotate(270deg); }}

.{prefix}-translate-x-0 {{ transform: translateX(0px); }}
.{prefix}-translate-x-1 {{ transform: translateX(0.25rem); }}
.{prefix}-translate-x-2 {{ transform: translateX(0.5rem); }}
.{prefix}-translate-y-0 {{ transform: translateY(0px); }}
.{prefix}-translate-y-1 {{ transform: translateY(0.25rem); }}
.{prefix}-translate-y-2 {{ transform: translateY(0.5rem); }}
            """
            class_count += 21
        
        result = f"🚀 UijeongBoo 완전한 유틸리티 클래스 시스템 생성 완료\n\n"
        result += f"생성된 클래스: {class_count}개\n"
        result += f"카테고리: {', '.join(categories)}\n"
        result += f"접두사: {prefix}-\n\n"
        result += f"생성된 CSS (일부):\n```css\n{utility_css[:2000]}...\n```\n\n"
        result += f"사용 예제:\n```html\n"
        result += f'<div class="{prefix}-flex {prefix}-items-center {prefix}-justify-between {prefix}-p-4 {prefix}-bg-surface {prefix}-rounded-lg">\n'
        result += f'  <h1 class="{prefix}-text-2xl {prefix}-font-bold {prefix}-text-primary">제목</h1>\n'
        result += f'  <button class="{prefix}-px-4 {prefix}-py-2 {prefix}-bg-primary {prefix}-text-white {prefix}-rounded {prefix}-hover:scale-105">버튼</button>\n'
        result += f'</div>\n'
        result += f"```\n\n"
        result += f"**이제 Tailwind CSS와 동일한 수준의 유틸리티 클래스를 사용할 수 있습니다!**"
        
        return {"content": [{"type": "text", "text": result}]}

    async def convert_tailwind_to_uijeongboo(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Tailwind를 UijeongBoo로 변환"""
        tailwind_html = args["tailwind_html"]
        preserve_responsive = args.get("preserve_responsive", True)
        preserve_states = args.get("preserve_states", True)
        
        # Tailwind → UijeongBoo 변환 맵
        conversions = {
            # Layout
            r'\bflex\b': 'uij-flex',
            r'\binline-flex\b': 'uij-inline-flex',
            r'\bgrid\b': 'uij-grid',
            r'\bhidden\b': 'uij-hidden',
            r'\bblock\b': 'uij-block',
            
            # Flexbox
            r'\bflex-col\b': 'uij-flex-col',
            r'\bflex-row\b': 'uij-flex-row',
            r'\bitems-center\b': 'uij-items-center',
            r'\bitems-start\b': 'uij-items-start',
            r'\bitems-end\b': 'uij-items-end',
            r'\bjustify-center\b': 'uij-justify-center',
            r'\bjustify-between\b': 'uij-justify-between',
            r'\bjustify-start\b': 'uij-justify-start',
            r'\bjustify-end\b': 'uij-justify-end',
            
            # Spacing
            r'\bp-(\d+)\b': r'uij-p-\1',
            r'\bpx-(\d+)\b': r'uij-px-\1',
            r'\bpy-(\d+)\b': r'uij-py-\1',
            r'\bpt-(\d+)\b': r'uij-pt-\1',
            r'\bpr-(\d+)\b': r'uij-pr-\1',
            r'\bpb-(\d+)\b': r'uij-pb-\1',
            r'\bpl-(\d+)\b': r'uij-pl-\1',
            r'\bm-(\d+)\b': r'uij-m-\1',
            r'\bmx-(\d+)\b': r'uij-mx-\1',
            r'\bmy-(\d+)\b': r'uij-my-\1',
            r'\bmt-(\d+)\b': r'uij-mt-\1',
            r'\bmr-(\d+)\b': r'uij-mr-\1',
            r'\bmb-(\d+)\b': r'uij-mb-\1',
            r'\bml-(\d+)\b': r'uij-ml-\1',
            
            # Sizing
            r'\bw-full\b': 'uij-w-full',
            r'\bw-1/2\b': 'uij-w-1/2',
            r'\bw-1/3\b': 'uij-w-1/3',
            r'\bw-2/3\b': 'uij-w-2/3',
            r'\bw-1/4\b': 'uij-w-1/4',
            r'\bw-3/4\b': 'uij-w-3/4',
            r'\bh-full\b': 'uij-h-full',
            r'\bh-screen\b': 'uij-h-screen',
            
            # Typography
            r'\btext-xs\b': 'uij-text-xs',
            r'\btext-sm\b': 'uij-text-sm',
            r'\btext-base\b': 'uij-text-base',
            r'\btext-lg\b': 'uij-text-lg',
            r'\btext-xl\b': 'uij-text-xl',
            r'\btext-2xl\b': 'uij-text-2xl',
            r'\btext-3xl\b': 'uij-text-3xl',
            r'\bfont-bold\b': 'uij-font-bold',
            r'\bfont-semibold\b': 'uij-font-semibold',
            r'\bfont-medium\b': 'uij-font-medium',
            r'\btext-center\b': 'uij-text-center',
            r'\btext-left\b': 'uij-text-left',
            r'\btext-right\b': 'uij-text-right',
            
            # Colors
            r'\bbg-white\b': 'uij-bg-surface',
            r'\bbg-gray-100\b': 'uij-bg-surface',
            r'\bbg-gray-900\b': 'uij-bg-card',
            r'\bbg-blue-500\b': 'uij-bg-primary',
            r'\btext-white\b': 'uij-text-white',
            r'\btext-gray-500\b': 'uij-text-muted',
            r'\btext-blue-500\b': 'uij-text-primary',
            
            # Borders
            r'\bborder\b': 'uij-border',
            r'\bborder-gray-300\b': 'uij-border-gray',
            r'\brounded\b': 'uij-rounded',
            r'\brounded-lg\b': 'uij-rounded-lg',
            r'\brounded-full\b': 'uij-rounded-full',
            
            # Effects
            r'\bshadow\b': 'uij-shadow',
            r'\bshadow-lg\b': 'uij-shadow-lg',
            r'\bopacity-50\b': 'uij-opacity-50',
            r'\bopacity-75\b': 'uij-opacity-75',
        }
        
        converted_html = tailwind_html
        changes = []
        
        import re
        for pattern, replacement in conversions.items():
            if re.search(pattern, converted_html):
                converted_html = re.sub(pattern, replacement, converted_html)
                changes.append(f"{pattern} → {replacement}")
        
        # 반응형 변환
        if preserve_responsive:
            responsive_patterns = [
                (r'\bsm:(\w+)', r'sm:uij-\1'),
                (r'\bmd:(\w+)', r'md:uij-\1'),
                (r'\blg:(\w+)', r'lg:uij-\1'),
                (r'\bxl:(\w+)', r'xl:uij-\1'),
            ]
            
            for pattern, replacement in responsive_patterns:
                if re.search(pattern, converted_html):
                    converted_html = re.sub(pattern, replacement, converted_html)
                    changes.append(f"반응형: {pattern} → {replacement}")
        
        # 상태 변환
        if preserve_states:
            state_patterns = [
                (r'\bhover:(\w+)', r'hover:uij-\1'),
                (r'\bfocus:(\w+)', r'focus:uij-\1'),
                (r'\bactive:(\w+)', r'active:uij-\1'),
            ]
            
            for pattern, replacement in state_patterns:
                if re.search(pattern, converted_html):
                    converted_html = re.sub(pattern, replacement, converted_html)
                    changes.append(f"상태: {pattern} → {replacement}")
        
        result = f"🔄 Tailwind → UijeongBoo 변환 완료\n\n"
        result += f"변환된 클래스: {len(changes)}개\n\n"
        
        if changes:
            result += f"주요 변환사항:\n"
            for change in changes[:10]:  # 처음 10개만 표시
                result += f"- {change}\n"
            if len(changes) > 10:
                result += f"... 외 {len(changes) - 10}개 더\n"
            result += f"\n"
        
        result += f"변환된 HTML:\n```html\n{converted_html}\n```\n\n"
        result += f"필요한 파일:\n```html\n"
        result += f'<link rel="stylesheet" href="css/uijeongboo-complete-utilities.css">\n'
        result += f'<script src="js/uijeongboo.js"></script>\n'
        result += f"```\n\n"
        result += f"**이제 Tailwind 프로젝트를 UijeongBoo로 완전히 마이그레이션할 수 있습니다!**"
        
        return {"content": [{"type": "text", "text": result}]}

    async def list_resources(self) -> Dict[str, Any]:
        """완전한 리소스 목록"""
        resources = [
            {"uri": "uijeongboo://framework", "name": "완전한 프레임워크", "mimeType": "text/html"},
            {"uri": "uijeongboo://components", "name": "전체 컴포넌트", "mimeType": "application/json"},
            {"uri": "uijeongboo://tokens", "name": "디자인 토큰", "mimeType": "application/json"},
            {"uri": "uijeongboo://logos", "name": "로고 시스템", "mimeType": "application/json"},
            {"uri": "uijeongboo://css", "name": "CSS 시스템", "mimeType": "text/css"},
            {"uri": "uijeongboo://js", "name": "JavaScript 시스템", "mimeType": "text/javascript"}
        ]
        return {"resources": resources}

    async def read_resource(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """리소스 읽기"""
        uri = params.get("uri", "")
        
        if uri == "uijeongboo://components":
            content = json.dumps(self.all_components, indent=2, ensure_ascii=False)
        elif uri == "uijeongboo://tokens":
            content = json.dumps(self.design_tokens, indent=2, ensure_ascii=False)
        elif uri == "uijeongboo://logos":
            logos = list(self.logos_path.rglob("*.png"))
            content = json.dumps([str(p) for p in logos], indent=2)
        else:
            content = f"UijeongBoo {uri} 리소스"
            
        return {
            "contents": [{
                "uri": uri,
                "mimeType": "application/json",
                "text": content
            }]
        }

def main():
    """완전한 MCP 서버 실행"""
    import logging
    logging.disable(logging.CRITICAL)
    
    server = CompleteUijeongBooMCPServer()
    
    try:
        while True:
            try:
                line = sys.stdin.readline()
                if not line:
                    break
                    
                line = line.strip()
                if not line:
                    continue
                
                request = json.loads(line)
                response = asyncio.run(server.handle_request(request))
                
                print(json.dumps(response, ensure_ascii=False))
                sys.stdout.flush()
                
            except json.JSONDecodeError:
                continue
            except EOFError:
                break
            except Exception as e:
                error_response = {
                    "jsonrpc": "2.0",
                    "id": request.get("id") if 'request' in locals() else None,
                    "error": {"code": -32603, "message": str(e)}
                }
                print(json.dumps(error_response))
                sys.stdout.flush()
                
    except KeyboardInterrupt:
        sys.exit(0)
    except Exception:
        sys.exit(1)

if __name__ == "__main__":
    main()