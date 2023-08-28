import React, { useState, useEffect } from "react";
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
  InputLabel,
  IconButton,
  Tooltip,
  Button,
  FormHelperText,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Assets/Styles/Theme";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../Assets/Styles/MemberProfile.css";
import axios from "axios";

function Profile() {
  // Set States
  // 1st Row of input in the form.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");

  // 2nd row of input in the form.
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth]= useState("")
  const [cancerDiagnosis, setCancerDiagnosis] = useState("");
  const [newCancerDiagnosis, setNewCancerDiagnosis] = useState("");
  const [housingType, setHousingType] = useState("");
  const [livingArrangement, setLivingArrangment] = useState("");
  const [currentWorkStatus, setCurrentWorkStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [cancerImpactOnFinances, setCancerImpactOnFinances] = useState("");
  const [employedReadinessScaleToRtw, setEmployedReadinessScaleToRtw] =
    useState("");
  const [unemployedReadinessScaleToRtw, setUnemployedReadinessScaleToRtw] =
    useState("");
  const [unemployedTimeFrameToRtw, setUnemployedTimeFrameToRtw] = useState("");
  const [currentHealthStatus, setCurrentHealthStatus] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [displayedAddress, setDisplayedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [physicalHealthInterference, setPhysicalHealthInterference] =
    useState("");
  const [mentalHealthInterference, setMentalHealthInterference] = useState("");

  // Functions to handle input
  // 1st Row of input in the form.
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleIdentificationNumberChange = (e) => {
    setIdentificationNumber(e.target.value);
  };
  // 2nd row of input in the form.
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleDateOfBirthChange =(e) =>{
    setDateOfBirth(e.target.value);
  };
  

  const handleNewCancerDiagnosisChange = (e) =>{
    setNewCancerDiagnosis(e.target.value)
  }
 const handleCancerDiagnosisChange = (event) => {
   const selectedValue = event.target.value;
   setCancerDiagnosis(selectedValue);
   if(cancerDiagnosis !== "Others"){
      setNewCancerDiagnosis("")
   }
   
 };
   useEffect(() => {
     console.log("New Cancer Diagnosis", newCancerDiagnosis);
   }, [newCancerDiagnosis]);
  useEffect(() => {
    console.log("Cancer Diagnosis", cancerDiagnosis);
  }, [cancerDiagnosis]);
 
  const handleHousingTypeChange = (e) => {
    setHousingType(e.target.value);
  };

  const handleLivingArrangmentChange = (e) => {
    setLivingArrangment(e.target.value);
  };
  const handleCurrentWorkStatus = (e) => {
    setCurrentWorkStatus(e.target.value);
  };
  const handleOccupation = (e) => {
    setOccupation(e.target.value);
  };
  const handleMonthlySalary = (e) => {
    setMonthlySalary(e.target.value);
  };
  const handleCancerImpactOnFinances = (e) => {
    setCancerImpactOnFinances(e.target.value);
  };
  const handleEmployedReadinessScaleToRtw = (e) => {
    setEmployedReadinessScaleToRtw(e.target.value);
  };
  const handleUnemployedReadinessScaleToRtw = (e) => {
    setUnemployedReadinessScaleToRtw(e.target.value);
  };
  const handleUnemployedTimeFrameToRtw = (e) => {
    setUnemployedTimeFrameToRtw(e.target.value);
  };
  const handleCurrentHealthStatus = (e) => {
    setCurrentHealthStatus(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handlePhysicalHealthInterference = (e) => {
    setPhysicalHealthInterference(e.target.value);
  };
  const handleMentalHealthInterference = (e) => {
    setMentalHealthInterference(e.target.value);
  };

  const handleSearchPostal = (e) => {
    e.preventDefault();
    const searchQuery = postalCode;
    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${searchQuery}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((info) => {
        const spreadData = info.data.results.map((info, index) => {
          console.log(info);
          console.log(info.ADDRESS);
          setAddress(info.ADDRESS);
          return <div key={index}>Address: {info.ADDRESS}</div>;
        });
        setDisplayedAddress(spreadData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {/* Header */}
            <Box textAlign="center" mt={2}>
              <Typography
                theme={theme}
                sx={{
                  ...theme.typography.h2,
                  fontWeightBold: theme.typography.h2.fontWeightBold,
                }}
              >
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
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={firstName === ""}
                    helperText={
                      firstName === "" ? "First Name is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={lastName === ""}
                    helperText={lastName === "" ? "Last Name is required" : ""}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="NRIC"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={identificationNumber}
                    onChange={handleIdentificationNumberChange}
                    error={identificationNumber === ""}
                    helperText={
                      identificationNumber === ""
                        ? "Identification Number is required"
                        : ""
                    }
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
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    error={mobileNumber === ""}
                    helperText={
                      mobileNumber === "" ? "Mobile Number is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={4} md={2}>
                  <TextField
                    label="Date of Birth"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="DD/MM/YYYY"
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    error={dateOfBirth === ""}
                    helperText={
                      dateOfBirth === "" ? "Date of Birth is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={4} md={3}>
                  <Box className="myBox2">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error ={cancerDiagnosis ===""}
                    >
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
                      {cancerDiagnosis === "" && (
                        <FormHelperText>
                          Cancer Diagnosis is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    {cancerDiagnosis === "Others" && (
                      <TextField
                        label="Other Cancer Diagnosis"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value ={newCancerDiagnosis}
                        onChange={handleNewCancerDiagnosisChange}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box className="myBox2">
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
                  <Box className="myBox">
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
                    type="number"
                    value={postalCode}
                    onChange={handlePostalCode}
                  />
                </Grid>
                <Grid item xs={1} md={0.5}>
                  <Box className="myBox3">
                    <Tooltip title="Key in postal code and click the search button to get the address">
                      <IconButton
                        style={{ color: "#FF6B2C" }}
                        aria-label="search"
                        onClick={handleSearchPostal}
                      >
                        <SearchOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
                {/* Unit No */}
                <Grid item xs={4} md={1.5}>
                  <Box className="myBox4">
                    <TextField
                      label="Unit No"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="#"
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
                    value={address}
                  />
                </Grid>
                {/* Housing Type */}
                <Grid item xs={6} md={2.5}>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Housing Type</InputLabel>
                      <Select
                        label="Housing Type"
                        value={housingType}
                        onChange={handleHousingTypeChange}
                      >
                        <MenuItem value="HDB 1 Room">HDB 1 Room</MenuItem>
                        <MenuItem value="HDB 2 Room">HDB 2 Room</MenuItem>
                        <MenuItem value="HDB 3 Room">HDB 3 Room</MenuItem>
                        <MenuItem value="HDB 4 Room">HDB 4 Room</MenuItem>
                        <MenuItem value="HDB 5 Room">HDB 5 Room</MenuItem>
                        <MenuItem value="HDB Executive & Above">
                          HDB Executive & Above
                        </MenuItem>
                        <MenuItem value="Private Condo">Private Condo</MenuItem>
                        <MenuItem value="Private Landed">
                          Private Landed
                        </MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    {housingType === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Grid>
                {/* Living Arrangement */}
                <Grid item xs={6} md={3}>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Living Arrangement</InputLabel>
                      <Select
                        label="Living Arrangment"
                        value={livingArrangement}
                        onChange={handleLivingArrangmentChange}
                      >
                        <MenuItem value="Alone">Alone</MenuItem>
                        <MenuItem value="w/spouse only">w/spouse only</MenuItem>
                        <MenuItem value="w/children only">
                          w/children only
                        </MenuItem>
                        <MenuItem value="w/ spouse & children">
                          w/ spouse & children
                        </MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    {livingArrangement === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* Work Information */}
            <Box mt={4} ml={2}>
              <Typography theme={theme} sx={theme.typography.h6}>
                Work Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Current Work Status</InputLabel>
                      <Select
                        label="Current Work Status"
                        value={currentWorkStatus}
                        onChange={handleCurrentWorkStatus}
                      >
                        <MenuItem value="Employed">Employed</MenuItem>
                        <MenuItem value="Unemployed">Unemployed</MenuItem>
                        <MenuItem value="Unpaid Leave">UNpaid Leave</MenuItem>
                        <MenuItem value="Paid Leave">Paid Leave</MenuItem>
                        <MenuItem value="Others">Other work status</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    {currentWorkStatus === "Others" && (
                      <TextField
                        label="Other work status"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        label="Occupation"
                        value={occupation}
                        onChange={handleOccupation}
                      >
                        <MenuItem value="Current General Worker Cleaner">
                          Current General Worker Cleaner
                        </MenuItem>
                        <MenuItem value="Current General Worker Packer">
                          Current General Worker Packer
                        </MenuItem>
                        <MenuItem value="Current General Worker Hawker">
                          Current General Worker Hawker
                        </MenuItem>
                        <MenuItem value="Current Services & Sales">
                          Current Services & Sales
                        </MenuItem>
                        <MenuItem value="Current Admin & Clerical">
                          Current Admin & Clerical
                        </MenuItem>
                        <MenuItem value="Current PMET">Current PMET</MenuItem>
                        <MenuItem value="Last General Worker Cleaner">
                          Last General Worker Cleaner
                        </MenuItem>
                        <MenuItem value="Last General Worker Packer">
                          Last General Worker Packer
                        </MenuItem>
                        <MenuItem value="Last General Worker Hawker">
                          Last General Worker Hawker
                        </MenuItem>
                        <MenuItem value="Last Services & Sales">
                          Last Services & Sales
                        </MenuItem>
                        <MenuItem value="Last Admin & Clerical">
                          Last Admin & Clerical
                        </MenuItem>
                        <MenuItem value="Current PMET">Last PMET</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    {occupation === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                    <Typography
                      theme={theme}
                      sx={{ ...theme.typography.p, fontSize: 10 }}
                    >
                      *PMET stands for Professionals, Managers, Executives and
                      Technicians. *Current means currently employed. *Last
                      means previously employed.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Basic Monthly Salary</InputLabel>
                      <Select
                        label="Basic Monthly Salary"
                        value={monthlySalary}
                        onChange={handleMonthlySalary}
                      >
                        <MenuItem value="Less than $1,000">
                          Less than $1,000
                        </MenuItem>
                        <MenuItem value="$1,000 to $2,000">
                          $1,000 to $2,000
                        </MenuItem>
                        <MenuItem value="$2,001 to $3,000">
                          $2,001 to $3,000
                        </MenuItem>
                        <MenuItem value="$3,001 to $4,000">
                          $3,001 to $4,000
                        </MenuItem>
                        <MenuItem value="$4,001 to $5,000">
                          $4,001 to $5,000
                        </MenuItem>
                        <MenuItem value="$5,001 to $6,000">
                          $5,001 to $6,000
                        </MenuItem>
                        <MenuItem value="$6,001 to $7,000">
                          $6,001 to $7,000
                        </MenuItem>
                        <MenuItem value="$7,001 to $8,000">
                          $7,001 to $8,000
                        </MenuItem>
                        <MenuItem value="$8,001 to $9,000">
                          $8,001 to $9,000
                        </MenuItem>
                        <MenuItem value="$9,001 to $10,000">
                          $9,001 to $10,000
                        </MenuItem>
                        <MenuItem value="Above $10,000">Above $10,000</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography
                    theme={theme}
                    sx={{ ...theme.typography.p, fontSize: 10 }}
                  >
                    (*exclude bonuses, employer cpf, 13th month bonus etc. *
                    Currency: SGD)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Cancer impact on finances </InputLabel>
                      <Select
                        label="Cancer imapct on finances"
                        value={cancerImpactOnFinances}
                        onChange={handleCancerImpactOnFinances}
                      >
                        <MenuItem value="Not at all">Not at all</MenuItem>
                        <MenuItem value="A little">A Little</MenuItem>
                        <MenuItem value="Some">Some</MenuItem>
                        <MenuItem value="A lot">A lot</MenuItem>
                        <MenuItem value="Don't Know">Don't Know</MenuItem>
                        <MenuItem value="Refused">Refused</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography
                    theme={theme}
                    sx={{ ...theme.typography.p, fontSize: 10 }}
                  >
                    (To what degree has cancer caused financial problems to you
                    and your family?)
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box mt={4} ml={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography theme={theme} sx={theme.typography.h6}>
                    If Unemployed
                  </Typography>
                  <TextField
                    label="Date of last employment"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="MM/YYYY"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox5">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Readiness Scale to RTW </InputLabel>
                      <Select
                        label="Readiness Scale to RTW"
                        value={unemployedReadinessScaleToRtw}
                        onChange={handleUnemployedReadinessScaleToRtw}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography
                    theme={theme}
                    sx={{ ...theme.typography.p, fontSize: 10 }}
                  >
                    (On a Scale of 1 to 10. 10 means ready to return to
                    workforce. 1 means not so ready)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox5">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Time frame to RTW </InputLabel>
                      <Select
                        label="Time Frame to RTW"
                        value={unemployedTimeFrameToRtw}
                        onChange={handleUnemployedTimeFrameToRtw}
                      >
                        <MenuItem value="3 months">3 months</MenuItem>
                        <MenuItem value="6 months">6 months</MenuItem>
                        <MenuItem value="9 months">9 months</MenuItem>
                        <MenuItem value="12 months">12 months</MenuItem>
                        <MenuItem value="Not Applicable">
                          Not Applicable
                        </MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    {unemployedTimeFrameToRtw === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="MM/YYYY"
                      />
                    )}
                  </Box>
                  <Typography
                    theme={theme}
                    sx={{ ...theme.typography.p, fontSize: 10 }}
                  >
                    (*select others if time frame more than 12 months.)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  {/* If Employed */}
                  <Typography theme={theme} sx={theme.typography.h6}>
                    If Employed
                  </Typography>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Readiness Scale to RTW </InputLabel>
                      <Select
                        label="Readiness Scale to RTW"
                        value={employedReadinessScaleToRtw}
                        onChange={handleEmployedReadinessScaleToRtw}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography
                    theme={theme}
                    sx={{ ...theme.typography.p, fontSize: 10 }}
                  >
                    (On a Scale of 1 to 10. 10 means ready to return to
                    workforce. 1 means not so ready)
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box mt={4} ml={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography theme={theme} sx={theme.typography.h6}>
                    Self Assessment
                  </Typography>
                  <Box className="myBox">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Current Health</InputLabel>
                      <Select
                        label="Current Health"
                        value={currentHealthStatus}
                        onChange={handleCurrentHealthStatus}
                      >
                        <MenuItem value="Excellent">Excellent</MenuItem>
                        <MenuItem value="Very Good">Very Good</MenuItem>
                        <MenuItem value="Good">Good</MenuItem>
                        <MenuItem value="Fair">Fair</MenuItem>
                        <MenuItem value="Poor">Poor</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox5">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>
                        Physical health interfered with normal activities?
                      </InputLabel>
                      <Select
                        label="Physical health interfered with normal activities?"
                        value={physicalHealthInterference}
                        onChange={handlePhysicalHealthInterference}
                      >
                        <MenuItem value="Not at all">Not at all</MenuItem>
                        <MenuItem value="Slightly">Slightly</MenuItem>
                        <MenuItem value="Moderately">Moderately</MenuItem>
                        <MenuItem value="Quite a bit">Quite a bit</MenuItem>
                        <MenuItem value="Extremely">Extremely</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    <Typography
                      theme={theme}
                      sx={{
                        ...theme.typography.p,
                        fontSize: 10,
                      }}
                    >
                      Physical health interfered with normal activities in the
                      past 4 weeks.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox5">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>
                        Mental health interfered with normal activities?
                      </InputLabel>
                      <Select
                        label="Mental health interfered with normal activities?"
                        value={mentalHealthInterference}
                        onChange={handleMentalHealthInterference}
                      >
                        <MenuItem value="Not at all">Not at all</MenuItem>
                        <MenuItem value="Slightly">Slightly</MenuItem>
                        <MenuItem value="Moderately">Moderately</MenuItem>
                        <MenuItem value="Quite a bit">Quite a bit</MenuItem>
                        <MenuItem value="Extremely">Extremely</MenuItem>
                        <MenuItem value="null"></MenuItem>
                      </Select>
                    </FormControl>
                    <Typography
                      theme={theme}
                      sx={{
                        ...theme.typography.p,
                        fontSize: 10,
                      }}
                    >
                      Mental health interfered with normal activities in the
                      past 4 weeks.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="myBox">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Physical barriers to RTW"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Mental barriers to RTW"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Additional Information"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" py={5}>
                          <Button className="orange" variant="contained">
                            Submit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
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
