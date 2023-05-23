export const colorTokens = {
    gray: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        60: "#0000008a",
        100: "#E0E0E0",
        150: "#c2c2c2a1",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#4D4D4D",
        700: "#333333",
        800: "#1A1A1A",
        900: "#0A0A0A",
        1000: "#000000",
    },
    primary: {
        50: "#e1f6fe",
        100: "#b2e7fc",
        200: "#7ed7fb",
        300: "#46c7f9",
        400: "#00baf9",
        500: "#00aef8",
        600: "#00a0e9",
        700: "#008dd5",
        800: "#007cc2",
        900: "#005ba0",
    },
};

// mui theme settings
export const themeSettings = (mode) => {

    let theme = {};
    if (mode === "dark") {
        // dark mode
        theme = {
            primary: {
                dark: colorTokens.primary[200],
                medium: colorTokens.primary[400],
                main: colorTokens.primary[600],
                light: colorTokens.primary[800],
                lightest: colorTokens.primary[900],
            },
            neutral: {
                dark: colorTokens.gray[100],
                main: colorTokens.gray[200],
                mediumMain: colorTokens.gray[300],
                medium: colorTokens.gray[400],
                lightMedium: colorTokens.gray[600],
                light: colorTokens.gray[700],
            },
            background: {
                default: colorTokens.gray[900],
                altMid: colorTokens.gray[0],
                alt: colorTokens.gray[800],
            }
        }
    } else {
        theme = {
            primary: {
                dark: colorTokens.primary[700],
                medium: colorTokens.primary[600],
                main: colorTokens.primary[500],
                light: colorTokens.primary[200],
                lightest: colorTokens.primary[100],
            },
            neutral: {
                dark: colorTokens.gray[700],
                main: colorTokens.gray[500],
                mediumMain: colorTokens.gray[400],
                medium: colorTokens.gray[300],
                lightMedium: colorTokens.gray[150],
                light: colorTokens.gray[50],
            },
            background: {
                default: colorTokens.gray[10],
                altMid: colorTokens.gray[60],
                alt: colorTokens.gray[0],
            }
        }
    }

    return {
        palette: {
            mode: mode,
            ...theme,
            typography: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 12,
            },
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 15,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            }
        },
    }
}