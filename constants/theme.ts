
// Intuition behind naming:
// background: color for main screen background
// surface: for UI layers on top of background
// primary: main brand color
// secondary: importance level lower than primary

export const Colors = {
    light: {
        background: {
            main: "hsl(0, 3%, 85%)",
            surface: "hsl(0, 0%, 92%)",

        },
        secondary: "hsl(157, 10%, 80%)",
        text: {
            primary: "hsla(120, 100%, 8%, 0.9)",
            secondary: "hsla(120, 100%, 8%, 0.5)",
            disabled: "hsla(0, 0%, 8%, 0.3)"
        },
        button: {
            default: "hsl(156, 91%, 37%)",
            pressed: "hsl(156, 91%, 55%)",
            disabled: "hsl(0, 0%, 75%)",
        },
        error: "hsl(0, 50%, 50%)",
        success: "hsl(156, 90%, 70%)",
        warning: "hsl(49, 55%, 54%)",
    },
}