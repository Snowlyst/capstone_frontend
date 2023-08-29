import { createTheme } from "@mui/material/styles";
import "./App.css";

const subtitleFont = "'Kaushan Script', cursive";
const pFont = "'Roboto', sans-serif";
const siteFont = "'Aclonica', sans-serif";

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
    h1Title: {
      fontFamily: siteFont,
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
    h3Cursive: {
      fontFamily: subtitleFont,
      color: "#0E0140",
    },
    h4: {
      fontFamily: pFont,
      color: "#0E0140",
      fontWeight: 400,
      fontWeightBold: 700,
    },
    h4Cursive: {
      fontFamily: subtitleFont,
      color: "#0E0140",
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
    categoryBox: {
      display: "block",
      margin: "0 auto",
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
