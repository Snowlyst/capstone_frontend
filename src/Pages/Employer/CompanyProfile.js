import { useState, useEffect } from "react";
import {
  Box,
  ThemeProvider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Link,
  Divider,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { theme } from "../../Assets/Styles/Theme";
import { useParams } from "react-router-dom";

function CompanyProfile() {
  const [companyId, setCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState("");
  const [companyJobs, setCompanyJobs] = useState("");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const param = useParams();
  if (companyId !== param.companyId) {
    setCompanyId(param.companyId);
  }

  useEffect(() => {
    if (companyId) {
      axios
        .get(`${BACKEND_URL}/company/${companyId}`)
        .then((info) => {
          console.log(info);
          setCompanyData(info.data[0]);
          return info.data[0].companyLogo;
        })
        .then((logo) => {
          axios
            .get(`${BACKEND_URL}/listings/${companyId}`)
            .then((info) => {
              console.log(info);
              setCompanyJobs(
                info.data.map((info, index) => {
                  return (
                    <Box key={index}>
                      <Grid
                        container
                        sx={{
                          height: "8vh",
                          width: "10vw",
                          borderRadius: "20px",
                          mt: 1.5,
                          mb: 1.5,
                        }}
                      >
                        <Grid item xs={4}>
                          <img
                            alt="Company Logo"
                            src={
                              logo ||
                              "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2Fcat3.png?alt=media&token=2d5c041a-f964-4419-9ba7-5e2566cbf94b"
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
                          <Box
                            sx={{ width: "15vw", height: "7vh" }}
                            overflow="auto"
                          >
                            <Typography
                              sx={{ fontSize: 13, width: "13vw", pl: 3 }}
                            >
                              {info.title}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="p"
                              sx={{
                                fontSize: 12,
                                ml: 3,
                                fontWeight: theme.typography.p.fontWeight,
                              }}
                            >
                              {info.employmentType}
                            </Typography>
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
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  //for consolelogging only, to remove
  useEffect(() => {
    if (companyData) {
      console.log(companyData);
    }
  }, [companyData]);

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
                width: "20vw",
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
                    pl: 4,
                    pt: 1,
                  }}
                >
                  Company Job Listings
                </Typography>
                <Stack direction="column" sx={{ pl: 1.5 }}>
                  {companyJobs ? companyJobs : null}
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                backgroundColor: "white",
                width: "44vw",
                height: "84vh",
                borderRadius: "40px",
                flexDirection: "column",
                ml: "5vw",
              }}
            >
              <Grid item xs={3}>
                <img
                  src={
                    companyData.bannerUrl ||
                    "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2Fbackground.jpg?alt=media&token=a99c1f17-e9e0-486f-a817-884bff526d54"
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
                        companyData.companyLogo ||
                        "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2Fcat3.png?alt=media&token=2d5c041a-f964-4419-9ba7-5e2566cbf94b"
                      }
                      style={{
                        width: "8.1vw",
                        height: "8.1vh",
                        marginLeft: "1.2vw",
                        marginTop: "2.7vh",
                        objectFit: "fill",
                        borderRadius: "40px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={5.5} overflow="auto">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: theme.typography.h5.fontWeightBold,
                        mt: 1,
                        ml: 5,
                        mb: 2.5,
                      }}
                    >
                      {companyData.companyName || "Cat Company"}
                    </Typography>

                    <Typography
                      variant="darkP"
                      sx={{
                        fontSize: 12,
                        ml: 5,
                      }}
                    >
                      Established on:
                    </Typography>
                    <br />
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: 12,
                        ml: 5,
                      }}
                    >
                      {companyData.establishmentDate || "99, 99th Month, 9999"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3.5}>
                    <Box
                      component="div"
                      sx={{ overflow: "auto", height: "14vh", ml: 1, mr: 0.23 }}
                    >
                      <Typography variant="darkP" sx={{ fontSize: 13 }}>
                        Address: <br />
                        {companyData.address}
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
                    sx={{ fontSize: theme.typography.h6.fontSize }}
                  >
                    {companyData.description ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default CompanyProfile;
