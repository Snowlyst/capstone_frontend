import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as SwalMsgs from "../../Utils/SwalMsgs";
import { theme } from "../../Assets/Styles/Theme";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Button,
  Grid,
  Typography,
  ThemeProvider,
  Stack,
} from "@mui/material/";

export default function CompanyList() {
  const [companyList, setCompanyList] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const retrieveCoInfo = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/company/sorted`);
        const companies = response.data;
        if (companies !== null) {
          setCompanyList(companies);
        }
      } catch (err) {
        console.log(err);
      }
    };

    retrieveCoInfo();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={theme.customStyles.centered.container}
        direction="column"
        pl={3}
        pr={3}
      >
        <Box
          sx={{
            maxWidth: "880px",
          }}
        >
          <Stack direction="column" spacing={3} mb={3}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: theme.typography.h4.fontWeightBold,
                textAlign: "center",
                mt: 3,
                mb: 4,
              }}
            >
              Company Profiles
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontWeight: theme.typography.p.fontWeightBold,
                textAlign: "center",
                color: theme.typography.p.color,
                mt: 3,
                mb: 6,
              }}
            >
              These are our partners. Visit the company's page to learn more
              about them or to view their current job listings.
            </Typography>
          </Stack>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ maxWidth: "880px" }}
            display="flex"
            justifyContent="center"
          >
            <Grid container spacing={3}>
              {companyList.map((company) => (
                <Grid item key={company.id} xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 340 }}>
                    <Typography>
                      <CardHeader
                        avatar={
                          <Avatar
                            alt="Logo"
                            src={company.companyLogo}
                            aria-label="logo"
                          />
                        }
                        title={company.companyName}
                        titleTypographyProps={{
                          fontWeight: theme.typography.p.fontWeightBold,
                          color: theme.typography.darkP.color,
                        }}
                      />
                    </Typography>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color={theme.typography.p.color}
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          pl: 5,
                          WebkitLineClamp: 5,
                        }}
                      >
                        {company.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        backgroundColor: "#5b5f97",
                        justifyContent: "center",
                      }}
                    >
                      <Link to={`/companyprofile/${company.id}`}>
                        <Button size="small" sx={{ color: "white" }}>
                          Learn More
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
