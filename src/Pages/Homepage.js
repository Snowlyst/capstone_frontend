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
  IconButton,
  ButtonBase,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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

  useEffect(() => {
    if (isAuthenticated) {
      const checkLogin = async () => {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
            scope: process.env.REACT_APP_SCOPE,
          },
        });
        setAccessToken(accessToken);
        const role = JSON.parse(localStorage.getItem("role"));
        // }
        if (isAuthenticated) {
          console.log("User: ", user);
        }
        console.log("Access Token : ", accessToken);
        const currentUser = user;
        if (role === "user") {
          // user db
          currentUser.role = "user";
          console.log("Role: ", role);
        } else if (role === "employer") {
          // employer db
          currentUser.role = "employer";
          console.log("Role: ", role);
        }
        // if (
        //   isAuthenticated &&
        //   accessToken !== null &&
        //   typeof user.email !== "undefined"
        // ) {
        //   //login
        //   // const userInfo = await axios.post(
        //   //   `${BACKEND_URL}/listings/login`,
        //   //   user
        //   // );
        //   // console.log(userInfo.data.checkedUser);
        //   // if (userInfo != null) {
        //   //   setCurrUser(userInfo.data.checkedUser);
        //   // }
        // }
      };
      checkLogin();
      console.log(user);
      console.log(accessToken);
    }
  }, [user, isAuthenticated, getAccessTokenSilently, accessToken]);

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
                      fontSize: windowHeight >= 600 ? "4rem" : "2.5rem",
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
                spacing={2}
                sx={{
                  backgroundColor: "#0E0140",
                  flex: 1,
                  mt: windowHeight >= 900 ? "3rem" : "-1.1rem",
                }}
                color="#FFFFFF"
              >
                <Grid item xs={6} md={2}>
                  <Box
                    component="img"
                    height={windowHeight >= 900 ? "80px" : "60px"}
                    src={FnB}
                    alt="F&B"
                    sx={theme.customStyles.categoryBox}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    component="img"
                    height={windowHeight >= 900 ? "80px" : "60px"}
                    src={Admin}
                    alt="Administrative"
                    sx={theme.customStyles.categoryBox}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    component="img"
                    height={windowHeight >= 900 ? "80px" : "60px"}
                    src={Designer}
                    alt="Designer"
                    sx={theme.customStyles.categoryBox}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    component="img"
                    height={windowHeight >= 900 ? "80px" : "60px"}
                    src={Technology}
                    alt="Technology"
                    sx={theme.customStyles.categoryBox}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    component="img"
                    height={windowHeight >= 900 ? "80px" : "60px"}
                    src={Engineering}
                    alt="Engineering"
                    sx={theme.customStyles.categoryBox}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box
                    component="img"
                    height={windowHeight >= 900 ? "80px" : "60px"}
                    src={Education}
                    alt="Education"
                    sx={theme.customStyles.categoryBox}
                  />
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
