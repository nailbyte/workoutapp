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
import { LevelThreeStyle, LevelFourStyle } from "../../styles/LevelledStyle";

const exerciseOptions = Object.keys(exerciseList).map(key => ({
  id: key,
  label: exerciseList[key].name
}));


const ExerciseComponent = ({ sets, updateSets, exerciseIndex, initialExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState(initialExercise);
  const [selectedExerciseId, setSelectedExerciseId] = useState();

  const isWeightValid = (weight) => {
    return /^(\d+|\d+\.5)$/.test(weight) && weight <= 999;
  };

  const isRepValid = (rep) => {
    return /^\d+$/.test(rep) && rep <= 999;
  };

  const handleInputChange = (index, field, value) => {
    const newSets = [...sets];
    if (field === "weight" && !isWeightValid(value)) return;
    if (field === "reps" && !isRepValid(value)) return;
    newSets[index][field] = value;
    updateSets({
      index: exerciseIndex,
      exerciseName: selectedExercise,
      exerciseId: selectedExerciseId,
      sets: newSets
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
        selectedExerciseId(null);
    }
};
  return (
    <LevelThreeStyle>
      <Typography>Ex {exerciseIndex + 1}:</Typography>
      <Autocomplete
        disablePortal
        id="exercise-autocomplete"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Exercise" />}
        options={exerciseOptions}
        getOptionLabel={(option) => option.label} // to display the exercise name
        value={exerciseOptions.find(option => option.id === selectedExerciseId) || null}
        onChange={handleExerciseChange}
      />
      {sets.map((set, index) => (
        <LevelFourStyle key={index}>
          <div>
            Set {index + 1}:
            {selectedExerciseId && exerciseList[selectedExerciseId].weighted && (
              <>
                <CustomTextField
                  type="number"
                  inputProps={{ step: "0.5", min: "0", max: "999" }}
                  value={set.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                />{" "}
                Kg
              </>
            )}
            {selectedExerciseId && exerciseList[selectedExerciseId].reps && (
              <>
                X{" "}
                <CustomTextField
                  type="number"
                  inputProps={{ min: "0", max: "999" }}
                  value={set.reps}
                  onChange={(e) =>
                    handleInputChange(index, "reps", e.target.value)
                  }
                />{" "}
                reps
              </>
            )}
            {selectedExerciseId && exerciseList[selectedExerciseId].timed && (
              <>
                For{" "}
                <CustomTextField
                  type="number"
                  inputProps={{ min: "0" }}
                  value={set.time}
                  onChange={(e) =>
                    handleInputChange(index, "time", e.target.value)
                  }
                />{" "}
                sec
              </>
            )}
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
          </div>
        </LevelFourStyle>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          if (!selectedExercise) {
            alert("Please select an exercise first.");
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
        Add Next Set
      </Button>
    </LevelThreeStyle>
  );
};

export default ExerciseComponent;
