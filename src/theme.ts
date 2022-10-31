import { createTheme } from "@mui/material/styles";
declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}
declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
        neutral: true;
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}
declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        neutral: true;
    }
}
const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: "#F4F4F4"
        },
        primary: {
            main: '#01579b',
        },
        secondary: {
            main: '#ffeb3b',
        },
        neutral: { main: "#F3F7F8", contrastText: "#353535" }
    },
    typography: {
        allVariants: {
            fontFamily: ['Hind', 'Roboto', 'Helvetica', 'sans-serif'].join(','),
        },
        htmlFontSize: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#f4f4f4",
                    backgroundImage: `linear-gradient(90deg, rgba(250,250,250,1) 0%, rgba(245,245,245,1) 100%);`,
                },
            },
        },
    }

});
export default theme;