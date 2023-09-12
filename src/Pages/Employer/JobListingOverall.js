import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  ThemeProvider,
  Typography,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import Swal from "sweetalert2";
import { useUserContext } from "../../Components/UserContext";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function JobListingOverall() {
  const [accessToken, setAccessToken] = useState("");
  const [tableDataDisplay, setTableDataDisplay] = useState([]);

  const { currUser } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  //make sure currUser is set or else the navigate gonna boot everyone off the screen
  useEffect(() => {
    console.log(currUser);
    if (currUser) {
      const localAccess = currUser.accessToken;
      console.log("access token ready");
      setAccessToken(localAccess);
      setIsLoaded(true);
    }
  }, [currUser]);

  // disable jobseekers and non loggedin people from accessing this page
  useEffect(() => {
    if (isLoaded) {
      if (!currUser || currUser.userRoleId === 2) {
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
    if (isLoaded && currUser) {
      const userId = currUser.id;
      axios
        .get(`${BACKEND_URL}/listings/companysearchbyuserid/${userId}`)
        .then((info) => {
          setTableDataDisplay(
            info.data.map((row, index) => {
              console.log(row);
              return (
                <TableRow key={index}>
                  <TableCell align="right">
                    <Typography
                      variant="darkP"
                      sx={{
                        fontWeight: theme.typography.darkP.fontWeightBold,
                      }}
                    >
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="darkP"
                      sx={{
                        fontWeight: theme.typography.darkP.fontWeightBold,
                      }}
                    >
                      {row.employmentType}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="darkP"
                      sx={{
                        fontWeight: theme.typography.darkP.fontWeightBold,
                      }}
                    >
                      {row.location.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="darkP"
                      sx={{
                        fontWeight: theme.typography.darkP.fontWeightBold,
                      }}
                    >
                      ${row.minSalary} - ${row.maxSalary} / month
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="darkP"
                      sx={{
                        fontWeight: theme.typography.darkP.fontWeightBold,
                      }}
                    >
                      {row.individual_jobseeker_dashboards.length}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/company/jobs/${row.id}`}>
                      <Button
                        variant="contained"
                        component="span"
                        style={{
                          backgroundColor: "#FF6B2C",
                          color: "white",
                          width: "5.5vw",
                          borderRadius: "7px",
                        }}
                      >
                        <EditIcon />
                        GO
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
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
                Jobs Listed
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
            <Grid item sx={{ mt: "3vh" }}>
              <Link to="/post-job">
                <Button
                  variant="contained"
                  component="span"
                  style={{
                    backgroundColor: "#FF6B2C",
                    color: "white",
                    width: "27.5vw",
                    borderRadius: "7px",
                  }}
                >
                  Post a New Job
                </Button>
              </Link>
            </Grid>
            <Grid
              item
              sx={{
                backgroundColor: "white",
                height: "59vh",
                width: "68vw",
                borderRadius: "20px",
                mt: "3vh",
              }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="darkP"
                          sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.darkP.fontWeightBold,
                          }}
                        >
                          Job Information
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="darkP"
                          sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.darkP.fontWeightBold,
                          }}
                        >
                          Type
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="darkP"
                          sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.darkP.fontWeightBold,
                          }}
                        >
                          Location
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="darkP"
                          sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.darkP.fontWeightBold,
                          }}
                        >
                          Salary
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="darkP"
                          sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.darkP.fontWeightBold,
                          }}
                        >
                          Applicants
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="darkP"
                          sx={{
                            fontSize: 20,
                            fontWeight: theme.typography.darkP.fontWeightBold,
                          }}
                        >
                          Check Listing
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableDataDisplay ? tableDataDisplay : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default JobListingOverall;
