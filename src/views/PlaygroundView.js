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
import Lottie  from 'lottie-react';
import successAnimation from '../assets/images/Celebration.json';
import Grid from '@mui/material/Grid';


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];


function PlayGroundView() {  
return (
<div>
<Grid item>
          <Lottie 
            animationData={successAnimation}
            loop={true}
            autoplay
            className="lottie-animation"
          />
        </Grid>
</div>


);
}
export default PlayGroundView;
