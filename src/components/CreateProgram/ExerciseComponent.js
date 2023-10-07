import React, { useState, useMemo } from "react";
import {
  TextField,
  Button,
  CardContent,
  IconButton,
  Autocomplete,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import exerciseList from "../../utils/ExerciseList";
import CustomTextField from "../common/CustomTextField";
import { ExerLevelStyle, SetLevelStyle } from "../../styles/LevelledStyle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useSnackbar } from "notistack";
import InputAdornment from '@mui/material/InputAdornment';

const exerciseOptions = Object.keys(exerciseList).map((key) => ({
  id: key,
  label: exerciseList[key].name,
}));

const ExerciseComponent = ({
  sets,
  updateSets,
  exerciseIndex,
  initialExercise,
}) => {
  const [selectedExercise, setSelectedExercise] = useState(initialExercise);
  const [selectedExerciseId, setSelectedExerciseId] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const convertToTotalSeconds = (minutes, seconds) => {
    return (minutes || 0) * 60 + (seconds || 0);
  };

  const handleTimeChange = (index, type, value) => {
    const newSets = [...sets];
    newSets[index][type] = value !== "" ? parseInt(value, 10) : undefined;
    if (type === "minutes" || type === "seconds") {
      const minutes = type === "minutes" ? value : newSets[index].minutes || 0;
      const seconds = type === "seconds" ? value : newSets[index].seconds || 0;
      newSets[index].time = convertToTotalSeconds(minutes, seconds);
    }
    updateSets({
      index: exerciseIndex,
      exerciseName: selectedExercise,
      exerciseId: selectedExerciseId,
      sets: newSets,
    });
  };

  const isWeightValid = (weight) => {
    if (weight === "") return true; // Allow empty string
    return /^(\d+|\d+\.5)$/.test(weight) && weight <= 999;
  };

  const isRepValid = (rep) => {
    if (rep === "") return true; // Allow empty string
    return /^\d+$/.test(rep) && rep <= 999;
  };

  const isMinuteValid = (minute) => {
    if (minute === "") return true;
    const num = parseInt(minute, 10);
    return !isNaN(num) && num >= 0 && num <= 59;
  };

  const isSecondValid = (second) => {
    if (second === "") return true;
    const num = parseInt(second, 10);
    return !isNaN(num) && num >= 0 && num <= 59;
  };

  const updateTime = (index, minutes, seconds) => {
    // If the minutes or seconds input is cleared, leave it empty (i.e., undefined).
    minutes = minutes !== "" ? parseInt(minutes, 10) : undefined;
    seconds = seconds !== "" ? parseInt(seconds, 10) : undefined;

    const totalSeconds = (minutes || 0) * 60 + (seconds || 0);
    handleInputChange(index, "time", totalSeconds);
  };

  const handleInputChange = (index, field, value) => {
    const newSets = [...sets];

    if (field === "weight" && !isWeightValid(value)) return;
    if (field === "reps" && !isRepValid(value)) return;

    newSets[index][field] = value !== "" ? value : undefined;

    updateSets({
      index: exerciseIndex,
      exerciseName: selectedExercise,
      exerciseId: selectedExerciseId,
      sets: newSets,
    });
  };

  const handleExerciseChange = (event, newValue) => {
    if (newValue) {
      setSelectedExercise(newValue.label);
      setSelectedExerciseId(newValue.id);
      updateSets({
        index: exerciseIndex,
        exerciseId: newValue.id,
        exerciseName: newValue.label,
        sets: sets,
      });
    } else {
      setSelectedExercise(null);
      setSelectedExerciseId(null);
    }
  };
  return (
    <ExerLevelStyle>
      <Autocomplete
        disablePortal
        id="exercise-autocomplete"
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField  {...params} label={`Exercise: ${exerciseIndex + 1}`} />
          // <TextField {...params} label="Exercise:{$exerciseIndex + 1} " />
        )}
        options={exerciseOptions}
        getOptionLabel={(option) => option.label}
        value={
          exerciseOptions.find((option) => option.id === selectedExerciseId) ||
          null
        }
        onChange={handleExerciseChange}
      />
      <SetLevelStyle>
        {sets.map((set, index) => (
          <div
            key={index}
            style={{ backgroundColor: set.saved ? "lightgray" : "transparent" }}
          >
            <Typography
              style={{ paddingRight: "1em", display: "inline-block" }}
            >
              Set {index + 1}:
            </Typography>
            {selectedExerciseId &&
              exerciseList[selectedExerciseId].weighted && (
                <>
                  <TextField
                    className="compact-input"
                    style={{ marginLeft:"1em", marginRight:".25em", display: "inline-block", verticalAlign: "middle" }}
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="start">kg</InputAdornment>
                    }}
                    inputProps={{
                      step: "0.5",
                      min: "0",
                      max: "999"
                    }}
                  
                    value={set.weight !== undefined ? set.weight : ""}
                    onChange={(e) =>
                      handleInputChange(index, "weight", e.target.value)
                    }
                    onBlur={(e) => {
                      const correctedValue = isWeightValid(e.target.value)
                        ? e.target.value
                        : "0";
                      handleInputChange(index, "weight", correctedValue);
                    }}
                  />
                  {" "}
                </>
              )}
            {selectedExerciseId && exerciseList[selectedExerciseId].reps && (
              <>
                <TextField
                    className="compact-input"
                    style={{ marginLeft:"1em", marginRight:"1em", display: "inline-block", verticalAlign: "middle" }}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="end">X</InputAdornment>,
                    endAdornment: <InputAdornment position="start">reps</InputAdornment>
                  }}
                  inputProps={{ min: "0", max: "999" }}
                  value={set.reps !== undefined ? set.reps : ""}
                  onChange={(e) =>
                    handleInputChange(index, "reps", e.target.value)
                  }
                  onBlur={(e) => {
                    const correctedValue = isRepValid(e.target.value)
                      ? e.target.value
                      : "0";
                    handleInputChange(index, "reps", correctedValue);
                  }}
                />
                
              </>
            )}
            {selectedExerciseId && exerciseList[selectedExerciseId].timed && (
              <>
                <TextField
                    className="compact-input"
                    style={{ marginLeft:"1em", marginRight:"1em", display: "inline-block", verticalAlign: "middle" }}
                  type="number"
                  InputProps={{
                    // startAdornment: <InputAdornment position="start">For</InputAdornment>,
                    endAdornment: <InputAdornment position="start">min</InputAdornment>
                  }}
                  inputProps={{ min: "0", max: "59" }}
                  placeholder="00"
                  value={set.minutes || ""}
                  onChange={(e) =>
                    handleTimeChange(index, "minutes", e.target.value)
                  }
                />
                <CustomTextField
                  type="number"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">sec</InputAdornment>
                  }}
                  inputProps={{ min: "0", max: "59" }}
                  placeholder="30"
                  value={set.seconds || ""}
                  onChange={(e) =>
                    handleTimeChange(index, "seconds", e.target.value)
                  }
                />
                
              </>
            )}
            {/* Show delete button for all sets except the last one */}
            {index !== sets.length - 1 && (
              <IconButton
                onClick={() =>
                  updateSets({
                    index: exerciseIndex,
                    sets: sets.filter((_, sIndex) => sIndex !== index),
                  })
                }
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
            {index === sets.length - 1 && (
              <IconButton
                onClick={() => {
                  if (!selectedExercise) {
                    // Show the Snackbar using notistack
                    enqueueSnackbar("Please select an exercise first.", {
                      variant: "error",
                    });
                    return;
                  }
                  const newSet =
                    selectedExerciseId && exerciseList[selectedExerciseId].timed
                      ? { time: 30 }
                      : { weight: 10, reps: 12 };
                  updateSets({
                    index: exerciseIndex,
                    exerciseId: selectedExerciseId,
                    exerciseName: selectedExercise,
                    sets: [...sets, newSet],
                  });
                }}
              >
                <AddTaskIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
        ))}
      </SetLevelStyle>
    </ExerLevelStyle>
  );
};

export default ExerciseComponent;
