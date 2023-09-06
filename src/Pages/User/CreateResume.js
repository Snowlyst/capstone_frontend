import { useState, useEffect } from "react";
import {
  ThemeProvider,
  Box,
  Divider,
  Typography,
  Button,
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
  TextField,
  Checkbox,
  IconButton,
  FormControl,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import Swal from "sweetalert2";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useUserContext } from "../../Components/UserContext";
function CreateResume() {
  // All the states
  const { currUser, setCurrUser } = useUserContext();
  const [id, setId] = useState("");
  useEffect(() => {
    if (currUser) {
      console.log(currUser.id);
      setId(currUser.id);
    }
  }, [currUser]);

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
    startPeriod: "",
    endPeriod: "",
    specialization: "",
    role: "",
    country: "",
    industry: "",
    positionLevel: "",
    monthlySalary: "",
    executiveSummary: "",
  });
  const [savedFieldValues, setSavedFieldValues] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [databaseExperiences, setDatabaseExperiences] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [databaseExperienceIds, setDatabaseExperienceIds] = useState([]);
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
  // State for Skills
  const [skillFields, setSkillFields] = useState([]);
  const [skillFieldValues, setSkillFieldValues] = useState({
    skillName: "",
    proficiencyLevel: "",
  });
  const [skillFieldErrors, setSkillFieldErrors] = useState({});
  const [skillEditingIndex, setSkillEditingIndex] = useState(null);
  const [skillFormVisible, setSkillFormVisible] = useState(false);
  // State for language

  const [languageFields, setLanguageFields] = useState([]);
  const [languageFormVisible, setLanguageFormVisible] = useState(false);
  const [languageFieldValues, setLanguageFieldValues] = useState({
    languageName: "",
    proficiencySpoken: "",
    proficiencyWritten: "",
    isPrimary: false,
  });
  const [languageFieldErrors, setLanguageFieldErrors] = useState({});
  const [languageEditingIndex, setLanguageEditingIndex] = useState(null);
  // State for Additional Information
  const [additionalInfo, setAdditionalInfo] = useState({
    expectedSalary: "",
    preferredLocation: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(true);
  const [additionalInfoErrors, setAdditionalInfoErrors] = useState({});
  // State for about me.
  const [aboutMe, setAboutMe] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    postalCode: "",
    unitNumber: "",
    dateOfBirth: "",
    nationality: "",
  });

  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeErrors, setAboutMeErrors] = useState({});
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [displayedAddress, setDisplayedAddress] = useState([]);
  // State for privacy setting
  const [privacySetting, setPrivacySetting] = useState("searchable");
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);

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
  const handleEditOptionClick = () => {
    setRadioCollapsed(false);
    setExperienceStatement(false);
  };

  const handleExperienceChange = (fieldName, value) => {
    if (fieldName === "endPeriod" && isLeftDateDisabled) {
      setFieldValues((prevValues) => ({
        ...prevValues,
        endPeriod: "Present",
      }));
    } else {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    }
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/createresume/experience/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("Experience Database ID:", entry.id);
            setDatabaseExperienceIds(entry.id)
            const experiences = response.data.output;
            setDatabaseExperiences(experiences, databaseExperienceIds);
            console.log(databaseExperienceIds)
          });
        })
        .catch((error) => {
          console.error("Error with GET request:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    const combinedExperiences = [...savedFieldValues, ...databaseExperiences];
    setAllExperiences(combinedExperiences);
  }, [savedFieldValues, databaseExperiences]);

  useEffect(() => {
    console.log(allExperiences);
    console.log(editingIndex);
    console.log(fieldValues);
  }, [allExperiences, editingIndex, fieldValues]);

  const handleSaveExperience = () => {
    const newFieldErrors = Object.keys(fieldValues).reduce(
      (errors, fieldName) => {
        if (fieldValues[fieldName].trim() === "") {
          errors[fieldName] = true;
        }
        return errors;
      },
      {}
    );

    setFieldErrors(newFieldErrors);

    if (Object.keys(newFieldErrors).length > 0) {
      Swal.fire("Ooops!", "You need to fill up the required fields!", "error");
    } else {
      const updatedSavedFieldValues = [...savedFieldValues];
      if (editingIndex !== null) {
        updatedSavedFieldValues[editingIndex] = fieldValues;
        setEditingIndex(null);
      } else {
        updatedSavedFieldValues.push(fieldValues);
      }
      setSavedFieldValues(updatedSavedFieldValues);
      setExperienceFormFieldVisible(false);
      setShowSavedValues(true);
      if (!fieldValues.id) {
        axios
          .post(`http://localhost:8080/createresume/experience/${id}`, {
            userId: id,
            ...fieldValues,
          })
          .then((response) => {
            const entryId = response.data.id;
            console.log("Data successfully saved, ID:", entryId);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
          });
      } else {
        axios
          .put(`http://localhost:8080/createresume/experience/databaseId`, {
            ...fieldValues,
          })
          .then(() => {
            console.log("Data successfully updated, ID:", fieldValues.id);
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      }
    }
  };
  // Nested if statement for the put request if it there is edit index fire a put
  const handleCancelExperience = () => {
    setExperienceFormFieldVisible(false);
    setShowSavedValues(true);
  };

  useEffect(() => {
    console.log("Save button clicked");
    console.log(showSavedValues);
  }, [showSavedValues]);

  const resetFormFields = (entry) => {
    const defaultValues = {
      positionTitle: "",
      companyName: "",
      startPeriod: "",
      endPeriod: "",
      specialization: "",
      role: "",
      country: "",
      industry: "",
      positionLevel: "",
      monthlySalary: "",
      executiveSummary: "",
    };

    if (entry) {
      setFieldValues({
        ...defaultValues,
        ...entry,
      });
    } else {
      setFieldValues(defaultValues);
    }
  };

  console.log(savedFieldValues);

  const handleDeleteExperience = (index) => {
    const updatedSavedFieldValues = [...savedFieldValues];
    updatedSavedFieldValues.splice(index, 1);
    setSavedFieldValues(updatedSavedFieldValues);
  };

  // Logic for education .
  const handleSaveEducation = () => {
    const newEduFieldErrors = eduValidateFields(eduFieldValues);

    if (Object.keys(newEduFieldErrors).length > 0) {
      setEduFieldErrors(newEduFieldErrors);
    } else {
      if (eduEditingIndex !== null) {
        const updatedEducationFields = [...educationFields];
        updatedEducationFields[eduEditingIndex] = eduFieldValues;
        setEducationFields(updatedEducationFields);
        setEduEditingIndex(null);
      } else {
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

      setEduFieldErrors({});
      setEduFieldsVisible(false);
    }
  };
  const eduValidateFields = (fields) => {
    const requiredFields = [
      "university",
      "graduationDate",
      "qualification",
      "universityLocation",
      "fieldOfStudy",
      "major",
      "grade",
      "awards",
    ];

    const eduErrors = {};

    requiredFields.forEach((fieldName) => {
      if (fields[fieldName].trim() === "") {
        eduErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
      }
    });

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
  console.log("Education info Array", educationFields);
  const handleDeleteEducation = (indexToDelete) => {
    const updatedEducationFields = [...educationFields];

    updatedEducationFields.splice(indexToDelete, 1);

    setEducationFields(updatedEducationFields);
  };

  //Logic for Skills
  const handleSaveSkill = () => {
    const newSkillFieldErrors = validateSkillFields(skillFieldValues);

    if (Object.keys(newSkillFieldErrors).length > 0) {
      setSkillFieldErrors(newSkillFieldErrors);
    } else {
      if (skillEditingIndex !== null) {
        const updatedSkills = [...skillFields];
        updatedSkills[skillEditingIndex] = skillFieldValues;
        setSkillFields(updatedSkills);
        setSkillEditingIndex(null);
      } else {
        setSkillFields([...skillFields, skillFieldValues]);
      }

      // Clear the form fields
      setSkillFieldValues({ skillName: "", proficiencyLevel: "" });
      setSkillFieldErrors({});
      setSkillFormVisible(false);
    }
  };

  const validateSkillFields = (fields) => {
    const errors = {};

    if (fields.skillName.trim() === "") {
      errors.skillName = "Skill Name is required";
    }

    if (fields.proficiencyLevel.trim() === "") {
      errors.proficiencyLevel = "Proficiency Level is required";
    }

    return errors;
  };
  const handleDeleteSkill = (index) => {
    const updatedSkillFields = [...skillFields];

    updatedSkillFields.splice(index, 1);

    setSkillFields(updatedSkillFields);
  };

  // Logic for lanaguage
  const handleSaveLanguage = () => {
    const newLanguageFieldErrors = validateLanguageFields(languageFieldValues);

    if (Object.keys(newLanguageFieldErrors).length > 0) {
      setLanguageFieldErrors(newLanguageFieldErrors);
    } else {
      if (languageEditingIndex !== null) {
        const updatedLanguages = [...languageFields];
        updatedLanguages[languageEditingIndex] = languageFieldValues;
        setLanguageFields(updatedLanguages);
        setLanguageEditingIndex(null);
      } else {
        setLanguageFields([...languageFields, languageFieldValues]);
      }
      setLanguageFieldValues({
        languageName: "",
        proficiencySpoken: "",
        proficiencyWritten: "",
        isPrimary: false,
      });
      setLanguageFieldErrors({});
      setLanguageFormVisible(false);
    }
  };

  const validateLanguageFields = (fields) => {
    const errors = {};

    if (fields.languageName.trim() === "") {
      errors.languageName = "Language Name is required";
    }

    if (fields.proficiencySpoken.trim() === "") {
      errors.proficiencySpoken = "Proficiency (Spoken) is required";
    }

    if (fields.proficiencyWritten.trim() === "") {
      errors.proficiencyWritten = "Proficiency (Written) is required";
    }

    return errors;
  };
  const handleDeleteLanguage = (indexToDelete) => {
    const updatedLanguageFields = [...languageFields];

    updatedLanguageFields.splice(indexToDelete, 1);

    setLanguageFields(updatedLanguageFields);
  };

  // Logic for additional Information
  const handleAdditionalInfoEditClick = () => {
    setIsEditing(false);
  };

  const handleAdditionInfoSaveClick = () => {
    console.log("Save button clicked");
    const newAdditionalInfoErrors =
      validateAdditionalInfoFields(additionalInfo);

    if (additionalInfo.expectedSalary.trim() === "") {
      newAdditionalInfoErrors.expectedSalary =
        "Expected Monthly Salary is required";
    } else {
      const expectedSalary = parseInt(additionalInfo.expectedSalary, 10);
      if (isNaN(expectedSalary) || !Number.isInteger(expectedSalary)) {
        newAdditionalInfoErrors.expectedSalary =
          "Expected Monthly Salary must be a valid integer";
      } else {
        setAdditionalInfo({
          ...additionalInfo,
          expectedSalary: expectedSalary.toString(),
        });
      }
    }

    if (Object.keys(newAdditionalInfoErrors).length === 0) {
      setIsEditing(true);
      setAdditionalInfoErrors({});
    } else {
      setAdditionalInfoErrors(newAdditionalInfoErrors);
    }
    console.log("newAdditionalInfoErrors:", newAdditionalInfoErrors);
  };
  const validateAdditionalInfoFields = (fields) => {
    const errors = {};
    if (fields.preferredLocation.trim() === "") {
      errors.preferredLocation = "Preferred Work Location is required";
    }
    return errors;
  };
  const handleDeleteAdditionalInfo = () => {
    setAdditionalInfo({
      expectedSalary: "",
      preferredLocation: "",
    });

    setIsAdditionalInfoVisible(true);
  };

  // Logic for About me
  const handleAboutMeEditClick = () => {
    setIsEditingAboutMe(false);
  };

  const handleAboutMeSaveClick = () => {
    const newAboutMeErrors = validateAboutMeFields(aboutMe);
    console.log("Saving About Me:", aboutMe);
    if (Object.keys(newAboutMeErrors).length === 0) {
      setIsEditingAboutMe(true);
      setAboutMe((prevAboutMe) => ({
        ...prevAboutMe,
        address: address || prevAboutMe.address,
      }));
      setAboutMeErrors({});
    } else {
      setAboutMeErrors(newAboutMeErrors);
      console.log("Validation errors:", newAboutMeErrors);
    }
  };

  const handleAboutMeCancelClick = () => {
    setIsEditingAboutMe(false);
  };

  const validateAboutMeFields = (fields) => {
    const errors = {};

    if (fields.name.trim() === "") {
      errors.name = "Name is required";
    }

    if (fields.contactNumber.trim() === "") {
      errors.contactNumber = "Contact number is required";
    } else if (!/^\d+$/.test(fields.contactNumber.trim())) {
      errors.contactNumber = "Contact number must be numeric";
    }

    if (fields.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(fields.email.trim())) {
      errors.email = "Invalid email address";
    }

    if (fields.address.trim() === "" && !address) {
      errors.address = "Address is required";
    }

    if (fields.postalCode.trim() === "") {
      errors.postalCode = "Postal code is required";
    } else if (!/^\d+$/.test(fields.postalCode.trim())) {
      errors.postalCode = "Postal code must be numeric";
    }
    if (fields.unitNumber.trim() === "") {
      errors.unitNumber = "Unit Number is required";
    }
    if (fields.dateOfBirth.trim() === "") {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (fields.nationality.trim() === "") {
      errors.nationality = "Nationality is required";
    }

    return errors;
  };
  const handleDeleteAboutMe = () => {
    setIsEditingAboutMe(true);
    setAboutMe({
      name: "",
      contactNumber: "",
      email: "",
      address: "",
      postalCode: "",
      unitNumber: "",
      dateOfBirth: "",
      nationality: "",
    });
  };
  const handleSearchPostal = (e) => {
    //e.preventDefault();
    const searchQuery = aboutMe.postalCode;
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
  console.log(address);

  const handleSearchClick = () => {
    handleSearchPostal(postalCode);
  };

  // Logic for privacy details
  const handlePrivacyEditClick = () => {
    setIsEditingPrivacy(false);
  };

  const handlePrivacySaveClick = () => {
    setIsEditingPrivacy(true);
  };

  const handlePrivacyCancelClick = () => {
    setIsEditingPrivacy(false);
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
          justifyContent="center"
          alignItems="flex-start"
          minHeight="50vh"
          width="100%"
        >
          <Box display="flex" justifyContent="center" width="70%" p={0}>
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
                            {radioCollapsed &&
                              experienceStatementVisible && ( // Display "Edit" button if not collapsed
                                <Button
                                  variant="contained"
                                  classes={{ root: "orange" }}
                                  onClick={() => {
                                    setExperienceStatementVisible(false);
                                    handleEditOptionClick();
                                  }}
                                  sx={{ marginLeft: "8px" }}
                                >
                                  Edit
                                </Button>
                              )}
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].positionTitle
                                  || "" : fieldValues.positionTitle || ""
                              }
                              onChange={(e) => {
                                handleExperienceChange(
                                  "positionTitle",
                                  e.target.value
                                );
                              }}
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].companyName
                                  || "" : fieldValues.companyName || ""
                              }
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
                              label="Start Period"
                              id="startPeriod"
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].startPeriod
                                 || "" : fieldValues.startPeriod || ""
                              }
                              onChange={(e) =>
                                handleExperienceChange(
                                  "startPeriod",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.startPeriod || false}
                              helperText={
                                fieldErrors.startPeriod &&
                                "Start Date is required!"
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
                                        "endPeriod",
                                        "Present"
                                      );
                                    } else {
                                      handleExperienceChange("endPeriod", "");
                                    }
                                  }}
                                />
                              }
                              label="Present"
                            />
                            <TextField
                              label="End Period"
                              id="endPeriod"
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].endPeriod
                                  || "": fieldValues.endPeriod || ""
                              }
                              onChange={(e) =>
                                handleExperienceChange(
                                  "endPeriod",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.endPeriod || false}
                              helperText={
                                fieldErrors.endPeriod &&
                                "End Period is required!"
                              }
                              fullWidth
                              size="small"
                              style={{ marginBottom: "12px" }}
                              disabled={isLeftDateDisabled}
                            />
                            <TextField
                              label="Specialization"
                              id="specialization"
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].specialization
                                 || ""  : fieldValues.specialization || ""
                              }
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].role
                                || ""  : fieldValues.role || ""
                              }
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].country
                                || ""  : fieldValues.country || ""
                              }
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].industry
                                 || "" : fieldValues.industry || ""
                              }
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].positionLevel
                                  : fieldValues.positionLevel || ""
                              }
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
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex].monthlySalary || ""
                                  : fieldValues.monthlySalary || ""
                              }
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
                              label="Executive Summary"
                              id="executiveSummary"
                              value={
                                editingIndex !== null
                                  ? allExperiences[editingIndex]
                                      .executiveSummary
                                  : fieldValues.executiveSummary || ""
                              }
                              onChange={(e) =>
                                handleExperienceChange(
                                  "executiveSummary",
                                  e.target.value
                                )
                              }
                              error={fieldErrors.executiveSummary || false}
                              helperText={
                                fieldErrors.executiveSummary &&
                                "Executive Summary is required!"
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
                              sx={{ marginRight: "8px" }}
                            >
                              Save
                            </Button>

                            <Button
                              classes={{ root: "orange" }}
                              onClick={() => {
                                handleCancelExperience();
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
                        <Button
                          variant="contained"
                          classes={{ root: "orange" }}
                          onClick={() => {
                            resetFormFields();
                            setExperienceFormFieldVisible(true);
                            setShowSavedValues(true);
                          }}
                          style={{ marginRight: "10px" }}
                        >
                          Add Experience
                        </Button>
                        {allExperiences.map((savedValues, index) => (
                          <div key={index}>
                            <Typography
                              variant="p"
                              sx={{
                                fontWeight: theme.typography.p.fontWeightBold,
                              }}
                            >
                              Position Title: {savedValues.positionTitle}
                              <br />
                              Company Name: {savedValues.companyName}
                              <br />
                              Start Period: {savedValues.startPeriod}
                              <br />
                              End Period: {savedValues.endPeriod}
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
                              Executive Summary:
                              {savedValues.executiveSummary}
                            </Typography>
                            <br />
                            <Button
                              variant="contained"
                              classes={{ root: "orange" }}
                              onClick={() => {
                                resetFormFields(savedFieldValues[index]);
                                setEditingIndex(index);
                                setExperienceFormFieldVisible(true);
                                setShowSavedValues(true);
                              }}
                              style={{ marginRight: "10px" }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="contained"
                              classes={{ root: "orange" }}
                              onClick={() => handleDeleteExperience(index)}
                            >
                              Delete
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
                      setEduFieldsVisible(true);
                      setEduFieldValues({});
                      setEduEditingIndex(null);
                    }}
                    classes={{ root: "orange" }}
                  >
                    Add Education
                  </Button>
                  {educationFields.map((education, index) => (
                    <div key={index}>
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Institute/University: {education.university}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Graduation Date: {education.graduationDate}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Qualification: {education.qualification}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Institute/University Location:
                        {education.universityLocation}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Field of Study: {education.fieldOfStudy}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Major: {education.major}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Grade: {education.grade}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Awards: {education.awards}
                      </Typography>
                      <br />
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={() => {
                          setEduFieldsVisible(true);
                          setEduFieldValues(education);
                          setEduEditingIndex(index);
                        }}
                        sx={{ marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={() => handleDeleteEducation(index)}
                      >
                        Delete
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
                        sx={{ marginRight: "8px" }}
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
              {selectedContent === "Skills" && (
                <div>
                  <Button
                    variant="contained"
                    classes={{ root: "orange" }}
                    onClick={() => {
                      setSkillFormVisible(true);
                      setSkillFieldValues({
                        skillName: "",
                        proficiencyLevel: "",
                      });
                      setSkillEditingIndex(null);
                    }}
                  >
                    Add Skill
                  </Button>
                  <Divider sx={{ margin: "24px 0" }} />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "2px",
                      }}
                    >
                      {skillFields.length > 0 && (
                        <div>
                          <Typography variant="p" style={{ width: "40%" }}>
                            Skills
                          </Typography>
                          <Typography
                            variant="p"
                            style={{ width: "40%", marginRight: "20px" }}
                          >
                            Proficiency
                          </Typography>
                        </div>
                      )}
                      <Typography
                        variant="subtitle1"
                        style={{ width: "20%", color: "transparent" }}
                      >
                        Edit Button
                      </Typography>
                    </div>

                    {skillFields.map((skill, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <div style={{ width: "40%" }}>
                          <Typography variant="p">{skill.skillName}</Typography>
                        </div>
                        <div style={{ width: "40%" }}>
                          <Typography variant="p">
                            {skill.proficiencyLevel}
                          </Typography>
                        </div>
                        <div
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            variant="contained"
                            classes={{ root: "orange" }}
                            onClick={() => {
                              setSkillFormVisible(true);
                              setSkillFieldValues(skill);
                              setSkillEditingIndex(index);
                            }}
                            sx={{ marginRight: "8px" }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            classes={{ root: "orange" }}
                            onClick={() => handleDeleteSkill(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}

                    {skillFormVisible && (
                      <div>
                        <TextField
                          label="Skill Name"
                          value={skillFieldValues.skillName}
                          onChange={(e) =>
                            setSkillFieldValues({
                              ...skillFieldValues,
                              skillName: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!skillFieldErrors.skillName}
                          helperText={skillFieldErrors.skillName}
                        />
                        <TextField
                          label="Proficiency Level"
                          value={skillFieldValues.proficiencyLevel}
                          onChange={(e) =>
                            setSkillFieldValues({
                              ...skillFieldValues,
                              proficiencyLevel: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!skillFieldErrors.proficiencyLevel}
                          helperText={skillFieldErrors.proficiencyLevel}
                        />
                        <Button
                          variant="contained"
                          classes={{ root: "orange" }}
                          onClick={handleSaveSkill}
                          style={{ marginRight: "8px" }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          classes={{ root: "orange" }}
                          onClick={() => setSkillFormVisible(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedContent === "Languages" && (
                <div>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: theme.typography.p.fontWeightBold,
                    }}
                  >
                    Proficiency Level:0 - Poor, 10 - Excellent
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    classes={{ root: "orange" }}
                    onClick={() => {
                      setLanguageFormVisible(true);
                      setLanguageFieldValues({
                        languageName: "",
                        proficiencySpoken: "",
                        proficiencyWritten: "",
                        isPrimary: false,
                      });
                      setLanguageEditingIndex(null);
                    }}
                  >
                    Add Language
                  </Button>
                  <Divider sx={{ margin: "24px 0" }} />
                  <div>
                    {languageFields.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px", // Add some spacing between header and input values
                        }}
                      >
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                          }}
                          style={{ width: "20%" }}
                        >
                          Language
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                          }}
                          style={{ width: "20%" }}
                        >
                          Spoken
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                          }}
                          style={{ width: "20%" }}
                        >
                          Written
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                          }}
                          style={{ width: "20%" }}
                        >
                          Primary Language
                        </Typography>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: theme.typography.p.fontWeightBold,
                            color: "transparent",
                          }}
                          style={{ width: "20%" }}
                        >
                          Edit Button
                        </Typography>
                      </div>
                    )}

                    {languageFields.map((language, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "8px", // Add some spacing between input values and buttons
                        }}
                      >
                        <div style={{ width: "20%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: theme.typography.p,
                            }}
                          >
                            {language.languageName}
                          </Typography>
                        </div>
                        <div style={{ width: "20%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: theme.typography.p,
                            }}
                          >
                            {language.proficiencySpoken}
                          </Typography>
                        </div>
                        <div style={{ width: "20%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: theme.typography.p,
                            }}
                          >
                            {language.proficiencyWritten}
                          </Typography>
                        </div>
                        <div style={{ width: "20%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: theme.typography.p,
                            }}
                          >
                            {language.isPrimary ? "Yes" : "No"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            variant="contained"
                            classes={{ root: "orange" }}
                            onClick={() => {
                              setLanguageFormVisible(true);
                              setLanguageFieldValues(language);
                              setLanguageEditingIndex(index);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            classes={{ root: "orange" }}
                            onClick={() => handleDeleteLanguage(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}

                    {languageFormVisible && (
                      <div>
                        <TextField
                          label="Language Name"
                          value={languageFieldValues.languageName}
                          onChange={(e) =>
                            setLanguageFieldValues({
                              ...languageFieldValues,
                              languageName: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!languageFieldErrors.languageName}
                          helperText={languageFieldErrors.languageName || " "}
                        />
                        <TextField
                          label="Proficiency (Spoken)"
                          value={languageFieldValues.proficiencySpoken}
                          onChange={(e) =>
                            setLanguageFieldValues({
                              ...languageFieldValues,
                              proficiencySpoken: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!languageFieldErrors.proficiencySpoken}
                          helperText={
                            languageFieldErrors.proficiencySpoken || " "
                          }
                        />
                        <TextField
                          label="Proficiency (Written)"
                          value={languageFieldValues.proficiencyWritten}
                          onChange={(e) =>
                            setLanguageFieldValues({
                              ...languageFieldValues,
                              proficiencyWritten: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!languageFieldErrors.proficiencyWritten}
                          helperText={
                            languageFieldErrors.proficiencyWritten || " "
                          }
                        />
                        <div>
                          <label>
                            Primary Language:
                            <input
                              type="radio"
                              checked={languageFieldValues.isPrimary === true}
                              onChange={() =>
                                setLanguageFieldValues({
                                  ...languageFieldValues,
                                  isPrimary: true,
                                })
                              }
                            />
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              checked={languageFieldValues.isPrimary === false}
                              onChange={() =>
                                setLanguageFieldValues({
                                  ...languageFieldValues,
                                  isPrimary: false,
                                })
                              }
                            />
                            No
                          </label>
                        </div>
                        <Button
                          variant="contained"
                          classes={{ root: "orange" }}
                          onClick={handleSaveLanguage}
                          sx={{ marginRight: "8px" }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          classes={{ root: "orange" }}
                          onClick={() => setLanguageFormVisible(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedContent === "Additional Info" && (
                <div>
                  {!isEditing ? (
                    <div>
                      <TextField
                        label="Expected Monthly Salary"
                        value={additionalInfo.expectedSalary}
                        onChange={(e) =>
                          setAdditionalInfo({
                            ...additionalInfo,
                            expectedSalary: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!additionalInfoErrors.expectedSalary}
                        helperText={additionalInfoErrors.expectedSalary}
                      />
                      <TextField
                        label="Preferred Work Location"
                        value={additionalInfo.preferredLocation}
                        onChange={(e) =>
                          setAdditionalInfo({
                            ...additionalInfo,
                            preferredLocation: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!additionalInfoErrors.preferredLocation}
                        helperText={additionalInfoErrors.preferredLocation}
                      />
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handleAdditionInfoSaveClick}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handleAdditionalInfoEditClick}
                        sx={{ marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={() => {
                          handleDeleteAdditionalInfo();
                          setAdditionalInfo({
                            expectedSalary: "",
                            preferredLocation: "",
                          });
                          setIsEditing(false);
                        }}
                        disabled={
                          !additionalInfo.expectedSalary &&
                          !additionalInfo.preferredLocation
                        }
                      >
                        Delete
                      </Button>
                      <Typography variant="subtitle1">
                        Expected Monthly Salary: {additionalInfo.expectedSalary}
                      </Typography>
                      <Typography variant="subtitle1">
                        Preferred Work Location:{" "}
                        {additionalInfo.preferredLocation}
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {selectedContent === "About me" && (
                <div>
                  {isEditingAboutMe ? (
                    <div>
                      <Typography variant="p">Name: {aboutMe.name}</Typography>
                      <br />
                      <Typography variant="p">
                        Contact Number: {aboutMe.contactNumber}
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Email: {aboutMe.email}
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Address: {aboutMe.address}
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Postal Code: {aboutMe.postalCode}
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Unit Number: {aboutMe.unitNumber}
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Date of Birth: {aboutMe.dateOfBirth}
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Nationality: {aboutMe.nationality}
                      </Typography>
                      <br />

                      <Button
                        variant="contained"
                        sx={{ marginRight: "8px" }}
                        classes={{ root: "orange" }}
                        onClick={handleAboutMeEditClick}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handleDeleteAboutMe}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <TextField
                        label="Name"
                        value={aboutMe.name}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            name: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.name}
                        helperText={aboutMeErrors.name}
                      />
                      <TextField
                        label="Contact Number"
                        value={aboutMe.contactNumber}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            contactNumber: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.contactNumber}
                        helperText={aboutMeErrors.contactNumber}
                      />
                      <TextField
                        label="Email"
                        value={aboutMe.email}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            email: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.email}
                        helperText={aboutMeErrors.email}
                      />
                      <TextField
                        label="Address"
                        value={aboutMe.address || address}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            address: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.address}
                        helperText={aboutMeErrors.address}
                      />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          label="Postal Code"
                          value={aboutMe.postalCode}
                          onChange={(e) => {
                            setAboutMe({
                              ...aboutMe,
                              postalCode: e.target.value,
                            });
                          }}
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!aboutMeErrors.postalCode}
                          helperText={aboutMeErrors.postalCode}
                        />
                        <IconButton
                          style={{ color: "#FF6B2C" }}
                          aria-label="search"
                          onClick={handleSearchClick}
                        >
                          <SearchOutlinedIcon />
                        </IconButton>
                      </div>
                      <TextField
                        label="Unit Number"
                        value={aboutMe.unitNumber}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            unitNumber: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.unitNumber}
                        helperText={aboutMeErrors.unitNumber}
                      />
                      <TextField
                        label="Date of Birth"
                        value={aboutMe.dateOfBirth}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            dateOfBirth: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.dateOfBirth}
                        helperText={aboutMeErrors.dateOfBirth}
                      />
                      <TextField
                        label="Nationality"
                        value={aboutMe.nationality}
                        onChange={(e) =>
                          setAboutMe({
                            ...aboutMe,
                            nationality: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!aboutMeErrors.nationality}
                        helperText={aboutMeErrors.nationality}
                      />

                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handleAboutMeSaveClick}
                        sx={{ marginRight: "8px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handleAboutMeCancelClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {selectedContent === "Privacy Setting(?)" && (
                <div>
                  {!isEditingPrivacy ? (
                    <div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="privacySetting"
                          value={privacySetting}
                          onChange={(e) => setPrivacySetting(e.target.value)}
                        >
                          <FormControlLabel
                            value="Searchable with Contact Details"
                            control={<Radio />}
                            label={
                              <>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight:
                                      theme.typography.h6.fontWeightBold,
                                  }}
                                >
                                  Searchable with Contact Details
                                </Typography>
                                <Typography
                                  variant="p"
                                  sx={{
                                    fontWeight: theme.typography.p,
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allow employers to search for my profile and
                                  see my name and contact details.
                                </Typography>
                              </>
                            }
                          />
                          <FormControlLabel
                            value="Not Searchable"
                            control={<Radio />}
                            label={
                              <>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight:
                                      theme.typography.h6.fontWeightBold,
                                  }}
                                >
                                  Not Searchable
                                </Typography>
                                <Typography
                                  variant="p"
                                  sx={{
                                    fontWeight: theme.typography.p,
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Do not allow employers to search my profile.
                                </Typography>
                              </>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                      <br />
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handlePrivacySaveClick}
                        sx={{ marginRight: "8px", marginTop: "10px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handlePrivacyCancelClick}
                        sx={{ marginTop: "10px" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography variant="p">
                        {privacySetting === "Searchable with Contact Details"
                          ? "Searchable with Contact Details"
                          : "Not Searchable"}
                      </Typography>
                      <br />
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={handlePrivacyEditClick}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateResume;
