import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import error from "../Assets/Images/error.png";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              So sorry! The page you’re looking for doesn’t exist.
              <br />
              Please let us show you the way back! Or, feel free to search jobs
              listed!
            </Typography>
            <Link to="/">
              <Button variant="contained">Search Jobs</Button>
              <Button variant="contained">Go Back Home</Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img src={error} alt="error" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
