import SwiftUI

// MARK: - Deprecated Standard Components (Force UijeongBoo Usage)
extension View {
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: .uijeongbooTransparentButton() 또는 .uijeongbooActiveButton() 사용하세요")
    func buttonStyle<S>(_ style: S) -> some View where S : ButtonStyle {
        return self
    }
}

extension Button {
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: UijeongBoo 승인 버튼 스타일만 사용하세요")
    init<Label>(_ titleKey: LocalizedStringKey, @ViewBuilder label: () -> Label) where Label : View {
        self.init(titleKey, action: {}, label: label)
    }
}

extension Color {
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let white = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let black = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let blue = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let red = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let green = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let yellow = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let orange = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let purple = Color.clear
    
    @available(*, deprecated, message: "UijeongBoo 규칙 위반: Color.uijeongboo* 색상만 사용하세요")
    static let pink = Color.clear
}

// MARK: - Validation Functions
struct UijeongBooValidator {
    static func validateColorUsage(in code: String) -> [String] {
        var violations: [String] = []
        
        let forbiddenColors = [
            "#ffffff", "white", "#f5f5f5", "#e5e5e5",
            "#ff0000", "red", "#00ff00", "green", 
            "#0000ff", "blue", "#ffff00", "yellow",
            "#ff00ff", "magenta", "#00ffff", "cyan"
        ]
        
        for color in forbiddenColors {
            if code.contains(color) {
                violations.append("금지된 색상 사용: \(color)")
            }
        }
        
        return violations
    }
    
    static func validateComponentUsage(in code: String) -> [String] {
        var violations: [String] = []
        
        let forbiddenPatterns = [
            ".buttonStyle(.bordered)",
            ".buttonStyle(.plain)",
            ".buttonStyle(.borderless)",
            "Color.white",
            "Color.black",
            "Color.blue",
            "Color.red",
            "Background(Color",
            ".background(Color."
        ]
        
        for pattern in forbiddenPatterns {
            if code.contains(pattern) {
                violations.append("금지된 컴포넌트 패턴: \(pattern)")
            }
        }
        
        return violations
    }
}