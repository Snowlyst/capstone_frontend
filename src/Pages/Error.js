import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  ThemeProvider,
  Stack,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import error from "../Assets/Images/error.png";
import { theme } from "../Assets/Styles/Theme";

export default function Error() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...theme.customStyles.centered.container,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            direction="row"
            sx={theme.customStyles.centered.container}
          >
            <Grid item xs={6}>
              <Typography
                variant="h1"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
                <br />
                Please let us show you the way back, <br />
                or feel free to search jobs listed!
              </Typography>

              <Stack direction="row" spacing={3}>
                <Button
                  classes={{ root: "blue" }}
                  variant="contained"
                  component={Link}
                  to="/search"
                >
                  Search Jobs
                </Button>

                <Button
                  classes={{ root: "blue" }}
                  variant="contained"
                  component={Link}
                  to="/"
                >
                  Go Back Home
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <img src={error} alt="error" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
