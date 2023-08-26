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
      fontFamily: subtitleFont, // cursive font in logo
      color: "#0E0140",
    },
    h2: {
      fontFamily: subtitleFont, // cursive font in logo
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
});
