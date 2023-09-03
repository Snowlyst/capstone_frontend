import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Menu,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../Assets/Styles/Theme";
// import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import logo from "../Assets/Images/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useUserContext } from "../Components/UserContext";

function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currUser, setCurrUser } = useUserContext();

  // const navigate = useNavigate();

  const pages = ["Job Search", "Company Profiles", "Programs"];
  const settings = isAuthenticated
    ? ["Profile", "Chat", "Dashboard", "Logout"]
    : ["User", "Employer"];

  // to retrieve currUser from local storage and to set it for context
  useEffect(() => {
    console.log(currUser);
    // const checkLogin =  () => {
    if (currUser === null && isAuthenticated) {
      const localAccess = JSON.parse(localStorage.getItem("verveCurrUser"));
      console.log(localAccess);
      setCurrUser(localAccess);
    }
  }, []);

  // checks if user is logged in or not to display user menu
  // const login = currUser !== null ? true : false;

  // handle user menu click
  const handleUserMenu = async (page) => {
    let user = {};
    if (page === "Logout") {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      setAnchorElUser(null);
      setCurrUser(null);
      localStorage.removeItem("verveRole");
      localStorage.removeItem("verveToken");
      localStorage.removeItem("verveCurrUser");
    } else if (page === "User") {
      setAnchorElUser(null);
      user.role = "user";
      setCurrUser(user);
      localStorage.setItem("verveRole", JSON.stringify(user.role));
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
        authorizationParams: {
          screen_hint: "Login/Register",
        },
      });
    } else if (page === "Employer") {
      setAnchorElUser(null);
      user.role = "employer";
      localStorage.setItem("verveRole", JSON.stringify(user.role));
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
        authorizationParams: {
          screen_hint: "Login/Register",
        },
      });
    }
    console.log(currUser);
    // else if (page === "Past Orders") {
    //   navigate("pastorders");
    // } else {
    //   navigate(`${page.toLowerCase()}`);
    // }
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          // zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#F3F1FF",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorElNav(event.currentTarget)}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#0E0140" }} alt="Menu" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    to={page.toLowerCase()}
                    key={page}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem key={page} onClick={() => setAnchorElNav(null)}>
                      <ThemeProvider theme={theme}>
                        <Typography
                          textAlign="center"
                          variant="p"
                          sx={{
                            color: (theme) => theme.typography.darkP.color,
                          }}
                        >
                          {page}
                        </Typography>
                      </ThemeProvider>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,

                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page.toLowerCase()}
                  key={page}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page}
                    onClick={() => setAnchorElNav(null)}
                    sx={{
                      my: 2,
                      color: "#0E0140",
                      display: "block",
                      lineHeight: "1.5",
                      verticalAlign: "bottom",
                    }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography
                        textAlign="center"
                        variant="p"
                        sx={{
                          color: theme.typography.darkP.color,
                          fontWeight: theme.typography.h6.fontWeightBold,
                        }}
                      >
                        {page}
                      </Typography>
                    </ThemeProvider>
                  </Button>
                </Link>
              ))}
              <Box
                sx={{ width: "120px", marginLeft: "16vw", marginTop: "1vw" }}
                className="verve-logo"
              >
                <Link to="/">
                  <img src={logo} alt="verve logo" width="120px" />
                </Link>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 0, gap: "20px", display: "flex" }}>
              {/* <Link to="cart">
              <Tooltip title="Cart">
                <IconButton sx={{ p: 0 }}>
                  <LocalMallIcon sx={{ color: "white" }} alt="Cart" />
                </IconButton>
              </Tooltip>
            </Link> */}

              <Link to="search">
                <Tooltip title="Search">
                  <IconButton sx={{ p: 0 }}>
                    <SearchIcon sx={{ color: "#0E0140" }} alt="Search" />
                  </IconButton>
                </Tooltip>
              </Link>

              {/* <Link to="profile"> */}
              <Tooltip title="Profile">
                <IconButton
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <AccountCircleIcon
                    sx={{ color: "#0E0140" }}
                    alt="Remy Sharp"
                  />
                </IconButton>
              </Tooltip>
              {/* </Link> */}
              <Menu
                sx={{ mt: "65px" }}
                id="user-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <Link
                    to={setting.toLowerCase()}
                    key={setting}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenu(setting)}
                    >
                      <ThemeProvider theme={theme}>
                        <Typography
                          textAlign="center"
                          variant="p"
                          sx={{
                            color: theme.typography.darkP.color,
                          }}
                        >
                          {setting}
                        </Typography>
                      </ThemeProvider>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
