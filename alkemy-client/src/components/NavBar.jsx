import React from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  function handleHome() {
    navigate("/");
  }
  function handleLogin() {
    navigate("/login");
  }
  function handleRegister() {
    navigate("/register");
  }
  function handleRecords() {
    navigate("/records");
  }
  function handleProfile() {
    navigate("/Profile");
  }
  function handleLogout() {
    logout();
    navigate("/Home");
  }

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="100%">
        <Toolbar sx={{ width: "100%" }} disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "start" }}>
            <Button>
              <AccountBalanceIcon onClick={handleHome} color="white" />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Avatar alt="user" src={currentUser.image && 'https://res.cloudinary.com/tropura/image/upload/v1653866106/guest-user_je8e9t.jpg'} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {!currentUser && [
              <MenuItem>
                <Typography onClick={handleHome} textAlign="center">
                  Home
                </Typography>
              </MenuItem>,
                <MenuItem key="login">
                  <Typography onClick={handleLogin} textAlign="center">
                    Login
                  </Typography>
                </MenuItem>,
                <MenuItem key="register">
                  <Typography onClick={handleRegister} textAlign="center">
                    Register
                  </Typography>
                </MenuItem>,
              ]}
              {currentUser && [
                <MenuItem key="profile">
                  <Typography onClick={handleProfile} textAlign="center">
                    Profile
                  </Typography>
                </MenuItem>,
                <MenuItem key="records">
                  <Typography onClick={handleRecords} textAlign="center">
                    Records
                  </Typography>
                </MenuItem>,
                <MenuItem key="logout">
                  <Typography onClick={handleLogout} textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>,
              ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
