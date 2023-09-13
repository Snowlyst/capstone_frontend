import { useState, useEffect } from "react";
import {
  Box,
  ThemeProvider,
  Grid,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { theme } from "../../Assets/Styles/Theme";
import { useParams, Link } from "react-router-dom";
//for auth
import { useUserContext } from "../../Components/UserContext";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function CompanyProfile() {
  const [companyId, setCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState("");
  const [companyJobs, setCompanyJobs] = useState("");
  const { currUser, setCurrUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");

  const param = useParams();
  if (companyId !== param.companyId) {
    setCompanyId(param.companyId);
  }

  useEffect(() => {
    if (currUser) {
      const localAccess = currUser.accessToken;
      setAccessToken(localAccess);
    }
  }, [currUser]);

  useEffect(() => {
    if (companyId) {
      axios
        .get(`${BACKEND_URL}/company/company/${companyId}`)
        .then((info) => {
          setCompanyData(info.data[0]);
          return info.data[0].companyLogo;
        })
        .then((logo) => {
          let avatar;
          if (!logo || logo === "null") {
            avatar =
              "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64";
          } else {
            avatar = logo;
          }
          axios
            .get(`${BACKEND_URL}/listings/company/${companyId}`)
            .then((info) => {
              setCompanyJobs(
                info.data.map((info, index) => {
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
                            alt="Company Logo"
                            src={avatar}
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
                            <Link
                              to={`/company/jobs/${info.id}`}
                              underline="none"
                              sx={{ color: theme.typography.darkP.color }}
                            >
                              <Box
                                component="div"
                                sx={{
                                  width: "14vw",
                                  height: "7vh",
                                  ml: 2,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  WebkitLineClamp: "3",
                                  WebkitBoxOrient: "vertical",
                                  display: "-webkit-box",
                                }}
                              >
                                {info.title}
                              </Box>
                            </Link>

                            <Box>
                              <Typography
                                variant="p"
                                sx={{
                                  width: "14vw",
                                  fontSize: 12,
                                  pl: 2,
                                  fontWeight: theme.typography.p.fontWeight,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  WebkitLineClamp: "1",
                                  WebkitBoxOrient: "vertical",
                                  display: "-webkit-box",
                                }}
                              >
                                {info.employmentType}
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
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
              {companyData.bannerUrl ? (
                <Grid item xs={3}>
                  <img
                    src={companyData.bannerUrl}
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
              ) : null}

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
                      {companyData.companyName || "Here is Company Name"}
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
                          fontSize: "1.3vh",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {companyData.establishmentDate ||
                          "99, 99th Month, 9999"}
                      </Typography>
                    </Typography>

                    <Box
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        mr: 0.23,
                        mt: 0.3,
                      }}
                    >
                      <Typography variant="darkp" sx={{ fontSize: "1.4vh" }}>
                        Address:{" "}
                        <Typography variant="p">
                          {companyData.address || "Address here"}
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
                      WebkitLineClamp: "20",
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                    }}
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
