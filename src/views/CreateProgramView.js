import React, { useState, useContext } from "react";
import {
  Button,
  Typography,
  CardContent,
  TextField,
  Box,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Divider,
  Popover,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  Menu,
  Fade,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DayComponent from "../components/CreateProgram/DayComponent";
import { ProgLevelStyle, DayLevelStyle } from "../styles/LevelledStyle";
import { AuthContext } from "../components/AuthContext";
import { useSnackbar } from "notistack";
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

import CustomTextField from "../components/common/CustomTextField";

const CreateProgramView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, handleLogout } = useContext(AuthContext);

  const [programName, setProgramName] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [allDaysExercises, setAllDaysExercises] = useState([
    {
      dayName: `Day: 1`,
      exercises: [],
    },
  ]);
  const [selectedDayToCopy, setSelectedDayToCopy] = useState(1);
  const [programNameError, setProgramNameError] = useState(false);
  const [programNameHelperText, setProgramNameHelperText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const isDayValid = (dayIdx) => {
    const dayExercises = allDaysExercises[dayIdx].exercises;

    if (!dayExercises || dayExercises.length === 0) return false;

    for (const exercise of dayExercises) {
      if (!exercise.sets || exercise.sets.length == 0) return false;
    }

    return true;
  };

  const isProgramValid = () => {
    for (let i = 0; i < allDaysExercises.length; i++) {
      if (!isDayValid(i)) return false;
    }
    return true;
  };

  //>>>Popover related code
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDayRepeat = (dayIndex) => {
    handleCopyDay(dayIndex + 1); // your repeat function
    handleClose(); // close popover after selection
  };
  //<<<Popover related code

  const validateProgramName = () => {
    if (programName.trim() === "") {
      setProgramNameError(true);
      setProgramNameHelperText("Program Name is required!");
      return false;
    }

    setProgramNameError(false);
    setProgramNameHelperText("");
    return true;
  };

  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
    // Optional: Validate while typing (for instant feedback)
    validateProgramName(); //TBD check this
  };

  const handleSubmit = async () => {
    //Check if form is valid
    const isProgramValid = validateProgramName(); // You can add more validation checks as needed
    if (!isProgramValid) {
      return;
    }
    if (
      allDaysExercises.length === 0 ||
      allDaysExercises[0].exercises.length === 0
    ) {
      enqueueSnackbar("Program can't be empty.", {
        variant: "error",
      });
      return;
    }

    try {
      if (!user) {
        throw new Error("User is empty.");
      }
      //Fetch user data TBD: this needs to be done at one place for all logged in views
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        throw new Error("User data not found.");
      }

      const programData = {
        programName: programName,
        allDaysExercises,
        user: user.uid,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
      };

      console.log(programData);

      // Push to Firestore
      const docRef = await addDoc(
        collection(db, "workoutTemplates"),
        programData
      );

      enqueueSnackbar("Program saved successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error writing workout program: ", error);
      enqueueSnackbar("Error saving program! Try again later", {
        variant: "error",
      });
    }
  };

  const handleAddDay = () => {
    //Add validation for the previous day
    if (allDaysExercises[allDaysExercises.length - 1].exercises.length === 0) {
      enqueueSnackbar("Add exercise for the previous day first.", {
        variant: "error",
      });
      return;
    }

    setNumberOfDays((prev) => prev + 1);
    setAllDaysExercises((prev) => [
      ...prev,
      { dayName: `Day: ${prev.length + 1}`, exercises: [] },
    ]);
  };

  const handleCopyDay = () => {
    if (allDaysExercises[selectedDayToCopy - 1].exercises.length === 0) {
      enqueueSnackbar(
        "First, add exercises in the day which you're trying to copy",
        {
          variant: "error",
        }
      );
      return;
    }
    const sourceDayExercises = allDaysExercises[selectedDayToCopy - 1];
    if (sourceDayExercises) {
      const copiedDay = {
        dayName: `Copy of ${sourceDayExercises.dayName}`,
        exercises: [...sourceDayExercises.exercises],
      };
      setAllDaysExercises((prev) => [...prev, copiedDay]);
      setNumberOfDays((prev) => prev + 1);
    } else {
      enqueueSnackbar("Error copying the day. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleRemoveDay = () => {
    if (numberOfDays > 1) {
      setNumberOfDays((prev) => prev - 1);
      setAllDaysExercises((prev) => {
        const newDays = [...prev];
        newDays.pop();
        return newDays;
      });
    }
  };

  const menuItems = allDaysExercises.flatMap((day, index) => {
    const items = [];
    if (isDayValid(index)) {
      items.push(
        <MenuItem
          key={index}
          onClick={() => handleDayRepeat(index)}
        >
          {day.dayName}
        </MenuItem>
      );

      if (index !== allDaysExercises.length - 1) {
        items.push(<Divider key={`divider-${index}`} />);
      }
    }
    return items;
  });

  //V1-Introduction of Box and Grids
  return (
    <Box p={3}>
      <Typography variant="h2" gutterBottom align="center">
        Create Program
      </Typography>
      <Box mb={2}>
        <TextField
          label="Program Name"
          required
          error={programNameError}
          helperText={programNameHelperText}
          value={programName}
          onChange={handleProgramNameChange}
          fullWidth
        />
      </Box>
      <Grid container spacing={3} direction="column">
        {Array.from({ length: numberOfDays }).map((_, dayIndex) => (
          <Grid item key={dayIndex}>
            <Divider />
            <DayComponent
              dayNumber={dayIndex + 1}
              allDaysExercises={allDaysExercises}
              setExercisesForDay={(exercisesForDay) => {
                const updatedDays = [...allDaysExercises];
                updatedDays[dayIndex] = {
                  ...updatedDays[dayIndex],
                  ...exercisesForDay,
                };
                setAllDaysExercises(updatedDays);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="space-between">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.7,
              textDecoration: "none",
            },
          }}
          onClick={handleAddDay}
        >
          <AddBoxIcon />
          <Typography variant="caption">Add Day</Typography>
        </Box>

        {allDaysExercises.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.7,
                  textDecoration: "none",
                },
              }}
              onClick={handleClick}
            >
              <EventRepeatIcon />
              <Typography variant="caption">Repeat Day</Typography>
            </Box>

            <Menu 
              // TransitionComponent={Fade}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {menuItems}
            </Menu>
          </>
        )}
      </Box>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default CreateProgramView;
