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
import { theme } from "../../Assets/Styles/Theme";
import { useUserContext } from "../../Components/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ReviewApplication() {
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobId, setJobId] = useState("");
  const [jobData, setJobData] = useState("");
  const [sideDisplay, setSideDisplay] = useState("");
  const [usersData, setUsersData] = useState("");
  const [currentEntitySelection, setCurrentEntitySelection] = useState("");
  const [startTD, setStartTD] = useState(new Date());
  const [endTD, setEndTD] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarId, setCalendarId] = useState("");
  const [renderState, setRenderState] = useState(0);

  const { isLoading } = useSessionContext();

  const calendarTitle = "verve";
  const session = useSession();
  const supabase = useSupabaseClient();

  const navigate = useNavigate();

  //make sure currUser is set or else the navigate gonna boot everyone off the screen
  useEffect(() => {
    if (currUser) {
      const localAccess = currUser.accessToken;
      setAccessToken(localAccess);
      setIsLoaded(true);
    }
  }, [currUser]);

  //disable jobseekers and non loggedin people from accessing this page
  useEffect(() => {
    if (isLoaded && !isLoading) {
      if (!currUser || currUser.userRoleId === 2) {
        Swal.fire(
          "Error",
          "You do not have permissions to act on that page",
          "error"
        );
        navigate("/");
      } else {
        // console.log("User permitted");
        return;
      }
    }
  }, [isLoaded]);

  //setting params

  const param = useParams();
  if (jobId !== param.jobId) {
    setJobId(param.jobId);
  }

  // getting job name based off page param
  useEffect(() => {
    if (jobId && isLoaded) {
      axios
        .get(`${BACKEND_URL}/listings/getonejob/${jobId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((info) => {
          setJobData(info.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`${BACKEND_URL}/application/getoneapplication/${jobId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((info) => {
          setUsersData(info.data);
          setSideDisplay(
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
              let userAvatar;
              if (!info.user.avatarUrl || info.user.avatarUrl === "null") {
                userAvatar =
                  "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64";
              } else {
                userAvatar = info.user.avatarUrl;
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
                    <Grid item xs={4}>
                      <img
                        alt="Avatar"
                        src={userAvatar}
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
                            {info.user.firstName} {info.user.lastName}
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
                            {info.user.email}
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
                            {info.application_stage.stage || "No interview set"}
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
  }, [isLoaded, renderState]);

  useEffect(() => {
    if (session) {
      axios({
        url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        method: "get",
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
        },
      })
        .then((info) => {
          const existingCalendars = info.data.items;
          const existingCalendar = existingCalendars.find(
            (calendar) => calendar.summary === calendarTitle
          );
          // console.log(existingCalendar);
          return existingCalendar;
        })
        .then((existingCalendar) => {
          let newCalendarId;
          if (existingCalendar) {
            newCalendarId = existingCalendar.id;
            setCalendarId(existingCalendar.id);

            // console.log(
            //   "Calendar already exists. Using existing id:",
            //   newCalendarId
            // );
          } else {
            axios({
              url: "https://www.googleapis.com/calendar/v3/calendars",
              method: "post",
              headers: {
                Authorization: `Bearer ${session.provider_token}`,
                "Content-Type": "application/json",
              },
              data: {
                summary: calendarTitle,
              },
            })
              .then((info) => {
                setCalendarId(info.data.id);
                // console.log("New Calendar created with ID:", info.data.id);
              })
              .catch((error) => {
                console.log("second part", error);
              });
          }
        })
        .catch((error) => {
          console.log("first part", error);
        });
    } else {
      return;
    }
  }, [session]);
  // for retrieving resume
  const goToResume = () => {
    const resumeToFind = usersData[currentEntitySelection].resumeId;
    axios
      .get(`${BACKEND_URL}/resumes/getspecific/${resumeToFind}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((info) => {
        window.open(info.data[0].resumeUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // google calendar fns
  async function signOut() {
    await supabase.auth.signOut();
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth(
      {
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
        },
      },
      { redirectTo: `http://localhost:3000/checkapplication/${jobId}` }
    );

    if (error) {
      alert("Error logging in");
      console.log(error);
    }
  }

  const scheduleMeeting = async () => {
    if (!eventName || !eventDescription) {
      return Swal.fire(SwalMsgs.missingFormInfoGentle);
    }

    const startTime = new Date(startTD).toISOString();
    const idToEdit = usersData[currentEntitySelection].id;
    const dataToSend = {
      idToEdit: idToEdit,
      startTime: startTime,
    };

    try {
      await axios.put(
        `${BACKEND_URL}/application/scheduleinterview`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log("creating calendar event");
      const event = {
        summary: eventName,
        description: eventDescription,
        start: {
          dateTime: startTD.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endTD.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      const response = await axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        method: "post",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        data: JSON.stringify(event),
      });

      console.log(response);

      Swal.fire(
        "Success",
        "The event has been created on your Google calendar!",
        "success"
      );

      setStartTD(new Date());
      setEndTD(new Date());
      setEventName("");
      setEventDescription("");

      setRenderState((prev) => prev + 1);
      setCurrentEntitySelection("");
    } catch (error) {
      console.error(error);
    }
  };

  const hireApplicant = async () => {
    try {
      const idToEdit = usersData[currentEntitySelection].id;
      const dataToSend = {
        idToEdit: idToEdit,
      };

      const response = await axios.put(
        `${BACKEND_URL}/application/hireapplicant`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);

      Swal.fire("Success", "The applicant has been hired!", "success").then(
        () => {
          setRenderState((prev) => prev + 1);
          setCurrentEntitySelection("");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const rejectApplicant = async () => {
    try {
      const idToEdit = usersData[currentEntitySelection].id;
      const dataToSend = {
        idToEdit: idToEdit,
      };

      const response = await axios.put(
        `${BACKEND_URL}/application/rejectapplicant`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);

      Swal.fire("Success", "The applicant has been rejected!", "success").then(
        () => {
          setRenderState((prev) => prev + 1);
          setCurrentEntitySelection("");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // this must be at bottom layer right before return if not useeffect kills itself
  if (isLoading) {
    return <></>;
  }

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#F3F1FF",
        width: "100vw",
        height: "110vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <div>
          <Box sx={{ paddingBottom: 5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: theme.typography.h5.fontWeightBold,
                fontSize: "1.55vw",
                ml: "25vw",
                mt: "2vh",
              }}
            >
              Checking Applications for{" "}
              <Link to={`/company/jobs/${jobData.id}`}>{jobData.title}</Link>
            </Typography>
          </Box>
          <Stack direction="row">
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
                    pl: "5.2vw",
                    pt: 1,
                  }}
                >
                  Applications
                </Typography>
                <Stack direction="column" sx={{ pl: 1.5 }}>
                  {usersData.length !== 0 ? (
                    sideDisplay
                  ) : (
                    <Box sx={{ mt: "15vh", pl: "1vw" }}>
                      <Typography variant="darkP">
                        No current applicants for this listing yet!
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                backgroundColor: "white",
                width: "44vw",
                height: "24vh",
                borderRadius: "40px",
                flexDirection: "column",
                ml: "5vw",
              }}
            >
              {usersData.length !== 0 && currentEntitySelection !== "" ? (
                <Box sx={{ ml: "1vw" }}>
                  <Stack direction="row" sx={{ width: "44vw", mt: "2vh" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.h6.fontWeightBold,
                        fontSize: "1.3vw",
                        width: "22vw",
                      }}
                    >
                      Name:{" "}
                      <Typography
                        variant="darkP"
                        sx={{ fontSize: "1.3vw ", width: "22vw" }}
                      >
                        {usersData[currentEntitySelection].user.firstName}{" "}
                        {usersData[currentEntitySelection].user.lastName}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.h6.fontWeightBold,
                        fontSize: "1.3vw",
                      }}
                    >
                      Email:{" "}
                      <Typography variant="darkP" sx={{ fontSize: "1.3vw" }}>
                        {usersData[currentEntitySelection].user.email}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ width: "44vw", mt: "2vh" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.h6.fontWeightBold,
                        fontSize: "1.3vw",
                        width: "44vw",
                      }}
                    >
                      Interview Time:{" "}
                      <Typography
                        variant="darkP"
                        sx={{ fontSize: "1.3vw ", width: "44vw" }}
                      >
                        {usersData[currentEntitySelection].interviewDate
                          ? "Interview set on " +
                            new Date(
                              usersData[currentEntitySelection].interviewDate
                            ).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "No interview set."}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ width: "44vw", mt: "2vh" }}>
                    <Button
                      classes={{ root: "blue" }}
                      variant="contained"
                      onClick={goToResume}
                      style={{
                        height: "4vh",
                        width: "28vw",
                        marginTop: "5vh",
                        marginLeft: "7vw",
                      }}
                    >
                      Show Applicant's Resume (Opens a new Tab)
                    </Button>
                  </Stack>
                  <Grid
                    sx={{
                      display: "flex",
                      width: "44vw",
                      height: "51vh",
                      borderRadius: "40px",
                      flexDirection: "column",
                      mt: "2vh",
                    }}
                  >
                    {usersData[currentEntitySelection].applicationStageId ===
                    1 ? (
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            mt: "3vh",
                          }}
                        >
                          Interview Scheduler (Google Calendar Integration)
                        </Typography>
                        {session ? (
                          <Box
                            sx={{
                              display: "flex",
                              backgroundColor: "white",
                              width: "42vw",
                              height: "55.5vh",
                              borderRadius: "40px",
                              flexDirection: "column",
                              mt: "1vh",
                            }}
                          >
                            <Stack
                              direction="row"
                              sx={{ width: "44vw", mt: "2vh", ml: "3vw" }}
                            >
                              <a
                                href="https://calendar.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  classes={{ root: "green" }}
                                  variant="contained"
                                  style={{
                                    width: "18vw",
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                  }}
                                >
                                  Check Calendar Events!
                                </Button>
                              </a>

                              <Button
                                classes={{ root: "purple" }}
                                variant="contained"
                                onClick={signOut}
                                style={{
                                  width: "18vw",
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                }}
                              >
                                Signout of Google Calendar!
                              </Button>
                            </Stack>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: theme.typography.h6.fontWeightBold,
                                mt: "0.5vh",
                                ml: "14.5vw",
                              }}
                            >
                              Set Start Date and Time
                            </Typography>
                            <Box
                              sx={{ width: "30vw", ml: "14vw", mt: "0.5vh" }}
                            >
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DateTimePicker
                                  onChange={setStartTD}
                                  value={startTD}
                                />
                              </LocalizationProvider>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: theme.typography.h6.fontWeightBold,
                                mt: "0.5vh",
                                ml: "14.5vw",
                              }}
                            >
                              Set End Date and Time
                            </Typography>
                            <Box
                              sx={{ width: "30vw", ml: "14vw", mt: "0.5vh" }}
                            >
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DateTimePicker
                                  onChange={setEndTD}
                                  value={endTD}
                                />
                              </LocalizationProvider>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight:
                                    theme.typography.h6.fontWeightBold,
                                  mt: "0.5vh",
                                  ml: "2.5vw",
                                }}
                              >
                                Event Information
                              </Typography>
                            </Box>
                            <Stack
                              direction="row"
                              sx={{ mt: "0.5vh", ml: "10.6vw" }}
                              spacing={1}
                            >
                              <TextField
                                label="Event Name"
                                variant="outlined"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                              />
                              <TextField
                                label="Event Description"
                                variant="outlined"
                                value={eventDescription}
                                onChange={(e) =>
                                  setEventDescription(e.target.value)
                                }
                              />
                            </Stack>
                            <Stack
                              direction="row"
                              sx={{ width: "44vw", mt: "2vh", ml: "3vw" }}
                            >
                              <Button
                                classes={{ root: "orange" }}
                                variant="contained"
                                onClick={scheduleMeeting}
                                style={{
                                  width: "18vw",
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                }}
                              >
                                Schedule Meeting
                              </Button>
                              <Button
                                classes={{ root: "red" }}
                                variant="contained"
                                onClick={rejectApplicant}
                                style={{
                                  width: "18vw",
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                }}
                              >
                                Reject Applicant
                              </Button>
                            </Stack>
                          </Box>
                        ) : (
                          <Box sx={{ ml: "11vw", mt: "16vh" }}>
                            <Button
                              classes={{ root: "orange" }}
                              variant="contained"
                              onClick={googleSignIn}
                              style={{
                                height: "10vh",
                                width: "20vw",
                              }}
                            >
                              Sign in to Google Calendar!
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ) : null}
                    {usersData[currentEntitySelection].applicationStageId ===
                    2 ? (
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            mt: "3vh",
                          }}
                        >
                          Interview Scheduler (Google Calendar Integration)
                        </Typography>
                        {session ? (
                          <Box
                            sx={{
                              display: "flex",
                              backgroundColor: "white",
                              width: "42vw",
                              height: "45.5vh",
                              borderRadius: "40px",
                              flexDirection: "column",
                              mt: "1vh",
                            }}
                          >
                            <Stack
                              direction="row"
                              sx={{ width: "44vw", mt: "9vh", ml: "3vw" }}
                            >
                              <a
                                href="https://calendar.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  classes={{ root: "green" }}
                                  variant="contained"
                                  style={{
                                    width: "18vw",
                                    height: "12vh",
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 0,
                                  }}
                                >
                                  Check Calendar Events!
                                </Button>
                              </a>
                              <Button
                                classes={{ root: "purple" }}
                                variant="contained"
                                onClick={signOut}
                                style={{
                                  width: "18vw",
                                  height: "12vh",
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                  borderBottomRightRadius: 0,
                                }}
                              >
                                Signout of Google Calendar!
                              </Button>
                            </Stack>

                            <Stack
                              direction="row"
                              sx={{ width: "44vw", ml: "3vw" }}
                            >
                              <Button
                                classes={{ root: "orange" }}
                                variant="contained"
                                onClick={hireApplicant}
                                style={{
                                  width: "18vw",
                                  height: "12vh",
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                  borderTopLeftRadius: 0,
                                }}
                              >
                                Applicant Hired
                              </Button>
                              <Button
                                classes={{ root: "red" }}
                                variant="contained"
                                onClick={rejectApplicant}
                                style={{
                                  width: "18vw",
                                  height: "12vh",
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                  borderTopRightRadius: 0,
                                }}
                              >
                                Reject Applicant
                              </Button>
                            </Stack>
                          </Box>
                        ) : (
                          <Box sx={{ ml: "11vw", mt: "16vh" }}>
                            <Button
                              classes={{ root: "orange" }}
                              variant="contained"
                              onClick={googleSignIn}
                              style={{
                                height: "10vh",
                                width: "20vw",
                              }}
                            >
                              Sign in to Google Calendar!
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ) : null}
                  </Grid>
                </Box>
              ) : null}
              {usersData.length !== 0 && currentEntitySelection === "" ? (
                <Box sx={{ mt: "15vh", pl: "12vw" }}>
                  <Typography variant="darkP" sx={{ fontSize: "1.3vw" }}>
                    Select an applicant to get started!
                  </Typography>
                </Box>
              ) : null}
              {usersData.length === 0 && currentEntitySelection === "" ? (
                <Box sx={{ mt: "12.5vh", pl: "12.5vw" }}>
                  <Typography variant="darkP">
                    No current applicants available!
                  </Typography>
                </Box>
              ) : null}
            </Grid>
          </Stack>
        </div>
      </ThemeProvider>
    </Grid>
  );
}

export default ReviewApplication;
