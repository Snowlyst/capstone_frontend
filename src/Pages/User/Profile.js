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
  ThemeProvider,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../../Assets/Styles/MemberProfile.css";
import axios from "axios";
import {
  cancerDiagnosisOptions,
  housingOptions,
  familyCompositionOptions,
  workStatusOptions,
  occupationOptions,
  incomeOptions,
  impactOnFinancesOptions,
  scaleOptions,
  timePeriodOptions,
  healthStatusOptions,
  distressOptions,
} from "./MenuItemsOptions";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
function Profile() {
  // Set States
  // 1st Row of input in the form.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");

  // 2nd row of input in the form.
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cancerDiagnosis, setCancerDiagnosis] = useState("");
  const [newCancerDiagnosis, setNewCancerDiagnosis] = useState("");

  const [activeTreatment, setActiveTreatment] = useState("");
  const [activeTreatmentError, setActiveTreatmentError] = useState(true);
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(true);

  // 3rd row of input in the form.
  const [postalCode, setPostalCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [displayedAddress, setDisplayedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [housingType, setHousingType] = useState("");
  const [newHousingType, setNewHousingType] = useState("");
  const [livingArrangement, setLivingArrangment] = useState("");
  const [newLivingArrangement, setNewLivingArrangment] = useState("");
  // 4th row of input in the form.
  const [currentWorkStatus, setCurrentWorkStatus] = useState("");
  const [newCurrentWorkStatus, setNewCurrentWorkStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [newOccupation, setNewOccupation] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [cancerImpactOnFinances, setCancerImpactOnFinances] = useState("");

  const [dateOfLastEmployment, setDateOfLastEmployment] = useState("");
  // 5th row of input in the form.
  const [employedReadinessScaleToRtw, setEmployedReadinessScaleToRtw] =
    useState("");
  const [unemployedReadinessScaleToRtw, setUnemployedReadinessScaleToRtw] =
    useState("");
  const [unemployedTimeFrameToRtw, setUnemployedTimeFrameToRtw] = useState("");
  const [newUnemployedTimeFrameToRtw, setNewUnemployedTimeFrameToRtw] =
    useState("");

  const [currentHealthStatus, setCurrentHealthStatus] = useState("");

  const [physicalHealthInterference, setPhysicalHealthInterference] =
    useState("");
  const [mentalHealthInterference, setMentalHealthInterference] = useState("");
  // 6th row of input in the form.
  const [physicalBarriersToRtw, setPhysicalBarriersToRtw] = useState("");
  const [mentalBarriersToRtw, setMentalBarriersToRtw] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    identificationNumber: identificationNumber,
    mobileNumber: mobileNumber,
    dateOfBirth: dateOfBirth,
    cancerDiagnosis: cancerDiagnosis,
    newCancerDiagnosis: newCancerDiagnosis,
    activeTreatment: activeTreatment,
    gender: gender,
    postalCode: postalCode,
    unitNumber: unitNumber,
    address: address,
    housingType: housingType,
    newHousingType: newHousingType,
    livingArrangement: livingArrangement,
    newLivingArrangement: newLivingArrangement,
    currentWorkStatus: currentWorkStatus,
    newCurrentWorkStatus: newCurrentWorkStatus,
    occupation: occupation,
    newOccupation: newOccupation,
    monthlySalary: monthlySalary,
    cancerImpactOnFinances: cancerImpactOnFinances,
    dateOfLastEmployment: dateOfLastEmployment,
    employedReadinessScaleToRtw: employedReadinessScaleToRtw,
    unemployedReadinessScaleToRtw: unemployedReadinessScaleToRtw,
    unemployedTimeFrameToRtw: unemployedTimeFrameToRtw,
    newUnemployedTimeFrameToRtw: newUnemployedTimeFrameToRtw,
    currentHealthStatus: currentHealthStatus,
    physicalHealthInterference: physicalHealthInterference,
    mentalHealthInterference: mentalHealthInterference,
    physicalBarriersToRtw: physicalBarriersToRtw,
    mentalBarriersToRtw: mentalBarriersToRtw,
    additionalInformation: additionalInformation,
  });
  const gatherFormData = () => {
    return formData;
  };
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
  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleNewCancerDiagnosisChange = (e) => {
    setNewCancerDiagnosis(e.target.value);
  };
  const handleCancerDiagnosisChange = (e) => {
    const selectedValue = e.target.value;
    setCancerDiagnosis(selectedValue);
  };

  console.log(cancerDiagnosis);
  console.log(newCancerDiagnosis);
  // useEffect(() => {
  //   console.log("New Cancer Diagnosis", newCancerDiagnosis);
  // }, [newCancerDiagnosis]);
  // useEffect(() => {
  //   console.log("Cancer Diagnosis", cancerDiagnosis);
  // }, [cancerDiagnosis]);

  const handleActiveTreatmentChange = (e) => {
    const value = e.target.value;
    setActiveTreatment(value);
    setActiveTreatmentError(false);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setGenderError(false);
  };
  // 3rd row of input in the form.
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const handleUnitNumber = (e) => {
    setUnitNumber(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  console.log(address);

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
  const handleHousingTypeChange = (e) => {
    const selectedValue = e.target.value;
    setHousingType(selectedValue);
  };

  const handleNewHousingTypeChange = (e) => {
    setNewHousingType(e.target.value);
  };
  const handleLivingArrangmentChange = (e) => {
    const selectedValue = e.target.value;
    setLivingArrangment(selectedValue);
  };
  const handleNewLivingArrangmentChange = (e) => {
    setNewLivingArrangment(e.target.value);
  };
  // 4th row of input in the form.
  const handleCurrentWorkStatus = (e) => {
    const selectedValue = e.target.value;
    setCurrentWorkStatus(selectedValue);
  };
  const handleNewCurrentWorkStatus = (e) => {
    setNewCurrentWorkStatus(e.target.value);
  };
  const handleOccupation = (e) => {
    const selectedValue = e.target.value;
    setOccupation(selectedValue);
  };
  const handleNewOccupation = (e) => {
    setNewOccupation(e.target.value);
  };
  const handleMonthlySalary = (e) => {
    setMonthlySalary(e.target.value);
  };
  const handleCancerImpactOnFinances = (e) => {
    setCancerImpactOnFinances(e.target.value);
  };

  // 5th row of input in the form.
  const handleDateOfLastEmployment = (e) => {
    setDateOfLastEmployment(e.target.value);
  };
  const handleUnemployedReadinessScaleToRtw = (e) => {
    const selectedValue = e.target.value;
    setUnemployedReadinessScaleToRtw(selectedValue);
  };
  const handleUnemployedTimeFrameToRtw = (e) => {
    const selectedValue = e.target.value;
    setUnemployedTimeFrameToRtw(selectedValue);
  };
  const handleNewUnemployedTimeFrameToRtw = (e) => {
    setNewUnemployedTimeFrameToRtw(e.target.value);
  };

  const handleEmployedReadinessScaleToRtw = (e) => {
    setEmployedReadinessScaleToRtw(e.target.value);
  };
  const handleCurrentHealthStatus = (e) => {
    setCurrentHealthStatus(e.target.value);
  };

  const handlePhysicalHealthInterference = (e) => {
    setPhysicalHealthInterference(e.target.value);
  };
  const handleMentalHealthInterference = (e) => {
    setMentalHealthInterference(e.target.value);
  };
  // 6th row of input in the form.
  const handlePhysicalBarriersToRtw = (e) => {
    setPhysicalBarriersToRtw(e.target.value);
  };
  const handleMentalBarriersToRtw = (e) => {
    setMentalBarriersToRtw(e.target.value);
  };
  const handleAdditionalInformation = (e) => {
    setAdditionalInformation(e.target.value);
  };
  const handleSubmit = () => {
    const updatedFormData = gatherFormData();
    const requiredFields = [
      updatedFormData.firstName,
      updatedFormData.lastName,
      updatedFormData.identificationNumber,
      updatedFormData.mobileNumber,
      updatedFormData.dateOfBirth,
      updatedFormData.cancerDiagnosis,
      updatedFormData.activeTreatment,
      updatedFormData.gender,
      updatedFormData,
      postalCode,
      updatedFormData.unitNumber,
      updatedFormData.address,
      updatedFormData.housingType,
      updatedFormData.livingArrangement,
      updatedFormData.currentWorkStatus,
    ];
    const areAllFieldsFilled = requiredFields.every((field) => field !== "");

    if (!areAllFieldsFilled) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields before submitting.",
      });
      return;
    }
    console.log("Updated Form Data:", updatedFormData);
  };

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("http://localhost:8080/users/personalinfo/3")
      .then((response) => {
        const fetchedData = response.data;
        setFormData(fetchedData);
        console.log(fetchedData);
        setFirstName(fetchedData.firstName);
        setLastName(fetchedData.lastName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {/* Header */}
            <Box textAlign="center" mt={2}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: theme.typography.h4.fontWeightBold,
                }}
              >
                Profile
              </Typography>
              <Typography 
              variant="p"
              sx={{fontWeight: theme.typography.p}}>
                Please fill up your particulars. All fields must be filled in
                before you can join the programs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* Personal Information */}
            <Box mt={4} ml={2}>
              <Typography variant="h5" sx={theme.typography.h5.fontWeightBold}>
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
                      error={cancerDiagnosis === ""}
                    >
                      <InputLabel>Cancer Diagnosis</InputLabel>
                      <Select
                        label="Cancer Diagnosis"
                        value={cancerDiagnosis}
                        onChange={handleCancerDiagnosisChange}
                      >
                        {cancerDiagnosisOptions}
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
                        value={newCancerDiagnosis}
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
                    <RadioGroup
                      row
                      value={activeTreatment}
                      onChange={handleActiveTreatmentChange}
                    >
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
                    {activeTreatmentError && (
                      <FormHelperText error>
                        Please select an option
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box className="myBox">
                    <Typography sx={{ fontSize: "small" }}>Gender</Typography>
                    <RadioGroup
                      row
                      value={gender}
                      onChange={handleGenderChange}
                    >
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
                    {genderError && (
                      <FormHelperText error>
                        Please select an option
                      </FormHelperText>
                    )}
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
                    error={postalCode === ""}
                    helperText={
                      postalCode === "" ? "Postal Code is required" : ""
                    }
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
                      value={unitNumber}
                      onChange={handleUnitNumber}
                      error={unitNumber === ""}
                      helperText={
                        unitNumber === "" ? "Unit Number is required" : ""
                      }
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
                    onChange={handleAddress}
                    error={address === ""}
                    helperText={address === "" ? "Address is required" : ""}
                  />
                </Grid>
                {/* Housing Type */}
                <Grid item xs={6} md={2.5}>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={housingType === ""}
                    >
                      <InputLabel>Housing Type</InputLabel>
                      <Select
                        label="Housing Type"
                        value={housingType}
                        onChange={handleHousingTypeChange}
                      >
                        {housingOptions}
                      </Select>
                      {housingType === "" && (
                        <FormHelperText>
                          Housing Type is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    {housingType === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newHousingType}
                        onChange={handleNewHousingTypeChange}
                      />
                    )}
                  </Box>
                </Grid>
                {/* Living Arrangement */}
                <Grid item xs={6} md={3}>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={livingArrangement === ""}
                    >
                      <InputLabel>Living Arrangement</InputLabel>
                      <Select
                        label="Living Arrangment"
                        value={livingArrangement}
                        onChange={handleLivingArrangmentChange}
                      >
                        {familyCompositionOptions}
                      </Select>
                      {livingArrangement === "" && (
                        <FormHelperText>
                          living Arrangement is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    {livingArrangement === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newLivingArrangement}
                        onChange={handleNewLivingArrangmentChange}
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
              <Typography variant="h5" sx={theme.typography.h5.fontWeightBold}>
                Work Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={currentWorkStatus === ""}
                    >
                      <InputLabel>Current Work Status</InputLabel>
                      <Select
                        label="Current Work Status"
                        value={currentWorkStatus}
                        onChange={handleCurrentWorkStatus}
                      >
                        {workStatusOptions}
                      </Select>
                      {currentWorkStatus === "" && (
                        <FormHelperText>Work Status is required</FormHelperText>
                      )}
                    </FormControl>
                    {currentWorkStatus === "Others" && (
                      <TextField
                        label="Other work status"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newCurrentWorkStatus}
                        onChange={handleNewCurrentWorkStatus}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={occupation === ""}
                    >
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        label="Occupation"
                        value={occupation}
                        onChange={handleOccupation}
                      >
                        {occupationOptions}
                      </Select>
                      {occupation === "" && (
                        <FormHelperText>Occupation is required</FormHelperText>
                      )}
                    </FormControl>
                    {occupation === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newOccupation}
                        onChange={handleNewOccupation}
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
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={monthlySalary === ""}
                    >
                      <InputLabel>Basic Monthly Salary</InputLabel>
                      <Select
                        label="Basic Monthly Salary"
                        value={monthlySalary}
                        onChange={handleMonthlySalary}
                      >
                        {incomeOptions}
                      </Select>
                      {monthlySalary === "" && (
                        <FormHelperText>
                          Monthly Salary is required
                        </FormHelperText>
                      )}
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
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={cancerImpactOnFinances === ""}
                    >
                      <InputLabel>Cancer impact on finances </InputLabel>
                      <Select
                        label="Cancer imapct on finances"
                        value={cancerImpactOnFinances}
                        onChange={handleCancerImpactOnFinances}
                      >
                        {impactOnFinancesOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {cancerImpactOnFinances === "" && (
                        <FormHelperText>
                          Cancer Impact on Finances is required
                        </FormHelperText>
                      )}
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
                  <Typography
                    variant="h5"
                    sx={theme.typography.h5.fontWeightBold}
                  >
                    If Unemployed
                  </Typography>
                  <TextField
                    label="Date of last employment"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="MM/YYYY"
                    value={dateOfLastEmployment}
                    onChange={handleDateOfLastEmployment}
                    error={dateOfLastEmployment === ""}
                    helperText={
                      dateOfLastEmployment === ""
                        ? "Date of last Employment is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox5">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={unemployedReadinessScaleToRtw === ""}
                    >
                      <InputLabel>Readiness Scale to RTW </InputLabel>
                      <Select
                        label="Readiness Scale to RTW"
                        value={unemployedReadinessScaleToRtw}
                        onChange={handleUnemployedReadinessScaleToRtw}
                      >
                        {scaleOptions}
                      </Select>
                      {unemployedReadinessScaleToRtw === "" && (
                        <FormHelperText> Input is required</FormHelperText>
                      )}
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
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={unemployedTimeFrameToRtw === ""}
                    >
                      <InputLabel>Time frame to RTW </InputLabel>
                      <Select
                        label="Time Frame to RTW"
                        value={unemployedTimeFrameToRtw}
                        onChange={handleUnemployedTimeFrameToRtw}
                      >
                        {timePeriodOptions}
                      </Select>
                      {unemployedTimeFrameToRtw === "" && (
                        <FormHelperText> Input is required</FormHelperText>
                      )}
                    </FormControl>
                    {unemployedTimeFrameToRtw === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="MM/YYYY"
                        value={newUnemployedTimeFrameToRtw}
                        onChange={handleNewUnemployedTimeFrameToRtw}
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
                  <Typography
                    variant="h5"
                    sx={theme.typography.h5.fontWeightBold}
                  >
                    If Employed
                  </Typography>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={employedReadinessScaleToRtw === ""}
                    >
                      <InputLabel>Readiness Scale to RTW </InputLabel>
                      <Select
                        label="Readiness Scale to RTW"
                        value={employedReadinessScaleToRtw}
                        onChange={handleEmployedReadinessScaleToRtw}
                      >
                        {scaleOptions}
                      </Select>
                      {employedReadinessScaleToRtw === "" && (
                        <FormHelperText> Input is required</FormHelperText>
                      )}
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
                  <Typography
                    variant="h5"
                    sx={theme.typography.h5.fontWeightBold}
                  >
                    Self Assessment
                  </Typography>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={currentHealthStatus === ""}
                    >
                      <InputLabel>Current Health</InputLabel>
                      <Select
                        label="Current Health"
                        value={currentHealthStatus}
                        onChange={handleCurrentHealthStatus}
                      >
                        {healthStatusOptions}
                      </Select>
                      {currentHealthStatus === "" && (
                        <FormHelperText error>
                          Please select an option
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox5">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={physicalHealthInterference === ""}
                    >
                      <InputLabel>
                        Physical health interfered with normal activities?
                      </InputLabel>
                      <Select
                        label="Physical health interfered with normal activities?"
                        value={physicalHealthInterference}
                        onChange={handlePhysicalHealthInterference}
                      >
                        {distressOptions}
                      </Select>
                      {physicalHealthInterference === "" && (
                        <FormHelperText error>
                          Please select an option
                        </FormHelperText>
                      )}
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
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={mentalHealthInterference === ""}
                    >
                      <InputLabel>
                        Mental health interfered with normal activities?
                      </InputLabel>
                      <Select
                        label="Mental health interfered with normal activities?"
                        value={mentalHealthInterference}
                        onChange={handleMentalHealthInterference}
                      >
                        {distressOptions}
                      </Select>
                      {mentalHealthInterference === "" && (
                        <FormHelperText error>
                          Please select an option
                        </FormHelperText>
                      )}
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
                          value={physicalBarriersToRtw}
                          onChange={handlePhysicalBarriersToRtw}
                          error={physicalBarriersToRtw === ""}
                          helperText={
                            physicalBarriersToRtw === ""
                              ? "Input is required, if no input put N/A"
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Mental barriers to RTW"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          value={mentalBarriersToRtw}
                          onChange={handleMentalBarriersToRtw}
                          error={mentalBarriersToRtw === ""}
                          helperText={
                            mentalBarriersToRtw === ""
                              ? "Input is required, if no input put N/A"
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Additional Information"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          value={additionalInformation}
                          onChange={handleAdditionalInformation}
                          error={additionalInformation === ""}
                          helperText={
                            additionalInformation === ""
                              ? "Input is required, if no input put N/A"
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" py={5}>
                          <Button
                            className="orange"
                            variant="contained"
                            onClick={handleSubmit}
                          >
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
