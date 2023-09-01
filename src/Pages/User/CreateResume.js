import { useState, useEffect } from "react";
import {
  ThemeProvider,
  Box,
  Divider,
  Typography,
  Grid,
  Button,
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
  TextField,
  Checkbox,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import Swal from "sweetalert2";
function CreateResume() {
  // All the states
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [radioCollapsed, setRadioCollapsed] = useState(false);
  const [experienceStatementVisible, setExperienceStatementVisible] =
    useState(false);
  const [experienceStatement, setExperienceStatement] = useState("");
  const [experienceFormFieldVisible, setExperienceFormFieldVisible] =
    useState(false);
  const [isLeftDateDisabled, setIsLeftDateDisabled] = useState(false);
  const [showSavedValues, setShowSavedValues] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldValues, setFieldValues] = useState({
    positionTitle: "",
    companyName: "",
    joinedDate: "",
    leftDate: "",
    specialization: "",
    role: "",
    country: "",
    industry: "",
    positionLevel: "",
    monthlySalary: "",
    experienceSummary: "",
  });
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
  const user = {
    name: "John Doe",
    avatarUrl: "path-to-avatar-image.jpg",
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOptionSaveClick = () => {
    console.log("Selected option:", selectedOption);
    console.log("Year value:", yearValue);
    setRadioCollapsed(!radioCollapsed);
    setExperienceStatementVisible(true);
    setExperienceStatement(`Experience Level: ${selectedOption}`);
    setExperienceFormFieldVisible(true);
  };
  console.log(experienceStatement);
  const handleYearInputChange = (event) => {
    const newYearValue = event.target.value;
    setYearValue(newYearValue);
    console.log(newYearValue);
    setSelectedOption(`I have been working since ${newYearValue}`);
  };

  const handleExperienceChange = (fieldName, value) => {
    if (fieldName === "leftDate" && isLeftDateDisabled) {
      setFieldValues((prevValues) => ({
        ...prevValues,
        leftDate: "Present",
      }));
    } else {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    }
  };

  const handleSaveExperience = (e) => {
    //e.preventDefault();
    const newFieldErrors = {};
    Object.keys(fieldValues).forEach((fieldName) => {
      if (fieldValues[fieldName].trim() === "") {
        newFieldErrors[fieldName] = true;
      }
    });
    setFieldErrors(newFieldErrors);
    if (Object.keys(newFieldErrors).length > 0) {
      Swal.fire("Ooops!", "You need to fill up the required fields!", "error");
    } else {
      console.log(fieldValues);
      setExperienceFormFieldVisible(false);
      setShowSavedValues(true);
       
    }
  };
  useEffect(() => {
    console.log("Save button clicked");
    console.log(showSavedValues);
  }, [showSavedValues]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: theme.typography.h3.fontWeightBold,
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Create a Resume
        </Typography>
        <Box
          display="flex"
          justifyContent="center" // Center the content horizontally
          alignItems="flex-start" // Center the content vertically
          minHeight="50vh" // Make sure the content occupies at least the full viewport height
          width="100%" // Make sure the content occupies the full width of the viewport
        >
          <Box
            display="flex"
            justifyContent="center" // Center the content horizontally within the main box
            width="70%" // Adjust the width of the main content
            p={0} // Add some padding for spacing
          >
            {/* Left Panel: Headings */}
            <Box width="30%" padding="10px" marginRight="-15%">
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                sx={{ width: 80, height: 80, marginBottom: 0 }}
              />
              <Typography variant="h6" gutterBottom>
                {user.name}
              </Typography>
              <Button variant="outlined" color="primary">
                View Profile
              </Button>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {headings.map((heading) => (
                  <li
                    key={heading}
                    style={{
                      cursor: "pointer",
                      marginBottom: "10px",
                      fontWeight:
                        selectedContent === heading ? "bold" : "normal",
                    }}
                    onClick={() => handleContentClick(heading)}
                  >
                    {heading}
                  </li>
                ))}
              </ul>
            </Box>

            {/* Right Panel: Content */}
            <Box width="70%" padding="100px">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.h6.fontWeightBold,
                  whiteSpace: "nowrap",
                  fontsize: "10px",
                }}
              >
                Fill in the fields to create a resume. To upload a resume, check
                {"\n"}
                <Typography
                  variant="button"
                  sx={{ cursor: "pointer", textTransform: "lowercase" }}
                  color="#FF682C"
                  fontSize="16px"
                >
                  here
                </Typography>
              </Typography>
              <br />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.h6.fontWeightBold,
                  whiteSpace: "nowrap",
                  fontsize: "8px",
                  marginLeft: "10px",
                }}
              >
                Resume Status:
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontWeight: theme.typography.p.fontWeightBold,
                  whiteSpace: "nowrap",
                  fontSize: "15px",
                  marginLeft: "10px",
                }}
              >
                Your current resume has not been updated since (Year). To apply
                for jobs, please ensure that your resume is up-to-date. If your
                resume since the last update, click {"\n"}
                <Typography
                  variant="button"
                  sx={{ cursor: "pointer", textTransform: "lowercase" }}
                  color="#FF682C"
                  fontSize="10px"
                >
                  here
                </Typography>
              </Typography>
              <br />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.h6.fontWeightBold,
                }}
                mb={3}
              >
                {selectedContent || "Select a section from the left"}
              </Typography>

              {selectedContent === "Experience" && (
                <div>
                  <div>
                    {!radioCollapsed && (
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: "12px",
                          fontSize: "12px",
                        }}
                      >
                        Select your work experience:
                      </Typography>
                    )}
                    {!radioCollapsed && (
                      <RadioGroup
                        value={selectedOption}
                        onChange={handleOptionChange}
                        sx={{ fontSize: "8px", flexDirection: "column" }}
                      >
                        <FormControlLabel
                          value="I have been working since"
                          control={<Radio sx={{ fontSize: "8px" }} />}
                          label={
                            <>
                              I have been working since
                              <Input
                                value={yearValue}
                                onChange={handleYearInputChange}
                                size="small"
                              />
                            </>
                          }
                        />
                        <FormControlLabel
                          value="I have no work experience"
                          control={<Radio sx={{ fontSize: "8px" }} />}
                          label="I have no work experience"
                        />
                        <FormControlLabel
                          value="I am a fresh graduate seeking my first job"
                          control={<Radio sx={{ fontSize: "8px" }} />}
                          label="I am a fresh graduate seeking my first job"
                        />
                        <FormControlLabel
                          value="I am a student seeking internship or part-time jobs"
                          control={<Radio sx={{ fontSize: "8px" }} />}
                          label="I am a student seeking internship or part-time jobs"
                        />
                      </RadioGroup>
                    )}
                    {!radioCollapsed && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOptionSaveClick}
                      >
                        Save
                      </Button>
                    )}
                    {/* Statement reflecting the experience level */}
                    {experienceStatementVisible && (
                      <Typography variant="p" sx={{ marginTop: "5px" }}>
                        {selectedOption && (
                          <Typography
                            variant="p"
                            sx={{
                              marginTop: "6px",
                              fontSize: "14px",
                              color: "#0E0140",
                            }}
                          >
                            Experience Level:
                            {(() => {
                              switch (selectedOption) {
                                case "I have been working since":
                                  return `You have been working since ${yearValue}`;
                                case "I have no work experience":
                                  return "You have no work experience";
                                case "I am a fresh graduate seeking my first job":
                                  return "You are a fresh graduate seeking your first job";
                                case "I am a student seeking internship or part-time jobs":
                                  return "You are a student seeking internship or part-time jobs";
                                default:
                                  return "";
                              }
                            })()}
                          </Typography>
                        )}
                      </Typography>
                    )}
                  </div>
                  <div>
                    {experienceFormFieldVisible &&
                      selectedOption !== "I have no work experience" && (
                        <div>
                          <Divider sx={{ margin: "24px 0" }} />

                          <form>
                            <TextField
                              label="Position Title"
                              id="positionTitle"
                              value={fieldValues.positionTitle}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "positionTitle",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.positionTitle || false}
                              helperText={
                                fieldErrors.positionTitle &&
                                "Position Title is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Company Name"
                              id="companyName"
                              value={fieldValues.companyName}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "companyName",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.companyName || false}
                              helperText={
                                fieldErrors.companyName &&
                                "Company Name is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Joined Date"
                              id="joinedDate"
                              value={fieldValues.joinedDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "joinedDate",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.joinedDate || false}
                              helperText={
                                fieldErrors.joinedDate &&
                                "Joined Date is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id="present"
                                  checked={isLeftDateDisabled}
                                  onChange={(e) => {
                                    setIsLeftDateDisabled(e.target.checked);
                                    if (e.target.checked) {
                                      handleExperienceChange(
                                        "leftDate",
                                        "Present"
                                      );
                                    } else {
                                      handleExperienceChange("leftDate", "");
                                    }
                                  }}
                                />
                              }
                              label="Present"
                            />
                            <TextField
                              label="Left Date"
                              id="leftDate"
                              value={fieldValues.leftDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "leftDate",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.leftDate || false}
                              helperText={
                                fieldErrors.leftDate && "LeftDate is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                              disabled={isLeftDateDisabled}
                            />
                            <TextField
                              label="Specialization"
                              id="specialization"
                              value={fieldValues.specialization}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "specialization",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.specialization || false}
                              helperText={
                                fieldErrors.specialization &&
                                "Specialization is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Role"
                              id="role"
                              value={fieldValues.role}
                              onChange={(e) =>
                                handleExperienceChange("role", e.target.value)
                              }
                              error={fieldErrors.role || false}
                              helperText={
                                fieldErrors.role && "Role is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Country"
                              id="country"
                              value={fieldValues.country}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "country",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.country || false}
                              helperText={
                                fieldErrors.country && "Country is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Industry"
                              id="industry"
                              value={fieldValues.industry}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "industry",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.industry || false}
                              helperText={
                                fieldErrors.industry && "Industry is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Position Level"
                              id="positionLevel"
                              value={fieldValues.positionLevel}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "positionLevel",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.positionLevel || false}
                              helperText={
                                fieldErrors.positionLevel &&
                                "Positon Level is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Monthly Salary"
                              id="monthlySalary"
                              value={fieldValues.monthlySalary}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "monthlySalary",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.monthlySalary || false}
                              helperText={
                                fieldErrors.monthlySalary &&
                                "Salary is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                            />
                            <TextField
                              label="Experience Summary"
                              id="experienceSummary"
                              value={fieldValues.experienceSummary}
                              onChange={(e) =>
                                handleExperienceChange(
                                  "experienceSummary",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.experienceSummary || false}
                              helperText={
                                fieldErrors.experienceSummary &&
                                "Experience Summary is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                              multiline
                              rows={5}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSaveExperience}
                            >
                              Save
                            </Button>
                          </form>
                        </div>
                      )}
                    {showSavedValues && (
                      <div>
                        {/* Your saved values */}
                        <Typography variant="h6">Saved Experience:</Typography>
                        <Typography variant="p">
                          Position Title: {fieldValues.positionTitle}
                          <br />
                          Company Name: {fieldValues.companyName}
                          <br />
                          Joined Date: {fieldValues.joinedDate}
                          <br />
                          Left Date: {fieldValues.leftDate}
                          <br />
                          Specialization: {fieldValues.specialization}
                          <br />
                          Role: {fieldValues.role}
                          <br />
                          Country: {fieldValues.country}
                          <br />
                          Industry: {fieldValues.industry}
                          <br />
                          Position Level: {fieldValues.positonLevel}
                          <br />
                          Monthly Salary: {fieldValues.monthlySalary}
                          <br />
                          Experience Summary: {fieldValues.experienceSummary}
                        </Typography>
                        <br/>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setExperienceFormFieldVisible(true);
                            setShowSavedValues(false);
                            
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedContent === "Education" && <div>Education Content</div>}
              {selectedContent === "Skills" && <div>Skills Content</div>}
              {selectedContent === "Languages" && <div>Languages Content</div>}
              {selectedContent === "Additional Info" && (
                <div>Additional Info Content</div>
              )}
              {selectedContent === "About me" && <div>About me Content</div>}
              {selectedContent === "Privacy Setting(?)" && (
                <div>Privacy Setting(?) Content</div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateResume;
