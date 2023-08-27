import { Box, ThemeProvider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { theme } from "../Assets/Styles/Theme";
import { useUserContext } from "../Components/UserContext";

import "../Assets/Styles/Homepage.css";

function Homepage() {
  const [accessToken, setAccessToken] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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
  return (
    <Grid Container justify="center">
      <Box className="hero-image">
        <Box></Box>
      </Box>
    </Grid>
  );
}

export default Homepage;
