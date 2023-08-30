import {
  Box,
  ThemeProvider,
  Grid,
  Typography,
  InputLabel,
  InputAdornment,
  FormControl,
  Input,
  Stack,
  Button,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { theme } from "../Assets/Styles/Theme";
import { useUserContext } from "../Components/UserContext";
import PlaceIcon from "@mui/icons-material/Place";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SearchIcon from "@mui/icons-material/Search";
import desktop from "../Assets/Images/homeBackground/desktop2.png";
import mobile from "../Assets/Images/homeBackground/mobile.png";
import people from "../Assets/Images/homeBackground/people.png";
import FnB from "../Assets/Images/Buttons/FnB.png";
import Admin from "../Assets/Images/Buttons/Admin.png";
import Designer from "../Assets/Images/Buttons/Designer.png";
import Education from "../Assets/Images/Buttons/Education.png";
import Engineering from "../Assets/Images/Buttons/Engineering.png";
import Technology from "../Assets/Images/Buttons/Technology.png";
import "../Assets/Styles/Homepage.css";

function Homepage() {
  const [accessToken, setAccessToken] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const imageUrl = windowWidth >= 650 ? desktop : mobile;
  const imgWidth = windowWidth >= 980 ? "auto" : "auto";
  const imgHeight = windowHeight >= 900 ? "80%" : "65%";
  const vh = windowHeight >= 950 ? "80vh" : "70vh";
  const { setCurrUser, currUser } = useUserContext();
  const roles = { user: 1, admin: 2, employer: 3 };
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (isAuthenticated) {
      const role = JSON.parse(localStorage.getItem("role"));
      const checkLogin = async () => {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
            scope: process.env.REACT_APP_SCOPE,
          },
        });
        setAccessToken(accessToken);
        const currentUser = user;

        console.log(role);
        if (role !== null) {
          if (role === "user") {
            currentUser.role = roles.user;
            console.log(currentUser);
          } else if (role === "employer") {
            currentUser.role = roles.employer;
            console.log("Role: ", role);
          }
        }

        console.log(currentUser);
        if (accessToken !== null && typeof currentUser.email !== "undefined") {
          try {
            const userInfo = await axios.post(
              `${BACKEND_URL}/users/login`,
              currentUser,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            console.log(userInfo.data.checkedUser);
            if (userInfo != null) {
              setCurrUser(userInfo.data.checkedUser);
              console.log(currUser);
            }
          } catch (err) {
            console.log(err);
          }
        }
      };
      checkLogin();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("Token", JSON.stringify(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (currUser !== null || currUser !== "") {
      localStorage.setItem("currUser", JSON.stringify(currUser));
    }
  }, [currUser]);

  useEffect(() => {
    console.log(setCurrUser);
  }, [setCurrUser]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    const debounce = (func, delay) => {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    const debouncedHandleResize = debounce(handleWindowResize, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          height: windowHeight >= 600 ? "90vh" : "88.2vh",
        }}
      >
        <Grid Container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Box
              className="container"
              component="div"
              sx={{
                minHeight: `${vh}`,
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              {windowWidth >= 650 ? (
                <Box>
                  <Typography
                    variant="h1"
                    className="title"
                    sx={{
                      fontFamily: theme.typography.h1Title.fontFamily,
                      fontSize: windowHeight >= 600 ? "7rem" : "5rem",
                    }}
                  >
                    verve
                  </Typography>
                  <Typography
                    variant="h3"
                    className="subtitle"
                    sx={{
                      fontFamily: theme.typography.h3Cursive.fontFamily,
                      fontSize:
                        windowHeight >= 600 && windowWidth >= 980
                          ? "4rem"
                          : "2.5rem",
                      left: windowWidth >= 1400 ? "56%" : "45%",
                    }}
                  >
                    Where Journeys Thrive
                  </Typography>
                  <Box
                    component="img"
                    src={people} // Set the path to your overlay image
                    alt="People"
                    width={imgWidth}
                    height={imgHeight}
                    style={{
                      position: "absolute",
                      top: windowHeight >= 600 ? "40%" : "36%", // Adjust vertically
                      left: windowHeight >= 550 ? "53%" : "50%", // Adjust horizontally
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />{" "}
                </Box>
              ) : (
                ""
              )}

              <Box
                id="line174"
                style={{
                  width: windowHeight >= 600 ? "50%" : "70%",
                  marginLeft:
                    windowHeight >= 600
                      ? "40%"
                      : // : windowWidth >= 450
                        // ? "1%"
                        "30%",
                  backgroundColor: "#FFFFFF",
                  position: "relative",
                  top: windowHeight >= 900 ? "4rem" : 0,
                }}
              >
                <Stack
                  spacing={2}
                  direction={windowWidth >= 767 ? "row" : "column"}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="location-input">
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                      >
                        Location
                      </Typography>
                    </InputLabel>
                    <Input
                      id="location-input"
                      value={location}
                      onChange={(e) => setLocation(e.target.location)}
                      startAdornment={
                        <InputAdornment position="start">
                          <PlaceIcon sx={{ color: "#0E0140" }} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  {/* Second Text Field (Behind the First Text Field) */}
                  <FormControl variant="standard">
                    <InputLabel htmlFor="type-input">
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                      >
                        Type
                      </Typography>
                    </InputLabel>
                    <Input
                      id="type-input"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <WorkHistoryIcon sx={{ color: "#0E0140" }} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    classes={{ root: "orange" }}
                    variant="contained"
                    startIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <Grid
                container
                rowspacing={1}
                pt="8px"
                pb="8px"
                sx={{
                  backgroundColor: "#0E0140",
                  flex: 1,
                  mt: windowHeight >= 900 ? "3rem" : "-1.1rem",
                }}
                color="#FFFFFF"
              >
                <Grid item xs={6} md={2}>
                  <Link to="/categories/:categoryId">
                    <Box
                      component="img"
                      className="categoryBoxStyles"
                      height={windowHeight >= 900 ? "80px" : "60px"}
                      src={FnB}
                      alt="F&B"
                      sx={theme.customStyles.categoryBox}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Link
                    to="/categories/:categoryId"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      className="categoryBoxStyles"
                      height={windowHeight >= 900 ? "80px" : "60px"}
                      src={Admin}
                      alt="Administrative"
                      sx={theme.customStyles.categoryBox}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Link
                    to="/categories/:categoryId"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      className="categoryBoxStyles"
                      height={windowHeight >= 900 ? "80px" : "60px"}
                      src={Designer}
                      alt="Designer"
                      sx={theme.customStyles.categoryBox}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Link
                    to="/categories/:categoryId"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      className="categoryBoxStyles"
                      height={windowHeight >= 900 ? "80px" : "60px"}
                      src={Technology}
                      alt="Technology"
                      sx={theme.customStyles.categoryBox}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Link
                    to="/categories/:categoryId"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      className="categoryBoxStyles"
                      height={windowHeight >= 900 ? "80px" : "60px"}
                      src={Engineering}
                      alt="Engineering"
                      sx={theme.customStyles.categoryBox}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Link
                    to="/categories/:categoryId"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      className="categoryBoxStyles"
                      height={windowHeight >= 900 ? "80px" : "60px"}
                      src={Education}
                      alt="Education"
                      sx={theme.customStyles.categoryBox}
                    />
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            flexGrow: 1,
            backgroundColor: "#FF6B2C",
            p: windowHeight >= 900 ? 1.7 : 0.7,
          }}
        >
          <Typography
            textAlign="center"
            variant="h5"
            sx={{
              color: "#FFFFFF",
              fontWeight: theme.typography.h5.fontWeightBold,
            }}
          >
            Browse All
          </Typography>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Homepage;
