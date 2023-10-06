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
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Logo from '../assets/images/Logo.svg';
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function PlayGroundView() {  
return (
<div style={{
  backgroundImage: `url(${Logo})`,
  backgroundSize: '80% auto',  // This will make it cover 100% width
  backgroundRepeat: 'no-repeat',
  width: '100%',               // Set width to 100% of its container
  paddingTop: '100%',            // This will be the aspect ratio, see below
}}>
  <div style={{ backgroundColor: '#ffc107', padding: '10px', textAlign: 'center' }}>
    🚧 This app is currently in alpha. It's a work in progress and may contain bugs.
    Quality Engineer 👨 is Don is finding bugs 🐛 and Jon is fixing them 🛠️
</div>

</div>


);
}
export default PlayGroundView;
