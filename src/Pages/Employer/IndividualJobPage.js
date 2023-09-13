import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../Components/UserContext";
import { theme } from "../../Assets/Styles/Theme";
import "draft-js/dist/Draft.css";
import AxiosLoader from "../../Components/AxiosLoader";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";

import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PlaceIcon from "@mui/icons-material/Place";
import UpdateIcon from "@mui/icons-material/Update";
import { ThemeProvider } from "@emotion/react";
import "../../Assets/Styles/Homepage.css";

function IndividualJobPage(props) {
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [jobInfo, setJobInfo] = useState(null);
  const params = useParams();
  const [jobId, setJobId] = useState(params.jobId);
  const [displayBanner, setDisplayBanner] = useState(false);
  const [updateDate, setUpdateDate] = useState("");
  const { currUser } = useUserContext();
  const [description, setDescription] = useState("");
  const [displayAdminButtons, setDisplayAdminButtons] = useState(false);
  const [displayUserButtons, setDisplayUserButtons] = useState(false);
  const [jobToApply, setJobToApply] = useState("");

  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    if (props) {
      console.log(props.jobsId);
      setJobId(props.jobsId);
    }
  }, [props]);

  useEffect(() => {
    const retrieveJobInfo = async () => {
      if (jobId) {
        try {
          axios
            .get(`${BACKEND_URL}/company/jobs/${jobId}`)
            .then((response) => {
              console.log(response.data);
              setJobInfo(response.data[0]);
              setJobToApply(response.data[0].id);
            })
            .catch((error) => {
              console.log("Error fetching job info: ", error);
            });
        } catch (err) {
          console.log(err);
        }
      }
    };
    retrieveJobInfo();
  }, [jobId]);

  useEffect(() => {
    console.log(jobInfo);
    if (!jobInfo) {
      setAxiosLoading(true);
    }

    if (jobInfo) {
      if (jobInfo.company_profile_info.bannerUrl === null) {
        setAxiosLoading(false);
        setDisplayBanner(false);
      } else {
        setDisplayBanner(true);
        setAxiosLoading(false);
      }

      const dateTime = new Date(jobInfo.updatedAt);
      const date = dateTime.toDateString();
      const time = dateTime.toTimeString().split(" ")[0];
      const formattedDateTime = `${date}, ${time}`;
      setUpdateDate(formattedDateTime);
      console.log(jobInfo.description);
      setDescription(jobInfo.description);

      if (!currUser || props.jobsId || currUser.userRoleId === 2) {
        setDisplayAdminButtons(false);
        setDisplayUserButtons(true);
      } else {
        setDisplayAdminButtons(true);
        setDisplayUserButtons(false);
      }
    }
  }, [jobInfo]);

  const handleApply = (e) => {
    e.preventDefault();
    const applyJobId = jobToApply;
    navigate(`/resume?jobId=${applyJobId}`);
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
                      src={jobInfo.company_profile_info.bannerUrl}
                    />
                  ) : (
                    <Box mb={3} component="div"></Box>
                  )}

                  {/* row 2 - co logo , title , name, employment type, location, post date */}

                  {jobInfo ? (
                    <Box m={3} p={3} sx={theme.customStyles.displayFlexRowLeft}>
                      <Stack direction="row" spacing={3}>
                        <Avatar
                          alt="logo"
                          src={jobInfo.company_profile_info.companyLogo || ""}
                          sx={{ width: 150, height: 150 }}
                        />

                        <Stack direction="column" spacing={1}>
                          <Typography
                            textAlign="left"
                            variant="h5"
                            sx={{
                              fontWeight: theme.typography.h6.fontWeightBold,
                            }}
                          >
                            {jobInfo.title || ""}
                          </Typography>
                          <Typography
                            textAlign="left"
                            variant="h6"
                            sx={{
                              color: theme.typography.p.color,
                              fontWeight: theme.typography.h6.fontWeightBold,
                            }}
                          >
                            {jobInfo.company_profile_info.companyName || ""}
                          </Typography>

                          <Stack direction="row" spacing={2}>
                            <WorkHistoryIcon />
                            <Typography
                              textAlign="left"
                              variant="p"
                              sx={{
                                color: theme.typography.p.color,
                                fontWeight: theme.typography.p.fontWeightBold,
                              }}
                            >
                              {jobInfo.employmentType || ""}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <PlaceIcon />
                            <Typography
                              textAlign="left"
                              variant="p"
                              sx={{
                                color: theme.typography.p.color,
                                fontWeight: theme.typography.p.fontWeightBold,
                              }}
                            >
                              {jobInfo.location.name || ""}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <UpdateIcon />
                            <Typography
                              textAlign="left"
                              variant="p"
                              sx={{
                                color: theme.typography.p.color,
                                fontWeight: theme.typography.p.fontWeightBold,
                              }}
                            >
                              {updateDate || ""}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>
                  ) : (
                    axiosLoading && <AxiosLoader />
                  )}

                  {/* row 3 - 2 buttons edit listing and delete listing */}
                  {displayAdminButtons ? (
                    <Box
                      mt={4}
                      mb={4}
                      sx={theme.customStyles.displayFlexRowCenter}
                    >
                      <Stack direction="row" spacing={5}>
                        <Button
                          classes={{ root: "orange" }}
                          variant="contained"
                          onClick={() =>
                            navigate(`/checkapplication/${[params.jobId]}`)
                          }
                        >
                          Check Applicants
                        </Button>
                        <Button classes={{ root: "blue" }} variant="contained">
                          Edit Listing
                        </Button>
                        <Button classes={{ root: "red" }} variant="contained">
                          Delete Listing
                        </Button>
                      </Stack>
                    </Box>
                  ) : displayUserButtons ? (
                    <Box
                      mt={4}
                      mb={4}
                      sx={theme.customStyles.displayFlexRowCenter}
                    >
                      <Button
                        className="orange"
                        variant="contained"
                        onClick={handleApply}
                      >
                        Apply for this Job
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Divider
                      sx={{
                        borderBottomWidth: 3,

                        width: "90%",
                      }}
                    />
                  </div>
                  {/* row 4 - job details */}
                  <Box m={4} sx={theme.customStyles.displayFlexRowLeft}>
                    <Stack direction="column" spacing={2}>
                      <Typography
                        textAlign="left"
                        variant="h5"
                        sx={{
                          fontWeight: theme.typography.h6.fontWeightBold,
                        }}
                      >
                        Job Details
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: description || "",
                        }}
                      />
                    </Stack>
                  </Box>

                  {/* row 5 - 1 button to check current applicants */}
                  <Box
                    m={4}
                    pb={5}
                    sx={theme.customStyles.displayFlexRowCenter}
                  ></Box>
                </Paper>
              </Box>
            </Grid>
          </Container>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default IndividualJobPage;
