import { useState, useEffect } from "react";
import {
  Box,
  ThemeProvider,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
  Link,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { theme } from "../../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
//for auth
import { useUserContext } from "../../Components/UserContext";
import IndividualJobPage from "../Employer/IndividualJobPage";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function AdminApproveDenyJob() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobsData, setJobsData] = useState("");
  const [jobsInfo, setJobsInfo] = useState("");
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [currentJobSelection, setCurrentJobSelection] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate();

  //for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //make sure currUser is set or else the navigate gonna boot everyone off the screen
  useEffect(() => {
    console.log(currUser);
    if (!accessToken) {
      const localAccess = JSON.parse(localStorage.getItem("verveToken"));
      console.log("access token ready");
      setAccessToken(localAccess);
      setIsLoaded(true);
    }
  }, []);

  //disable jobseekers and non loggedin people from accessing this page
  useEffect(() => {
    if (isLoaded) {
      if (!currUser || currUser.userRoleId !== 1) {
        Swal.fire(
          "Error",
          "You do not have permissions to act on that page",
          "error"
        );
        navigate("/");
      } else {
        console.log("User permitted");
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (currUser.userRoleId === 1) {
        axios
          .get(`${BACKEND_URL}/listings/admin/checkunverifiedjob`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((info) => {
            console.log(info.data);
            setJobsInfo(info.data);
            setJobsData(
              info.data.map((info, index) => {
                return (
                  <Box key={index}>
                    <Grid
                      container
                      sx={{
                        width: "10vw",
                        height: "10vh",
                        borderRadius: "20px",
                        mt: 1.5,
                        mb: 1.5,
                      }}
                    >
                      <Grid item xs={4}>
                        <img
                          alt="Logo"
                          src={
                            info.company_profile_info.companyLogo ||
                            "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64"
                          }
                          style={{
                            width: "3.5vw",
                            height: "3.5vh",
                            objectFit: "fill",
                            borderRadius: "40px",
                            marginTop: "2.2vh",
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Box>
                          <Link
                            href={"#"}
                            underline="none"
                            sx={{ color: theme.typography.darkP.color }}
                          >
                            <Box
                              component="div"
                              onClick={() => setCurrentJobSelection(index)}
                              sx={{
                                width: "14vw",
                                height: "5vh",
                                ml: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                display: "-webkit-box",
                              }}
                            >
                              <Typography
                                variant="darkP"
                                sx={{ fontSize: "1.7vh" }}
                              >
                                {info.title}
                              </Typography>
                            </Box>
                          </Link>
                          <Box
                            component="div"
                            sx={{
                              width: "14vw",
                              ml: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: "1",
                              WebkitBoxOrient: "vertical",
                              display: "-webkit-box",
                            }}
                          >
                            <Typography variant="p" sx={{ fontSize: "1.4vh" }}>
                              {info.company_profile_info.companyName}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="p"
                              sx={{
                                width: "14vw",
                                fontSize: "1.4vh",
                                pl: 2,
                                fontWeight: theme.typography.p.fontWeight,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                                display: "-webkit-box",
                              }}
                            >
                              {info.location.name}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                );
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [isLoaded, currUser]);

  const onAccept = (e) => {
    e.preventDefault();
    console.log(currentJobSelection);
    if (currentJobSelection === "") {
      Swal.fire("Error", "You have not selected Any Job to Accept!", "error");
      return;
    }
    const dataToSend = {
      jobId: jobsInfo[currentJobSelection].id,
    };
    axios
      .put(`${BACKEND_URL}/listings/admin/acceptunverifiedjob/`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        return Swal.fire("Success", "Job has been approved", "success");
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRequestChange = (e) => {
    e.preventDefault();
    console.log(currentJobSelection);
    if (currentJobSelection === "") {
      Swal.fire("Error", "You have not selected Any Job to Accept!", "error");
      return;
    }
    handleOpen();
  };

  // these are for modal use

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setRejectReason("");
  };

  const handleReject = () => {
    const dataToSend = {
      jobId: jobsInfo[currentJobSelection].id,
      rejectReason: rejectReason,
    };
    console.log(dataToSend);
    axios
      .put(`${BACKEND_URL}/listings/admin/requestchangetojob`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((info) => {
        console.log(info);
        handleClose();
        return Swal.fire(
          "Success",
          "Changes/Requests have been requested",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "#F3F1FF",
            width: "100vw",
            height: "92vh",
          }}
        >
          <Box sx={{ paddingBottom: 5 }} />
          <Stack direction="row">
            <Grid
              container
              sx={{
                display: "flex",
                backgroundColor: "white",
                width: "22vw",
                height: "84vh",
                borderRadius: "40px",
                flexDirection: "column",
                ml: "15vw",
              }}
            >
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: theme.typography.h6.fontWeightBold,
                    pl: 3,
                    pt: 1,
                    fontSize: "1.5vw",
                  }}
                >
                  Jobs pending Approval
                </Typography>
                <Stack direction="column" sx={{ pl: 1.5 }}>
                  <Box
                    sx={{
                      width: "20vw",
                      height: "79vh",
                      overflow: "auto",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                    }}
                  >
                    {jobsData.length !== 0 ? (
                      jobsData
                    ) : (
                      <Typography
                        variant="darkP"
                        sx={{ mt: "5vh", width: "10vw", ml: "4vw" }}
                      >
                        No Jobs require Approval as of now!
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Stack
              sx={{
                direction: "column",
                ml: "5vw",
                width: "45vw",
                height: "84vh",
              }}
            >
              <Grid
                container
                sx={{
                  width: "45vw",
                  height: "74vh",
                  borderRadius: "40px",
                  flexDirection: "column",
                  overflow: "auto",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  display: "-webkit-box",
                }}
              >
                {currentJobSelection !== "" ? (
                  <IndividualJobPage
                    jobsId={jobsInfo[currentJobSelection].id}
                  />
                ) : null}
              </Grid>
              <Box sx={{ mt: "7vh" }}>
                <Stack direction="row" spacing={7}>
                  <Button
                    classes={{ root: "orange" }}
                    variant="contained"
                    onClick={onAccept}
                    style={{
                      height: "3vh",
                      width: "20vw",
                    }}
                  >
                    Approve
                  </Button>

                  <Button
                    classes={{ root: "red" }}
                    variant="contained"
                    onClick={onRequestChange}
                    style={{
                      height: "3vh",
                      width: "20vw",
                    }}
                  >
                    Request Changes
                  </Button>
                </Stack>

                <Modal open={openModal} onClose={() => handleClose()}>
                  <Box sx={style}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                    >
                      Request Change Details
                    </Typography>
                    <TextField
                      label="Reason/Changes"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={5}
                    />
                    <Stack direction="row">
                      <Button
                        variant="contained"
                        component="span"
                        onClick={handleReject}
                        style={{
                          backgroundColor: "#0E0140",
                          color: "white",
                          marginTop: "1vh",
                        }}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default AdminApproveDenyJob;
