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
      color: "#868484", // grey
      fontWeight: 400,
      fontWeightBold: 700,
    },
    darkP: {
      fontFamily: pFont,
      color: "#0E0140", // blue
      fontWeight: 400,
      fontWeightBold: 700,
    },
    error: {
      fontFamily: pFont,
      color: "#BA000d", // red
      fontWeight: 400,
      fontWeightBold: 700,
      fontSize: 12,
    },
  },
  customStyles: {
    displayFlexRowCenter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    displayFlexRowLeft: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
    },
    displayFlexColumnCenter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    centered: {
      container: {
        backgroundColor: "#F3F1FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 4,
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
          "&.red": {
            backgroundColor: "#D73030",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#EC6767",
            },
          },
          "&.green": {
            backgroundColor: "#1A5F7A",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#3DCCC7",
            },
          },
          "&.purple": {
            backgroundColor: "#9384D1",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1D267D",
            },
          },
        },
      },
    },
  },
});
