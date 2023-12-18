import {
  Box,
  ThemeProvider,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Stack,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { theme } from "../Assets/Styles/Theme";
import { useUserContext } from "../Components/UserContext";
import SearchIcon from "@mui/icons-material/Search";

import desktop from "../Assets/Images/homeBackground/desktop2.png";
import mobile from "../Assets/Images/homeBackground/mobile.png";
import "../Assets/Styles/Homepage.css";
import { ROLES } from "../Utils/Constants";

function HomepageCopy() {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [location, setLocation] = useState(6);
  const [type, setType] = useState("Full Time");
  const isSmallScreen = useMediaQuery("( max-height: 600px)");
  const isMobile = useMediaQuery("(max-width: 480px)");
  const { setCurrUser } = useUserContext();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const styles = {
    smallScreen: {
      minHeight: "8vh",
    },
    largeScreen: {
      minHeight: "10vh",
    },
  };

  const handleChange = (e, index) => {
    if (index === 0) {
      setLocation(e.target.value);
    } else setType(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/job-search?location=${location}&type=${type}`);
  };

  const handleBrowseAll = (e) => {
    e.preventDefault();
    navigate(`/job-categories`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const role = JSON.parse(localStorage.getItem("verveRole"));
      const checkLogin = async () => {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
            scope: process.env.REACT_APP_SCOPE,
          },
        });

        const currentUser = user;

        console.log(role);
        if (role !== null) {
          if (role === "user") {
            currentUser.role = ROLES.user;
            console.log("Role is: ", currentUser);
          } else if (role === "employer") {
            currentUser.role = ROLES.employer;
            console.log("Role: ", role);
          } else if (role === "admin") {
            currentUser.role = ROLES.admin;
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
            const userObject = userInfo.data.checkedUser;
            userObject.accessToken = accessToken;
            if (userInfo != null) {
              setCurrUser(userObject);
            }
          } catch (error) {
            console.log(error);
          }
        }
      };
      checkLogin();
    }
  }, [user, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        display="flex"
        direction="row"
        justifyContent="center"
        spacing={0}
        sx={{ height: isSmallScreen ? "88vh" : "92.2vh" }}
      >
        {/* row1 */}
        <Grid item xs={12}>
          <Box
            className="hero"
            component="img"
            src={isMobile ? mobile : desktop}
            sx={{ height: "auto", width: "100%" }}
          />
        </Grid>
        {/* row 2 */}

        <Grid item xs={12} pt={0} pl={3} pr={3} mb={1}>
          <Box>
            <Stack
              display="flex"
              direction={isMobile ? "column" : "row"}
              justifyContent="center"
              spacing={4}
            >
              <FormControl variant="standard" sx={{ minWidth: "200px" }}>
                <InputLabel htmlFor="location-input">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                  >
                    Location
                  </Typography>
                </InputLabel>
                <Select
                  labelId="employmentLocationLabel"
                  label="Employment Location"
                  id="employmentLocation"
                  value={location}
                  onChange={(e) => handleChange(e, 0)}
                >
                  <MenuItem value={6}>
                    <em>Any</em>
                  </MenuItem>
                  <MenuItem value={1}>Central</MenuItem>
                  <MenuItem value={2}>East</MenuItem>
                  <MenuItem value={4}>North-East</MenuItem>
                  <MenuItem value={3}>North</MenuItem>
                  <MenuItem value={5}>West</MenuItem>
                </Select>
              </FormControl>

              {/* Second Text Field (Behind the First Text Field) */}
              <FormControl variant="standard" sx={{ minWidth: "200px" }}>
                <InputLabel htmlFor="type-input">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                  >
                    Type
                  </Typography>
                </InputLabel>
                <Select
                  labelId="employmentTypeLabel"
                  label="Employment Type"
                  id="employmentType"
                  value={type}
                  onChange={(e) => handleChange(e, 1)}
                >
                  <MenuItem value="Full Time">Full-Time</MenuItem>
                  <MenuItem value="Part Time">Part-Time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </Select>
              </FormControl>
              <Button
                classes={{ root: "orange" }}
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Stack>
          </Box>
        </Grid>

        {/* row 3 */}
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          xs={12}
          sx={{
            backgroundColor: "#0E0140",
            textAlign: "center",
            color: "#FFFFFF",
            mt: "auto",
            ...(isSmallScreen ? styles.smallScreen : styles.largeScreen),
          }}
        >
          <Button
            variant="text"
            // classes={{ root: "blue" }}
            onClick={handleBrowseAll}
          >
            <Typography
              variant={isSmallScreen ? "h5" : "h4"}
              sx={{
                fontWeight: theme.typography.h5.fontWeightBold,
                color: "#FFFFFF",
              }}
            >
              BROWSE ALL
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default HomepageCopy;
