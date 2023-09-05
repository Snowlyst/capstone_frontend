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
import * as options from "./MenuItemsOptions";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import * as SwalMsgs from "../../Utils/SwalMsgs";

function Profile() {
  // Set States
  const [fieldErrors, setFieldErrors] = useState({});

  const [fieldValues, setFieldValues] = useState({
    firstName: "",
    lastName: "",
    identificationNumber: "",
    mobileNumber: "",
    dateOfBirth: "",
    cancerDiagnosis: "",
    activeTreatment: "",
    gender: "",
    postalCode: "",
    unitNumber: "",
    displayedAddress: "",
    address: "",
    housingType: "",
    livingArrangement: "",
    currentWorkStatus: "",
    occupation: "",
    monthlySalary: "",
    cancerImpactOnFinances: "",
    employedReadinessScaleToRtw: "",
    unemployedReadinessScaleToRtw: "",
    unemployedTimeFrameToRtw: "",
    currentHealthStatus: "",
    physicalHealthInterference: "",
    mentalHealthInterference: "",
    physicalBarriersToRtw: "",
    mentalBarriersToRtw: "",
    additionalInformation: "",
    newCancerDiagnosis: "",
    newHousingType: "",
    newLivingArrangement: "",
    newCurrentWorkStatus: "",
    newOccupation: "",
    newUnemployedTimeFrameToRtw: "",
  });

  const handleChange = (fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSearchPostal = (e) => {
    e.preventDefault();
    const searchQuery = fieldValues.postalCode;
    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${searchQuery}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((info) => {
        const spreadData = info.data.results.map((info, index) => {
          console.log(info);
          console.log(info.ADDRESS);
          handleChange("address", info.ADDRESS);
          return <div key={index}>Address: {info.ADDRESS}</div>;
        });
        handleChange("displayedAddress", spreadData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFieldErrors = {};
    Object.keys(fieldValues).forEach((fieldName) => {
      if (fieldValues[fieldName].trim() === "") {
        newFieldErrors[fieldName] = true;
      }
    });
    setFieldErrors(newFieldErrors);
    if (newFieldErrors.length > 0) {
      Swal.fire(SwalMsgs.missingFormInfoGentle);
    }
    // else {
    //   const requiredFields = [
    //     fieldValues.firstName,
    //     fieldValues.lastName,
    //     fieldValues.identificationNumber,
    //     fieldValues.mobileNumber,
    //     fieldValues.dateOfBirth,
    //     fieldValues.cancerDiagnosis,
    //     fieldValues.activeTreatment,
    //     fieldValues.gender,
    //     fieldValues.postalCode,
    //     fieldValues.unitNumber,
    //     fieldValues.address,
    //     fieldValues.housingType,
    //     fieldValues.livingArrangement,
    //     fieldValues.currentWorkStatus,
    //   ];
    //   const areAllFieldsFilled = requiredFields.every((field) => field !== "");

    //   if (!areAllFieldsFilled) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Please fill in all required fields before submitting.",
    //     });
    //     return;
    //   }
    //   console.log("Updated Form Data:", fieldValues);
    // }
  };

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("http://localhost:8080/users/personalinfo/3")
      .then((response) => {
        const fetchedData = response.data;
        setFieldValues(fetchedData);
        console.log(fetchedData);
        handleChange("firstName", fetchedData.firstName);
        handleChange("lastName", fetchedData.lastName);
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
              <Typography variant="p" sx={{ fontWeight: theme.typography.p }}>
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
                    value={fieldValues.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    error={fieldErrors.firstName || false}
                    helperText={
                      fieldValues.firstName === ""
                        ? "First Name is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={fieldValues.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={fieldErrors.lastName || false}
                    helperText={
                      fieldValues.lastName === "" ? "Last Name is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="NRIC"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={fieldValues.identificationNumber}
                    onChange={(e) =>
                      handleChange("identificationNumber", e.target.value)
                    }
                    error={fieldErrors.identificationNumber || false}
                    helperText={
                      fieldValues.identificationNumber || false
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
                    value={fieldValues.mobileNumber}
                    onChange={(e) =>
                      handleChange("mobileNumber", e.target.value)
                    }
                    error={fieldErrors.mobileNumber || false}
                    helperText={
                      fieldValues.mobileNumber === ""
                        ? "Mobile Number is required"
                        : ""
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
                    value={fieldValues.dateOfBirth}
                    onChange={(e) =>
                      handleChange("dateOfBirth", e.target.value)
                    }
                    error={fieldErrors.dateOfBirth || false}
                    helperText={
                      fieldValues.dateOfBirth === ""
                        ? "Date of Birth is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={4} md={3}>
                  <Box className="myBox2">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={fieldErrors.cancerDiagnosis === ""}
                    >
                      <InputLabel>Cancer Diagnosis</InputLabel>
                      <Select
                        label="Cancer Diagnosis"
                        value={fieldValues.cancerDiagnosis}
                        onChange={(e) =>
                          handleChange("cancerDiagnosis", e.target.value)
                        }
                      >
                        {options.cancerDiagnosisOptions}
                      </Select>
                      {fieldValues.cancerDiagnosis === "" && (
                        <FormHelperText>
                          Cancer Diagnosis is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    {fieldValues.cancerDiagnosis === "Others" && (
                      <TextField
                        label="Other Cancer Diagnosis"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={fieldValues.newCancerDiagnosis}
                        onChange={(e) =>
                          handleChange("newCancerDiagnosis", e.target.value)
                        }
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
                      value={fieldValues.activeTreatment}
                      onChange={(e) =>
                        handleChange("activeTreatment", e.target.value)
                      }
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
                    {fieldErrors.activeTreatment && (
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
                      value={fieldValues.gender}
                      onChange={(e) => handleChange("gender", e.target.value)}
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
                    {fieldErrors.genderError && (
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
                    value={fieldValues.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    error={fieldErrors.postalCode === ""}
                    helperText={
                      fieldValues.postalCode === ""
                        ? "Postal Code is required"
                        : ""
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
                      value={fieldValues.unitNumber}
                      onChange={(e) =>
                        handleChange("unitNumber", e.target.value)
                      }
                      error={fieldErrors.unitNumber === ""}
                      helperText={
                        fieldValues.unitNumber === ""
                          ? "Unit Number is required"
                          : ""
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
                    value={fieldValues.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    error={fieldErrors.address === ""}
                    helperText={
                      fieldValues.address === "" ? "Address is required" : ""
                    }
                  />
                </Grid>
                {/* Housing Type */}
                <Grid item xs={6} md={2.5}>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={fieldErrors.housingType === ""}
                    >
                      <InputLabel>Housing Type</InputLabel>
                      <Select
                        label="Housing Type"
                        value={fieldValues.housingType}
                        onChange={(e) =>
                          handleChange("housingType", e.target.value)
                        }
                      >
                        {options.housingOptions}
                      </Select>
                      {fieldValues.housingType === "" && (
                        <FormHelperText>
                          Housing Type is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    {fieldValues.housingType === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={fieldValues.newHousingType}
                        onChange={(e) =>
                          handleChange("newHousingType", e.target.value)
                        }
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
                      error={fieldErrors.livingArrangement === ""}
                    >
                      <InputLabel>Living Arrangement</InputLabel>
                      <Select
                        label="Living Arrangment"
                        value={fieldValues.livingArrangement}
                        onChange={(e) =>
                          handleChange("livingArrangement", e.target.value)
                        }
                      >
                        {options.familyCompositionOptions}
                      </Select>
                      {fieldValues.livingArrangement === "" && (
                        <FormHelperText>
                          living Arrangement is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    {fieldValues.livingArrangement === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={fieldValues.newLivingArrangement}
                        onChange={(e) =>
                          handleChange("newLivingArrangement", e.target.value)
                        }
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
                      error={fieldErrors.currentWorkStatus === ""}
                    >
                      <InputLabel>Current Work Status</InputLabel>
                      <Select
                        label="Current Work Status"
                        value={fieldValues.currentWorkStatus}
                        onChange={(e) =>
                          handleChange("currentWorkStatus", e.target.value)
                        }
                      >
                        {options.workStatusOptions}
                      </Select>
                      {fieldValues.currentWorkStatus === "" && (
                        <FormHelperText>Work Status is required</FormHelperText>
                      )}
                    </FormControl>
                    {fieldValues.currentWorkStatus === "Others" && (
                      <TextField
                        label="Other work status"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={fieldValues.newCurrentWorkStatus}
                        onChange={(e) =>
                          handleChange("newCurrentWorkStatus", e.target.value)
                        }
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="myBox">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={fieldErrors.occupation === ""}
                    >
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        label="Occupation"
                        value={fieldValues.occupation}
                        onChange={(e) =>
                          handleChange("occupation", e.target.value)
                        }
                      >
                        {options.occupationOptions}
                      </Select>
                      {fieldValues.occupation === "" && (
                        <FormHelperText>Occupation is required</FormHelperText>
                      )}
                    </FormControl>
                    {fieldValues.occupation === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={fieldValues.newOccupation}
                        onChange={(e) =>
                          handleChange("newOccupation", e.target.value)
                        }
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
                      error={fieldErrors.monthlySalary === ""}
                    >
                      <InputLabel>Basic Monthly Salary</InputLabel>
                      <Select
                        label="Basic Monthly Salary"
                        value={fieldValues.monthlySalary}
                        onChange={(e) =>
                          handleChange("monthlySalary", e.target.value)
                        }
                      >
                        {options.incomeOptions}
                      </Select>
                      {fieldValues.monthlySalary === "" && (
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
                      error={fieldErrors.cancerImpactOnFinances === ""}
                    >
                      <InputLabel>Cancer impact on finances </InputLabel>
                      <Select
                        label="Cancer imapct on finances"
                        value={fieldValues.cancerImpactOnFinances}
                        onChange={(e) =>
                          handleChange("cancerImpactOnFinances", e.target.value)
                        }
                      >
                        {options.impactOnFinancesOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldValues.cancerImpactOnFinances === "" && (
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
                    value={fieldValues.dateOfLastEmployment}
                    onChange={(e) =>
                      handleChange("dateOfLastEmployment", e.target.value)
                    }
                    error={fieldErrors.dateOfLastEmployment === ""}
                    helperText={
                      fieldValues.dateOfLastEmployment === ""
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
                      error={fieldErrors.unemployedReadinessScaleToRtw === ""}
                    >
                      <InputLabel>Readiness Scale to RTW </InputLabel>
                      <Select
                        label="Readiness Scale to RTW"
                        value={fieldValues.unemployedReadinessScaleToRtw}
                        onChange={(e) =>
                          handleChange(
                            "unemployedReadinessScaleToRtw",
                            e.target.value
                          )
                        }
                      >
                        {options.scaleOptions}
                      </Select>
                      {fieldValues.unemployedReadinessScaleToRtw === "" && (
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
                      error={fieldErrors.unemployedTimeFrameToRtw === ""}
                    >
                      <InputLabel>Time frame to RTW </InputLabel>
                      <Select
                        label="Time Frame to RTW"
                        value={fieldValues.unemployedTimeFrameToRtw}
                        onChange={(e) =>
                          handleChange(
                            "unemployedTimeFrameToRtw",
                            e.target.value
                          )
                        }
                      >
                        {options.timePeriodOptions}
                      </Select>
                      {fieldValues.unemployedTimeFrameToRtw === "" && (
                        <FormHelperText> Input is required</FormHelperText>
                      )}
                    </FormControl>
                    {fieldValues.unemployedTimeFrameToRtw === "Others" && (
                      <TextField
                        label="Others"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="MM/YYYY"
                        value={fieldValues.newUnemployedTimeFrameToRtw}
                        onChange={(e) =>
                          handleChange(
                            "newUnemployedTimeFrameToRtw",
                            e.target.value
                          )
                        }
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
                      error={fieldErrors.employedReadinessScaleToRtw === ""}
                    >
                      <InputLabel>Readiness Scale to RTW </InputLabel>
                      <Select
                        label="Readiness Scale to RTW"
                        value={fieldValues.employedReadinessScaleToRtw}
                        onChange={(e) =>
                          handleChange(
                            "employedReadinessScaleToRtw",
                            e.target.value
                          )
                        }
                      >
                        {options.scaleOptions}
                      </Select>
                      {fieldValues.employedReadinessScaleToRtw === "" && (
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
                      error={fieldErrors.currentHealthStatus === ""}
                    >
                      <InputLabel>Current Health</InputLabel>
                      <Select
                        label="Current Health"
                        value={fieldValues.currentHealthStatus}
                        onChange={(e) =>
                          handleChange("currentHealthStatus", e.target.value)
                        }
                      >
                        {options.healthStatusOptions}
                      </Select>
                      {fieldValues.currentHealthStatus === "" && (
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
                      error={fieldErrors.physicalHealthInterference === ""}
                    >
                      <InputLabel>
                        Physical health interfered with normal activities?
                      </InputLabel>
                      <Select
                        label="Physical health interfered with normal activities?"
                        value={fieldValues.physicalHealthInterference}
                        onChange={(e) =>
                          handleChange(
                            "physicalHealthInterference",
                            e.target.value
                          )
                        }
                      >
                        {options.distressOptions}
                      </Select>
                      {fieldValues.physicalHealthInterference === "" && (
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
                      error={fieldErrors.mentalHealthInterference === ""}
                    >
                      <InputLabel>
                        Mental health interfered with normal activities?
                      </InputLabel>
                      <Select
                        label="Mental health interfered with normal activities?"
                        value={fieldValues.mentalHealthInterference}
                        onChange={(e) =>
                          handleChange(
                            "mentalHealthInterference",
                            e.target.value
                          )
                        }
                      >
                        {options.distressOptions}
                      </Select>
                      {fieldValues.mentalHealthInterference === "" && (
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
                          value={fieldValues.physicalBarriersToRtw}
                          onChange={(e) =>
                            handleChange(
                              "physicalBarriersToRtw",
                              e.target.value
                            )
                          }
                          error={fieldErrors.physicalBarriersToRtw === ""}
                          helperText={
                            fieldValues.physicalBarriersToRtw === ""
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
                          value={fieldValues.mentalBarriersToRtw}
                          onChange={(e) =>
                            handleChange("mentalBarriersToRtw", e.target.value)
                          }
                          error={fieldErrors.mentalBarriersToRtw === ""}
                          helperText={
                            fieldValues.mentalBarriersToRtw === ""
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
                          value={fieldValues.additionalInformation}
                          onChange={(e) =>
                            handleChange(
                              "additionalInformation",
                              e.target.value
                            )
                          }
                          error={fieldErrors.additionalInformation === ""}
                          helperText={
                            fieldValues.additionalInformation === ""
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
