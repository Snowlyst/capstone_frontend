import { useState } from "react";
import {
  Button,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  ThemeProvider,
  Container,
  Stack,
} from "@mui/material";
import { theme } from "../Assets/Styles/Theme";
import { useAuth0 } from "@auth0/auth0-react";

const Login = (option) => {
  const { loginWithRedirect } = useAuth0();
  const [open, setOpen] = useState(option ? true : false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (role) => {
    let user = {};
    if (role === null) {
      if (role === "User") {
        user.role = "user";
      } else if (role === "Employer") {
        user.role = "employer";
      } else if (role === "Admin") {
        user.role = "admin";
      }
      localStorage.setItem("verveRole", JSON.stringify(user.role));
    } else if (role !== null) {
      const userRole = JSON.parse(localStorage.getItem("verveRole"));
      console.log("userRole in handlesubmit is: ", userRole);
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
        authorizationParams: {
          screen_hint: "Login/Register",
        },
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-Login"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: theme.typography.h6.fontFamily,
                }}
              >
                You are trying to access a member only page. Please login before
                trying again.
              </Typography>
              <Typography
                variant="p"
                component="body1"
                sx={{
                  fontFamily: theme.typography.p.fontFamily,
                  fontWeight: theme.typography.p.fontWeightBold,
                }}
              >
                You are trying to access a member only page. Please login/signup
                before trying again.
              </Typography>
            </Container>
            <Container mt={3}>
              <Stack direction="row" spacing={2}>
                <Button
                  className="blue"
                  variant="contained"
                  onClick={() => handleSubmit("User")}
                >
                  User
                </Button>
                <Button
                  className="blue"
                  variant="contained"
                  onClick={() => handleSubmit("Employer")}
                >
                  Employer
                </Button>
                <Button
                  className="blue"
                  variant="contained"
                  onClick={() => handleSubmit("Admin")}
                >
                  Admin
                </Button>
              </Stack>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default Login;
