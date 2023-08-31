import React, { useState } from "react";
import {
  ThemeProvider,
  Box,
  Divider,
  Typography,
  Grid,
  Button,
  Avatar,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";

function CreateResume() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };
  const headings = [
    "Experience",
    "Education",
    "Skills",
    "Languages",
    "Additional Info",
    "About me",
    "Privacy Setting(?)",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box>
          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              margin: "30px 0 0",
              fontWeight: theme.typography.h4.fontWeightBold,
            }}
          >
            Create a Resume
          </Typography>

          {/* Main Box */}
          <Box
            sx={{
              width: "100vw", // Occupy the entire viewport width
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textALign: "center",
              marginTop: -35, // Add margin to align with the title
            }}
          >
            <Grid container alignItems="stretch" spacing={0} maxWidth={1200}>
              {/* Left Panel */}
              <Grid
                item
                xs={2}
                sx={{ borderRight: "1px solid #ccc", padding: 2 }}
              >
                <Grid container direction="column" spacing={2}>
                  {/* User Info */}
                  <Grid item>
                    <Avatar
                      alt="User Avatar"
                      src="/user-avatar.jpg"
                      sx={{ width: 60, height: 60 }}
                    />
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Button
                      variant="transparent"
                      sx={{ mt: 1, color: "#FF6B2c" }}
                    >
                      View Profile
                    </Button>
                  </Grid>
                  {/* Other Headings */}
                  {headings.map((heading) => (
                    <Grid item key={heading}>
                      <Typography
                        variant="p"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleContentClick(heading)}
                      >
                        {heading}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Vertical Line */}
              <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
                <Divider orientation="vertical" sx={{ height: "100%" }} />
              </Grid>

              {/* Right Panel */}
              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                  position: "relative", // Add this property
                  
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Typography
                      variant="p"
                      sx={{ marginBottom: 2, paddingTop: 10 }}
                    >
                      Start building your professional resume by selecting
                      different sections from the left panel.
                    </Typography>
                  </Grid>
                  <Grid item>
                    {selectedContent ? (
                      <Typography variant="h5" component="div">
                        Display {selectedContent} Content Here
                      </Typography>
                    ) : (
                      <Typography variant="h5" component="div">
                        Select a heading from the left panel
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateResume;
