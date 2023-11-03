import { useState, useEffect } from "react";
import {
  Box,
  ThemeProvider,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
  Modal,
  TextField,
} from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../../Assets/Styles/Theme";
import { storage } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

//for auth
import { useUserContext } from "../../Components/UserContext";

const STORAGE_KEY = "resumes/";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ResumeList({ selectMode = false, onResumeSelect = () => {} }) {
  const [fileAdded, setFileAdded] = useState(null);
  const [displayedResume, setDisplayedResume] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeDescription, setResumeDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [resumeId, setResumeId] = useState(0);
  const [refreshState, setRefreshState] = useState(0);
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [applyingMode, setApplyingMode] = useState(false);
  const [jobToApply, setJobToApply] = useState(0);
  const [currentResumeSelection, setCurrentResumeSelection] = useState("");

  const portedJobQuery = new URLSearchParams(useLocation().search).get("jobId");

  useEffect(() => {
    if (portedJobQuery) {
      setJobToApply(Number(portedJobQuery));
      setApplyingMode(true);
    }
  }, [portedJobQuery]);

  useEffect(() => {
    if (!accessToken) {
      const localAccess = currUser.accessToken;
      if (currUser) {
        setAccessToken(localAccess);
      }
    }
  }, [accessToken]);

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

  // handle resume click for edit profile mode (selectedMode)
  const handleResumeClick = (value) => {
    onResumeSelect(value);
  };

  // open modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // close modal
  const handleCloseModal = () => {
    setResumeName("");
    setResumeUrl("");
    setOpenModal(false);
  };
  // add a resume fn
  const submitData = () => {
    if (!fileAdded) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Did you upload a resume yet?",
      });
      return;
    }
    const fullStorageRef = storageRef(storage, STORAGE_KEY + fileAdded.name);
    uploadBytes(fullStorageRef, fileAdded).then(() => {
      getDownloadURL(fullStorageRef).then((url) => {
        setFileAdded(null);
        const userId = currUser.id;
        if (!currUser) {
          Swal.fire("Error!", "Cannot find user", "error");
          return;
        }
        const dataToSend = {
          resumeName: fileAdded.name,
          resumeDescription: "None for now! Add one?",
          resumeUrl: url,
        };
        axios
          .post(`${BACKEND_URL}/resumes/resume/${userId}`, dataToSend, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((info) => {
            Swal.fire("Success!", "Your posting was successful.", "success");
            setRefreshState((prev) => prev + 1);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  // edit a resume detail fn
  const handleEdit = () => {
    if (accessToken) {
      axios
        .put(
          `${BACKEND_URL}/resumes/resume/${resumeId}`,
          {
            resumeName: resumeName,
            resumeDescription: resumeDescription,
            resumeUrl: resumeUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          Swal.fire("Success!", "Your edit was successful.", "success");
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // delete 1 resume fn
  const handleDelete = () => {
    axios
      .delete(`${BACKEND_URL}/resumes/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((info) => {
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // on launch get user resume details
  useEffect(() => {
    if (accessToken && currUser) {
      const userId = currUser.id;
      axios
        .get(`${BACKEND_URL}/resumes/resume/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((info) => {
          setDisplayedResume(
            info.data.output.map((information, index) => {
              const createdTime = new Date(
                information.createdAt
              ).toLocaleDateString();
              const updatedTime = new Date(
                information.updatedAt
              ).toLocaleDateString();

              return (
                <Grid
                  key={index}
                  container
                  justifyContent="center"
                  backgroundColor="white"
                  sx={{
                    height: "8vh",
                    width: "65vw",
                    borderRadius: "20px",
                    mt: 1.5,
                    mb: 1.5,
                    cursor: selectMode ? "pointer" : "default",
                  }}
                  onClick={
                    selectMode
                      ? () => handleResumeClick(information.resumeUrl)
                      : null
                  }
                >
                  <Grid item xs={0.3} />
                  <Grid item xs={5.7} sx={{ pt: 1 }}>
                    <Stack direction="column">
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "2vh",
                          fontWeight: theme.typography.h6.fontWeight,
                        }}
                      >
                        <Link
                          to={information.resumeUrl}
                          underline="none"
                          sx={{ color: theme.typography.darkP.color }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {information.resumeTitle}
                        </Link>
                      </Typography>
                      <Typography variant="p" sx={{ fontSize: "1.45vh" }}>
                        {information.resumeDescription}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}>
                    <Stack direction="column" sx={{ mt: 1 }}>
                      <Typography
                        variant="p"
                        sx={{ mb: 1, fontSize: "1.45vh" }}
                      >
                        Date Edited
                      </Typography>
                      <Typography variant="darkP" sx={{ fontSize: "1.45vh" }}>
                        {updatedTime}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}>
                    <Stack direction="column" sx={{ mt: 1 }}>
                      <Typography
                        variant="p"
                        sx={{ mb: 1, fontSize: "1.45vh" }}
                      >
                        Date Created
                      </Typography>
                      <Typography variant="darkP" sx={{ fontSize: "1.45vh" }}>
                        {createdTime}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 2.1 }}>
                    {!applyingMode && !selectMode ? (
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#0E0140",
                          color: "white",
                          height: "4vh",
                        }}
                        onClick={() => {
                          handleOpenModal();
                          setResumeName(information.resumeTitle);
                          setResumeUrl(information.resumeUrl);
                          setResumeDescription(information.resumeDescription);
                          setResumeId(information.id);
                        }}
                      >
                        <EditIcon />
                        Edit
                      </Button>
                    ) : applyingMode ? (
                      <Button
                        variant="contained"
                        component="span"
                        style={{ backgroundColor: "#0E0140", color: "white" }}
                        onClick={() => {
                          selectResume(information.id);
                        }}
                      >
                        <EditIcon />
                        Select
                      </Button>
                    ) : (
                      ""
                    )}

                    <Modal open={openModal} onClose={() => handleCloseModal()}>
                      <Box sx={style}>
                        <Typography variant="h6">
                          Edit Resume Details
                        </Typography>
                        <TextField
                          label="Name"
                          value={resumeName}
                          onChange={(e) => setResumeName(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Description"
                          value={resumeDescription}
                          onChange={(e) => setResumeDescription(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="URL"
                          value={resumeUrl}
                          onChange={(e) => setResumeUrl(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <Stack direction="row" spacing={21}>
                          <Button
                            variant="contained"
                            component="span"
                            style={{
                              backgroundColor: "#0E0140",
                              color: "white",
                            }}
                            onClick={handleEdit}
                          >
                            Submit
                          </Button>{" "}
                          <Button
                            variant="contained"
                            component="span"
                            style={{
                              backgroundColor: "#0E0140",
                              color: "white",
                            }}
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
                  </Grid>
                </Grid>
              );
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    openModal,
    resumeDescription,
    resumeName,
    resumeUrl,
    refreshState,
    accessToken,
  ]);

  const applyJob = () => {
    const resumeToSend = currentResumeSelection;
    const jobToSend = jobToApply;
    const userToSend = currUser.id;
    const dataToSend = {
      resumeId: resumeToSend,
      userId: userToSend,
      jobId: jobToSend,
    };
    axios
      .post(`${BACKEND_URL}/application/submitapplication`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((info) => {
        Swal.fire(
          "Success",
          "Your Job Application has been sent with your chosen Resume.",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectResume = (id) => {
    if (applyingMode) {
      setCurrentResumeSelection(id);
      Swal.fire(
        "Success",
        "Selected Resume has been chosen, please proceed with application.",
        "success"
      );
    }
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{
            backgroundColor: "#F3F1FF",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!selectMode ? (
            <div>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: theme.typography.h4.fontWeightBold,
                  mt: 3,
                  mb: 1.5,
                }}
              >
                Resume
              </Typography>

              <Typography
                variant="darkP"
                sx={{
                  fontWeight: theme.typography.darkP.fontWeight,
                  color: theme.typography.darkP.color,
                  mb: 4,
                }}
              >
                Please upload your resume. If you do not have one currently,
                click <Link to="/createresume">here</Link> to start making one!
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "1.33vh",
                  pr: "50vw",
                }}
              >
                Resume Requirements?
              </Typography>
              <Grid
                container
                justifyContent="center"
                backgroundColor="white"
                sx={{ height: "8vh", width: "65vw", borderRadius: "20px" }}
              >
                <Grid item xs={0.3} />
                <Grid item xs={9.0} sx={{ pt: 0.7 }}>
                  <Stack direction="column">
                    <Stack direction="row">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: theme.typography.h6.fontWeightBold,
                          fontSize: "2.1vh",
                        }}
                      >
                        Upload Resume
                      </Typography>
                      <ContentPasteSearchIcon sx={{ ml: 0.5 }} />
                    </Stack>
                    <label>
                      {fileAdded ? (
                        <Typography variant="p">{fileAdded.name}</Typography>
                      ) : (
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: "1.4vh",
                          }}
                        >
                          Click here to select the file to upload
                        </Typography>
                      )}

                      <input
                        hidden
                        accept="application/pdf"
                        type="file"
                        onChange={(e) => {
                          setFileAdded(e.target.files[0]);
                        }}
                      />
                    </label>
                  </Stack>
                </Grid>
                <Grid item xs={2.7} sx={{ mt: "1.7vh" }}>
                  <Button
                    variant="contained"
                    component="span"
                    style={{
                      backgroundColor: "#FF6B2C",
                      color: "white",
                      height: "4vh",
                      width: "12vw",
                    }}
                    onClick={submitData}
                  >
                    <DriveFolderUploadIcon sx={{ mr: 1 }} />
                    <Typography
                      sx={{
                        fontSize: "1.5vh",
                        fontWeight: theme.typography.h6.fontWeightBold,
                      }}
                    >
                      Upload
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : (
            ""
          )}
          <Divider sx={{ width: "50vw", mt: 5 }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: theme.typography.h4.fontWeightBold,
              mt: 3,
            }}
          >
            Current Resumes
          </Typography>
          {displayedResume.length !== 0 ? (
            displayedResume
          ) : (
            <Typography
              variant="p"
              sx={{ fontSize: theme.typography.h6.fontSize }}
            >
              No Resumes Available Yet!
            </Typography>
          )}
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            {applyingMode ? (
              <Button
                variant="contained"
                classes={{ root: "orange" }}
                style={{
                  width: "12vw",
                }}
                onClick={applyJob}
              >
                Submit Resume
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

export default ResumeList;
