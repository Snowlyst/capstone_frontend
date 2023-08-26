import { Box, ThemeProvider, Grid } from "@mui/material";
import "../Assets/Styles/Theme";
import { theme } from "../Assets/Styles/Theme";
import "../Assets/Styles/Homepage.css";

function Homepage() {
  return (
    <Grid Container justify="center">
      <Box className="hero-image">
        <Box></Box>
      </Box>
    </Grid>
  );
}

export default Homepage;
