import { useEffect, useState } from "react";
import { useUserContext } from "../Components/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Login() {
  const [accessToken, setAccessToken] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { currUser, setCurrUser } = useUserContext();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const roles = { user: 1, admin: 2, employer: 3 };

  //login
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
        setAccessToken(accessToken);
        const currentUser = user;

        console.log(role);
        if (role !== null) {
          if (role === "user") {
            currentUser.role = roles.user;
            console.log("Role is: ", currentUser);
          } else if (role === "employer") {
            currentUser.role = roles.employer;
            console.log("Role: ", role);
          } else if (role === "admin") {
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

  useEffect(() => {
    console.log(currUser);
  }, [currUser]);

  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("verveToken", JSON.stringify(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (currUser !== null || currUser !== "") {
      localStorage.setItem("verveCurrUser", JSON.stringify(currUser));
    }
  }, [currUser]);

  return null;
}

export default Login;
