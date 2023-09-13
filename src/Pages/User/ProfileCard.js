import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  ThemeProvider,
  Stack,
} from "@mui/material";
import { useUserContext } from "../../Components/UserContext";
import { Link } from "react-router-dom";
import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { theme } from "../../Assets/Styles/Theme";
import axios from "axios";
import "../../Assets/Styles/EditProfile.css";
import styled from "@emotion/styled";
import AxiosLoader from "../../Components/AxiosLoader";

const EditProfile = () => {
  const { currUser } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [profileData, setProfileData] = useState("");
  const [user, setUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [axiosLoading, setAxiosLoading] = useState(false);

  //make sure currUser is set or else the navigate gonna boot everyone off the screen
  useEffect(() => {
    console.log(currUser);
    if (currUser) {
      const localAccess = currUser.id;
      setAccessToken(localAccess);
      console.log("access token ready: ", accessToken);
      setIsLoaded(true);
      setAxiosLoading(false);
    } else if (!currUser) {
      setAxiosLoading(true);
    }
  }, []);

  useEffect(() => {
    console.log(currUser);
    if (currUser !== null) {
      setUser(currUser.id);
    }
  }, [currUser]);

  const StyledLink = styled(Link)`
    color: hotpink;
    text-decoration: none;
    margin: 1rem;
    position: relative;
    cursor: pointer;
  `;

  useEffect(() => {
    const getProfile = async () => {
      if (user !== null) {
        try {
          const id = Number(user);
          const userProfile = await axios.get(
            `${BACKEND_URL}/users/personalinfo/${id}`
          );
          console.log(userProfile.data);
          setProfileData(userProfile.data);
        } catch (error) {
          console.error("API call failed: ", error);
        }
      }
    };
    getProfile();
  }, [user]);

  return (
    <Grid container sx={theme.customStyles.centered.container}>
      <div>
        {axiosLoading && <AxiosLoader />}
        <Container
          sx={{
            maxWidth: "880px",
          }}
        >
          <ThemeProvider theme={theme}>
            <Stack spacing={3} mt={2} mb={6}>
              {/* <Typography
                variant="h4"
                sx={{
                  font: theme.typography.h4.fontWeight,
                  fontWeight: theme.typography.h4.fontWeightBold,
                  textAlign: "center",
                }}
              >
                Profile Card
              </Typography> */}
              <Typography
                variant="p"
                sx={{ font: theme.typography.p.fontWeight }}
              >
                This is the profile card your employer can see when they click
                on your profile. To edit information here, please edit your
                profile.
              </Typography>
            </Stack>
          </ThemeProvider>

          <Box id="card-body">
            <Box id="login-container">
              <Avatar className="profile-img" src={currUser.avatarUrl}></Avatar>

              {profileData ? (
                profileData.user_personal_detail ? (
                  <Stack direction="column">
                    <h1>
                      {profileData.firstName}, {profileData.lastName}
                    </h1>
                    <div className="description">
                      Mobile: {profileData.user_personal_detail.mobileNumber}
                      <br />
                      Address: {profileData.user_personal_detail.streetAddress}
                      <br />
                      Occupation: {profileData.user_personal_detail.occupation}
                      <br />
                      Email: {currUser.email}
                    </div>
                  </Stack>
                ) : (
                  <Box>
                    <h1>
                      {profileData.firstName}, {profileData.lastName}
                    </h1>
                    <div class="description">
                      You have not filled up our Return to Work personal details
                      form. Please click{" "}
                      <StyledLink to="/profile" key="profile">
                        here
                      </StyledLink>
                      to complete the form. Without any information on that
                      form, this card will be empty.
                    </div>
                  </Box>
                )
              ) : (
                ""
              )}

              {/* Connie is a budding back end web developer. She has worked in
            various fields for 5 years now. Check out her resume in the links
            below. To connect, please email her! */}

              <Box className="social">
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/resumes%2Fresume%20(22).pdf?alt=media&token=d6ee4b64-43d2-4f78-99a0-547aaac0720a"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                </a>
                {/* <a href="/">Twitter</a> */}
                <a
                  href="https://www.linkedin.com/in/kaisheng-koh-52b43a143/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </Box>
              <Box className="align-center">
                <button
                  className="gradient-button"
                  onClick={() =>
                    (window.location.href = `mailto:${currUser.email}`)
                  }
                >
                  Email Me
                </button>
              </Box>
              <footer>
                {/* <div class="likes">
              <p>
                <FavoriteIcon
                  className="fa-heart"
                  sx={{ pt: "3px", height: 18 }}
                />
              </p>
              <p>1.5K</p>
            </div>
            <div class="projects">
              <p>Projects</p>
              <p>154</p> */}
                {/* </div> */}
              </footer>
            </Box>
          </Box>
        </Container>
      </div>
    </Grid>
  );
};

//     <Paper
//       elevation={3}
//       style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
//     >
//       {profileData ? (
//         <Grid container spacing={2} justifyContent="center" alignItems="center">
//           <Grid item xs={12} style={{ textAlign: "center" }}>
//             {profileData.avatarUrl ? (
//               <Avatar
//                 alt="User Avatar"
//                 src={profileData.avatarUrl}
//                 sx={{ width: 100, height: 100 }}
//               />
//             ) : (
//               ""
//             )}
//           </Grid>
//           <Grid item xs={12} style={{ textAlign: "center" }}>
//             <Typography variant="h5">
//               {profileData.firstName} {profileData.lastName}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="subtitle1">
//               Date of Birth:{" "}
//               {profileData.user_personal_detail.dateOfBirth || ""}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="subtitle1">
//               Mobile Number:{" "}
//               {profileData.user_personal_detail.mobileNumber || ""}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="subtitle1">
//               Address: {profileData.user_personal_detail.address || ""}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="subtitle1">
//               Active Treatment:{" "}
//               {profileData.user_personal_detail.activeTreatment || ""}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="subtitle1">
//               Cancer Type:{" "}
//               {profileData.user_personal_detail.cancerDiagnosis || ""}
//             </Typography>
//           </Grid>
//         </Grid>
//       ) : null}
//     </Paper>
//   );
// };

export default EditProfile;
