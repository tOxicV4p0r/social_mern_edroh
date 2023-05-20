export const colorTokens = {
    gray: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
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
        50: "#E6FBFF",
        100: "#CCF7FE",
        200: "#99EEFD",
        300: "#66E6FC",
        400: "#33DDFB",
        500: "#00D5FA",
        600: "#00A0BC",
        700: "#006B7D",
        800: "#00353F",
        900: "#001519",
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
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
            },
            neutral: {
                dark: colorTokens.gray[100],
                main: colorTokens.gray[200],
                mediumMain: colorTokens.gray[300],
                medium: colorTokens.gray[400],
                light: colorTokens.gray[700],
            },
            background: {
                default: colorTokens.gray[900],
                alt: colorTokens.gray[800],
            }
        }
    } else {
        theme = {
            primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
            },
            neutral: {
                dark: colorTokens.gray[700],
                main: colorTokens.gray[500],
                mediumMain: colorTokens.gray[400],
                medium: colorTokens.gray[300],
                light: colorTokens.gray[50],
            },
            background: {
                default: colorTokens.gray[10],
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