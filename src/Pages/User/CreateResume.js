import { useState } from "react";
import { ThemeProvider, Box, Divider, Typography } from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";

function CreateResume() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box></Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateResume;
