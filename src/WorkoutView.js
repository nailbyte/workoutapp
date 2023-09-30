
import React, { useState, useEffect, useContext } from 'react';
import { db } from './firebase';
import { Button, Grid, Typography, TextField } from "@mui/material";
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

function WorkoutView() {
  const [workoutData, setWorkoutData] = useState(null);
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [localUserData, setLocalUserData] = useState(null);
  const { user: currentUser, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the user's data based on their UID
    const fetchUserData = async () => {
      if (!currentUser || !currentUser.uid) {
        console.error("currentUser or currentUser.uid is undefined");
        return;
      }
      console.log("Fetching user data...", currentUser);
      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setLocalUserData(userSnap.data());
        } else {
          console.error("User document not found!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    // Fetch the workout template data for the logged-in user
    const fetchWorkoutData = async () => {
      if (!localUserData || !localUserData.currentWorkoutTemplate) {
        console.error("User data is not available or user's currentWorkoutTemplate is not set.");
        return;
      }

      const workoutDocRef = doc(db, "workoutTemplates", localUserData.currentWorkoutTemplate);
      try {
        const docSnap = await getDoc(workoutDocRef);
        if (docSnap.exists()) {
          setWorkoutData(docSnap.data());
        } else {
          console.error("No document found for the given workout ID.");
        }
      } catch (error) {
        console.error("Error fetching workout data: ", error);
      }
    };

    fetchWorkoutData();
  }, [localUserData]);

  useEffect(() => {
    // Fetch the last workout log for the user based on their workout template
    const fetchLastWorkoutLog = async () => {
      if (!localUserData || !currentUser || !currentUser.uid) {
        console.error("User data or currentUser is not available.");
        return;
      }

      const q = query(
        collection(db, "workoutLogs"),
        where("user", "==", currentUser.uid),
        where("WorkoutTemplate", "==", localUserData.currentWorkoutTemplate)
        // You may also want to order by date and limit to 1 to get the most recent log
      );

      try {
        const querySnapshot = await getDocs(q);
        const logs = [];
        querySnapshot.forEach((doc) => {
          logs.push(doc.data());
        });

        // For simplicity, I'm taking the first log, but in practice, you'd probably want the most recent log
        if (logs.length > 0) {
          setLastWorkoutLog(logs[0]);
        }
      } catch (error) {
        console.error("Error fetching last workout log: ", error);
      }
    };

    fetchLastWorkoutLog();
  }, [localUserData, currentUser]);

  return (
    <div>
      {workoutData && workoutData.programName && (
        <Typography variant="h6">{workoutData.programName}</Typography>
      )}
      {workoutData && workoutData.days && Object.entries(workoutData.days).map(([day, exercises]) => (
        <div key={day}>
          <Typography variant="h5">{day}</Typography>
          {Object.entries(exercises).map(([exercise, { sets, reps }]) => (
            <div key={exercise}>
              <Typography variant="h6">{exercise}</Typography>
              <Typography>Sets: {sets}, Reps: {reps}</Typography>
              <TextField
                label="Weight"
                defaultValue={lastWorkoutLog && lastWorkoutLog.exercises && lastWorkoutLog.exercises[exercise] && lastWorkoutLog.exercises[exercise][0] ? lastWorkoutLog.exercises[exercise][0].weight : ""}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Reps"
                defaultValue={lastWorkoutLog && lastWorkoutLog.exercises && lastWorkoutLog.exercises[exercise] && lastWorkoutLog.exercises[exercise][0] ? lastWorkoutLog.exercises[exercise][0].reps : ""}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </div>
          ))}
        </div>
      ))}
      {/* Add components or elements to show workout details */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkoutView;
