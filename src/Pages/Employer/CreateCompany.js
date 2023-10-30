import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  ThemeProvider,
  Stack,
  Divider,
} from "@mui/material";
import axios from "axios";
import { theme } from "../../Assets/Styles/Theme";
import { useUserContext } from "../../Components/UserContext";
import Swal from "sweetalert2";

function CreateCompany() {
  const [companyName, setCompanyName] = useState("");
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPostalCode, setCompanyPostalCode] = useState("");
  const [companyEstablishmentDate, setCompanyEstablishmentDate] = useState("");
  const [companyUnitNumber, setCompanyUnitNumber] = useState("");
  const [companyBanner, setCompanyBanner] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const { currUser } = useUserContext();

  const [accessToken, setAccessToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (currUser) {
      const localAccess = currUser.accessToken;
      setAccessToken(localAccess);
      setIsLoaded(true);
    }
  }, [currUser]);

  const handleSubmit = async () => {
    if (
      !companyName ||
      !companyWebsiteUrl ||
      !companyDescription ||
      !companyAddress ||
      !companyPostalCode ||
      !companyEstablishmentDate
    ) {
      return Swal.fire(
        "Error",
        "Please fill up all required information. All required information are have an Asterisk(*) labelled on it.",
        "error"
      );
    }
    const dataToSend = {
      userId: currUser.id,
      companyName: companyName,
      companyLogo: companyLogo,
      description: companyDescription,
      address: companyAddress,
      postalCode: companyPostalCode,
      unitNumber: companyUnitNumber,
      bannerUrl: companyBanner,
      establishmentDate: companyEstablishmentDate,
      websiteUrl: companyWebsiteUrl,
    };
    console.log(dataToSend);

    try {
      await axios.post(`${BACKEND_URL}/company/createcompany`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire(
        "Success",
        "Company Information Added into Database!",
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "There has been an error!", "error");
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{
            backgroundColor: "#F3F1FF",
            width: "98.95vw",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            item
            sx={{
              backgroundColor: "white",
              width: "85vw",
              mt: "4vh",
              borderRadius: "20px",
            }}
          >
            <Stack direction={"column"} alignItems={"center"}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: theme.typography.h4.fontWeightBold,
                  mt: 3,
                  mb: 1.5,
                }}
              >
                Company Information
              </Typography>
              <Divider sx={{ mt: "1vh", mb: "1vh" }} />
              <Stack direction={"row"} spacing={"10vw"}>
                <TextField
                  required
                  {...theme.textbox.common}
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  sx={{ width: "30vw" }}
                />
                <TextField
                  {...theme.textbox.common}
                  label="Company Logo URL"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  sx={{ width: "30vw" }}
                />
              </Stack>
              <Divider sx={{ mt: "1vh", mb: "1vh" }} />
              <TextField
                required
                {...theme.textbox.common}
                label="Company Description"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                multiline
                rows={5}
                sx={{ width: "70vw" }}
              />
              <TextField
                required
                {...theme.textbox.common}
                label="Company Address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                sx={{ width: "70vw" }}
              />
              <Divider sx={{ mt: "1vh", mb: "1vh" }} />
              <Stack direction={"row"} spacing={"5vw"}>
                <TextField
                  required
                  {...theme.textbox.common}
                  label="Company Postal Code"
                  value={companyPostalCode}
                  onChange={(e) => setCompanyPostalCode(e.target.value)}
                  sx={{ width: "20vw" }}
                />
                <TextField
                  {...theme.textbox.common}
                  label="Company Unit Number"
                  value={companyUnitNumber}
                  onChange={(e) => setCompanyUnitNumber(e.target.value)}
                  sx={{ width: "20vw" }}
                />
                <TextField
                  required
                  {...theme.textbox.common}
                  label="Company Establishment Date "
                  value={companyEstablishmentDate}
                  onChange={(e) => setCompanyEstablishmentDate(e.target.value)}
                  sx={{ width: "20vw" }}
                  placeholder="(DD/Month/YYYY)"
                />
              </Stack>
              <Divider sx={{ mt: "1vh", mb: "1vh" }} />
              <Stack direction={"row"} spacing={"10vw"}>
                <TextField
                  required
                  {...theme.textbox.common}
                  label="Company Website URL"
                  value={companyWebsiteUrl}
                  onChange={(e) => setCompanyWebsiteUrl(e.target.value)}
                  sx={{ width: "30vw" }}
                />
                <TextField
                  {...theme.textbox.common}
                  label="Company Banner URL"
                  value={companyBanner}
                  onChange={(e) => setCompanyBanner(e.target.value)}
                  sx={{ width: "30vw" }}
                />
              </Stack>
              <Divider sx={{ mt: "1vh", mb: "1vh" }} />
              <Button
                variant="contained"
                component="span"
                style={{
                  backgroundColor: "#FF6B2C",
                  color: "white",
                  width: "22.5vw",
                  borderRadius: "7px",
                }}
                onClick={handleSubmit}
              >
                <Typography sx={{ fontSize: "1vw" }}>Submit</Typography>
              </Button>
              <Divider sx={{ mt: "1vh", mb: "1vh" }} />
            </Stack>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default CreateCompany;
