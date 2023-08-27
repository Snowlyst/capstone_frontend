import { createTheme } from "@mui/material/styles";
import "./App.css";

const subtitleFont = "'Kaushan Script', cursive";
const pFont = "'Roboto', sans-serif";

// to use these themes
// At top of the file use: import {mainSubtitle} from "location of this file Theme.js"
// also ensure muiTheme is imported: import { ThemeProvider } from "@mui/material"
// Wrap the html u wanna use the theme in with this <ThemeProvider theme={functionname}>

// call this for paragraph text using <Typography theme={theme}>.
// to use different font weight, use e.g. <Typography theme={theme} sx={{fontWeight: theme.typography.fontWeightBold}}> for paragraph text

export const theme = createTheme({
  typography: {
    h1: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    h1Cursive: {
      fontFamily: subtitleFont,
      color: "#0E0140",
    },
    h2: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    h2Cursive: {
      fontFamily: subtitleFont,
      color: "#0E0140",
    },
    h3: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    h4: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    h5: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    h6: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    p: {
      fontFamily: pFont,
      color: "#868484",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    darkP: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
  },
  customStyles: {
    centered: {
      container: {
        backgroundColor: "#F3F1FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Adjust the value as needed
          fontWeight: 700,
          textTransform: "none",
          "&.blue": {
            backgroundColor: "#0E0140",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#2802ba",
            },
          },
          "&.orange": {
            backgroundColor: "#FF6B2C",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#f79568",
            },
          },
        },
      },
    },
  },
});
