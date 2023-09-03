import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Components/UserContext";
import { theme } from "../../Assets/Styles/Theme";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AxiosLoader from "../../Components/AxiosLoader";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { ThemeProvider } from "@emotion/react";
import "../../Assets/Styles/Homepage.css";
import * as SwalMsgs from "../../Utils/SwalMsgs";
import {
  Autocomplete,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

function JobPost() {
  let navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { currUser, categories, location } = useUserContext();
  const [rawMessage, setRawMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [jobInfo, setJobInfo] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [url, setUrl] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    jobTitle: "",
    employmentType: "",
    jobCategory: "",
    location: "",
    jobDescription: "",
    minSalary: "",
  });
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const toolbarOptions = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "textAlign",
      "list",
      "colorPicker",
      "history",
    ],
    inline: {
      options: ["italic", "bold", "underline"],
      bold: { className: "demo-option-custom" },
      italic: { className: "demo-option-custom" },
      underline: { className: "demo-option-custom" },
      superscript: { className: "demo-option-custom" },
      subscript: { className: "demo-option-custom" },
    },
    textAlign: {
      inDropdown: true,
    },
    blockType: {
      className: "demo-option-custom-wide",
      dropdownClassName: "demo-dropdown-custom",
    },
    fontSize: {
      className: "demo-option-custom-medium",
    },
    list: {
      inDropdown: true,
      options: ["unordered", "ordered", "indent", "outdent"],
      unordered: { className: "demo-option-custom" },
      ordered: { className: "demo-option-custom" },
      indent: { className: "demo-option-custom" },
      outdent: { className: "demo-option-custom" },
    },
  };

  const wrapperStyle = descriptionError
    ? { border: "1px solid #FF5733 " }
    : { border: "1px solid #969696" };

  const editorStyle = descriptionError
    ? { border: "1px solid #FF5733 ", height: "20rem", padding: "1rem" }
    : { border: "1px solid #969696", height: "20rem", padding: "1rem" };

  const categoryOptions = categories.map((category) => ({
    id: category.id,
    label: category.name,
  }));

  const locationOptions = location.map((area) => ({
    id: area.id,
    label: area.name,
  }));

  const fieldInitialState = {
    jobTitle: "",
    employmentType: "",
    jobCategory: "",
    location: "",
    jobDescription: "",
    minSalary: "",
  };

  useEffect(() => {
    console.log("Categories: ", categories);
  }, [categories]);

  useEffect(() => {
    console.log("currUser: ", currUser);

    if (currUser && currUser.id !== null && !currUser.approvedByAdmin) {
      Swal.fire(SwalMsgs.awaitingAccountApproval("Home")).then((result) => {
        if (result.isConfirmed) {
          setDisableSubmit(true);
          navigate("/");
        } else {
          setDisableSubmit(false);
        }
      });
    }
  }, [currUser]);

  useEffect(() => {
    if (jobInfo !== "") {
      handleChange("jobTitle", jobInfo[0].mainTitle);
      handleChange("jobDescription", jobInfo[0].description);
      const convertedDescription = stateFromHTML(jobInfo[0].description);
      onEditorStateChange(EditorState.createWithContent(convertedDescription));
      setDescriptionError(false);
    }
  }, [jobInfo]);

  const onEditorStateChange = (newEditorState) => {
    const editorHasText = editorState.getCurrentContent().hasText();
    if (!editorHasText) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    setEditorState(newEditorState);
    const htmlMessage = draftToHtml(
      convertToRaw(newEditorState.getCurrentContent())
    );
    setRawMessage(htmlMessage);
    handleChange("jobDescription", htmlMessage);
  };

  const checkInputsError = () => {
    const editorHasText = editorState.getCurrentContent().hasText();
    let error = false;
    console.log("Field Values: ", fieldValues);
    if (!editorHasText) {
      setDescriptionError(true);
      error = true;
    } else {
      setDescriptionError(false);
    }
    const newFieldErrors = {};
    Object.keys(fieldValues).forEach((fieldName) => {
      if (
        typeof fieldValues[fieldName] === "string" &&
        fieldValues[fieldName].trim() === ""
      ) {
        newFieldErrors[fieldName] = true;
        error = true;
      } else if (
        typeof fieldValues[fieldName] === "object" &&
        fieldValues[fieldName].hasOwnProperty("name")
      ) {
        if (fieldValues[fieldName].name.trim() === "") {
          newFieldErrors[fieldName] = true;
          error = true;
        }
      }
    });
    setFieldErrors(newFieldErrors);
    return error;
  };

  const handleEditorStateToMessage = () => {
    handleChange("jobDescription", rawMessage);
    const error = checkInputsError();
    console.log(
      "fielderrors :",
      fieldErrors,
      "descrip error: ",
      descriptionError
    );
    if (
      !error &&
      Object.values(fieldErrors).every((error) => !error) &&
      !descriptionError
    ) {
      setModalOpen(true);
    } else {
      Swal.fire(SwalMsgs.missingFormInfoGentle);
    }
  };

  const hasChanges = () => {
    for (const key in fieldValues) {
      if (fieldValues[key] !== fieldInitialState[key]) {
        return true;
      }
    }
    return false;
  };

  const resetFields = () => {
    setFieldValues(fieldInitialState);
    setMaxSalary("");
  };

  const importLinkedIn = async () => {
    setAxiosLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/listings/linkedin`,
        url
      );
      const info = response.data;
      if (info !== null) {
        setJobInfo(info);
        setUrl("");

        Swal.fire(SwalMsgs.importInfoSuccessful("job information"));
      }
    } catch (error) {
      console.error("Error fetching HTML: ", error);
      Swal.fire(SwalMsgs.importInfoFailed("job information", "url"));
    } finally {
      setAxiosLoading(false);
    }
  };

  const getData = (e) => {
    e.preventDefault();
    if (url === "") {
      Swal.fire(SwalMsgs.missingFormInfoGentle);
    } else if (hasChanges()) {
      Swal.fire(SwalMsgs.overwriteCurrentInfo).then((result) => {
        if (result.value) {
          resetFields();
          importLinkedIn();
        }
      });
    } else {
      importLinkedIn();
    }
  };

  const checkSalary = (value) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && Number.isInteger(intValue)) {
      return true;
    } else {
      return false;
    }
  };

  const handleMaxSalaryChange = (value) => {
    const maxSalaryIsNumber = checkSalary(value);
    if (maxSalaryIsNumber) {
      const maxSalary = Number(value);
      setMaxSalary(maxSalary);
    } else {
      Swal.fire(SwalMsgs.numberRequiredOptionalField("Maximum Salary"));
    }
  };

  const handleChange = (fieldName, value) => {
    console.log(" value: ", value);

    if (fieldName === "minSalary") {
      const minSalaryIsNumber = checkSalary(value);
      if (minSalaryIsNumber) {
        setFieldValues((prevValues) => ({
          ...prevValues,
          [fieldName]: Number(value),
        }));
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          minSalary: false,
        }));
      } else {
        Swal.fire(SwalMsgs.numberRequired("Minimum Salary"));
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          minSalary: true,
        }));
      }
      return;
    }

    if (fieldName === "jobCategory" || fieldName === "location") {
      const selectedOption = { id: value.id, name: value.label };
      console.log(fieldName, selectedOption);
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldName]: selectedOption,
      }));
    } else {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: false,
    }));

    console.log(fieldValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = checkInputsError();
    const jobPost =
      maxSalary !== null
        ? {
            companyId: currUser.companyInfo.id,
            title: fieldValues.jobTitle,
            employmentType: fieldValues.employmentType,
            jobCategoryId: fieldValues.jobCategory.id,
            locationId: fieldValues.location.id,
            description: fieldValues.jobDescription,
            minSalary: fieldValues.minSalary,
            maxSalary: maxSalary,
          }
        : {
            companyId: currUser.companyInfo.id,
            title: fieldValues.jobTitle,
            employmentType: fieldValues.employmentType,
            jobCategoryId: fieldValues.jobCategory.id,
            locationId: fieldValues.location.id,
            description: fieldValues.jobDescription,
            minSalary: fieldValues.minSalary,
          };
    if (!error && currUser.approvedByAdmin) {
      console.log(jobPost);
      setAxiosLoading(true);
      try {
        const newJobInfo = await axios.post(
          `${BACKEND_URL}/company/newjobpost`,
          jobPost,
          {
            headers: {
              Authorization: `Bearer ${currUser.accessToken}`,
            },
          }
        );
        console.log(newJobInfo.data.postedJobInfo);
        if (newJobInfo != null) {
          setAxiosLoading(false);
          Swal.fire(SwalMsgs.successPostingAwaitApprovalWButtons).then(
            (result) => {
              if (result.isConfirmed) {
                navigate("/");
              } else if (result.isDenied) {
                navigate("/");
              }
            }
          );
        }
      } catch (error) {
        console.log(error);
        Swal.fire(SwalMsgs.errorPosting);
      } finally {
        setAxiosLoading(false);
        setModalOpen(false);
      }
    } else if (!error) {
      setAxiosLoading(false);
      Swal.fire(SwalMsgs.missingFormInfo);
    } else if (!currUser.approvedByAdmin) {
      setAxiosLoading(false);
      setDisableSubmit(true);
      Swal.fire(SwalMsgs.awaitingAccountApproval);
    }
  };

  return (
    <Grid
      container
      direction="column"
      sx={theme.customStyles.centered.container}
    >
      {axiosLoading && <AxiosLoader />}
      <ThemeProvider theme={theme}>
        <Grid container direction="row" justifyContent="center">
          <Box mb={4} p={4} width="80%">
            <Paper elevation={2} color="FFF">
              <Grid item xs={12}>
                <Box pt={3}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: theme.typography.h4.fontWeightBold,
                      textAlign: "center",
                    }}
                  >
                    List a New Job
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box m={2} pt={2} display="flex" justifyContent="center">
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: theme.typography.p.fontWeightBold,
                      color: theme.typography.p.color,
                    }}
                  >
                    Please fill in all particulars to list a job. Do note that
                    jobs have to be approved before they can be listed.
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box m={4}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: theme.typography.h6.fontWeightBold,
                    }}
                  >
                    Job Details Import
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box ml={4} mt={2} mr={3}>
                  <Typography
                    variant="p"
                    sx={{
                      color: theme.typography.p.color,
                    }}
                  >
                    To import a job from Linkedin, please enter the url in this
                    format{" "}
                    <Typography
                      variant="p"
                      sx={{
                        color: theme.typography.darkP.color,
                        fontWeight: theme.typography.darkP.fontWeightBold,
                      }}
                    >
                      https://www.linkedin.com/jobs/view/jobId
                    </Typography>{" "}
                    and click search.
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box ml={3} mb={3} mt={3}>
                  <Grid
                    container
                    alignItems="top"
                    direction="row"
                    justifyContent="center"
                  >
                    {" "}
                    <Box display="flex" justifyContent="center">
                      <Grid item xs={12}>
                        <TextField
                          id="search"
                          type="search"
                          label="Linkedin URL"
                          placeholder="Job Post URL"
                          helperText="Optional"
                          value={url.url || ""}
                          size="small"
                          sx={{
                            width: "50ch",
                            m: 1,
                          }}
                          onChange={(e) => setUrl({ url: e.target.value })}
                          onBlur={(e) => setUrl({ url: e.target.value })}
                        />
                      </Grid>
                      <Grid item>
                        <Box mt={2}>
                          <Tooltip title="Import via Linkedin Job Post">
                            <IconButton
                              sx={{ p: 0 }}
                              onClick={(e) => getData(e)}
                            >
                              <SearchIcon
                                fontSize="large"
                                sx={{ color: "#FF6B2C" }}
                                alt="Search"
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Box>
                  </Grid>
                </Box>
              </Grid>

              <Grid item>
                <Box ml={4} mt={2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: theme.typography.h6.fontWeightBold,
                    }}
                  >
                    Job Information
                  </Typography>
                </Box>
              </Grid>

              <Grid item>
                <Box ml={3} mt={2} width="80%">
                  <FormControl>
                    <Typography
                      variant="p"
                      sx={{
                        color: theme.typography.p.color,
                      }}
                    >
                      <TextField
                        sx={{ width: "60ch", m: 1 }}
                        required
                        id="jobTitle"
                        type="search"
                        label="Job Title"
                        size="small"
                        value={fieldValues.jobTitle}
                        placeholder="Job title of the position"
                        onChange={(e) =>
                          handleChange("jobTitle", e.target.value)
                        }
                        error={fieldErrors.jobTitle || false}
                        helperText={
                          fieldErrors.jobTitle && "Job Title is required!"
                        }
                      />
                    </Typography>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item>
                <Box ml={3} mt={2}>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-end"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={4} md={3}>
                      <FormControl
                        variant="standard"
                        sx={{ ml: 2, minWidth: 200 }}
                        error={fieldErrors.employmentType || false}
                      >
                        <InputLabel id="employmentTypeLabel">
                          Employment Type
                        </InputLabel>
                        <Select
                          labelId="employmentTypeLabel"
                          label="Employment Type"
                          id="employmentType"
                          value={fieldValues.employmentType}
                          onChange={(e) =>
                            handleChange(`employmentType`, e.target.value)
                          }
                        >
                          <MenuItem value="any">
                            <em>Any</em>
                          </MenuItem>
                          <MenuItem value="Full-Time">Full-Time</MenuItem>
                          <MenuItem value="Part-Time">Part-Time</MenuItem>
                          <MenuItem value="Contract">Contract</MenuItem>
                          <MenuItem value="Remote">Remote</MenuItem>
                        </Select>
                        <FormHelperText>
                          {fieldErrors.employmentType &&
                            "Employment Type is required!"}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <FormControl
                        variant="standard"
                        sx={{ ml: 4, minWidth: 200 }}
                        error={fieldErrors.location || false}
                      >
                        <Autocomplete
                          disablePortal
                          id="location"
                          value={fieldValues.location.name || ""}
                          options={locationOptions}
                          isOptionEqualToValue={(option, value) =>
                            option.id === Number(value.id)
                          }
                          sx={{ width: 200 }}
                          onChange={(e, selectedOption) => {
                            console.log(selectedOption);
                            if (selectedOption) {
                              handleChange(`location`, selectedOption);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Location"
                              variant="standard"
                            />
                          )}
                        />
                        <FormHelperText>
                          {fieldErrors.location && "Location is required!"}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <FormControl
                        variant="standard"
                        sx={{ ml: 4, minWidth: 200 }}
                        error={fieldErrors.jobCategory || false}
                      >
                        <Autocomplete
                          disablePortal
                          id="jobCategory"
                          options={categoryOptions}
                          value={fieldValues.jobCategory.name || ""}
                          sx={{ width: 200 }}
                          isOptionEqualToValue={(option, value) =>
                            option.id === Number(value.id)
                          }
                          onChange={(e, selectedOption) => {
                            console.log(selectedOption);
                            if (selectedOption) {
                              handleChange(`jobCategory`, selectedOption);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Job Category"
                              variant="standard"
                            />
                          )}
                        />
                        <FormHelperText>
                          {fieldErrors.jobCategory &&
                            "Job category is required!"}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box ml={3} mt={5}>
                  <Grid container direction="row" alignItems="top" spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          required
                          id="minSalary"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                /mth
                              </InputAdornment>
                            ),
                          }}
                          label="Minimum Salary / mth"
                          value={fieldValues.minSalary}
                          onChange={(e) =>
                            handleChange(`minSalary`, e.target.value)
                          }
                          error={fieldErrors.minSalary || false}
                          helperText={
                            fieldErrors.minSalary &&
                            "Minimum Salary is required for Approval!"
                          }
                        ></TextField>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          id="maxSalary"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                /mth
                              </InputAdornment>
                            ),
                          }}
                          label="Maximum Salary / mth"
                          helperText={"Optional"}
                          value={maxSalary}
                          onChange={(e) =>
                            handleMaxSalaryChange(e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Box ml={3} mt={2} mr={5}>
                  <Tooltip title="Please include Responsibilities and Requirements here, where possible.">
                    <Grid container direction="column">
                      <Grid item>
                        <Box mt={3} ml={1}>
                          <Typography
                            variant="p"
                            sx={{
                              color: descriptionError
                                ? theme.typography.error.color
                                : theme.typography.p.color,
                            }}
                          >
                            Job Description
                          </Typography>
                          <Editor
                            initialEditorState={editorState}
                            wrapperClassName="wrapper-class"
                            wrapperStyle={wrapperStyle}
                            editorStyle={editorStyle}
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                            toolbar={toolbarOptions}
                          />

                          {descriptionError && (
                            <Typography
                              variant="p"
                              sx={{
                                color: theme.typography.error.color,
                                fontSize: theme.typography.error.fontSize,
                              }}
                            >
                              Job Description is required!
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box mb={3} mt={2}>
                          <Grid
                            container
                            justifyContent="flex-end"
                            direction="row"
                          >
                            <Button
                              disabled={disableSubmit}
                              classes={{ root: "orange" }}
                              variant="contained"
                              onClick={handleEditorStateToMessage}
                            >
                              preview
                            </Button>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Tooltip>
                </Box>
              </Grid>
            </Paper>
          </Box>
        </Grid>

        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <Grid container direction="column">
            <Grid item>
              <Box mt={2} justifyContent="center" display="flex">
                <DialogTitle>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: theme.typography.h4.fontWeightBold,
                    }}
                  >
                    New Job Post
                  </Typography>
                </DialogTitle>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <DialogContent>
                <DialogContentText
                  style={{ marginBottom: "16px", textAlign: "center" }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: theme.typography.h5.fontWeightBold,
                    }}
                  >
                    {fieldValues.jobTitle
                      ? fieldValues.jobTitle
                      : "Please key in Job Title!"}
                  </Typography>{" "}
                </DialogContentText>

                <DialogContentText>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: theme.typography.p.fontWeightBold,
                    }}
                  >
                    {fieldValues.employmentType
                      ? fieldValues.employmentType
                      : ""}
                  </Typography>
                </DialogContentText>

                <DialogContentText>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: theme.typography.p.fontWeightBold,
                    }}
                  >
                    Location:{" "}
                  </Typography>
                  {fieldValues.location && fieldValues.location.name
                    ? fieldValues.location.name
                    : "Please select a location."}
                </DialogContentText>

                <DialogContentText style={{ marginBottom: "16px" }}>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: theme.typography.p.fontWeightBold,
                    }}
                  >
                    Category:{" "}
                  </Typography>
                  {fieldValues.jobCategory && fieldValues.jobCategory.name
                    ? fieldValues.jobCategory.name
                    : "Please select a category."}
                </DialogContentText>
                <DialogContentText>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.h6.fontWeightBold,
                      }}
                    >
                      Job Details{" "}
                    </Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: fieldValues.jobDescription,
                      }}
                    />
                  </Box>
                </DialogContentText>
              </DialogContent>
            </Grid>

            <DialogActions>
              <Button
                disabled={disableSubmit}
                onClick={() => setModalOpen(false)}
                classes={{ root: "blue" }}
                variant="contained"
              >
                edit
              </Button>
              <Button
                disabled={disableSubmit}
                onClick={handleSubmit}
                classes={{ root: "orange" }}
                variant="contained"
              >
                submit
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </ThemeProvider>
    </Grid>
  );
}

export default JobPost;
