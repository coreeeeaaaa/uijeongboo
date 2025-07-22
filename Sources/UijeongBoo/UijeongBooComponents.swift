import SwiftUI

// MARK: - UijeongBoo Color Extensions
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
    
    // UijeongBoo Color Palette
    static let uijeongbooBackground = Color(hex: "#222222")
    static let uijeongbooCardBackground = Color(hex: "#333333")
    static let uijeongbooInputBackground = Color(hex: "#444444")
    static let uijeongbooBorder = Color(hex: "#555555")
    static let uijeongbooText = Color(hex: "#eeeeee")
    static let uijeongbooPrimary = Color(hex: "#32CD32")
    static let uijeongbooPrimaryText = Color.black
}

// MARK: - UijeongBoo Button Styles
struct UijeongBooTransparentButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background(Color.clear)
            .foregroundColor(.uijeongbooText)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.uijeongbooBorder, lineWidth: 1)
            )
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

struct UijeongBooActiveButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background(Color.uijeongbooPrimary)
            .foregroundColor(.uijeongbooPrimaryText)
            .cornerRadius(8)
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

// MARK: - UijeongBoo View Extensions
extension View {
    func uijeongbooTransparentButton() -> some View {
        self.buttonStyle(UijeongBooTransparentButtonStyle())
    }
    
    func uijeongbooActiveButton() -> some View {
        self.buttonStyle(UijeongBooActiveButtonStyle())
    }
    
    func uijeongbooCard() -> some View {
        self.padding()
            .background(Color.uijeongbooCardBackground)
            .cornerRadius(8)
    }
    
    func uijeongbooInput() -> some View {
        self.padding()
            .background(Color.uijeongbooInputBackground)
            .foregroundColor(.uijeongbooText)
            .cornerRadius(8)
    }
    
    func uijeongbooText() -> some View {
        self.foregroundColor(.uijeongbooText)
    }
}

// MARK: - UijeongBoo Card Component
struct UijeongBooCard<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .padding()
            .background(Color.uijeongbooCardBackground)
            .cornerRadius(8)
    }
}

// MARK: - UijeongBoo Input Components
struct UijeongBooTextField: View {
    @Binding var text: String
    let placeholder: String
    
    var body: some View {
        TextField(placeholder, text: $text)
            .padding()
            .background(Color.uijeongbooInputBackground)
            .foregroundColor(.uijeongbooText)
            .cornerRadius(8)
    }
}

struct UijeongBooSecureField: View {
    @Binding var text: String
    let placeholder: String
    
    var body: some View {
        SecureField(placeholder, text: $text)
            .padding()
            .background(Color.uijeongbooInputBackground)
            .foregroundColor(.uijeongbooText)
            .cornerRadius(8)
    }
}

// MARK: - UijeongBoo Navigation Components
struct UijeongBooNavigationView<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        NavigationView {
            content
                .background(Color.uijeongbooBackground)
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

// MARK: - UijeongBoo List Components
struct UijeongBooList<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        List {
            content
        }
        .listStyle(PlainListStyle())
        .background(Color.uijeongbooBackground)
    }
}

// MARK: - UijeongBoo Toggle Component
struct UijeongBooToggle: View {
    @Binding var isOn: Bool
    let label: String
    
    var body: some View {
        Toggle(label, isOn: $isOn)
            .toggleStyle(SwitchToggleStyle(tint: .uijeongbooPrimary))
            .foregroundColor(.uijeongbooText)
    }
}