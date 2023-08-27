import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel, IconButton
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Assets/Styles/Theme";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
function Profile() {
  const [cancerDiagnosis, setCancerDiagnosis] = useState("");

  const handleCancerDiagnosisChange = (event) => {
    setCancerDiagnosis(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {/* Header */}
            <Box textAlign="center" mt={2}>
              <Typography theme={theme} sx={theme.typography.h4}>
                Profile
              </Typography>
              <Typography theme={theme} sx={theme.typography.p}>
                Please fill up your particulars. All fields must be filled in
                before you can join the programs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* Personal Information */}
            <Box mt={4} ml={2}>
              <Typography theme={theme} sx={theme.typography.h6}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="NRIC"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box mt={1} ml={2}>
              <Grid container spacing={2}>
                <Grid item xs={4} md={2}>
                  <TextField
                    label="Mobile"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4} md={2}>
                  <TextField
                    label="Date of Birth"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4} md={3}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={2.0}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Cancer Diagnosis</InputLabel>
                      <Select
                        label="Cancer Diagnosis"
                        value={cancerDiagnosis}
                        onChange={handleCancerDiagnosisChange}
                      >
                        <MenuItem value="Breast">Breast</MenuItem>
                        <MenuItem value="Brain">Brain</MenuItem>
                        <MenuItem value="Lung">Lung</MenuItem>
                        <MenuItem value="Colon & Rectum">
                          Colon & Rectum
                        </MenuItem>
                        <MenuItem value="Prostate">Prostate</MenuItem>
                        <MenuItem value="Head & Neck">Head & Neck</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    {cancerDiagnosis === "Others" && (
                      <TextField
                        label="Other Cancer Diagnosis"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={2.0}
                    ml={2.0}
                  >
                    <Typography sx={{ fontSize: "small" }}>
                      Active Treatment
                    </Typography>
                    <RadioGroup row>
                      <FormControlLabel
                        value="yes"
                        control={<Radio size="small" />}
                        label={
                          <Typography sx={{ fontSize: "small" }}>
                            Yes
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio size="small" />}
                        label={
                          <Typography sx={{ fontSize: "small" }}>No</Typography>
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    mt={2.0}
                  >
                    <Typography sx={{ fontSize: "small" }}>Gender</Typography>
                    <RadioGroup row>
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label={
                          <Typography sx={{ fontSize: "small" }}>
                            Male
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label={
                          <Typography sx={{ fontSize: "small" }}>
                            Female
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box mt={1} ml={2}>
              <Grid container spacing={2}>
                {/* Postal Code */}
                <Grid item xs={3} md={1.5}>
                  <TextField
                    label="Postal Code"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} md={0.5}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    mt={4.0}
                    mr={9.0}
                  >
                    <IconButton
                      style={{ color: "#FF6B2C" }}
                      aria-label="search"
                    >
                      <SearchOutlinedIcon />
                    </IconButton>
                  </Box>
                </Grid>
                {/* Unit No */}
                <Grid item xs={4} md={1.5}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    mr={2.0}
                  >
                    <TextField
                      label="Unit No"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                  </Box>
                </Grid>

                {/* Address */}
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Address"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                {/* Housing Type */}
                <Grid item xs={6} md={2}>
                  <TextField
                    label="Housing Type"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                {/* Living Arrangement */}
                <Grid item xs={6} md={3.5}>
                  <TextField
                    label="Living Arrangement"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
