import { useState, useEffect } from "react";
import {
  Box,
  ThemeProvider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Link,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { theme } from "../../Assets/Styles/Theme";
import { useParams } from "react-router-dom";

function CompanyProfile() {
  const [companyId, setCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState("");

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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
              <Grid item>ABC</Grid>
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
                  src="https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2Fbackground.jpg?alt=media&token=a99c1f17-e9e0-486f-a817-884bff526d54"
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
                    <Avatar
                      alt="Company Logo"
                      src="https://firebasestorage.googleapis.com/v0/b/verve-55239.appspot.com/o/images%2Fcat3.png?alt=media&token=2d5c041a-f964-4419-9ba7-5e2566cbf94b"
                      sx={{ width: 100, height: 100, ml: 2, mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={5.5} overflow="auto">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: theme.typography.h5.fontWeightBold,
                        mt: 1,
                      }}
                    >
                      Cat Company
                    </Typography>
                    <Box
                      component="div"
                      sx={{ overflow: "auto", height: "95px" }}
                    >
                      <Typography
                        variant="darkP"
                        sx={{
                          fontSize: 12,
                        }}
                      >
                        Lorem ipsum dolor sit amt, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sed cras ornare arcu dui vivamus arcu
                        felis bibendum ut. Natoque penatibus et magnis dis
                        parturient. Magna etiam tempor orci eu lobortis.
                        Consequat mauris nunc congue nisi vitae. Sed viverra
                        tellus in hac. Egestas pretium aenean pharetra magna ac
                        placerat vestibulum lectus mauris. Cras semper auctor
                        neque vitae tempus quam. Proin sed libero enim sed
                        faucibus turpis. Turpis massa tincidunt dui ut ornare
                        lectus sit. Egestas integer eget aliquet nibh praesent
                        tristique. Lacinia at quis risus sed vulputate odio.
                        Viverra aliquet eget sit amet tellus cras. Lacus luctus
                        accumsan tortor posuere ac. Sagittis aliquam malesuada
                        bibendum arcu. Sed tempus urna et pharetra. Malesuada
                        pellentesque elit eget gravida cum sociis natoque.
                        Commodo viverra maecenas accumsan lacus vel facilisis
                        volutpat. Ultricies lacus sed turpis tincidunt id
                        aliquet risus feugiat. In est ante in nibh mauris cursus
                        mattis. Cras pulvinar mattis nunc sed blandit libero
                        volutpat sed. Vivamus at augue eget arcu dictum varius
                        duis at. Faucibus in ornare quam viverra orci. Aliquam
                        sem fringilla ut morbi tincidunt augue interdum velit.
                        Dolor morbi non arcu risus quis varius quam. Ullamcorper
                        malesuada proin libero nunc consequat interdum varius.
                        Libero volutpat sed cras ornare. Fames ac turpis egestas
                        sed tempus urna. Vitae auctor eu augue ut lectus arcu
                        bibendum at. Pretium vulputate sapien nec sagittis
                        aliquam malesuada bibendum.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3.5}>
                    AAA
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6.697}>
                <Typography>WHERE ARE MY WORDS MAN</Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default CompanyProfile;
