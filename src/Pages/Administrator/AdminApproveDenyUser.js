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
import AxiosLoader from "../../Components/AxiosLoader";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function AdminApproveDenyUserCompanies() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [usersData, setUsersData] = useState("");
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [currentEntitySelection, setCurrentEntitySelection] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userMode, setUserMode] = useState(true);
  const [axiosLoading, setAxiosLoading] = useState(false);

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
        setAxiosLoading(true);
        axios
          .get(`${BACKEND_URL}/users/admin/checkunverifieduserandcompany`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((info) => {
            console.log(info);
            setUsersData(
              info.data[0].map((info, index) => {
                console.log(info);
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
                            null ||
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
                          <Link href="#" underline="hover">
                            <Box
                              component="div"
                              onClick={() => setCurrentEntitySelection(info.id)}
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
                                {info.firstName} {info.lastName}
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
                              {info.user_personal_detail.identificationNumber}
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
                              {info.email}
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
          })
          .finally(() => {
            setAxiosLoading(false);
          });
      }
    }
  }, [isLoaded, currUser]);

  const onAccept = (e) => {
    e.preventDefault();
    console.log(currentEntitySelection);
    if (currentEntitySelection === 0) {
      Swal.fire("Error", "You have not selected Any User to Accept!", "error");
      return;
    }
    const dataToSend = {
      entityId: currentEntitySelection,
    };
    if (userMode) {
      setAxiosLoading(true);
      axios
        .put(`${BACKEND_URL}/users/admin/approveunverifieduser/`, dataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          return Swal.fire("Success", "User has been approved", "success");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setAxiosLoading(false);
        });
    }
  };

  const onRequestChange = (e) => {
    e.preventDefault();
    console.log(currentEntitySelection);
    if (currentEntitySelection === 0) {
      Swal.fire(
        "Error",
        "You have not selected Any Entity to Reject!",
        "error"
      );
      return;
    }
    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    handleOpen();
  };

  // these are for modal use

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReject = () => {
    setAxiosLoading(true);
    const entityId = currentEntitySelection;
    axios.delete(
      `${BACKEND_URL}/users/admin/deleteunverifieduser/${entityId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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
                  Users pending Approval
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
                    {usersData.length !== 0 ? (
                      usersData
                    ) : (
                      <Box sx={{ mt: "5vh", width: "10vw", ml: "5vw" }}>
                        <Typography variant="darkP">
                          No Users require Approval as of now!
                        </Typography>
                      </Box>
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
                  display: "flex",
                  backgroundColor: "white",
                  width: "45vw",
                  height: "78vh",
                  borderRadius: "40px",
                  flexDirection: "column",
                }}
              ></Grid>
              <Box sx={{ mt: "3vh" }}>
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
                    Reject(Delete) User
                  </Button>
                </Stack>

                <Modal open={openModal} onClose={() => handleClose()}>
                  <Box sx={style}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: theme.typography.h5.fontWeightBold }}
                    >
                      Are you SURE? This process is irreversible.
                    </Typography>
                    <Typography
                      variant="darkP"
                      sx={{ fontWeight: theme.typography.darkP.fontWeightBold }}
                    >
                      Delete button is disabled for 5 seconds to prevent
                      accidents.
                    </Typography>
                    <Stack direction="row" spacing={15}>
                      <Button
                        classes={{ root: "orange" }}
                        variant="contained"
                        component="span"
                        onClick={handleClose}
                        style={{
                          marginTop: "1vh",
                        }}
                      >
                        Do Not Delete
                      </Button>
                      <Button
                        classes={{ root: "red" }}
                        variant="contained"
                        component="span"
                        onClick={handleReject}
                        style={{
                          marginTop: "1vh",
                        }}
                        disabled={isButtonDisabled}
                      >
                        Delete
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

export default AdminApproveDenyUserCompanies;
