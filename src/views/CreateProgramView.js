import React, { useState, useContext } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import DayComponent from "../components/CreateProgram/DayComponent";
import { ProgLevelStyle } from "../styles/LevelledStyle";
import { AuthContext } from "../components/AuthContext";
import { useSnackbar } from "notistack";
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

const CreateProgramView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, handleLogout } = useContext(AuthContext);

  const [programName, setProgramName] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [allDaysExercises, setAllDaysExercises] = useState([
    {
      dayName: `Day 1`,
      exercises: [],
    },
  ]);

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
      { dayName: `Day ${prev.length + 1}`, exercises: [] },
    ]);
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
    <div className="create-program">
      <ProgLevelStyle>
        <TextField
          label="Program Name"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          fullWidth
        />

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
        <div className="day-actions">
          <Button variant="outlined" color="primary" onClick={handleAddDay}>
            Add Day
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveDay}
            disabled={numberOfDays <= 1}
          >
            Remove Last Day
          </Button>
        </div>
        <Button
          // style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ProgLevelStyle>
    </div>
  );
};

export default CreateProgramView;
