import React, { useState, useContext } from "react";
import { Button, Typography, CardContent, TextField } from "@mui/material";
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

  const handleSubmit = async () => {
    

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
    setNumberOfDays((prev) => prev + 1);
    setAllDaysExercises((prev) => [
      ...prev,
      { dayName: `Day: ${prev.length + 1}`, exercises: [] },
    ]);
  };

  const handleCopyDay = () => {
    const sourceDayExercises = allDaysExercises[selectedDayToCopy - 1];
    if (sourceDayExercises) {
        const copiedDay = {
            dayName: `Copy of ${sourceDayExercises.dayName}`,
            exercises: [...sourceDayExercises.exercises],
        };
        setAllDaysExercises(prev => [...prev, copiedDay]);
        setNumberOfDays(prev => prev + 1);
    } else {
        enqueueSnackbar('Error copying the day. Please try again.', { variant: 'error' });
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

return (
        <ProgLevelStyle>
            <Typography
                variant="h2"
                gutterBottom
                style={{ fontWeight: 600, textAlign: "center" }}
            >
                Create Program
            </Typography>

            <TextField
                label="Program Name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                fullWidth
            />
            <DayLevelStyle>
            {Array.from({ length: numberOfDays }).map((_, dayIndex) => (
                <DayComponent
                    key={dayIndex}
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
            ))}

            
                <Button variant="outlined" color="primary" onClick={handleAddDay}>
                    Add Day
                </Button>
                       {/* Dropdown to select and repeat a day */}
        {allDaysExercises.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography variant="body1">Repeat a Day: </Typography>
            <select
              onChange={(e) => handleCopyDay(Number(e.target.value))}
            >
              <option value="" disabled selected>
                Select a day
              </option>
              {allDaysExercises.map((day, index) => (
                <option key={index} value={index + 1}>
                  {day.dayName}
                </option>
              ))}
            </select>
          </div>
        )}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveDay}
                    disabled={numberOfDays <= 1}
                >
                    Remove Last Day
                </Button>
            </DayLevelStyle>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                Submit
            </Button>
        </ProgLevelStyle>
    );
}
export default CreateProgramView;
