#!/usr/bin/env python3
"""
Simple Uijeongboo MCP Server
"""
import asyncio
import json
import sys
from typing import Any, Dict

async def handle_initialize(params: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "protocolVersion": "2024-11-05",
        "capabilities": {
            "tools": {}
        },
        "serverInfo": {
            "name": "uijeongboo",
            "version": "1.0.0"
        }
    }

async def handle_tools_list() -> Dict[str, Any]:
    return {
        "tools": [
            {
                "name": "ui_design",
                "description": "Get UI design components",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "component": {
                            "type": "string", 
                            "description": "Component type"
                        }
                    }
                }
            }
        ]
    }

async def handle_tools_call(name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
    if name == "ui_design":
        return {
            "content": [
                {
                    "type": "text",
                    "text": f"UI Component: {arguments.get('component', 'button')}"
                }
            ]
        }
    else:
        raise ValueError(f"Unknown tool: {name}")

async def main():
    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                break
                
            request = json.loads(line.strip())
            
            if request["method"] == "initialize":
                response = await handle_initialize(request.get("params", {}))
            elif request["method"] == "tools/list":
                response = await handle_tools_list()
            elif request["method"] == "tools/call":
                params = request.get("params", {})
                response = await handle_tools_call(
                    params.get("name", ""),
                    params.get("arguments", {})
                )
            else:
                response = {"error": {"code": -32601, "message": "Method not found"}}
            
            result = {
                "jsonrpc": "2.0",
                "id": request.get("id"),
                "result": response
            }
            
            print(json.dumps(result), flush=True)
            
        except Exception as e:
            error_response = {
                "jsonrpc": "2.0", 
                "id": request.get("id") if 'request' in locals() else None,
                "error": {"code": -32000, "message": str(e)}
            }
            print(json.dumps(error_response), flush=True)

if __name__ == "__main__":
    asyncio.run(main())