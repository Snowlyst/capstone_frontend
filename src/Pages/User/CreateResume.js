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
  // States for the Experience
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
  const [savedFieldValues, setSavedFieldValues] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  // States for education
  const [educationFields, setEducationFields] = useState([]);
  const [eduFieldValues, setEduFieldValues] = useState({
    university: "",
    graduationDate: "",
    qualification: "",
    universityLocation: "",
    fieldOfStudy: "",
    major: "",
    grade: "",
    awards: "",
  });
  const [eduFieldErrors, setEduFieldErrors] = useState({});
  const [eduEditingIndex, setEduEditingIndex] = useState(null);
  const [eduFieldsVisible, setEduFieldsVisible] = useState(false);
  // Logic for experience
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
    setSelectedOption(selectedOption);
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

  const handleSaveExperience = () => {
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
      // Check if we are editing an existing entry
      if (editingIndex !== null) {
        // Update the existing entry at the specified index
        const updatedSavedFieldValues = [...savedFieldValues];
        updatedSavedFieldValues[editingIndex] = fieldValues;
        setSavedFieldValues(updatedSavedFieldValues);
        setEditingIndex(null); // Exit edit mode
      } else {
        // Append the new entry to the array if not editing
        setSavedFieldValues([...savedFieldValues, fieldValues]);
      }

      // Reset form fields and show saved values
      setExperienceFormFieldVisible(false);
      setShowSavedValues(true);
    }
  };
  useEffect(() => {
    console.log("Save button clicked");
    console.log(showSavedValues);
  }, [showSavedValues]);

  const resetFormFields = (index) => {
    const entry = savedFieldValues[index];
    setFieldValues({
      positionTitle: entry.positionTitle,
      companyName: entry.companyName,
      joinedDate: entry.joinedDate,
      leftDate: entry.leftDate,
      specialization: entry.specialization,
      role: entry.role,
      country: entry.country,
      industry: entry.industry,
      positionLevel: entry.positionLevel,
      monthlySalary: entry.monthlySalary,
      experienceSummary: entry.experienceSummary,
    });
  };
  console.log(savedFieldValues);
  // Logic for education .
  const handleSaveEducation = () => {
    const newEduFieldErrors = eduValidateFields(eduFieldValues);

    if (Object.keys(newEduFieldErrors).length > 0) {
      // Display validation errors
      setEduFieldErrors(newEduFieldErrors);
    } else {
      if (eduEditingIndex !== null) {
        // Update the existing education entry
        const updatedEducationFields = [...educationFields];
        updatedEducationFields[eduEditingIndex] = eduFieldValues;
        setEducationFields(updatedEducationFields);
        setEduEditingIndex(null);
      } else {
        // Save the new education entry
        setEducationFields([...educationFields, eduFieldValues]);
      }

      // Clear the form fields
      setEduFieldValues({
        university: "",
        graduationDate: "",
        qualification: "",
        universityLocation: "",
        fieldOfStudy: "",
        major: "",
        grade: "",
        awards: "",
      });

      // Clear field errors
      setEduFieldErrors({});
      setEduFieldsVisible(false);
    }
  };
  const eduValidateFields = (fields) => {
    const eduErrors = {};

    // Add validation logic for each field here
    if (fields.university.trim() === "") {
      eduErrors.university = "Institute/University is required";
    }
    if (fields.graduationDate.trim() === "") {
      eduErrors.graduationDate = "Graduation Date is required";
    }

    if (fields.qualification.trim() === "") {
      eduErrors.qualification = "Qualification is required";
    }

    if (fields.universityLocation.trim() === "") {
      eduErrors.universityLocation =
        "Institute/University Location is required";
    }

    if (fields.fieldOfStudy.trim() === "") {
      eduErrors.fieldOfStudy = "Field of Study is required";
    }

    if (fields.major.trim() === "") {
      eduErrors.major = "Major is required";
    }

    if (fields.grade.trim() === "") {
      eduErrors.grade = "Grade is required";
    }

    if (fields.awards.trim() === "") {
      eduErrors.awards = "Awards is required";
    }
    // Add similar validations for other fields

    return eduErrors;
  };
  const resetEduFormFields = () => {
    setFieldValues({
      university: "",
      graduationDate: "",
      qualification: "",
      universityLocation: "",
      fieldOfStudy: "",
      major: "",
      grade: "",
      awards: "",
    });
    setEduFieldErrors({});
    setEduEditingIndex(null);
  };
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
                        classes={{ root: "orange" }}
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
                              classes={{ root: "orange" }}
                              onClick={handleSaveExperience}
                               sx={{ marginRight: '8px' }} 
                            >
                              Save
                            </Button>
                            <Button
                              classes={{ root: "orange" }}
                              onClick={() => {
                                
                                setExperienceFormFieldVisible(false);
                              }}
                            >
                              Cancel
                            </Button>
                          </form>
                        </div>
                      )}
                    {showSavedValues && (
                      <div>
                        {/* Your saved values */}
                        <Typography variant="h6">Saved Experience:</Typography>
                        {savedFieldValues.map((savedValues, index) => (
                          <div key={index}>
                            <Typography variant="p">
                              Position Title: {savedValues.positionTitle}
                              <br />
                              Company Name: {savedValues.companyName}
                              <br />
                              Joined Date: {savedValues.joinedDate}
                              <br />
                              Left Date: {savedValues.leftDate}
                              <br />
                              Specialization: {savedValues.specialization}
                              <br />
                              Role: {savedValues.role}
                              <br />
                              Country: {savedValues.country}
                              <br />
                              Industry: {savedValues.industry}
                              <br />
                              Position Level: {savedValues.positionLevel}
                              <br />
                              Monthly Salary: {savedValues.monthlySalary}
                              <br />
                              Experience Summary:{" "}
                              {savedValues.experienceSummary}
                            </Typography>
                            <br />
                            <Button
                              variant="contained"
                              classes={{ root: "orange" }}
                              onClick={() => {
                                resetFormFields(index);
                                setEditingIndex(index);
                                setExperienceFormFieldVisible(true);
                                setShowSavedValues(false);
                              }}
                              style={{ marginRight: "10px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              classes={{ root: "orange" }}
                              onClick={() => {
                                resetFormFields(index);
                                setExperienceFormFieldVisible(true);
                                setShowSavedValues(false);
                              }}
                            >
                              Add Experience
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedContent === "Education" && (
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      // Handle adding new education
                      setEduFieldsVisible(true);
                      setEduFieldValues({}); // Clear the fields for a new entry
                      setEduEditingIndex(null); // Reset the editing index for adding
                    }}
                    classes={{ root: "orange" }}
                  >
                    Add Education
                  </Button>
                  {educationFields.map((education, index) => (
                    <div key={index}>
                      <Typography variant="subtitle1">
                        Institute/University: {education.university}
                      </Typography>
                      <Typography variant="subtitle1">
                        Graduation Date: {education.graduationDate}
                      </Typography>
                      <Typography variant="subtitle1">
                        Qualification: {education.qualification}
                      </Typography>
                      <Typography variant="subtitle1">
                        Institute/University Location:
                        {education.universityLocation}
                      </Typography>
                      <Typography variant="subtitle1">
                        Field of Study: {education.fieldOfStudy}
                      </Typography>
                      <Typography variant="subtitle1">
                        Major: {education.major}
                      </Typography>
                      <Typography variant="subtitle1">
                        Grade: {education.grade}
                      </Typography>
                      <Typography variant="subtitle1">
                        Awards: {education.awards}
                      </Typography>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={() => {
                          setEduFieldsVisible(true);
                          setEduFieldValues(education);
                          setEduEditingIndex(index);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                  <Divider sx={{ margin: "20px 0" }} />
                  {eduFieldsVisible && (
                    <div>
                      <TextField
                        label="Institute/University"
                        value={eduFieldValues.university}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            university: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.university}
                        helperText={eduFieldErrors.university}
                      />
                      <TextField
                        label="Graduation Date"
                        value={eduFieldValues.graduationDate}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            graduationDate: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        error={!!eduFieldErrors.graduationDate}
                        helperText={eduFieldErrors.graduationDate}
                      />
                      <TextField
                        label="Qualification"
                        value={eduFieldValues.qualification}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            qualification: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.qualification}
                        helperText={eduFieldErrors.qualification}
                      />
                      <TextField
                        label="Institute/University Location"
                        value={eduFieldValues.universityLocation}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            universityLocation: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.universityLocation}
                        helperText={eduFieldErrors.universityLocation}
                      />
                      <TextField
                        label="Field of Study"
                        value={eduFieldValues.fieldOfStudy}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            fieldOfStudy: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        error={!!eduFieldErrors.fieldOfStudy}
                        helperText={eduFieldErrors.fieldOfStudy}
                      />
                      <TextField
                        label="Major"
                        value={eduFieldValues.major}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            major: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.major}
                        helperText={eduFieldErrors.major}
                      />
                      <TextField
                        label="Grade"
                        value={eduFieldValues.grade}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            grade: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.grade}
                        helperText={eduFieldErrors.grade}
                      />
                      <TextField
                        label="Awards"
                        value={eduFieldValues.awards}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            awards: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.awards}
                        helperText={eduFieldErrors.awards}
                      />
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={() => {
                          handleSaveEducation();
                          setEduFieldsVisible(false);
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        classes={{ root: "orange" }}
                        onClick={() => {
                          resetEduFormFields();
                          setEduFieldsVisible(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
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
