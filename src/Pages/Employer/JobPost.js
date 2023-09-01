import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "../../Components/UserContext";
import { theme } from "../../Assets/Styles/Theme";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  // Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { ThemeProvider } from "@emotion/react";

function JobPost() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { currUser, setCurrUser, categories } = useUserContext();
  const [rawMessage, setRawMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [jobInfo, setJobInfo] = useState("");
  const [url, setUrl] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldValues, setFieldValues] = useState({
    jobTitle: "",
    employmentType: "",
    jobCategory: "",
    companyId: "",
    locationId: "",
    jobDescription: "",
  });
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const animatedComponents = makeAnimated();
  const toolbarOptions = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "textAlign",
      "list",
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
    ? { border: "1px solid #FF5733 ", height: "10rem", padding: "1rem" }
    : { border: "1px solid #969696", height: "10rem", padding: "1rem" };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // const locationOptions = [{                            value="Any", label>
  //                             <em>Any</em>
  //                           </MenuItem>
  //                           <MenuItem value="Central">Central</MenuItem>
  //                           <MenuItem value="East">East</MenuItem>
  //                           <MenuItem value="North">North</MenuItem>
  //                           <MenuItem value="North-East">North-East</MenuItem>
  //                           <MenuItem value="West">West</MenuItem>}]

  useEffect(() => {
    console.log("Categories: ", categories);
  }, [categories]);

  useEffect(() => {
    console.log("url: ", url);
  }, [url]);

  useEffect(() => {
    if (jobInfo !== "") {
      handleChange("jobTitle", jobInfo[0].mainTitle);
      console.log("Description is: ", jobInfo[1].description);
      const convertedDescription = stateFromHTML(jobInfo[1].description);
      onEditorStateChange(EditorState.createWithContent(convertedDescription));
    }
  }, [jobInfo]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    console.log("This is editor state line 124: ", newEditorState);
    setRawMessage(
      draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
    );
  };

  const handleEditorStateToMessage = () => {
    handleChange("jobDescription", rawMessage);
    setModalOpen(true);
  };

  const getData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/listings/linkedin`,
        url
      );
      const info = response.data;
      console.log(info);
      if (info !== null) {
        setJobInfo(info);
        setUrl("");
        Swal.fire(
          "Imported!",
          "The job information was successfully imported. Feel free to make some changes before you submit it for approval.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error fetching HTML: ", error);
      Swal.fire(
        "Sorry!",
        "The job information could not be imported. Please check the url is in the correct format. Otherwise, you can also key in the information. ",
        "error"
      );
    }
  };

  const handleChange = (fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    const editorHasText = editorState.getCurrentContent().hasText();
    const newFieldErrors = {};
    Object.keys(fieldValues).forEach((fieldName) => {
      if (fieldValues[fieldName].trim() === "") {
        newFieldErrors[fieldName] = true;
      }
    });
    if (!editorHasText) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    setFieldErrors(newFieldErrors);
    if (newFieldErrors.length > 0) {
      Swal.fire("Ooops!", "You need to fill up the required fields!", "error");
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={theme.customStyles.centered.container}
      pt="15px"
    >
      <ThemeProvider theme={theme}>
        <Box p={5} sx={theme.customStyles.centered.container} padding={4}>
          <Paper elevation={2}>
            <Grid item container xs={12} m={3} justifyContent="center">
              <Box maxWidth="80%">
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
              <Box mt={2} ml={2} mr={2} display="flex" justifyContent="center">
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

            <Box ml={2} mr={2} mt={3}>
              <Grid item xs={12} mb={1}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: theme.typography.h6.fontWeightBold,
                  }}
                >
                  Job Details Import
                </Typography>
              </Grid>
              <Grid item xs={12} mb={1}>
                <div>
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
                </div>
              </Grid>
            </Box>

            <Box
              ml={1}
              mb={3}
              // component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <Grid container>
                <Grid item>
                  <TextField
                    id="search"
                    type="search"
                    label="Linkedin URL"
                    placeholder="Job Post URL"
                    helperText="Optional"
                    value={url.url}
                    size="small"
                    onChange={(e) => setUrl({ url: e.target.value })}
                    onBlur={(e) => setUrl({ url: e.target.value })}
                  />
                </Grid>
                <Grid item alignItems="center" style={{ display: "flex" }}>
                  <div>
                    <Tooltip title="Import via Linkedin Job Post">
                      <IconButton sx={{ p: 0 }} onClick={(e) => getData(e)}>
                        <SearchIcon
                          fontSize="large"
                          sx={{ color: "#FF6B2C" }}
                          alt="Search"
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box ml={1} mr={2} mb={3}>
              <Grid container>
                <Grid item xs={12} mb={2} ml={1}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: theme.typography.h6.fontWeightBold,
                    }}
                  >
                    Job Information
                  </Typography>
                </Grid>

                <Grid item>
                  <Box>
                    <Grid container>
                      <FormControl>
                        <Typography
                          variant="p"
                          sx={{
                            color: theme.typography.p.color,
                          }}
                        >
                          <TextField
                            sx={{ width: "80ch", m: 1 }}
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
                    </Grid>
                    <Box>
                      <Grid container mt={4}>
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
                        <FormControl
                          variant="standard"
                          sx={{ ml: 4, minWidth: 200 }}
                          error={fieldErrors.locationId || false}
                        >
                          <InputLabel id="employmentTypeLabel">
                            Location
                          </InputLabel>
                          <Select
                            labelId="locationIdLabel"
                            label="Location"
                            id="locationId"
                            value={fieldValues.locationId}
                            onChange={(e) =>
                              handleChange(`locationId`, e.target.value)
                            }
                          >
                            <MenuItem value="Any">
                              <em>Any</em>
                            </MenuItem>
                            <MenuItem value="Central">Central</MenuItem>
                            <MenuItem value="East">East</MenuItem>
                            <MenuItem value="North">North</MenuItem>
                            <MenuItem value="North-East">North-East</MenuItem>
                            <MenuItem value="West">West</MenuItem>
                          </Select>
                          <FormHelperText>
                            {fieldErrors.locationId && "Location is required!"}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={categoryOptions}
                      />
                    </Box>
                    <Tooltip title="Please include Responsibilities and Requirements here, where possible.">
                      <div>
                        <Grid container>
                          <Grid item xs={3}></Grid>
                        </Grid>
                        <div style={{ marginTop: "5%", marginLeft: "2%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              color: theme.typography.p.color,
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
                        </div>
                        {descriptionError && (
                          <div>
                            <Typography
                              variant="p"
                              sx={{
                                color: theme.typography.error.color,
                                fontSize: theme.typography.error.fontSize,
                              }}
                            >
                              Job Description is required!
                            </Typography>
                          </div>
                        )}
                        <div style={{ marginTop: "2%" }}>
                          <Stack justifyContent="right" direction="row">
                            <Button
                              classes={{ root: "orange" }}
                              variant="contained"
                              onClick={handleEditorStateToMessage}
                            >
                              submit
                            </Button>
                          </Stack>
                        </div>
                        <Dialog
                          open={modalOpen}
                          onClose={() => setModalOpen(false)}
                        >
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
                          <DialogContent>
                            <DialogContentText>
                              <div>
                                <Typography
                                  variant="p"
                                  sx={{
                                    fontWeight:
                                      theme.typography.p.fontWeightBold,
                                  }}
                                >
                                  Job Title:
                                </Typography>{" "}
                                {fieldValues.jobTitle}
                              </div>
                              <div>
                                <Typography
                                  variant="p"
                                  sx={{
                                    fontWeight:
                                      theme.typography.p.fontWeightBold,
                                  }}
                                >
                                  Employment Type:{" "}
                                </Typography>
                                {fieldValues.employmentType}
                              </div>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: fieldValues.jobDescription,
                                }}
                              />
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => setModalOpen(false)}
                              classes={{ root: "blue" }}
                              variant="contained"
                            >
                              edit
                            </Button>
                            <Button
                              onClick={handleSubmit}
                              classes={{ root: "orange" }}
                              variant="contained"
                            >
                              submit
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {console.log(jobInfo)}
          </Paper>
        </Box>
      </ThemeProvider>
    </Grid>
  );
}

export default JobPost;
