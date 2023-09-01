import { useState } from "react";
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
  Input, TextField, Checkbox
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";

function CreateResume() {
  // All the states
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [radioCollapsed, setRadioCollapsed] = useState(false);
  const [experienceStatementVisible, setExperienceStatementVisible] =
    useState(false);
  const [experienceStatement, setExperienceStatement] = useState("");
  const [experienceFormFieldVisible, setExperienceFormFieldVisible] = useState(false);
  const [positionTitle1, setPositionTitle1] = useState("");
  const [companyName1, setCompanyName1] = useState("");
  const [joinedDate1, setJoinedDate1] = useState("");
  const [leftDate1, setLeftDate1] = useState("");
  const [specialization1, setSpecialization1] = useState("");
  const [role1, setRole1] = useState("");
  const [country1, setCountry1] = useState("");
  const [industry1, setIndustry1] = useState("");
  const [positionLevel1, setPositionLevel1] = useState("");
  const [monthlySalary1, setMonthlySalary1] = useState("");
  const [experienceSummary1, setExperienceSummary1] = useState("");
 const [isLeftDateDisabled, setIsLeftDateDisabled] = useState(false);



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
  console.log(experienceStatement)
  const handleYearInputChange = (event) => {
    const newYearValue = event.target.value;
    setYearValue(newYearValue);
    console.log(newYearValue);
    setSelectedOption(`I have been working since ${newYearValue}`);
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
                            {selectedOption === "I have been working since"
                              ? `You have been working since ${yearValue}`
                              : selectedOption === "I have no work experience"
                              ? "You have no work experience"
                              : selectedOption ===
                                "I am a fresh graduate seeking my first job"
                              ? "You are a fresh graduate seeking your first job"
                              : selectedOption ===
                                "I am a student seeking internship or part-time jobs"
                              ? "You are a student seeking internship or part-time jobs"
                              : ""}
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
                              value={positionTitle1}
                              onChange={(e) =>
                                setPositionTitle1(e.target.value)
                              }
                              fullWidth
                            />
                            <TextField
                              label="Company Name"
                              value={companyName1}
                              onChange={(e) => setCompanyName1(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="Joined Date"
                              value={joinedDate1}
                              onChange={(e) => setJoinedDate1(e.target.value)}
                              fullWidth
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isLeftDateDisabled}
                                  onChange={(e) =>
                                    setIsLeftDateDisabled(e.target.checked)
                                  }
                                />
                              }
                              label="Disable Left Date"
                            />
                            <TextField
                              label="Left Date"
                              value={leftDate1}
                              onChange={(e) => setLeftDate1(e.target.value)}
                              fullWidth
                              disabled={isLeftDateDisabled}
                            />
                            <TextField
                              label="Specialization"
                              value={specialization1}
                              onChange={(e) =>
                                setSpecialization1(e.target.value)
                              }
                              fullWidth
                            />
                            <TextField
                              label="Role"
                              value={role1}
                              onChange={(e) =>
                                setRole1(e.target.value)
                              }
                              fullWidth
                            />
                          </form>
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
