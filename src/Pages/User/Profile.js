import { useState, useEffect } from "react";
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
  Autocomplete,
  Container,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { theme } from "../../Assets/Styles/Theme";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../../Assets/Styles/MemberProfile.css";
import "../../Assets/Styles/Homepage.css";
import axios from "axios";
import * as options from "./MenuItemsOptions";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import * as SwalMsgs from "../../Utils/SwalMsgs";
import { useUserContext } from "../../Components/UserContext";
import AxiosLoader from "../../Components/AxiosLoader";

function Profile() {
  // Set States
  const { isAuthenticated } = useAuth0();
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { currUser, categories, location } = useUserContext();
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const cancerDiag = options.cancerDiag.sort(
    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
  );
  // combinedAddress: "", // To display combined Add
  const [fieldValues, setFieldValues] = useState({
    userId: "",
    firstName: "", // users 1
    lastName: "", // users 2
    identificationNumber: "", // UPD 3
    mobileNumber: "", // UPD 4
    dateOfBirth: "", // UPD 5
    cancerDiagnosis: "", // UPD 6
    activeTreatment: "", // UPD 7
    gender: "", // UPD 8
    postalCode: "", // UPD 9
    housingType: "", // UPD 10
    displayedAddress: "", // STREET ADDRESS AFTER POSTAL CODE UPD 11
    unitNumber: "", // UPD 12
    livingArrangement: "", // UPD 13
    currentWorkStatus: "", // UPD 14
    occupation: "", // UPD 15
    monthlySalary: "", // where is this ??? UPD 27
    cancerImpactOnFinances: "", // UPD 16
    dateOfLastEmployment: "", // UPD 17
    readinessScaleToRtw: "", // readiness_to_rtw UPD 18
    timeFrameToRtw: "", // time_frame_to_rtw UPD 19
    employedReadinessScale: "", // employed_readiness_scale UPD 20
    currentHealthStatus: "", // UPD 21
    physicalHealthStatus: "", //current physical health status UPD 22
    currentMentalHealthStatus: "", // current mental health status UPD 23
    physicalBarriersToRtw: "", // UPD 24
    psychosocialBarriersToRtw: "", // psychosocial barriers to rtw UPD 25
    additionalInformation: "", // UPD 26
  });

  useEffect(() => {
    console.log(currUser);
    if (isAuthenticated && currUser) {
      handleChange("userId", currUser.id);
      handleChange("firstName", currUser.firstName);
      handleChange("lastName", currUser.lastName);
    }
  }, [currUser]);

  const handleChange = (fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
    if (fieldName === "currentWorkStatus") {
      if (value === "Unemployed") {
        setCurrentlyWorking(false);
      } else {
        setCurrentlyWorking(true);
      }
    }
  };

  const handleSearchPostal = (e) => {
    e.preventDefault();
    handleChange("postalCode", "");
    const searchQuery = fieldValues.postalCode;
    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${searchQuery}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((info) => {
        const spreadData = info.data.results.map((info, index) => {
          console.log(info);
          console.log(info.ADDRESS);
          // handleChange("address", info.ADDRESS);
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
    if (newFieldErrors && newFieldErrors.length > 0) {
      Swal.fire(SwalMsgs.missingFormInfoGentle);
    } else {
      console.log(fieldValues);
      // do form checks b4 axios call to submit
      // if (fieldValues && fieldValues.housingType === "Private Landed") {
      //   const combinedAdd = `${fieldValues.unitNumber} ${fieldValues.displayedAddress}, Singapore ${fieldValues.postalCode}`;
      //   handleChange("combinedAddress", combinedAdd);
      // } else {
      //   const combinedAdd = `${fieldValues.displayedAddress}, ${fieldValues.unitNumber}, Singapore ${fieldValues.postalCode}`;
      //   handleChange("combinedAddress", combinedAdd);
      // }
      // const objToSend = {}
    }
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
      <Grid container sx={theme.customStyles.centered.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              maxWidth: "880px",
            }}
          >
            <Grid item>
              {/* row 1 - banner */}
              {axiosLoading && <AxiosLoader />}
              <Box sx={{ maxWidth: "838px", flexWrap: "wrap" }} p={1} mb={3}>
                <Paper elevation={2} color="FFF" className="boxpaper">
                  <Box m={3} p={3} sx={theme.customStyles.displayFlexRowLeft}>
                    <Stack direction="row">
                      <Stack direction="column" spacing={3}>
                        {/* row 1 profile title */}
                        <Typography
                          textAlign="left"
                          variant="h4"
                          sx={{
                            fontWeight: theme.typography.h5.fontWeightBold,
                          }}
                        >
                          Profile
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                          }}
                        >
                          Please fill up your particulars. All fields must be
                          filled in before you can join the programs.
                        </Typography>
                        {/* row 2 personal information */}
                        <Typography
                          textAlign="left"
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                          }}
                        >
                          Personal Information
                        </Typography>
                        {/* row 3 first name, last name, nric */}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={theme.customStyles.stackFlexWrapLeft}
                          spacing={2}
                        >
                          <TextField
                            label="First Name"
                            {...theme.textbox.common}
                            value={fieldValues.firstName}
                            onChange={(e) =>
                              handleChange("firstName", e.target.value)
                            }
                            error={fieldErrors.firstName || false}
                            helperText={
                              fieldErrors.firstName && "First Name is required"
                            }
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                          />
                          <TextField
                            label="Last Name"
                            required
                            {...theme.textbox.common}
                            value={fieldValues.lastName}
                            onChange={(e) =>
                              handleChange("lastName", e.target.value)
                            }
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                            error={fieldErrors.lastName || false}
                            helperText={
                              fieldErrors.lastName && "Last Name is required"
                            }
                          />
                          <TextField
                            label="NRIC"
                            required
                            {...theme.textbox.common}
                            value={fieldValues.identificationNumber}
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                            onChange={(e) =>
                              handleChange(
                                "identificationNumber",
                                e.target.value
                              )
                            }
                            error={fieldErrors.identificationNumber || false}
                            helperText={
                              fieldErrors.identificationNumber &&
                              "Identification Number is required"
                            }
                          />
                        </Stack>
                        {/* row 4 mobile, dob,  gender */}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          spacing={2}
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: { xs: "flex-start", sm: "center" },
                          }}
                        >
                          <TextField
                            label="Mobile"
                            required
                            {...theme.textbox.common}
                            value={fieldValues.mobileNumber}
                            onChange={(e) =>
                              handleChange("mobileNumber", e.target.value)
                            }
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                            error={fieldErrors.mobileNumber || false}
                            helperText={
                              fieldErrors.mobileNumber &&
                              "Mobile Number is required"
                            }
                          />
                          <TextField
                            label="Date of Birth"
                            required
                            {...theme.textbox.common}
                            placeholder="DD/MM/YYYY"
                            value={fieldValues.dateOfBirth}
                            onChange={(e) =>
                              handleChange("dateOfBirth", e.target.value)
                            }
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                            error={fieldErrors.dateOfBirth || false}
                            helperText={
                              fieldErrors.dateOfBirth &&
                              "Date of Birth is required"
                            }
                          />
                          <Stack
                            direction="column"
                            sx={{
                              ...theme.customStyles.stackWrapLeftCenter,
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography sx={{ fontSize: "small" }}>
                              Gender *
                            </Typography>
                            <RadioGroup
                              row
                              value={fieldValues.gender}
                              onChange={(e) =>
                                handleChange("gender", e.target.value)
                              }
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
                          </Stack>
                        </Stack>
                        {/* row 5 postal code, unit no, address,*/}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={theme.customStyles.stackWrapLeft}
                          spacing={3}
                        >
                          <TextField
                            label="Postal Code"
                            required
                            {...theme.textbox.common}
                            type="number"
                            value={fieldValues.postalCode}
                            onChange={(e) =>
                              handleChange("postalCode", e.target.value)
                            }
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                            error={fieldErrors.postalCode || false}
                            helperText={
                              fieldErrors.postalCode &&
                              "Postal Code is required"
                            }
                          />
                          <Tooltip title="Key in postal code and click the search button to get the address">
                            <IconButton
                              style={{ color: "#FF6B2C" }}
                              aria-label="search"
                              onClick={handleSearchPostal}
                            >
                              <SearchOutlinedIcon />
                            </IconButton>
                          </Tooltip>

                          <TextField
                            label="Unit/Hse No"
                            required
                            {...theme.textbox.common}
                            placeholder="Unit/Hse No"
                            value={fieldValues.unitNumber}
                            sx={{
                              flex: 1,
                              m: 1,
                            }}
                            onChange={(e) =>
                              handleChange("unitNumber", e.target.value)
                            }
                            error={fieldErrors.unitNumber || false}
                            helperText={
                              fieldErrors.unitNumber &&
                              "Unit Number is required"
                            }
                          />
                          <TextField
                            label="Address"
                            required
                            {...theme.textbox.common}
                            value={fieldValues.displayedAddress}
                            sx={{
                              flex: 2,
                              m: 1,
                            }}
                            onChange={(e) =>
                              handleChange("displayedAddress", e.target.value)
                            }
                            error={fieldErrors.displayedAddress || false}
                            helperText={
                              fieldErrors.displayedAddress &&
                              "Address is required"
                            }
                          />
                        </Stack>

                        {/* row 6 housing type, living arrangement, cancer diagnosis, active treatment*/}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          spacing={3}
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: { xs: "flex-start", sm: "center" },
                          }}
                        >
                          <FormControl
                            size="small"
                            sx={{
                              width: 140,
                            }}
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
                            {fieldErrors.housingType && (
                              <FormHelperText>
                                Housing Type is required
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl
                            size="small"
                            error={fieldErrors.livingArrangement || false}
                          >
                            <InputLabel>Living Arrangement</InputLabel>
                            <Select
                              label="Living Arrangment"
                              value={fieldValues.livingArrangement}
                              sx={{
                                width: 180,
                              }}
                              onChange={(e) =>
                                handleChange(
                                  "livingArrangement",
                                  e.target.value
                                )
                              }
                            >
                              {options.familyCompositionOptions}
                            </Select>
                            {fieldErrors.livingArrangement && (
                              <FormHelperText>
                                Living Arrangement is required
                              </FormHelperText>
                            )}
                          </FormControl>

                          <FormControl
                            error={fieldErrors.cancerDiagnosis || false}
                          >
                            <Tooltip title="Please type in your diagnosis to find it easily in the list.">
                              <Autocomplete
                                id="cancerDiagnosis"
                                // value={fieldValues.cancerDiagnosis.label}
                                onChange={(e, selectedOption) => {
                                  if (selectedOption) {
                                    console.log(selectedOption);
                                    handleChange(
                                      "cancerDiagnosis",
                                      selectedOption.label
                                    );
                                  }
                                }}
                                options={cancerDiag}
                                isOptionEqualToValue={(option, value) =>
                                  option.label === value
                                }
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.label}
                                sx={{ minWidth: 200, maxWidth: 350 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    required
                                    size="small"
                                    label="Primary Cancer Diagnosis"
                                  />
                                )}
                              />
                            </Tooltip>
                            {fieldErrors.cancerDiagnosis && (
                              <FormHelperText>
                                Cancer Diagnosis is required
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Stack
                            direction="column"
                            sx={{
                              ...theme.customStyles.stackWrapLeftCenter,
                              alignItems: "flex-start",
                            }}
                            spacing={0}
                          >
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
                                  <Typography sx={{ fontSize: "small" }}>
                                    No
                                  </Typography>
                                }
                              />
                            </RadioGroup>
                            {fieldErrors.activeTreatment && (
                              <FormHelperText error>
                                Please select an option
                              </FormHelperText>
                            )}
                          </Stack>
                        </Stack>
                        {/* row 7 work information*/}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                          }}
                        >
                          Work information
                        </Typography>
                        {/* row  8 current work status, occupation, basic mthly sal, cancer impact on finance*/}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: { xs: "flex-start", sm: "center" },
                          }}
                          spacing={3}
                        >
                          <Stack
                            direction={theme.customStyles.stackCollapseRow}
                            sx={theme.customStyles.stackWrapLeft}
                            spacing={3}
                          >
                            <FormControl
                              required
                              size="small"
                              variant="outlined"
                              error={fieldErrors.currentWorkStatus || false}
                              sx={{
                                width: 195,
                              }}
                            >
                              <InputLabel>Current Work Status</InputLabel>
                              <Select
                                label="Current Work Status"
                                value={fieldValues.currentWorkStatus}
                                onChange={(e) =>
                                  handleChange(
                                    "currentWorkStatus",
                                    e.target.value
                                  )
                                }
                              >
                                {options.workStatusOptions}
                              </Select>
                              {fieldErrors.currentWorkStatus && (
                                <FormHelperText>
                                  Work Status is required
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              variant="outlined"
                              size="small"
                              error={fieldErrors.occupation || false}
                              sx={{
                                width: 150,
                              }}
                            >
                              <InputLabel>Occupation</InputLabel>
                              <Select
                                label={
                                  fieldValues.currentWorkStatus
                                    ? "Current Occupation"
                                    : "Previous Occupation"
                                }
                                value={fieldValues.occupation}
                                onChange={(e) => {
                                  const value = fieldValues.currentWorkStatus
                                    ? `Current ${e.target.value}`
                                    : `Last ${e.target.value}`;
                                  handleChange("occupation", value);
                                }}
                              >
                                {options.occupationOptions}
                              </Select>
                              {fieldErrors.occupation && (
                                <FormHelperText>
                                  Occupation is required
                                </FormHelperText>
                              )}
                            </FormControl>
                            <FormControl
                              variant="outlined"
                              error={fieldErrors.monthlySalary || false}
                            >
                              <Tooltip title="excludes bonuses, employer cpf, 13th month bonus etc">
                                <InputLabel>Basic Monthly Salary</InputLabel>
                                <Select
                                  label="Basic Monthly Salary"
                                  size="small"
                                  value={fieldValues.monthlySalary}
                                  sx={{
                                    width: 200,
                                  }}
                                  onChange={(e) =>
                                    handleChange(
                                      "monthlySalary",
                                      e.target.value
                                    )
                                  }
                                >
                                  {options.incomeOptions}
                                </Select>
                                {fieldErrors.monthlySalary && (
                                  <FormHelperText>
                                    Monthly Salary is required
                                  </FormHelperText>
                                )}
                              </Tooltip>
                            </FormControl>
                          </Stack>
                        </Stack>
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={theme.customStyles.stackWrapLeft}
                          spacing={3}
                        >
                          <FormControl
                            variant="outlined"
                            size="small"
                            error={fieldErrors.cancerImpactOnFinances === ""}
                          >
                            <Tooltip
                              title="To what degree has cancer caused financial problems to you
                    and your family?"
                            >
                              <InputLabel>Cancer impact on finances</InputLabel>
                              <Select
                                label="Cancer impact on finances"
                                value={fieldValues.cancerImpactOnFinances}
                                sx={{
                                  width: 250,
                                }}
                                onChange={(e) =>
                                  handleChange(
                                    "cancerImpactOnFinances",
                                    e.target.value
                                  )
                                }
                              >
                                {options.impactOnFinancesOptions.map(
                                  (option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                              {fieldErrors.cancerImpactOnFinances && (
                                <FormHelperText>
                                  Cancer Impact on Finances is required
                                </FormHelperText>
                              )}
                            </Tooltip>
                          </FormControl>
                        </Stack>
                        {/* row  9 current work status, occupation, basic mthly sal, cancer impact on finance*/}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={{
                            ...theme.customStyles.stackWrapLeft,
                            alignContent: "flex-start",
                          }}
                          spacing={3}
                        >
                          {!currentlyWorking ? (
                            <>
                              <TextField
                                label="Date of last employment"
                                sx={{ width: 250 }}
                                {...theme.textbox.common}
                                placeholder="MM/YYYY"
                                value={fieldValues.dateOfLastEmployment}
                                onChange={(e) =>
                                  handleChange(
                                    "dateOfLastEmployment",
                                    e.target.value
                                  )
                                }
                                error={
                                  !currentlyWorking
                                    ? fieldErrors.dateOfLastEmployment
                                    : false
                                }
                                helperText={
                                  !currentlyWorking &&
                                  fieldErrors.dateOfLastEmployment
                                    ? "Date of last Employment is required"
                                    : ""
                                }
                              />
                              <FormControl
                                {...theme.textbox.common}
                                error={
                                  !currentlyWorking
                                    ? fieldErrors.readinessScaleToRtw
                                    : false
                                }
                              >
                                <Tooltip title="On a Scale of 1 to 10. 10 means ready to return to workforce. 1 means not so ready">
                                  <InputLabel>
                                    Readiness Scale to RTW
                                  </InputLabel>
                                  <Select
                                    label="Readiness Scale to RTW"
                                    sx={{ width: 220 }}
                                    value={fieldValues.readinessScaleToRtw}
                                    onChange={(e) =>
                                      handleChange(
                                        "readinessScaleToRtw",
                                        e.target.value
                                      )
                                    }
                                  >
                                    {options.scaleOptions}
                                  </Select>
                                  {!currentlyWorking &&
                                  fieldErrors.readinessScaleToRtw ? (
                                    <FormHelperText>
                                      Input is required
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                </Tooltip>
                              </FormControl>
                              <FormControl
                                {...theme.textbox.common}
                                variant="outlined"
                                sx={{ width: 200 }}
                                error={fieldErrors.timeFrameToRtw === ""}
                              >
                                <InputLabel>Time frame to RTW </InputLabel>
                                <Select
                                  sx={{ flex: 1 }}
                                  label="Time Frame to RTW"
                                  value={fieldValues.timeFrameToRtw}
                                  onChange={(e) =>
                                    handleChange(
                                      "timeFrameToRtw",
                                      e.target.value
                                    )
                                  }
                                >
                                  {options.timePeriodOptions}
                                </Select>
                                {fieldValues.timeFrameToRtw === "" && (
                                  <FormHelperText>
                                    Input is required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </>
                          ) : (
                            <FormControl
                              {...theme.textbox.common}
                              variant="outlined"
                              sx={{ width: 250 }}
                              error={
                                currentlyWorking
                                  ? fieldErrors.employedReadinessScale
                                  : false
                              }
                            >
                              <InputLabel>Readiness Scale to RTW </InputLabel>
                              <Select
                                label="Readiness Scale to RTW"
                                value={fieldValues.employedReadinessScale}
                                onChange={(e) =>
                                  handleChange(
                                    "employedReadinessScale",
                                    e.target.value
                                  )
                                }
                              >
                                {options.scaleOptions}
                              </Select>
                              {currentlyWorking &&
                              fieldErrors.employedReadinessScale ? (
                                <FormHelperText>
                                  Input is required
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          )}
                        </Stack>
                        {/* row  10 current work status, occupation, basic mthly sal, cancer impact on finance*/}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                          }}
                        >
                          Self Assessment
                        </Typography>
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={theme.customStyles.stackWrapLeft}
                          spacing={3}
                        >
                          <FormControl
                            variant="outlined"
                            error={fieldErrors.currentHealthStatus || false}
                          >
                            <InputLabel>Current Health</InputLabel>
                            <Select
                              size="small"
                              label="Current Health"
                              sx={{ width: 200 }}
                              value={fieldValues.currentHealthStatus}
                              onChange={(e) =>
                                handleChange(
                                  "currentHealthStatus",
                                  e.target.value
                                )
                              }
                            >
                              {options.healthStatusOptions}
                            </Select>
                            {fieldErrors.currentHealthStatus && (
                              <FormHelperText error>
                                Please select an option
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl
                            variant="outlined"
                            error={fieldErrors.physicalHealthStatus || false}
                          >
                            <Tooltip title="Has physical health interfered with normal activities in the past 4 weeks?">
                              <div>
                                <InputLabel>
                                  Physical health interfered with normal
                                  activities?
                                </InputLabel>
                                <Select
                                  sx={{ width: "100%", height: "42px" }}
                                  label="Physical health interfered with normal activities?"
                                  value={fieldValues.physicalHealthStatus}
                                  onChange={(e) =>
                                    handleChange(
                                      "physicalHealthStatus",
                                      e.target.value
                                    )
                                  }
                                >
                                  {options.distressOptions}
                                </Select>
                                {fieldErrors.physicalHealthStatus && (
                                  <FormHelperText error>
                                    Please select an option
                                  </FormHelperText>
                                )}
                              </div>
                            </Tooltip>
                          </FormControl>
                          <FormControl
                            variant="outlined"
                            error={fieldErrors.currentMentalHealthStatus === ""}
                          >
                            <Tooltip title="Mental health interfered with normal activities in the past 4 weeks.">
                              <InputLabel>
                                Mental health interfered with normal activities?
                              </InputLabel>
                              <Select
                                sx={{ width: "100%", height: "42px" }}
                                label="Mental health interfered with normal activities?"
                                value={fieldValues.currentMentalHealthStatus}
                                onChange={(e) =>
                                  handleChange(
                                    "currentMentalHealthStatus",
                                    e.target.value
                                  )
                                }
                              >
                                {options.distressOptions}
                              </Select>
                              {fieldValues.currentMentalHealthStatus === "" && (
                                <FormHelperText error>
                                  Please select an option
                                </FormHelperText>
                              )}
                            </Tooltip>
                          </FormControl>
                        </Stack>
                        {/* row  11 current work status, occupation, basic mthly sal, cancer impact on finance*/}
                        <Stack
                          direction={theme.customStyles.stackCollapseRow}
                          sx={theme.customStyles.stackWrapLeft}
                          spacing={3}
                        >
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
                            error={fieldErrors.physicalBarriersToRtw || false}
                            helperText={
                              fieldErrors
                                ? "Input is required, if no input put N/A"
                                : ""
                            }
                          />
                          <TextField
                            label="Mental barriers to RTW"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={fieldValues.psychosocialBarriersToRtw}
                            onChange={(e) =>
                              handleChange(
                                "psychosocialBarriersToRtw",
                                e.target.value
                              )
                            }
                            error={
                              fieldErrors.psychosocialBarriersToRtw || false
                            }
                            helperText={
                              fieldErrors.psychosocialBarriersToRtw
                                ? "Input is required, if no input put N/A"
                                : ""
                            }
                          />

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
                            error={fieldErrors.additionalInformation || false}
                            helperText={
                              fieldValues.additionalInformation
                                ? "Input is required, if no input put N/A"
                                : ""
                            }
                          />
                        </Stack>
                        {/* row  12 current work status, occupation, basic mthly sal, cancer impact on finance*/}
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            className="orange"
                            variant="contained"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Container>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default Profile;
