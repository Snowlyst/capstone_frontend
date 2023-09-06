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

function AdminManageExistingUserCompany() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [usersData, setUsersData] = useState("");
  const [usersDisplay, setUsersDisplay] = useState("");
  const [companyData, setCompanyData] = useState("");
  const [companyDisplay, setCompanyDisplay] = useState("");
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [currentEntitySelection, setCurrentEntitySelection] = useState("");
  const [userMode, setUserMode] = useState(true);
  const [axiosLoading, setAxiosLoading] = useState(false);

  const navigate = useNavigate();

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
          .get(`${BACKEND_URL}/users/admin/checkverifiedusersandcompany`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((info) => {
            console.log(info);
            setUsersData(info.data[0]);
            setUsersDisplay(
              info.data[0].map((info, index) => {
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
                              onClick={() => setCurrentEntitySelection(index)}
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
            setCompanyData(info.data[1]);
            setCompanyDisplay(
              info.data[1].map((info, index) => {
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
                        <Link href={`/companyprofile/${info.id}`}>
                          <img
                            alt="Logo"
                            src={
                              info.companyLogo ||
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
                        </Link>
                      </Grid>
                      <Grid item xs={8}>
                        <Box>
                          <Link href={"#"} underline="hover">
                            <Box
                              component="div"
                              onClick={() => setCurrentEntitySelection(index)}
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
                                {info.companyName}
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
                              {info.address}
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
                              {info.postalCode}
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

  //unverifying a user (removing verify perms)
  const unverifyUser = () => {
    const userId = usersData[currentEntitySelection].id;
    console.log(userId);
    const dataToSend = {
      userId: userId,
    };
    axios
      .put(`${BACKEND_URL}/users/admin/unverifyuser`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((info) => {
        console.log(info);
        return Swal.fire("Success", "User has been unverified", "success");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  //unverifying a company (removing verify perms)
  const unverifyCompany = () => {
    const companyId = companyData[currentEntitySelection].id;
    console.log(companyId);
    const dataToSend = {
      companyId: companyId,
    };
    axios
      .put(`${BACKEND_URL}/company/admin/unverifycompany`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((info) => {
        console.log(info);
        return Swal.fire("Success", "Company has been unverified", "success");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload();
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
            <Stack direction="column">
              <Grid
                container
                sx={{
                  display: "flex",
                  backgroundColor: "white",
                  width: "22vw",
                  height: "78vh",
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
                    Current Verified Users
                  </Typography>
                  <Stack direction="column" sx={{ pl: 1.5 }}>
                    <Box
                      sx={{
                        width: "20vw",
                        height: "72vh",
                        overflow: "auto",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                      }}
                    >
                      {usersDisplay.length === 0 && userMode ? (
                        <Box sx={{ mt: "5vh", width: "10vw", ml: "5vw" }}>
                          <Typography variant="darkP">
                            No current verified users in Database!
                          </Typography>
                        </Box>
                      ) : null}
                      {usersDisplay.length !== 0 && userMode
                        ? usersDisplay
                        : null}
                      {companyDisplay.length === 0 && !userMode ? (
                        <Box sx={{ mt: "5vh", width: "10vw", ml: "5vw" }}>
                          <Typography variant="darkP">
                            No current verified companies in Database!
                          </Typography>
                        </Box>
                      ) : null}
                      {companyDisplay.length !== 0 && !userMode
                        ? companyDisplay
                        : null}
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ mt: "3vh" }}>
                <Stack direction="row" sx={{ ml: "15vw" }}>
                  <Button
                    classes={{ root: "orange" }}
                    variant="contained"
                    style={{
                      height: "3vh",
                      width: "11vw",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    onClick={() => {
                      setUserMode(true);
                      setCurrentEntitySelection("");
                    }}
                    disabled={userMode}
                  >
                    Users
                  </Button>
                  <Button
                    classes={{ root: "blue" }}
                    variant="contained"
                    style={{
                      height: "3vh",
                      width: "11vw",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onClick={() => {
                      setUserMode(false);
                      setCurrentEntitySelection("");
                    }}
                    disabled={!userMode}
                  >
                    Companies
                  </Button>
                </Stack>
              </Box>
            </Stack>
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
              >
                {currentEntitySelection !== "" && !userMode ? (
                  <>
                    <Grid item xs={3}>
                      <img
                        src={
                          companyData[currentEntitySelection].bannerUrl ||
                          "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64"
                        }
                        alt="Alt"
                        style={{
                          height: "22.4vh",
                          width: "44vw",
                          objectFit: "fill",
                          borderTopLeftRadius: "40px",
                          borderTopRightRadius: "40px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Grid
                        container
                        sx={{
                          flexDirection: "row",
                          width: "44vw",
                          height: "100%",
                        }}
                      >
                        <Grid item xs={3}>
                          <img
                            alt="Company Logo"
                            src={
                              companyData[currentEntitySelection].companyLogo ||
                              "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64"
                            }
                            style={{
                              width: "8.1vw",
                              height: "8.1vh",
                              marginLeft: "2.3vw",
                              marginTop: "2.7vh",
                              objectFit: "fill",
                              borderRadius: "40px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: theme.typography.h5.fontWeightBold,
                              mt: 1,
                              mb: 1,
                              wordWrap: "break-word",
                              overflow: "hidden",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              display: "-webkit-box",
                            }}
                          >
                            {companyData[currentEntitySelection].companyName ||
                              "Here is Company Name"}
                          </Typography>

                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: 13,
                            }}
                          >
                            Established on:
                            <Typography
                              variant="p"
                              sx={{
                                fontSize: 13,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {companyData[currentEntitySelection]
                                .establishmentDate || "99, 99th Month, 9999"}
                            </Typography>
                          </Typography>

                          <Box
                            component="div"
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              mr: 0.23,
                              mt: 0.3,
                            }}
                          >
                            <Typography variant="darkp" sx={{ fontSize: 13 }}>
                              Address:{" "}
                              <Typography variant="p">
                                {companyData[currentEntitySelection].address ||
                                  "RANDOM ROAD 1"}
                              </Typography>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ mb: 1 }} />
                    <Grid item sx={{ mt: 1, ml: 3, mr: 3 }}>
                      <Typography
                        variant="darkP"
                        sx={{
                          fontSize: theme.typography.h5.fontSize,
                          fontWeight: theme.typography.h5.fontWeightBold,
                        }}
                      >
                        About Company:
                        <br />
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: theme.typography.h6.fontSize,
                            overflow: "auto",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: "8",
                            WebkitBoxOrient: "vertical",
                            display: "-webkit-box",
                          }}
                        >
                          {companyData[currentEntitySelection].description ||
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                        </Typography>
                      </Typography>
                    </Grid>
                  </>
                ) : null}
                {currentEntitySelection === "" && !userMode ? (
                  <Box sx={{ mt: "15vh", width: "20vw", ml: "15vw" }}>
                    <Typography variant="darkP">
                      No Company Selected Yet!
                    </Typography>
                  </Box>
                ) : null}
                {currentEntitySelection !== "" && userMode ? (
                  <>
                    <Grid item xs={2.5} sx={{ ml: "2.5vw" }}>
                      <Box sx={{ ml: "13.5vw", mt: "3vh" }}>
                        <img
                          src={
                            usersData[currentEntitySelection].avatarUrl ||
                            "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64"
                          }
                          alt="Alt"
                          style={{
                            height: "10vh",
                            width: "10vw",
                            objectFit: "fill",
                            borderTopLeftRadius: "40px",
                            borderTopRightRadius: "40px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={9.5} sx={{ ml: "2.5vw", width: "20vw" }}>
                      <Stack direction="row" sx={{ width: "45vw" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "22.5vw",
                          }}
                        >
                          Name:
                          <Typography
                            variant="darkP"
                            sx={{ fontSize: "1.3vw", width: "22.5vh" }}
                          >
                            {" "}
                            {usersData[currentEntitySelection].firstName}{" "}
                            {usersData[currentEntitySelection].lastName}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                          }}
                        >
                          Date of Birth:
                          <Typography
                            variant="darkP"
                            sx={{ fontSize: "1.3vw", width: "22.5vh" }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.dateOfBirth
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "22.5vw",
                          }}
                        >
                          IC:
                          <Typography
                            variant="darkP"
                            sx={{ fontSize: "1.3vw ", width: "22.5vw" }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.identificationNumber
                            }
                          </Typography>
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                          }}
                        >
                          Gender:
                          <Typography
                            variant="darkP"
                            sx={{ fontSize: "1.3vw" }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.gender
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "22.5vw",
                          }}
                        >
                          Mobile:
                          <Typography
                            variant="darkP"
                            sx={{ fontSize: "1.3vw ", width: "22.5vw" }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.mobileNumber
                            }
                          </Typography>
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                          }}
                        >
                          Email:
                          <Typography
                            variant="darkP"
                            sx={{ fontSize: "1.3vw" }}
                          >
                            {usersData[currentEntitySelection].email}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        sx={{ width: "45vw", mt: "2vh", height: "7vh" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "45vw",
                          }}
                        >
                          Address:
                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: "1.3vw ",
                              width: "45vw",
                            }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.streetAddress
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "45vw",
                          }}
                        >
                          Current Work Status:
                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: "1.3vw ",
                              width: "45vw",
                              height: "7vh",
                            }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.currentWorkStatus
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "45vw",
                          }}
                        >
                          Readiness to RTW:
                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: "1.3vw ",
                              width: "45vw",
                              height: "7vh",
                            }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.readinessToRtw
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "45vw",
                          }}
                        >
                          Physical Barriers to RTW:
                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: "1.3vw ",
                              width: "45vw",
                              height: "7vh",
                            }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.physicalBarriersToRtw
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "45vw",
                          }}
                        >
                          Time frame to RTW:
                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: "1.3vw ",
                              width: "45vw",
                              height: "7vh",
                            }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.timeFrameToRtw
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ width: "45vw", mt: "2vh" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            fontSize: "1.3vw",
                            width: "45vw",
                          }}
                        >
                          Active Treatment:
                          <Typography
                            variant="darkP"
                            sx={{
                              fontSize: "1.3vw ",
                              width: "45vw",
                              height: "7vh",
                            }}
                          >
                            {
                              usersData[currentEntitySelection]
                                .user_personal_detail.activeTreatment
                            }
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                  </>
                ) : null}
                {currentEntitySelection === "" && userMode ? (
                  <Box sx={{ mt: "15vh", width: "20vw", ml: "15vw" }}>
                    <Typography variant="darkP">
                      No User Selected Yet!
                    </Typography>
                  </Box>
                ) : null}
              </Grid>
              <Box sx={{ mt: "3vh", ml: "12vw" }}>
                {userMode ? (
                  <Button
                    classes={{ root: "red" }}
                    variant="contained"
                    onClick={unverifyUser}
                    style={{
                      height: "3vh",
                      width: "20vw",
                    }}
                  >
                    Remove Verification from User
                  </Button>
                ) : (
                  <Button
                    classes={{ root: "red" }}
                    variant="contained"
                    onClick={unverifyCompany}
                    style={{
                      height: "3vh",
                      width: "20vw",
                    }}
                  >
                    Remove Verification from Company
                  </Button>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default AdminManageExistingUserCompany;
