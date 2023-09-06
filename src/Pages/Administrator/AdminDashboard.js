import { useEffect, useState } from "react";
import { useUserContext } from "../../Components/UserContext";
import {
  Grid,
  Box,
  Typography,
  ThemeProvider,
  Stack,
  Link,
  Button,
  Divider,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import { useAuth0 } from "@auth0/auth0-react";

function AdminDashboard() {
  const { currUser } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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
          "You do not have permissions to access this page",
          "error"
        );
        navigate("/");
      } else {
        console.log("User permitted");
      }
    }
  }, [isLoaded]);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "#F3F1FF",
            width: "100vw",
            height: "110vh",
          }}
        >
          <Grid
            container
            sx={{
              height: "92vh",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item sx={{ mt: "3vh" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
              >
                Welcome... Administrator
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                backgroundColor: "white",
                height: "11vh",
                width: "55vw",
                borderRadius: "20px",
                mt: "3vh",
              }}
            >
              <Stack sx={{ direction: "column" }}>
                <Typography
                  variant="darkP"
                  sx={{
                    fontWeight: theme.typography.darkP.fontWeightBold,
                    fontSize: 15,
                    pt: 1.3,
                    pl: 2,
                  }}
                >
                  These are the jobs that you have listed so far.
                </Typography>
                <Typography
                  variant="darkP"
                  sx={{
                    fontWeight: theme.typography.darkP.fontWeightBold,
                    fontSize: 15,
                    pt: 3,
                    pl: 2,
                  }}
                >
                  You can check each of the job listings for any incoming
                  applications, or edit the listings as you wish.
                </Typography>
              </Stack>
            </Grid>
            <Grid item sx={{ mt: "3vh" }}></Grid>
            <Grid
              item
              sx={{
                height: "59vh",
                width: "55vw",
                borderRadius: "20px",
                mt: "3vh",
              }}
            >
              <Grid
                container
                sx={{
                  flexDirection: "column",
                  height: "59vh",
                  width: "55vw",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                  >
                    Jobs Related
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 3, mb: 7 }}>
                  <Stack direction={"row"}>
                    <Link href="/joblisting">
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#FF6B2C",
                          color: "white",
                          width: "22.5vw",
                          borderRadius: "7px",
                        }}
                      >
                        <Typography sx={{ fontSize: 14 }}>
                          To your Job Listings
                        </Typography>
                      </Button>
                    </Link>
                    <Divider sx={{ ml: "5vw", mr: "5vw" }} />
                    <Link href="/admin/checkjobs">
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#FF6B2C",
                          color: "white",
                          width: "22.5vw",
                          borderRadius: "7px",
                        }}
                      >
                        <Typography sx={{ fontSize: 14 }}>
                          Approve/Deny Job Listing Applications
                        </Typography>
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
                  >
                    Users/Companies Related
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 3, mb: 7 }}>
                  <Stack direction={"row"}>
                    <Link href="/profile">
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#FF6B2C",
                          color: "white",
                          width: "22.5vw",
                          borderRadius: "7px",
                        }}
                      >
                        <Typography sx={{ fontSize: 14 }}>
                          Add New User
                        </Typography>
                      </Button>
                    </Link>
                    <Divider sx={{ ml: "5vw", mr: "5vw" }} />
                    <Link href="/admin/checkusercompanies">
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#FF6B2C",
                          color: "white",
                          width: "22.5vw",
                          borderRadius: "7px",
                        }}
                      >
                        <Typography sx={{ fontSize: "1.25vh" }}>
                          Approve/Reject Unapproved Users/Companies
                        </Typography>
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
                <Grid item sx={{ mt: 3, mb: 7 }}>
                  <Stack direction={"row"}>
                    <Link href="/admin/manageusercompanies">
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#FF6B2C",
                          color: "white",
                          width: "22.5vw",
                          borderRadius: "7px",
                        }}
                      >
                        <Typography sx={{ fontSize: "1.4vh" }}>
                          Manage Existing Users/Companies
                        </Typography>
                      </Button>
                    </Link>
                    <Divider sx={{ mr: "32.5vw" }} />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default AdminDashboard;
