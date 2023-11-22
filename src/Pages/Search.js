import {
  Box,
  Grid,
  Stack,
  Divider,
  ThemeProvider,
  Typography,
  IconButton,
  Collapse,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import { theme } from "../Assets/Styles/Theme";
import Swal from "sweetalert2";
import { useUserContext } from "../Components/UserContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Search() {
  const { currUser } = useUserContext();
  const [accessToken, setAccessToken] = useState("");
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [typeExpand, setTypeExpand] = useState(false);
  const [mappedCategory, setMappedCategory] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  //state to know what category is selected
  const [categoryQuery, setCategoryQuery] = useState("");
  //state to know what type of employment is ticked
  const [typeQuery, setTypeQuery] = useState([false, false, false, false]);
  // this state for knowing location selected to query
  const [locationQuery, setLocationQuery] = useState(6);
  const [openLocation, setOpenLocation] = useState(false);
  // this state for displaying the found results
  const [jobsDisplay, setJobsDisplay] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  // these stuff for getting params if linked from homepage
  const portedLocationQuery = new URLSearchParams(useLocation().search).get(
    "location"
  );
  const portedTypeQuery = new URLSearchParams(useLocation().search).get("type");

  useEffect(() => {
    if (portedLocationQuery && portedTypeQuery) {
      const dataToSend = {
        typeQuery: portedTypeQuery,
        locationQuery: portedLocationQuery,
      };
      axios
        .post(`${BACKEND_URL}/listings/search/mount`, dataToSend)
        .then((info) => {
          setJobsData(info.data);
          setJobsDisplay(
            info.data.map((info, index) => {
              return (
                <Grid
                  key={index}
                  container
                  justifyContent="center"
                  backgroundColor="white"
                  sx={{
                    minHeight: "10vh",
                    minWidth: "45vw",
                    maxWidth: "60vw",
                    borderRadius: "20px",
                    mt: 1.5,
                    mb: 1.5,
                  }}
                >
                  <Grid item xs={1.3}>
                    <Link
                      to={`/companyprofile/${info.companyId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {
                        <img
                          alt="Company Logo"
                          src={
                            info.company_profile_info.companyLogo ||
                            "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64"
                          }
                          style={{
                            width: "4vw",
                            height: "4vh",
                            objectFit: "fill",
                            borderRadius: "40px",
                            marginTop: "2.2vh",
                            marginLeft: "0.2vw",
                          }}
                        />
                      }
                    </Link>
                  </Grid>
                  <Grid item xs={4.7} sx={{ pt: 1 }}>
                    <Stack direction="column">
                      <Box
                        sx={{
                          height: "7vh",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          display: "-webkit-box",
                        }}
                      >
                        <Typography
                          variant="darkP"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeight,
                          }}
                        >
                          {info.title}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: "3vh",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                          display: "-webkit-box",
                        }}
                      >
                        <Typography variant="p" sx={{ fontSize: 14 }}>
                          {info.company_profile_info.companyName}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}>
                    <Stack direction="column" sx={{ mt: 1 }}>
                      <Typography variant="p" sx={{ mb: 1 }}>
                        {info.employmentType}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}>
                    <Stack direction="column" sx={{ mt: 1 }}>
                      <Typography variant="p" sx={{ mb: 1 }}>
                        {info.location.name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 4.1 }}>
                    <Link to={`/company/jobs/${info.id}`}>
                      <Button
                        variant="contained"
                        component="span"
                        style={{ backgroundColor: "#0E0140", color: "white" }}
                      >
                        <VisibilityIcon />
                        View
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              );
            })
          );
          setSearchDone(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/listings/categories/sorted`)
      .then((info) => {
        setMappedCategory(
          info.data.map((info, index) => {
            return (
              <Box key={index}>
                <FormControlLabel
                  value={info.id}
                  control={<Radio size="small" color="secondary" />}
                  label={info.name}
                />
              </Box>
            );
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleExpandClick = (target) => {
    if (target === 1) {
      setCategoryExpand(!categoryExpand);
    } else {
      setTypeExpand(!typeExpand);
    }
  };

  const handleChecked = (e, selection) => {
    const copyOfCheckedStates = [...typeQuery];
    copyOfCheckedStates[selection] = e.target.checked;
    setTypeQuery(copyOfCheckedStates);
  };

  //these 2 for open n close SELECT
  const handleOpenLocation = () => {
    setOpenLocation(true);
  };

  const handleCloseLocation = () => {
    setOpenLocation(false);
  };

  // searching job
  const handleSearchJobs = (e) => {
    e.preventDefault();
    if (typeQuery.every((value) => value === false) || !categoryQuery) {
      Swal.fire(
        "Error",
        "Have you selected at least one Employment Type and one Category?",
        "error"
      );
      return;
    }
    const newTypeQuery = [];
    if (typeQuery[0]) newTypeQuery.push("Full Time");
    if (typeQuery[1]) newTypeQuery.push("Part Time");
    if (typeQuery[2]) newTypeQuery.push("Contract");
    if (typeQuery[3]) newTypeQuery.push("Remote");

    const dataToSend = {
      categoryQuery: categoryQuery,
      typeQuery: newTypeQuery,
      locationQuery: locationQuery,
    };

    axios
      .post(`${BACKEND_URL}/listings/search/`, dataToSend)
      .then((info) => {
        setJobsData(info.data);
        setJobsDisplay(
          info.data.map((info, index) => {
            return (
              <Grid
                key={index}
                container
                justifyContent="center"
                backgroundColor="white"
                sx={{
                  minHeight: "10vh",
                  minWidth: "45vw",
                  maxWidth: "60vw",
                  borderRadius: "20px",
                  mt: 1.5,
                  mb: 1.5,
                }}
              >
                <Grid item xs={1.3}>
                  <Link to={`/companyprofile/${info.companyId}`}>
                    {
                      <img
                        alt="Company Logo"
                        src={
                          info.company_profile_info.companyLogo ||
                          "https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2FImage_not_available.png?alt=media&token=0a5a0495-5de3-4fea-93a2-3b4b95b22f64"
                        }
                        style={{
                          width: "4vw",
                          height: "4vh",
                          objectFit: "fill",
                          borderRadius: "40px",
                          marginTop: "2.2vh",
                          marginLeft: "0.2vw",
                        }}
                      />
                    }
                  </Link>
                </Grid>
                <Grid item xs={4.7} sx={{ pt: 1 }}>
                  <Stack direction="column">
                    <Box
                      sx={{
                        height: "7vh",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                      }}
                    >
                      <Typography
                        variant="darkP"
                        sx={{
                          fontWeight: theme.typography.h6.fontWeight,
                        }}
                      >
                        {info.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: "3vh",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                      }}
                    >
                      <Typography variant="p" sx={{ fontSize: 14 }}>
                        {info.company_profile_info.companyName}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Stack direction="column" sx={{ mt: 1 }}>
                    <Typography variant="p" sx={{ mb: 1 }}>
                      {info.employmentType}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Stack direction="column" sx={{ mt: 1 }}>
                    <Typography variant="p" sx={{ mb: 1 }}>
                      {info.location.name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} sx={{ mt: 4.1 }}>
                  <Link to={`/company/jobs/${info.id}`}>
                    <Button
                      variant="contained"
                      component="span"
                      style={{ backgroundColor: "#0E0140", color: "white" }}
                    >
                      <VisibilityIcon />
                      View
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            );
          })
        );
        setSearchDone(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //this 1 for the button rotation
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{
            backgroundColor: "#F3F1FF",
            width: "100vw",
            minHeight: "93vh",
            flexDirection: "row",
          }}
        >
          <Grid item xs={4}>
            <Box width="100%" sx={{ pl: "5.2vw", pt: "3vh" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
              >
                Employment Type
                <ExpandMore
                  expand={typeExpand}
                  onClick={() => handleExpandClick(2)}
                  aria-expanded={typeExpand}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Typography>
              <Collapse in={typeExpand} timeout="auto" unmountOnExit>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Full-Time"
                    onChange={(e) => handleChecked(e, 0)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Part-Time"
                    onChange={(e) => handleChecked(e, 1)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Contract"
                    onChange={(e) => handleChecked(e, 2)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remote"
                    onChange={(e) => handleChecked(e, 3)}
                  />
                </FormGroup>
              </Collapse>
              <Typography
                variant="h6"
                sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
              >
                Categories
                <ExpandMore
                  expand={categoryExpand}
                  onClick={() => handleExpandClick(1)}
                  aria-expanded={categoryExpand}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Typography>
              <Collapse in={categoryExpand} timeout="auto" unmountOnExit>
                <RadioGroup
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                >
                  <Box
                    sx={{
                      height: "60vh",
                      overflow: "auto",
                      wordWrap: "noWrap",
                    }}
                  >
                    {mappedCategory ? mappedCategory : null}
                  </Box>
                </RadioGroup>
              </Collapse>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ ml: "2vw" }}>
              <Grid
                container
                justifyContent="center"
                backgroundColor="white"
                sx={{
                  minHeight: "8vh",
                  width: "45vw",
                  borderRadius: "20px",
                  mt: "4vh",
                }}
              >
                <Grid item xs={0.3} />
                <Grid item xs={9.0} sx={{ pt: 2.3 }}>
                  <Stack direction="row">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.h6.fontWeightBold,
                      }}
                    >
                      Location Group:
                    </Typography>
                    <FormControl size="small" sx={{ pl: "4vw", width: "20vw" }}>
                      <InputLabel sx={{ pl: "5.3vw" }}>Location</InputLabel>
                      <Select
                        open={openLocation}
                        onClose={handleCloseLocation}
                        onOpen={handleOpenLocation}
                        value={locationQuery}
                        label="Location"
                        onChange={(e) => setLocationQuery(e.target.value)}
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
                  </Stack>
                </Grid>
                <Grid item xs={2.7} sx={{ mt: 2.5 }}>
                  <Button
                    variant="contained"
                    component="span"
                    style={{
                      backgroundColor: "#FF6B2C",
                      color: "white",
                      width: "9vw",
                    }}
                    onClick={handleSearchJobs}
                  >
                    <SearchIcon />
                    Search
                  </Button>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 3, mb: 3 }} />
              {jobsData.length !== 0 && searchDone ? (
                <Box sx={{ height: "70vh", overflow: "auto" }}>
                  {jobsDisplay}
                </Box>
              ) : null}
              {/* {jobsData.length === 0 && searchDone ? (
                <Typography variant="h5" sx={{ ml: "10vw", mt: "20vh" }}>
                  No available listings from search parameters provided!
                </Typography>
              ) : null} */}
              {searchDone ? null : (
                <Typography variant="h5" sx={{ ml: "10vw", mt: "20vh" }}>
                  Start a search to get listings here!
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

export default Search;
