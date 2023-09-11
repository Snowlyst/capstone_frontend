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
  const { currUser } = useUserContext();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (currUser) {
      console.log(currUser.id);
      setId(currUser.id);
      setUsername(currUser.lastname);
    }
  }, [currUser]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backendUrl);

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
  const [allExperiences, setAllExperiences] = useState([]);
  const [databaseExperiences, setDatabaseExperiences] = useState([]);
  const [databaseExperienceIds, setDatabaseExperienceIds] = useState([]);
  // States for education
  const [eduFieldErrors, setEduFieldErrors] = useState({});
  const [educationFields, setEducationFields] = useState([]);
  const [eduFieldValues, setEduFieldValues] = useState({
    institute: "",
    graduationDate: "",
    qualification: "",
    instituteLocation: "",
    fieldOfStudy: "",
    major: "",
    grade: "",
    awards: "",
  });

  const [eduEditingIndex, setEduEditingIndex] = useState(null);
  const [eduFieldsVisible, setEduFieldsVisible] = useState(false);
  const [databaseEducations, setDatabaseEducations] = useState([]);
  const [allEducations, setAllEducations] = useState([]);
  const [databaseEducationIds, setDatabaseEducationIds] = useState([]);
  const [savedEduFieldValues, setSavedEduFieldValues] = useState([]);
  // State for Skills
  const [skillFields, setSkillFields] = useState([]);
  const [skillFieldValues, setSkillFieldValues] = useState({
    skill: "",
    proficiency: "",
  });
  const [skillFieldErrors, setSkillFieldErrors] = useState({});
  const [skillEditingIndex, setSkillEditingIndex] = useState(null);
  const [skillFormVisible, setSkillFormVisible] = useState(false);
  const [databaseSkills, setDatabaseSkills] = useState([]);
  const [databaseSkillIds, setDatabaseSkillIds] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  // State for language

  const [languageFields, setLanguageFields] = useState([]);
  const [languageFormVisible, setLanguageFormVisible] = useState(false);
  const [languageFieldValues, setLanguageFieldValues] = useState({
    language: "",
    spoken: "",
    written: "",
    ifPrimary: false,
  });
  const [languageFieldErrors, setLanguageFieldErrors] = useState({});
  const [languageEditingIndex, setLanguageEditingIndex] = useState(null);
  const [databaseLanguages, setDatabaseLanguages] = useState([]);
  const [databaseLanguageIds, setDatabaseLanguageIds] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);

  // State for Additional Information
  const [additionalInfo, setAdditionalInfo] = useState({
    expectedSalary: "",
    preferredWorkLocation: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(true);
  const [additionalInfoErrors, setAdditionalInfoErrors] = useState({});
  const [databaseAdditionalInfo, setDatabaseAdditionalInfo] = useState([]);
  const [databaseAdditionalInfoIds, setDatabaseAdditionalInfoIds] = useState(
    []
  );
  const [allAdditionalInfo, setAllAdditionalInfo] = useState([]);
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
  const [databaseAboutMe, setDatabaseAboutMe] = useState([]);
  const [databaseAboutMeIds, setDatabaseAboutMeIds] = useState([]);
  const [allAboutMe, setAllAboutMe] = useState([]);

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
    name: username,
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
        .get(`${backendUrl}/createresume/experience/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("Experience Database ID:", entry.id);
            setDatabaseExperienceIds(entry.id);
            const experiences = response.data.output;
            setDatabaseExperiences(experiences, databaseExperienceIds);
            console.log(databaseExperienceIds);
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
        console.log(fieldValues);
        console.log(fieldName);
        if (fieldName === "id" || fieldName === "userId") {
          console.log(fieldName);
        } else if (fieldValues[fieldName].trim() === "") {
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
        //setEditingIndex(null);
      } else {
        updatedSavedFieldValues.push(fieldValues);
      }
      setSavedFieldValues(updatedSavedFieldValues);
      setExperienceFormFieldVisible(false);
      setShowSavedValues(true);
      if (!fieldValues.id) {
        axios
          .post(`${backendUrl}/createresume/experience/${id}`, {
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
          .put(
            `${backendUrl}/createresume/experience/${allExperiences[editingIndex].id}`,
            {
              ...fieldValues,
            }
          )
          .then(() => {
            console.log("Data successfully updated, ID:", fieldValues.id);
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      }
    }
  };
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
    if (!fieldValues.id) {
      axios
        .delete(
          `${backendUrl}/createresume/experience/${allExperiences[editingIndex].id}`
        )
        .then((response) => {
          console.log(`Item with ID response deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting item with ID:`, error);
        });
    }
  };

  // Logic for education .
  useEffect(() => {
    if (id) {
      axios
        .get(`${backendUrl}/createresume/education/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("Education Database ID:", entry.id);
            setDatabaseEducationIds(entry.id);
            const educations = response.data.output;
            setDatabaseEducations(educations, databaseEducationIds);
            console.log(databaseEducationIds);
          });
        })
        .catch((error) => {
          console.error("Error with GET request:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    const combinedEducations = [...educationFields, ...databaseEducations];
    setAllEducations(combinedEducations);
    console.log(allEducations);
  }, [educationFields, databaseEducations]);

  const handleSaveEducation = () => {
    const newEduFieldErrors = eduValidateFields(eduFieldValues);

    if (Object.keys(newEduFieldErrors).length > 0) {
      setEduFieldErrors(newEduFieldErrors);
    } else {
      if (eduEditingIndex !== null) {
        const updatedEducationFields = [...educationFields];
        updatedEducationFields[eduEditingIndex] = eduFieldValues;
        setEducationFields(updatedEducationFields);
        //setEduEditingIndex(null);
      } else {
        setEducationFields([...educationFields, eduFieldValues]);
      }

      // Clear the form fields
      setEduFieldValues({
        institute: "",
        graduationDate: "",
        qualification: "",
        instituteLocation: "",
        fieldOfStudy: "",
        major: "",
        grade: "",
        awards: "",
      });

      setEduFieldErrors({});
      setEduFieldsVisible(false);
      if (!eduFieldValues.id) {
        axios
          .post(`${backendUrl}/createresume/education/${id}`, {
            userId: id,
            ...eduFieldValues,
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
          .put(
            `${backendUrl}/createresume/education/${allEducations[eduEditingIndex].id}`,
            {
              ...eduFieldValues,
            }
          )
          .then(() => {
            console.log("Data successfully updated, ID:", eduFieldValues.id);
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      }
    }
  };
  useEffect(() => {
    console.log(allEducations);
    console.log(eduFieldValues);
    console.log(eduEditingIndex);
  }, [allEducations, eduFieldValues, eduEditingIndex]);

  const eduValidateFields = (fields) => {
    const requiredFields = [
      "institute",
      "graduationDate",
      "qualification",
      "instituteLocation",
      "fieldOfStudy",
      "major",
      "grade",
      "awards",
    ];

    const eduErrors = {};

    requiredFields.forEach((fieldName) => {
      console.log(fieldName);
      if (fieldName === "id" || fieldName === "userId") {
        console.log(fieldName);
      } else if (fields[fieldName].trim() === "") {
        eduErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
      }
    });

    return eduErrors;
  };

  const resetEduFormFields = () => {
    setFieldValues({
      institute: "",
      graduationDate: "",
      qualification: "",
      instituteLocation: "",
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
    if (!eduFieldValues.id) {
      axios
        .delete(
          `${backendUrl}/createresume/education/${allEducations[eduEditingIndex].id}`
        )
        .then((response) => {
          console.log(`Item with ID response deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting item with ID:`, error);
        });
    }
  };

  //Logic for Skills
  useEffect(() => {
    if (id) {
      axios
        .get(`${backendUrl}/createresume/skill/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("skill Database ID:", entry.id);
            setDatabaseSkillIds(entry.id);
            const skills = response.data.output;
            setDatabaseSkills(skills, databaseSkillIds);
            console.log(databaseSkillIds);
          });
        })
        .catch((error) => {
          console.error("Error with GET request:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    const combinedSkills = [...skillFields, ...databaseSkills];
    setAllSkills(combinedSkills);
    console.log(allSkills);
  }, [skillFields, databaseSkills]);

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
      if (!skillFieldValues.id) {
        axios
          .post(`${backendUrl}/createresume/skill/${id}`, {
            userId: id,
            ...skillFieldValues,
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
          .put(
            `${backendUrl}/createresume/skill/${allSkills[skillEditingIndex].id}`,
            {
              ...skillFieldValues,
            }
          )
          .then(() => {
            console.log("Data successfully updated, ID:", skillFieldValues.id);
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      }
    }
  };

  const validateSkillFields = (fields) => {
    const errors = {};
    if (fields === "id" || fields === "userId") {
      console.log(fields);
    } else if (fields.skill.trim() === "") {
      errors.skill = "Skill Name is required";
    } else if (fields.proficiency.trim() === "") {
      errors.proficiency = "Proficiency Level is required";
    }

    return errors;
  };
  const handleDeleteSkill = (index) => {
    const updatedSkillFields = [...skillFields];

    updatedSkillFields.splice(index, 1);

    setSkillFields(updatedSkillFields);
    if (!skillFieldValues.id) {
      axios
        .delete(
          `${backendUrl}/createresume/skill/${allSkills[skillEditingIndex].id}`
        )
        .then((response) => {
          console.log(`Item with ID response deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting item with ID:`, error);
        });
    }
  };

  // Logic for lanaguage
  useEffect(() => {
    if (id) {
      axios
        .get(`${backendUrl}/createresume/language/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("skill Database ID:", entry.id);
            setDatabaseLanguageIds(entry.id);
            const languages = response.data.output;
            setDatabaseLanguages(languages, databaseLanguageIds);
            console.log(databaseLanguageIds);
          });
        })
        .catch((error) => {
          console.error("Error with GET request:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    const combinedLanguages = [...languageFields, ...databaseLanguages];
    setAllLanguages(combinedLanguages);
    console.log(allLanguages);
  }, [languageFields, databaseLanguages]);
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
        language: "",
        spoken: "",
        written: "",
        ifPrimary: false,
      });
      setLanguageFieldErrors({});
      setLanguageFormVisible(false);
      if (!languageFieldValues.id) {
        axios
          .post(`${backendUrl}/createresume/language/${id}`, {
            userId: id,
            ...languageFieldValues,
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
          .put(
            `${backendUrl}/createresume/language/${allLanguages[languageEditingIndex].id}`,
            {
              ...languageFieldValues,
            }
          )
          .then(() => {
            console.log(
              "Data successfully updated, ID:",
              languageFieldValues.id
            );
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      }
    }
  };

  const validateLanguageFields = (fields) => {
    const errors = {};
    if (fields === "id" || fields === "userId") {
      console.log(fields);
    } else if (fields.language.trim() === "") {
      errors.language = "Language Name is required";
    } else if (fields.spoken.trim() === "") {
      errors.proficiencySpoken = "Proficiency (Spoken) is required";
    } else if (fields.written.trim() === "") {
      errors.written = "Proficiency (Written) is required";
    }

    return errors;
  };
  const handleDeleteLanguage = (indexToDelete) => {
    const updatedLanguageFields = [...languageFields];

    updatedLanguageFields.splice(indexToDelete, 1);

    setLanguageFields(updatedLanguageFields);

    if (!languageFieldValues.id) {
      axios
        .delete(
          `${backendUrl}/createresume/language/${allLanguages[languageEditingIndex].id}`
        )
        .then((response) => {
          console.log(`Item with ID response deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting item with ID:`, error);
        });
    }
  };

  // Logic for additional Information
  useEffect(() => {
    if (id) {
      axios
        .get(`${backendUrl}/createresume/additionalinfo/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("Additonal Info Database ID:", entry.id);
            setDatabaseAdditionalInfoIds(entry.id);
            const additionalInfo = response.data.output;
            setDatabaseAdditionalInfo(
              additionalInfo,
              databaseAdditionalInfoIds
            );
            console.log(databaseAdditionalInfoIds);
          });
        })
        .catch((error) => {
          console.error("Error with GET request:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    const combinedInformation = [additionalInfo, ...databaseAdditionalInfo];
    setAllAdditionalInfo(combinedInformation);
    console.log(allAdditionalInfo);
  }, [additionalInfo, databaseAdditionalInfo]);

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
        if (!additionalInfo.id) {
          axios
            .post(`${backendUrl}/createresume/additionalinfo/${id}`, {
              userId: id,
              ...additionalInfo,
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
            .put(
              `${backendUrl}/createresume/additionalinfo/${additionalInfo.id}`,
              {
                ...additionalInfo,
              }
            )
            .then(() => {
              console.log("Data successfully updated, ID:", fieldValues.id);
            })
            .catch((error) => {
              console.error("Error updating data:", error);
            });
        }
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
    if (fields.preferredWorkLocation.trim() === "") {
      errors.preferredWorkLocation = "Preferred Work Location is required";
    }
    return errors;
  };
  const handleDeleteAdditionalInfo = () => {
    setAdditionalInfo({
      expectedSalary: "",
      preferredWorkLocation: "",
    });

    setIsAdditionalInfoVisible(true);
  };

  // Logic for About me
  useEffect(() => {
    if (id) {
      axios
        .get(`${backendUrl}/createresume/aboutme/${id}`)
        .then((response) => {
          console.log("GET request successful:", response.data);
          response.data.output.forEach((entry) => {
            console.log("About me Database ID:", entry.id);
            setDatabaseAboutMeIds(entry.id);
            const aboutMe = response.data.output;
            setDatabaseAboutMe(aboutMe, databaseAboutMeIds);
            console.log(databaseAboutMeIds);
          });
        })
        .catch((error) => {
          console.error("Error with GET request:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    const combinedAboutMe = [aboutMe, ...databaseAboutMe];
    setAllAboutMe(combinedAboutMe);
    console.log(allAboutMe);
  }, [aboutMe, databaseAboutMe]);
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
      console.log("ABoutME", aboutMe);
    }
    if (id) {
      axios
        .post(`${backendUrl}/createresume/aboutme/${id}`, {
          userId: id,
          ...aboutMe,
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
        .put(`${backendUrl}/createresume/aboutme/${aboutMe.id}`, {
          ...aboutMe,
        })
        .then(() => {
          console.log("Data successfully updated, ID:", fieldValues.id);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
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
                                //editingIndex !== null && fieldValues.positionTitle ===""
                                //? allExperiences[editingIndex].positionTitle
                                //: fieldValues.positionTitle!==""? fieldValues.positionTitle : ""
                                fieldValues.positionTitle || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].companyName ||
                                //     "" :
                                fieldValues.companyName || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].startPeriod ||
                                //     ""
                                //   : fieldValues.startPeriod || ""
                                fieldValues.startPeriod || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].endPeriod || ""
                                //   : fieldValues.endPeriod || ""
                                fieldValues.endPeriod || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex]
                                //       .specialization || ""
                                //   : fieldValues.specialization || ""
                                fieldValues.specialization || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].role || ""
                                //   : fieldValues.role || ""
                                fieldValues.role || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].country || ""
                                //   : fieldValues.country || ""
                                fieldValues.country || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].industry || ""
                                //   : fieldValues.industry || """
                                fieldValues.industry || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex].positionLevel
                                //   : fieldValues.positionLevel || ""
                                fieldValues.positionLevel || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex]
                                //       .monthlySalary || ""
                                //   : fieldValues.monthlySalary || ""
                                fieldValues.monthly || ""
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
                                // editingIndex !== null
                                //   ? allExperiences[editingIndex]
                                //       .executiveSummary
                                //   : fieldValues.executiveSummary || ""
                                fieldValues.executiveSummary || ""
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
                                setFieldValues(allExperiences[index]);
                                setShowSavedValues(true);
                              }}
                              style={{ marginRight: "10px" }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="contained"
                              classes={{ root: "orange" }}
                              onClick={() => {
                                handleDeleteExperience(index);
                                setFieldValues(allExperiences[index]);
                              }}
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
                  {allEducations.map((education, index) => (
                    <div key={index}>
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: theme.typography.p,
                        }}
                      >
                        Institute/University: {education.institute}
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
                        {education.instituteLocation}
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
                          console.log(eduEditingIndex);
                          setEduFieldValues(allEducations[index].id);
                          console.log(eduFieldValues);
                        }}
                        sx={{ marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        classes={{ root: "orange" }}
                        onClick={() => {
                          handleDeleteEducation(index);
                          setEduFieldValues(allEducations[index].id);
                          setEduEditingIndex(index);
                        }}
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
                        value={eduFieldValues.institute || ""}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            institute: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.institute}
                        helperText={eduFieldErrors.institute}
                      />
                      <TextField
                        label="Graduation Date"
                        value={eduFieldValues.graduationDate || ""}
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
                        value={eduFieldValues.qualification || ""}
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
                        value={eduFieldValues.instituteLocation || ""}
                        onChange={(e) =>
                          setEduFieldValues({
                            ...eduFieldValues,
                            instituteLocation: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!eduFieldErrors.instituteLocation}
                        helperText={eduFieldErrors.instituteLocation}
                      />
                      <TextField
                        label="Field of Study"
                        value={eduFieldValues.fieldOfStudy || ""}
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
                        value={eduFieldValues.major || ""}
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
                        value={eduFieldValues.grade || ""}
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
                        value={eduFieldValues.awards || ""}
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
                      {skillFields.length >= 0 && (
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

                    {allSkills.map((skill, index) => (
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
                          <Typography variant="p">{skill.skill}</Typography>
                        </div>
                        <div style={{ width: "40%" }}>
                          <Typography variant="p">
                            {skill.proficiency}
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
                              setSkillFieldValues(allSkills[index].id);
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
                          value={skillFieldValues.skill || ""}
                          onChange={(e) =>
                            setSkillFieldValues({
                              ...skillFieldValues,
                              skill: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!skillFieldErrors.skill}
                          helperText={skillFieldErrors.skill}
                        />
                        <TextField
                          label="Proficiency Level"
                          value={skillFieldValues.proficiency || ""}
                          onChange={(e) =>
                            setSkillFieldValues({
                              ...skillFieldValues,
                              proficiency: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!skillFieldErrors.proficiency}
                          helperText={skillFieldErrors.proficiency}
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
                        language: "",
                        spoken: "",
                        written: "",
                        isPrimary: false,
                      });
                      setLanguageEditingIndex(null);
                    }}
                  >
                    Add Language
                  </Button>
                  <Divider sx={{ margin: "24px 0" }} />
                  <div>
                    {languageFields.length >= 0 && (
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

                    {allLanguages.map((language, index) => (
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
                            {language.language}
                          </Typography>
                        </div>
                        <div style={{ width: "20%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: theme.typography.p,
                            }}
                          >
                            {language.spoken}
                          </Typography>
                        </div>
                        <div style={{ width: "20%" }}>
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: theme.typography.p,
                            }}
                          >
                            {language.written}
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
                              setLanguageFieldValues(allLanguages[index].id);
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
                          value={languageFieldValues.language || ""}
                          onChange={(e) =>
                            setLanguageFieldValues({
                              ...languageFieldValues,
                              language: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!languageFieldErrors.language}
                          helperText={languageFieldErrors.language || " "}
                        />
                        <TextField
                          label="Proficiency (Spoken)"
                          value={languageFieldValues.spoken || ""}
                          onChange={(e) =>
                            setLanguageFieldValues({
                              ...languageFieldValues,
                              spoken: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!languageFieldErrors.spoken}
                          helperText={languageFieldErrors.spoken || " "}
                        />
                        <TextField
                          label="Proficiency (Written)"
                          value={languageFieldValues.written}
                          onChange={(e) =>
                            setLanguageFieldValues({
                              ...languageFieldValues,
                              written: e.target.value,
                            })
                          }
                          fullWidth
                          margin="normal"
                          size="small"
                          error={!!languageFieldErrors.written}
                          helperText={languageFieldErrors.written || " "}
                        />
                        <div>
                          <label>
                            Primary Language:
                            <input
                              type="radio"
                              //value={languageFieldValues.ifPrimary || ""}
                              checked={languageFieldValues.ifPrimary === true}
                              onChange={() =>
                                setLanguageFieldValues({
                                  ...languageFieldValues,
                                  ifPrimary: true,
                                })
                              }
                            />
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              //value={languageFieldValues.ifPrimary || ""}
                              checked={languageFieldValues.ifPrimary === false}
                              onChange={() =>
                                setLanguageFieldValues({
                                  ...languageFieldValues,
                                  ifPrimary: false,
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
                        value={additionalInfo.preferredWorkLocation}
                        onChange={(e) =>
                          setAdditionalInfo({
                            ...additionalInfo,
                            preferredWorkLocation: e.target.value,
                          })
                        }
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!additionalInfoErrors.preferredWorkLocation}
                        helperText={additionalInfoErrors.preferredWorkLocation}
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
                            preferredWorkLocation: "",
                          });
                          setIsEditing(false);
                        }}
                        disabled={
                          !additionalInfo.expectedSalary &&
                          !additionalInfo.preferredWorkLocation
                        }
                      >
                        Delete
                      </Button>
                      <Typography variant="p">
                        Expected Monthly Salary: {additionalInfo.expectedSalary}
                      </Typography>
                      <Typography variant="p">
                        Preferred Work Location:{" "}
                        {additionalInfo.preferredWorkLocation}
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
                            address: e.target.value || address,
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
