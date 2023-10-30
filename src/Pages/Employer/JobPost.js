import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Components/UserContext";
import { theme } from "../../Assets/Styles/Theme";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import { stateFromHTML } from "draft-js-import-html";
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
  Container,
  Paper,
  Stack,
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
  const [displayBanner, setDisplayBanner] = useState(false);
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

    if (currUser) {
      if (currUser.id !== null && !currUser.approvedByAdmin) {
        Swal.fire(SwalMsgs.awaitingAccountApproval("Home")).then((result) => {
          if (result.isConfirmed) {
            setDisableSubmit(true);
            navigate("/");
          } else {
            setDisableSubmit(false);
          }
        });
      }

      if (currUser.companyInfo && currUser.companyInfo.bannerUrl) {
        setDisplayBanner(true);
      } else {
        setDisplayBanner(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currUser]);

  useEffect(() => {
    if (jobInfo !== "") {
      handleChange("jobTitle", jobInfo.mainTitle);
      handleChange("jobDescription", jobInfo.description);
      console.log("JobInfo Description", jobInfo.description);
      // const convertedDescription = stringToEditorState(jobInfo.description);
      // console.log(convertedDescription);
      //       onEditorStateChange(jobInfo.description);
      const contentBlock = htmlToDraft(jobInfo.description);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        onEditorStateChange(editorState);
        setDescriptionError(false);
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobInfo]);

  const onEditorStateChange = (editorState) => {
    const editorHasText = editorState.getCurrentContent().hasText();
    if (!editorHasText) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    setEditorState(editorState);

    // setEditorState(newEditorState);
    const htmlMessage = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
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
    // Object.keys(fieldValues).forEach((fieldName) => {
    //   const value = fieldValues[fieldName];
    //   if (
    //     (typeof value === "string" && value.trim() === "") ||
    //     (typeof value === "object" &&
    //       value &&
    //       value.hasOwnProperty("name") &&
    //       value.name.trim() === "")
    //   ) {
    //     newFieldErrors[fieldName] = true;
    //     error = true;
    //   }
    // });
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
        console.log("Line 263 info", info);
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
          Swal.fire(
            SwalMsgs.successPostingAwaitApprovalWButtons(
              "job post",
              "Return to Home",
              "Post another job"
            )
          ).then((result) => {
            if (result.isConfirmed) {
              setModalOpen(false);
              resetFields();
              fieldValues.jobTitle = "";
              fieldValues.description = "";
              setEditorState(EditorState.createEmpty());
            } else if (result.isDenied) {
              navigate(`/`);
            }
          });
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
                  {displayBanner ? (
                    <Box
                      component="img"
                      sx={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: "auto",
                        width: "100%",
                        maxHeight: { xs: 262 },
                        maxWidth: { xs: 838 },
                      }}
                      alt="Company Banner"
                      src={currUser.companyInfo.bannerUrl || ""}
                    />
                  ) : (
                    <Box mb={3} component="div"></Box>
                  )}

                  {/* row 2 - co logo , title , name, employment type, location, post date */}

                  <Box m={3} p={3} sx={theme.customStyles.displayFlexRowLeft}>
                    <Stack direction="row" spacing={3}>
                      <Stack direction="column" spacing={1}>
                        <Typography
                          textAlign="left"
                          variant="h5"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                          }}
                        >
                          New Job Post
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                            color: theme.typography.p.color,
                          }}
                        >
                          Please fill in all particulars to list a job. Do note
                          that jobs have to be approved before they can be
                          listed.
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            color: theme.typography.p.color,
                          }}
                        >
                          To import a job from Linkedin, please enter the url in
                          this format{" "}
                          <Box
                            component="span"
                            fontWeight={theme.typography.p.fontWeightBold}
                          >
                            https://www.linkedin.com/jobs/view/jobId{" "}
                          </Box>
                          and click search.
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                          alignContent="center"
                        >
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
                        </Stack>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                          }}
                        >
                          Job Information
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            color: theme.typography.p.color,
                          }}
                        >
                          <TextField
                            sx={{ maxWidth: "60ch", m: 1 }}
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
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          sx={{
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <FormControl
                            variant="standard"
                            sx={{
                              pb: { xs: 2, sm: 0 },
                              ml: 2,
                              width: 200,
                              mb: { xs: 4, sm: 2 },
                            }}
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
                              <MenuItem value="Full Time">Full-Time</MenuItem>
                              <MenuItem value="Part Time">Part-Time</MenuItem>
                              <MenuItem value="Contract">Contract</MenuItem>
                              <MenuItem value="Remote">Remote</MenuItem>
                            </Select>
                            <FormHelperText>
                              {fieldErrors.employmentType &&
                                "Employment Type is required!"}
                            </FormHelperText>
                          </FormControl>
                          <FormControl
                            variant="standard"
                            sx={{
                              ml: { xs: 2, sm: 4 },
                              maxWidth: 200,
                              mb: { xs: 2, sm: 0 },
                            }}
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
                              sx={{ minWidth: 200 }}
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
                          <FormControl
                            variant="standard"
                            sx={{
                              width: 200,
                            }}
                            error={fieldErrors.jobCategory || false}
                          >
                            <Autocomplete
                              disablePortal
                              id="jobCategory"
                              options={categoryOptions}
                              value={fieldValues.jobCategory.name || ""}
                              sx={{
                                ml: { xs: 2 },
                                mb: { xs: 4, m: 0 },
                              }}
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
                        </Stack>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={3}
                          sx={{ flexWrap: "wrap" }}
                        >
                          <FormControl
                            sx={{
                              width: "23ch",
                              mb: { xs: 4, sm: 4 },
                            }}
                            variant="outlined"
                          >
                            <TextField
                              size="small"
                              required
                              id="minSalary"
                              sx={{
                                ml: 1,
                              }}
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
                          <FormControl
                            sx={{
                              ml: { xs: 2, sm: 4 },
                              maxWidth: "23ch",
                              mb: { xs: 2, sm: 0 },
                            }}
                            variant="outlined"
                          >
                            <TextField
                              id="maxSalary"
                              size="small"
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
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Grid container direction="column">
                            <Grid item>
                              <Tooltip title="Please include Responsibilities and Requirements here, where possible.">
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
                                        fontSize:
                                          theme.typography.error.fontSize,
                                      }}
                                    >
                                      Job Description is required!
                                    </Typography>
                                  )}
                                </Box>
                              </Tooltip>
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
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
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

                      <Dialog
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                      >
                        <Grid container direction="column">
                          <Grid item>
                            <Box mt={2} justifyContent="center" display="flex">
                              <DialogTitle>
                                <Typography
                                  variant="h4"
                                  sx={{
                                    fontWeight:
                                      theme.typography.h4.fontWeightBold,
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
                                style={{
                                  marginBottom: "16px",
                                  textAlign: "center",
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight:
                                      theme.typography.h5.fontWeightBold,
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
                                    fontWeight:
                                      theme.typography.p.fontWeightBold,
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
                                    fontWeight:
                                      theme.typography.p.fontWeightBold,
                                  }}
                                >
                                  Location:{" "}
                                </Typography>
                                {fieldValues.location &&
                                fieldValues.location.name
                                  ? fieldValues.location.name
                                  : "Please select a location."}
                              </DialogContentText>

                              <DialogContentText
                                style={{ marginBottom: "16px" }}
                              >
                                <Typography
                                  variant="p"
                                  sx={{
                                    fontWeight:
                                      theme.typography.p.fontWeightBold,
                                  }}
                                >
                                  Category:{" "}
                                </Typography>
                                {fieldValues.jobCategory &&
                                fieldValues.jobCategory.name
                                  ? fieldValues.jobCategory.name
                                  : "Please select a category."}
                              </DialogContentText>
                              <DialogContentText>
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontWeight:
                                        theme.typography.h6.fontWeightBold,
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
                    </Grid>
                  </Dialog>
                </Paper>
              </Box>
            </Grid>
          </Container>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default JobPost;
