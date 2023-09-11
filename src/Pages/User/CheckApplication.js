import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import * as SwalMsgs from "../../Utils/SwalMsgs";
import {
  Box,
  Grid,
  Stack,
  ThemeProvider,
  Divider,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import IndividualJobPage from "../Employer/IndividualJobPage";
import { theme } from "../../Assets/Styles/Theme";
import { useUserContext } from "../../Components/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function CheckApplication() {
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [applicationData, setApplicationData] = useState("");
  const [applicationDisplay, setApplicationDisplay] = useState("");
  const [currentEntitySelection, setCurrentEntitySelection] = useState("");
  const [renderData, setRenderData] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(currUser);
    if (currUser) {
      const localAccess = currUser.accessToken;
      console.log("access token ready");
      setAccessToken(localAccess);
      setIsLoaded(true);
    }
  }, [currUser]);

  useEffect(() => {
    if (isLoaded && currUser) {
      const userId = currUser.id;
      axios
        .get(`${BACKEND_URL}/application/getallbyuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((info) => {
          console.log(info);
          setApplicationData(info.data);
          setApplicationDisplay(
            info.data.map((info, index) => {
              let formattedDate;
              if (info.interviewDate) {
                const date = new Date(info.interviewDate);
                formattedDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date.getFullYear()} ${date
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`;
              }

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
                    <Grid item xs={12}>
                      <Box>
                        <Link
                          to="#"
                          onClick={() => setCurrentEntitySelection(index)}
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
                            {info.job_listings[0].title}
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
                            {info.application_stage.stage}
                          </Typography>
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
                            {formattedDate || "No interview set"}
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
    }
  }, [currUser, isLoaded, renderData]);

  const handleWithdraw = async () => {
    try {
      const idToDelete = applicationData[currentEntitySelection].id;
      const dataToSend = {
        idToDelete: idToDelete,
      };
      console.log(idToDelete);
      const response = await axios.put(
        `${BACKEND_URL}/application/withdrawapplication/`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      Swal.fire(
        "Success",
        "Your application has been withdrawn!",
        "success"
      ).then(() => {
        setRenderData((prev) => prev + 1);
        setCurrentEntitySelection("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#F3F1FF",
        width: "100vw",
        height: "92vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <div>
          <Stack direction="row" sx={{ mt: "5vh" }}>
            <Grid
              container
              sx={{
                display: "flex",
                backgroundColor: "white",
                width: "20vw",
                height: "74vh",
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
                    pl: "5.5vw",
                    pt: 1,
                    fontSize: "2vh",
                  }}
                >
                  Applications
                </Typography>
                <Stack direction="column" sx={{ pl: 1.5 }}>
                  {applicationData.length !== 0 ? (
                    applicationDisplay
                  ) : (
                    <Box sx={{ mt: "15vh", pl: "1vw" }}>
                      <Typography variant="darkP">
                        Have you applied for any jobs yet?
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                width: "47vw",
                height: "74vh",
                borderRadius: "40px",
                flexDirection: "column",
                ml: "5vw",
                overflow: "auto",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
              }}
            >
              <Stack>
                <Box
                  sx={{
                    width: "47vw",
                    height: "54vh",
                    borderRadius: "40px",
                    flexDirection: "column",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                >
                  {currentEntitySelection !== "" ? (
                    <IndividualJobPage
                      jobsId={
                        applicationData[currentEntitySelection].jobListingId
                      }
                    />
                  ) : (
                    <Box sx={{ mt: "15vh", pl: "9vw" }}>
                      <Typography variant="darkP">
                        Click a job to the left to see the selected job details!
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: "41.6vw",
                    height: "18vh",
                    borderRadius: "20px",
                    flexDirection: "column",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                    ml: "2vw",
                    mt: "2vh",
                  }}
                >
                  {currentEntitySelection !== "" ? (
                    <Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.7vh",
                            fontWeight: theme.typography.h6.fontWeightBold,
                            ml: "1vw",
                            mt: "1vh",
                          }}
                        >
                          Application Status:{" "}
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "1.6vh",
                            }}
                          >
                            {
                              applicationData[currentEntitySelection]
                                .application_stage.stage
                            }
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.7vh",
                            fontWeight: theme.typography.h6.fontWeightBold,
                            ml: "1vw",
                            mt: "1vh",
                          }}
                        >
                          Interview Time:{" "}
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "1.6vh",
                            }}
                          >
                            {applicationData[currentEntitySelection]
                              .interviewDate ||
                              "No interview time available yet"}
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          classes={{ root: "orange" }}
                          variant="contained"
                          onClick={handleWithdraw}
                          style={{
                            height: "3vh",
                            width: "20vw",
                            marginLeft: "9vw",
                            marginTop: "4vh",
                          }}
                        >
                          Withdraw Application
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ mt: "7.5vh", pl: "10vw" }}>
                      <Typography variant="darkP">
                        Select an application to the left first!
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Stack>
            </Grid>
          </Stack>
        </div>
      </ThemeProvider>
    </Grid>
  );
}

export default CheckApplication;
