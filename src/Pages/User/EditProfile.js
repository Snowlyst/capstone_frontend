import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Button,
  ThemeProvider,
  Container,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { storage } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import * as options from "../../Utils/MenuItemsOptions";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import * as SwalMsgs from "../../Utils/SwalMsgs";
import { useUserContext } from "../../Components/UserContext";
import AxiosLoader from "../../Components/AxiosLoader";
import ProfileCard from "./ProfileCard";
import "../../Assets/Styles/EditProfile.css";

function EditProfile() {
  const [currentlyWorking, setCurrentlyWorking] = useState("");
  const [axiosLoading, setAxiosLoading] = useState(false);
  const { currUser, setCurrUser } = useUserContext();
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [fieldValues, setFieldValues] = useState({});
  const [fileAdded, setFileAdded] = useState(null);
  const [returnedUrl, setReturnedUrl] = useState("");
  const [prevCurrUser, setPrevCurrUser] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const STORAGE_KEY = "images/";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchPostal = (e) => {
    e.preventDefault();
    handleChange("postalCode", "");
    delete fieldValues.streetAddress;
    const searchQuery = fieldValues.postalCode;
    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${searchQuery}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((info) => {
        info.data.results.map((info, index) => {
          console.log(info);
          console.log(info.ADDRESS);

          // handleChange("address", info.ADDRESS);
          if (info.ADDRESS === "" || info.ADDRESS === null) {
            Swal.fire(
              "Error",
              "There is no such postal code. Please try again.",
              "error"
            );
          } else {
            handleChange("streetAddress", info.ADDRESS);
          }
          return <div key={index}>Address: {info.ADDRESS}</div>;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    if (fileAdded) {
      uploadAvatar();
    }
  }, [fileAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currUser);
    const newFieldErrors = {};
    Object.keys(fieldValues).forEach((fieldName) => {
      if (typeof fieldValues[fieldName] === "string") {
        if (fieldValues[fieldName].trim() === "") {
          newFieldErrors[fieldName] = true;
        }
      }
    });

    if (newFieldErrors && newFieldErrors.length > 0) {
      setAxiosLoading(false);
      Swal.fire(SwalMsgs.missingFormInfoGentle);
    } else {
      setAxiosLoading(true);

      const profile = { fieldValues: fieldValues };
      console.log(profile);

      try {
        const userProfile = await axios.put(
          `${BACKEND_URL}/users/editpersonalinfo/${currUser.id}`,
          profile,
          {
            headers: {
              Authorization: `Bearer ${currUser.accessToken}`,
            },
          }
        );
        const userObject = userProfile.data;
        userObject.accessToken = currUser.accessToken;
        console.log("userObject after adding access Token: ", userObject);
        setAxiosLoading(false);
        setOpen(false);
        setUserInfo(userObject.user_personal_detail);
        setCurrUser(userObject);
        console.log("CurrUser after setting after db update: ", currUser);

        Swal.fire(
          "Submission Successful",
          "Your profile has been updated.",
          "success"
        );
      } catch (error) {
        // console.log(error);
        Swal.fire(SwalMsgs.errorPosting);
      }
    }
  };

  useEffect(() => {
    setPrevCurrUser(currUser);
    console.log("curruser in use effect setPrevCurrUser: ", currUser);
  }, [currUser]);

  useEffect(() => {
    const getProfile = async () => {
      if (currUser !== null) {
        try {
          const userProfile = await axios.get(
            `${BACKEND_URL}/users/personalinfo/${currUser.id}`
          );
          console.log(userProfile.data.user_personal_detail);
          setUserInfo(userProfile.data.user_personal_detail);
        } catch (error) {
          console.error("API call failed: ", error);
        }
      }
    };
    if (currUser !== prevCurrUser) {
      getProfile();
    }
  }, [currUser, prevCurrUser]);

  const uploadAvatar = () => {
    const fullStorageRef = storageRef(storage, STORAGE_KEY + fileAdded.name);
    uploadBytes(fullStorageRef, fileAdded).then(() => {
      getDownloadURL(fullStorageRef).then((url) => {
        setReturnedUrl(url);
        handleChange("avatarUrl", url);
        setFileAdded(null);
        console.log(url);
      });
    });
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo !== null && userInfo !== undefined) {
      const fields = {
        mobileNumber: userInfo.mobileNumber,
        avatarUrl: currUser.avatarUrl,
        housingType: userInfo.housingType,
        streetAddress: userInfo.streetAddress,
        postalCode: userInfo.postalCode,
        unitNumber: userInfo.unitNumber,
        occupation: userInfo.occupation,
        currentWorkStatus: userInfo.currentWorkStatus,
        monthlySalary: userInfo.monthlySalary,
        linkedIn: userInfo.linkedIn,
      };
      setFieldValues(fields);
    }
  }, [userInfo]);

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
                    <Stack direction="column">
                      <Stack direction="column" spacing={3} mb={4}>
                        {/* row 1 profile title */}
                        <Typography
                          textAlign="center"
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
                          These are your current details. If you wish to update
                          them, please click the edit button. Please note that
                          your primary information cannot be edited.
                        </Typography>
                      </Stack>

                      <Stack direction="column" spacing={1}>
                        {/* row 2 primary information */}

                        <Typography
                          textAlign="left"
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                          }}
                        >
                          Primary Information
                        </Typography>

                        {/* row 3 first name, last name, nric */}
                        {currUser ? (
                          <Stack
                            direction={theme.customStyles.stackCollapseRow}
                            spacing={{ xs: 2, sm: 5 }}
                          >
                            <Typography
                              variant="p"
                              sx={{ font: theme.typography.p.fontFamily }}
                            >
                              <Box
                                component="span"
                                fontWeight={theme.typography.p.fontWeightBold}
                              >
                                Name:
                              </Box>{" "}
                              {currUser.firstName} {currUser.lastName}
                            </Typography>

                            <Typography
                              variant="p"
                              sx={{ font: theme.typography.p.fontFamily }}
                            >
                              <Box
                                component="span"
                                fontWeight={theme.typography.p.fontWeightBold}
                              >
                                Email:
                              </Box>{" "}
                              {currUser.email}
                            </Typography>
                            {userInfo ? (
                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  NRIC Number:
                                </Box>
                                {userInfo.identificationNumber}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Stack>
                        ) : (
                          ""
                        )}
                        {/* row 4 mobile, dob,  gender */}
                        {userInfo ? (
                          <div>
                            <Stack
                              direction={theme.customStyles.stackCollapseRow}
                              spacing={{ sm: 2, md: 8 }}
                            >
                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  Gender:
                                </Box>{" "}
                                {userInfo.gender}
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  Date of Birth:
                                </Box>{" "}
                                {userInfo.dateOfBirth}
                              </Typography>
                            </Stack>
                            <Stack mt={1}>
                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  Primary Cancer Diagnosis:
                                </Box>{" "}
                                {userInfo.cancerDiagnosis}
                              </Typography>
                            </Stack>
                            <Stack direction="column" spacing={2} pt={3}>
                              <Stack direction="row">
                                <Typography
                                  textAlign="left"
                                  variant="h6"
                                  sx={{
                                    fontWeight:
                                      theme.typography.h6.fontWeightBold,
                                  }}
                                >
                                  Personal Information
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    marginLeft: "auto",
                                  }}
                                >
                                  <Button
                                    classes={{ root: "blue" }}
                                    variant="contained"
                                    onClick={() => setCardOpen(true)}
                                    sx={{
                                      borderTopRightRadius: 0,
                                      borderBottomRightRadius: 0,
                                    }}
                                  >
                                    View Profile Card
                                  </Button>
                                  <Button
                                    classes={{ root: "blue" }}
                                    variant="contained"
                                    onClick={handleClickOpen}
                                    sx={{
                                      borderTopLeftRadius: 0,
                                      borderBottomLeftRadius: 0,
                                      borderLeft: "none",
                                    }}
                                  >
                                    Edit Profile
                                  </Button>
                                </div>
                              </Stack>
                              <Stack direction="row" spacing={2}>
                                <Box style={{ marginRight: "5rem" }}>
                                  <Typography
                                    variant="p"
                                    sx={{
                                      font: theme.typography.p.fontFamily,
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      fontWeight={
                                        theme.typography.p.fontWeightBold
                                      }
                                    >
                                      Mobile Number:
                                    </Box>{" "}
                                    {userInfo.mobileNumber}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="p"
                                  sx={{ font: theme.typography.p.fontFamily }}
                                >
                                  <Box
                                    component="span"
                                    fontWeight={
                                      theme.typography.p.fontWeightBold
                                    }
                                  >
                                    Avatar:
                                  </Box>{" "}
                                </Typography>
                                <Avatar src={currUser.avatarUrl} />
                              </Stack>
                              <Stack direction="row" spacing={5}>
                                <Typography
                                  variant="p"
                                  sx={{ font: theme.typography.p.fontFamily }}
                                >
                                  <Box
                                    component="span"
                                    fontWeight={
                                      theme.typography.p.fontWeightBold
                                    }
                                  >
                                    Housing Type:
                                  </Box>{" "}
                                  {userInfo.housingType}
                                </Typography>
                              </Stack>

                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  Address:
                                </Box>{" "}
                                {userInfo.unitNumber} {userInfo.streetAddress}
                              </Typography>
                              <Stack
                                direction={theme.customStyles.stackCollapseRow}
                                spacing={{ xs: 2, md: 16 }}
                              >
                                <Typography
                                  variant="p"
                                  sx={{ font: theme.typography.p.fontFamily }}
                                >
                                  <Box
                                    component="span"
                                    fontWeight={
                                      theme.typography.p.fontWeightBold
                                    }
                                  >
                                    Occupation:
                                  </Box>{" "}
                                  {userInfo.occupation}
                                </Typography>
                                <Typography
                                  variant="p"
                                  sx={{ font: theme.typography.p.fontFamily }}
                                >
                                  <Box
                                    component="span"
                                    fontWeight={
                                      theme.typography.p.fontWeightBold
                                    }
                                  >
                                    Current Work Status:
                                  </Box>{" "}
                                  {userInfo.currentWorkStatus}
                                </Typography>
                              </Stack>
                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  Monthly Salary:
                                </Box>{" "}
                                {userInfo.monthlySalary}
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ font: theme.typography.p.fontFamily }}
                              >
                                <Box
                                  component="span"
                                  fontWeight={theme.typography.p.fontWeightBold}
                                >
                                  Linkedin Profile URL:
                                </Box>{" "}
                                {userInfo.linkedIn
                                  ? userInfo.linkedIn
                                  : "No URL provided"}
                              </Typography>
                            </Stack>
                          </div>
                        ) : (
                          ""
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Container>
        </div>
      </Grid>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{
              font: theme.typography.h5.fontFamily,
              fontWeight: theme.typography.h5.fontWeightBold,
            }}
          >
            Edit Profile
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <DialogContentText>
              <Typography
                variant="p"
                sx={{
                  font: theme.typography.p.fontFamily,
                  fontWeight: theme.typography.p.fontWeightBold,
                }}
              >
                Edit the information and press submit to save the information.
                All fields are required, except for Avatar.
              </Typography>
            </DialogContentText>
            <Box>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={3}>
                  <Typography
                    variant="p"
                    sx={{
                      font: theme.typography.p.fontFamily,
                    }}
                  >
                    Avatar
                  </Typography>
                  <DriveFolderUploadIcon sx={{ ml: 0.5 }} />
                  <label style={{ cursor: "pointer" }}>
                    {fileAdded ? (
                      <Typography variant="p">{fileAdded.name}</Typography>
                    ) : returnedUrl ? (
                      <Typography variant="p">
                        File has been uploaded!
                      </Typography>
                    ) : (
                      <Typography variant="p">
                        Click here to select the file to upload
                      </Typography>
                    )}

                    <input
                      hidden
                      accept="image/jpeg, image/png, image/gif"
                      type="file"
                      onChange={(e) => {
                        setFileAdded(e.target.files[0]);
                      }}
                    />
                  </label>
                </Stack>
              </Stack>
            </Box>
            <Stack direction="row" mt={2}>
              <TextField
                value={fieldValues.mobileNumber || ""}
                id="mobileNumber"
                label="Mobile Number"
                type="number"
                size="small"
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
              />
              <FormControl sx={{ ml: 5, minWidth: 80 }}>
                <InputLabel id="housingType-label">Housing Type</InputLabel>
                <Select
                  labelId="housingType-label"
                  size="small"
                  label="Housing Type"
                  value={fieldValues.housingType}
                  onChange={(e) => handleChange("housingType", e.target.value)}
                >
                  {options.housingOptions}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row">
              <TextField
                label="Postal Code"
                required
                {...theme.textbox.common}
                type="number"
                value={fieldValues.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
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
                onChange={(e) => handleChange("unitNumber", e.target.value)}
              />
            </Stack>
            <TextField
              label="Address"
              fullWidth
              required
              {...theme.textbox.common}
              value={fieldValues.streetAddress}
              sx={{
                flex: 2,
              }}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
            />
            <Stack direction="row">
              <FormControl
                required
                size="small"
                variant="outlined"
                sx={{
                  mt: 1,
                  width: 195,
                }}
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
              </FormControl>
              <FormControl
                variant="outlined"
                size="small"
                sx={{
                  width: 150,
                  mt: 1,
                  ml: 6,
                }}
              >
                <InputLabel>
                  {currentlyWorking === ""
                    ? "Occupation"
                    : currentlyWorking
                    ? "Current Occupation"
                    : "Previous Occupation"}
                </InputLabel>
                <Select
                  label=" occupation"
                  value={fieldValues.occupation}
                  onChange={(e) => {
                    handleChange("occupation", e.target.value);
                  }}
                >
                  {options.occupationOptions}
                </Select>
              </FormControl>
            </Stack>
            <FormControl variant="outlined" sx={{ mt: 2 }}>
              <InputLabel>Basic Monthly Salary</InputLabel>
              <Tooltip
                title="Excludes bonuses, employer cpf, 13th month bonus etc"
                arrow
                placement="top"
              >
                <Select
                  label="Basic Monthly Salary"
                  size="small"
                  value={fieldValues.monthlySalary}
                  sx={{
                    width: 200,
                  }}
                  onChange={(e) =>
                    handleChange("monthlySalary", e.target.value)
                  }
                >
                  {options.incomeOptions}
                </Select>
              </Tooltip>
            </FormControl>
            <TextField
              label="Linkedin Profile URL"
              fullWidth
              required
              {...theme.textbox.common}
              value={fieldValues.linkedIn}
              sx={{
                flex: 2,
              }}
              onChange={(e) => handleChange("linkedIn", e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={() => setCardOpen(false)} open={cardOpen}>
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{
              font: theme.typography.h5.fontFamily,
              fontWeight: theme.typography.h5.fontWeightBold,
            }}
          >
            Profile Card
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ProfileCard />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCardOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default EditProfile;
