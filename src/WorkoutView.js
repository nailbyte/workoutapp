import React, { useState, useEffect, useContext } from "react";
import { db } from "./firebase";
import { Button, Grid, Typography, TextField } from "@mui/material";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { AuthContext } from "./AuthContext";

function WorkoutView() {
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const { user, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      return userSnap.data();
    };
    
    const fetchLastWorkoutLog = async (userId) => {
      const q = query(
        collection(db, "workoutLogs"),
        where("user", "==", userId),
        orderBy("date", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    };

    const fetchTodayWorkoutData = async (workoutTemplateId, lastDay) => {
      const workoutDocRef = doc(db, "workoutTemplates", workoutTemplateId);
      const docSnap = await getDoc(workoutDocRef);
      if (docSnap.exists()) {
        const workoutTemplate = docSnap.data();
        const nextDayNumber =
          ((parseInt(lastDay.replace("Day", "")) + 1 - 1) %
            Object.keys(workoutTemplate.days).length) +
          1;
        const nextDay = `Day${nextDayNumber}`;
        return workoutTemplate.days[nextDay];
      }
      return null;
    };

    if (user) {
      (async () => {
        const userData = await fetchUserData();
        const workoutLog = await fetchLastWorkoutLog(user.uid);
        const nextWorkout = await fetchTodayWorkoutData(
          userData.currentWorkoutTemplate,
          workoutLog ? workoutLog.day : "Day0"
        );

        setLastWorkoutLog(workoutLog);
        setTodayWorkoutData(nextWorkout);
      })();
    }
  }, [user/*, lastWorkoutLog*/]);

  return (
    <div>
      {/* Section 1: Last Workout */}
      {lastWorkoutLog && (
        <div>
          <Typography variant="h5">
            Last Workout: {lastWorkoutLog.day}
          </Typography>
          {Object.entries(lastWorkoutLog.exercises).map(([exercise, sets]) => (
            <div key={exercise}>
              <Typography variant="h6">{exercise}</Typography>
              {sets.map((set, index) => (
                <Typography key={index}>
                  Set {index + 1}: Weight: {set.weight}, Reps: {set.reps}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Today's Workout Input Fields */}
      {todayWorkoutData && (
        <div>
          <Typography variant="h5">Today's Workout</Typography>
          {Object.entries(todayWorkoutData).map(
            ([exercise, { sets, reps }]) => (
              <div key={exercise}>
                <Typography variant="h6">{exercise}</Typography>
                {[...Array(sets)].map((_, index) => (
                  <div key={index}>
                    <Typography>Set {index + 1}</Typography>
                    <TextField
                      label="Weight"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      label={`Reps (suggested: ${reps})`}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

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
