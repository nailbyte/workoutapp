import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const pages = [
  { name: "Workout", path: "/workoutview" },
  { name: "Program", path: "/programview" },
  { name: "New Program", path: "/createprogramview" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const iconStyles = {
  //display: { xs: 'none', md: 'flex' },
  display: "flex",
  mr: 1,
  transform: "rotate(135deg)",
  webkitTextStrokeWidth: "0px",
  textShadow: "rgb(255, 0, 0) 10px 0px 10px",
  fontSize: "60px",
  color: "rgb(255, 255, 255",
};

function MenuItems({ items, onClose }) {
  return (
    <>
      {items.map((item) => (
        <MenuItem key={item} onClick={onClose}>
          <Typography textAlign="center">{item}</Typography>
        </MenuItem>
      ))}
    </>
  );
}

function DesktopPages() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
      }}
    >
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => (window.location.href = page.path)}
          sx={{
            color: "white",
            justifyContent: "center",
            marginLeft: "16px",  // Add consistent left margin
            marginRight: "16px",  // Add consistent right margin
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
            transition: "0.3s",
          }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2, // Padding for some spacing on the ends
            }}
          >
            {/* Hamburger Menu for small screens */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton onClick={handleOpenNavMenu}>
                <MenuIcon color="white" />
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
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => (window.location.href = page.path)}>
                    <Typography>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
  
            {/* Logo */}
            <FitnessCenterIcon
              sx={{
                ...iconStyles,
                position: { xs: "absolute", md: "static" },
                left: { xs: "50%", md: "initial" },
                transform: { xs: "translateX(-50%) rotate(135deg)", md: "rotate(135deg)" },
              }}
            />
  
            {/* Navigation links for medium and larger screens */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => (window.location.href = page.path)}
                  sx={{ mx: 2, color: "white" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
  
            {/* User Avatar Menu */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                // ... other properties ...
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
  
}

export default ResponsiveAppBar;
