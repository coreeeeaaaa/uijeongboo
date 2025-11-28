#!/usr/bin/env python3
"""
UijeongBoo MCP Server - 디자인 시스템 자동화
Claude Code가 자동으로 UijeongBoo 디자인 시스템을 적용하도록 하는 MCP 서버
"""

import json
import sys
import os
import asyncio
import logging
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

@dataclass
class ComponentSpec:
    name: str
    category: str
    html_template: str
    css_classes: str
    js_behavior: Optional[str] = None
    description: str = ""

class UijeongBooMCPServer:
    def __init__(self):
        self.name = "UijeongBoo Design System"
        self.version = "1.0.0"
        
        # UijeongBoo 프레임워크 경로
        self.framework_path = Path(__file__).parent.parent
        self.css_path = self.framework_path / "uijeongboo.css"
        self.js_path = self.framework_path / "uijeongboo.js"
        self.design_tokens_path = self.framework_path / "uijeongboo-design-system" / "design-tokens.json"
        
        # 로깅 설정
        self.setup_logging()
        
        # 디자인 시스템 로드
        self.design_tokens = self.load_design_tokens()
        self.components = self.load_components()
        
    def setup_logging(self):
        """로깅 시스템 설정 (MCP 연결용 최소화)"""
        import logging
        
        # MCP 연결 방해 방지를 위해 로깅 최소화
        self.logger = logging.getLogger(__name__)
        self.logger.disabled = True
        
    def load_design_tokens(self) -> Dict[str, Any]:
        """디자인 토큰 로드"""
        try:
            if self.design_tokens_path.exists():
                with open(self.design_tokens_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            self.logger.error(f"디자인 토큰 로드 실패: {e}")
        
        # 기본 디자인 토큰
        return {
            "colors": {
                "primary": "#32CD32",
                "background": "#222222",
                "surface": "#333333",
                "text": "#eeeeee",
                "muted": "#888888"
            },
            "spacing": {
                "xs": "4px", "sm": "8px", "md": "16px", 
                "lg": "24px", "xl": "32px"
            },
            "typography": {
                "font_family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                "font_sizes": {"sm": "14px", "md": "16px", "lg": "18px"}
            }
        }
    
    def load_components(self) -> Dict[str, ComponentSpec]:
        """UijeongBoo 컴포넌트 정의 로드"""
        return {
            "button": ComponentSpec(
                name="button",
                category="interactive",
                html_template='<button class="uij-btn {variant}">{text}</button>',
                css_classes="uij-btn, uij-btn-primary, uij-btn-secondary",
                description="UijeongBoo 스타일 버튼"
            ),
            "card": ComponentSpec(
                name="card",
                category="layout",
                html_template='<div class="uij-card"><div class="uij-card-header">{title}</div><div class="uij-card-content">{content}</div></div>',
                css_classes="uij-card, uij-card-header, uij-card-content",
                description="UijeongBoo 스타일 카드"
            ),
            "input": ComponentSpec(
                name="input",
                category="form",
                html_template='<input type="{type}" class="uij-input" placeholder="{placeholder}" />',
                css_classes="uij-input, uij-input-focus",
                description="UijeongBoo 스타일 입력 필드"
            ),
            "sidebar": ComponentSpec(
                name="sidebar",
                category="navigation",
                html_template='''<nav class="uij-sidebar">
    <div class="uij-sidebar-header">{title}</div>
    <ul class="uij-sidebar-menu">
        {menu_items}
    </ul>
</nav>''',
                css_classes="uij-sidebar, uij-sidebar-header, uij-sidebar-menu",
                js_behavior="sidebar_toggle",
                description="UijeongBoo 스타일 사이드바"
            )
        }
    
    async def handle_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """MCP 요청 처리"""
        try:
            method = request.get("method")
            params = request.get("params", {})
            request_id = request.get("id")
            
            if method == "initialize":
                result = await self.initialize(params)
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "result": result
                }
            elif method == "tools/list":
                result = await self.list_tools()
                return {
                    "jsonrpc": "2.0", 
                    "id": request_id,
                    "result": result
                }
            elif method == "tools/call":
                result = await self.call_tool(params)
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "result": result
                }
            elif method == "resources/list":
                result = await self.list_resources()
                return {
                    "jsonrpc": "2.0",
                    "id": request_id, 
                    "result": result
                }
            elif method == "resources/read":
                result = await self.read_resource(params)
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "result": result
                }
            else:
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "error": {"code": -32601, "message": f"Method not found: {method}"}
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
                "description": "UijeongBoo 디자인 시스템 자동화 MCP 서버"
            }
        }
    
    async def list_tools(self) -> Dict[str, Any]:
        """사용 가능한 도구 목록"""
        tools = [
            {
                "name": "generate_component",
                "description": "UijeongBoo 스타일 컴포넌트 생성",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "component_type": {
                            "type": "string",
                            "enum": list(self.components.keys()),
                            "description": "생성할 컴포넌트 타입"
                        },
                        "props": {
                            "type": "object",
                            "description": "컴포넌트 속성 (text, title, placeholder 등)"
                        },
                        "variant": {
                            "type": "string",
                            "enum": ["primary", "secondary", "default"],
                            "default": "default",
                            "description": "컴포넌트 변형"
                        }
                    },
                    "required": ["component_type"]
                }
            },
            {
                "name": "get_design_tokens",
                "description": "UijeongBoo 디자인 토큰 조회",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": ["colors", "spacing", "typography", "all"],
                            "default": "all",
                            "description": "조회할 토큰 카테고리"
                        }
                    }
                }
            },
            {
                "name": "validate_design",
                "description": "UijeongBoo 디자인 규칙 검증",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "html_code": {
                            "type": "string",
                            "description": "검증할 HTML 코드"
                        },
                        "css_code": {
                            "type": "string",
                            "description": "검증할 CSS 코드"
                        }
                    },
                    "required": ["html_code"]
                }
            },
            {
                "name": "apply_uijeongboo_styles",
                "description": "기존 HTML에 UijeongBoo 스타일 자동 적용",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "html_content": {
                            "type": "string",
                            "description": "스타일을 적용할 HTML 내용"
                        },
                        "auto_fix": {
                            "type": "boolean",
                            "default": True,
                            "description": "디자인 규칙 위반 자동 수정"
                        }
                    },
                    "required": ["html_content"]
                }
            },
            {
                "name": "get_component_examples",
                "description": "UijeongBoo 컴포넌트 사용 예제 조회",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "component_type": {
                            "type": "string",
                            "enum": list(self.components.keys()),
                            "description": "예제를 볼 컴포넌트 타입"
                        }
                    },
                    "required": ["component_type"]
                }
            }
        ]
        
        return {"tools": tools}
    
    async def call_tool(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """도구 실행"""
        tool_name = params.get("name")
        arguments = params.get("arguments", {})
        
        try:
            if tool_name == "generate_component":
                return await self.generate_component(arguments)
            elif tool_name == "get_design_tokens":
                return await self.get_design_tokens(arguments)
            elif tool_name == "validate_design":
                return await self.validate_design(arguments)
            elif tool_name == "apply_uijeongboo_styles":
                return await self.apply_uijeongboo_styles(arguments)
            elif tool_name == "get_component_examples":
                return await self.get_component_examples(arguments)
            else:
                return {"error": f"Unknown tool: {tool_name}"}
                
        except Exception as e:
            self.logger.error(f"Tool execution error: {e}")
            return {"error": str(e)}
    
    async def generate_component(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """UijeongBoo 컴포넌트 생성"""
        component_type = args["component_type"]
        props = args.get("props", {})
        variant = args.get("variant", "default")
        
        if component_type not in self.components:
            return {"error": f"Unknown component type: {component_type}"}
        
        comp = self.components[component_type]
        
        # 템플릿 변수 치환
        html = comp.html_template
        for key, value in props.items():
            html = html.replace(f"{{{key}}}", str(value))
        
        # 변형 적용
        if variant != "default":
            html = html.replace("{variant}", f"uij-{component_type}-{variant}")
        else:
            html = html.replace("{variant}", "")
        
        # CSS 링크 생성
        css_link = f'<link rel="stylesheet" href="{self.css_path}">'
        js_link = f'<script src="{self.js_path}"></script>' if comp.js_behavior else ""
        
        result_text = f"✨ UijeongBoo {component_type.title()} 컴포넌트 생성\n\n"
        result_text += f"HTML:\n```html\n{html}\n```\n\n"
        result_text += f"CSS 클래스: {comp.css_classes}\n\n"
        
        if comp.js_behavior:
            result_text += f"JavaScript 동작: {comp.js_behavior}\n\n"
        
        result_text += f"포함할 파일:\n```html\n{css_link}\n{js_link}\n```"
        
        return {
            "content": [
                {
                    "type": "text",
                    "text": result_text
                }
            ]
        }
    
    async def get_design_tokens(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """디자인 토큰 조회"""
        category = args.get("category", "all")
        
        if category == "all":
            tokens = self.design_tokens
        elif category in self.design_tokens:
            tokens = {category: self.design_tokens[category]}
        else:
            return {"error": f"Unknown token category: {category}"}
        
        result_text = f"🎨 UijeongBoo 디자인 토큰\n\n"
        
        for cat, values in tokens.items():
            result_text += f"## {cat.title()}\n"
            for key, value in values.items():
                result_text += f"- **{key}**: `{value}`\n"
            result_text += "\n"
        
        return {
            "content": [
                {
                    "type": "text", 
                    "text": result_text
                }
            ]
        }
    
    async def validate_design(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """디자인 규칙 검증"""
        html_code = args["html_code"]
        css_code = args.get("css_code", "")
        
        violations = []
        suggestions = []
        
        # 금지된 패턴 검사
        forbidden_patterns = [
            ("background: white", "background: #222222 사용"),
            ("background: #ffffff", "background: #222222 사용"),
            ("box-shadow:", "그림자 효과 제거"),
            ("color: blue", "color: #32CD32 또는 #eeeeee 사용"),
            ("border-radius:", "둥근 모서리 최소화")
        ]
        
        full_code = html_code + " " + css_code
        
        for pattern, suggestion in forbidden_patterns:
            if pattern in full_code:
                violations.append(f"금지된 패턴: {pattern}")
                suggestions.append(suggestion)
        
        # UijeongBoo 클래스 사용 확인
        uij_classes = ["uij-btn", "uij-card", "uij-input", "uij-sidebar"]
        has_uij_class = any(cls in html_code for cls in uij_classes)
        
        if not has_uij_class:
            suggestions.append("UijeongBoo 컴포넌트 클래스 사용 권장")
        
        result_text = f"🔍 UijeongBoo 디자인 검증 결과\n\n"
        
        if violations:
            result_text += "❌ 위반사항:\n"
            for violation in violations:
                result_text += f"  • {violation}\n"
            result_text += "\n"
        
        if suggestions:
            result_text += "💡 개선사항:\n"
            for suggestion in suggestions:
                result_text += f"  • {suggestion}\n"
            result_text += "\n"
        
        if not violations and not suggestions:
            result_text += "✅ UijeongBoo 디자인 규칙을 잘 준수하고 있습니다!"
        
        return {
            "content": [
                {
                    "type": "text",
                    "text": result_text
                }
            ]
        }
    
    async def apply_uijeongboo_styles(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """UijeongBoo 스타일 자동 적용"""
        html_content = args["html_content"]
        auto_fix = args.get("auto_fix", True)
        
        # 기본 요소들을 UijeongBoo 스타일로 변환
        replacements = [
            ('<button', '<button class="uij-btn"'),
            ('<input', '<input class="uij-input"'),
            ('<div class="card"', '<div class="uij-card"'),
            ('style="background: white"', 'style="background: #333333"'),
            ('style="color: black"', 'style="color: #eeeeee"')
        ]
        
        modified_html = html_content
        changes = []
        
        if auto_fix:
            for old, new in replacements:
                if old in modified_html:
                    modified_html = modified_html.replace(old, new)
                    changes.append(f"{old} → {new}")
        
        result_text = f"✨ UijeongBoo 스타일 적용 완료\n\n"
        
        if changes:
            result_text += "🔄 적용된 변경사항:\n"
            for change in changes:
                result_text += f"  • {change}\n"
            result_text += "\n"
        
        result_text += "📝 수정된 HTML:\n```html\n"
        result_text += modified_html
        result_text += "\n```\n\n"
        
        # CSS 링크 추가 권장
        result_text += "📎 필요한 파일:\n```html\n"
        result_text += f'<link rel="stylesheet" href="{self.css_path}">\n'
        result_text += f'<script src="{self.js_path}"></script>\n'
        result_text += "```"
        
        return {
            "content": [
                {
                    "type": "text",
                    "text": result_text
                }
            ]
        }
    
    async def get_component_examples(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """컴포넌트 사용 예제"""
        component_type = args["component_type"]
        
        if component_type not in self.components:
            return {"error": f"Unknown component type: {component_type}"}
        
        comp = self.components[component_type]
        
        examples = {
            "button": [
                ('기본 버튼', '<button class="uij-btn">클릭하세요</button>'),
                ('주요 버튼', '<button class="uij-btn uij-btn-primary">확인</button>'),
                ('보조 버튼', '<button class="uij-btn uij-btn-secondary">취소</button>')
            ],
            "card": [
                ('기본 카드', '<div class="uij-card"><div class="uij-card-header">제목</div><div class="uij-card-content">내용</div></div>'),
                ('간단한 카드', '<div class="uij-card"><p>간단한 카드 내용</p></div>')
            ],
            "input": [
                ('텍스트 입력', '<input type="text" class="uij-input" placeholder="이름을 입력하세요" />'),
                ('이메일 입력', '<input type="email" class="uij-input" placeholder="이메일 주소" />'),
                ('비밀번호 입력', '<input type="password" class="uij-input" placeholder="비밀번호" />')
            ]
        }
        
        result_text = f"📖 UijeongBoo {component_type.title()} 사용 예제\n\n"
        
        if component_type in examples:
            for name, code in examples[component_type]:
                result_text += f"### {name}\n```html\n{code}\n```\n\n"
        else:
            result_text += f"기본 템플릿:\n```html\n{comp.html_template}\n```\n\n"
        
        result_text += f"📚 설명: {comp.description}\n"
        result_text += f"🎯 CSS 클래스: {comp.css_classes}"
        
        return {
            "content": [
                {
                    "type": "text",
                    "text": result_text
                }
            ]
        }
    
    async def list_resources(self) -> Dict[str, Any]:
        """사용 가능한 리소스 목록"""
        resources = [
            {
                "uri": "uijeongboo://css",
                "name": "UijeongBoo CSS 파일",
                "description": "전체 UijeongBoo 스타일시트",
                "mimeType": "text/css"
            },
            {
                "uri": "uijeongboo://js",
                "name": "UijeongBoo JavaScript",
                "description": "UijeongBoo 상호작용 스크립트",
                "mimeType": "text/javascript"
            },
            {
                "uri": "uijeongboo://tokens",
                "name": "디자인 토큰",
                "description": "UijeongBoo 디자인 토큰 정의",
                "mimeType": "application/json"
            }
        ]
        
        return {"resources": resources}
    
    async def read_resource(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """리소스 읽기"""
        uri = params.get("uri", "")
        
        try:
            if uri == "uijeongboo://css":
                with open(self.css_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                mime_type = "text/css"
            elif uri == "uijeongboo://js":
                with open(self.js_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                mime_type = "text/javascript"
            elif uri == "uijeongboo://tokens":
                content = json.dumps(self.design_tokens, indent=2, ensure_ascii=False)
                mime_type = "application/json"
            else:
                return {"error": f"Unknown resource: {uri}"}
            
            return {
                "contents": [
                    {
                        "uri": uri,
                        "mimeType": mime_type,
                        "text": content
                    }
                ]
            }
        except Exception as e:
            return {"error": f"Resource read error: {e}"}


def sync_main():
    """완전 로컬 MCP 서버 실행"""
    import sys
    import logging
    
    # 로깅 비활성화 (Claude 연결 방해 방지)
    logging.disable(logging.CRITICAL)
    
    server = UijeongBooMCPServer()
    
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
                    "error": {
                        "code": -32603,
                        "message": str(e)
                    }
                }
                print(json.dumps(error_response))
                sys.stdout.flush()
                
    except KeyboardInterrupt:
        sys.exit(0)
    except Exception:
        sys.exit(1)

if __name__ == "__main__":
    sync_main()