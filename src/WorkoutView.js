
import React, { useState, useEffect, useContext } from 'react';
import { db } from './firebase';
import { Button, Grid, Typography, TextField } from "@mui/material";
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit} from 'firebase/firestore';
import { AuthContext } from './AuthContext';

function WorkoutView() {
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const { user, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    console.log("user: ", user);
    const fetchLastWorkoutLog = async () => {
      const q = query(
        collection(db, "workoutLogs"),
        where("user", "==", user.uid),
        // Order by date and limit to 1 to get the most recent log
        orderBy("date", "desc"),
        limit(1)
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          console.log("querySnapshot: ", querySnapshot);
          setLastWorkoutLog(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error fetching last workout log: ", error);
      }
    };
    console.log("lastWorkoutLog: ", lastWorkoutLog);
    const fetchTodayWorkoutData = async () => {
      const currentTemplate = user.currentWorkoutTemplate;
      console.log("currentTemplate: ", currentTemplate);
      const workoutDocRef = doc(db, "workoutTemplates", currentTemplate);
      try {
        const docSnap = await getDoc(workoutDocRef);
        if (docSnap.exists()) {
          const workoutTemplate = docSnap.data();
          const lastDay = lastWorkoutLog && lastWorkoutLog.day ? lastWorkoutLog.day : "Day0"; // Set default to Day0 to start with Day1
          const nextDayNumber = ((parseInt(lastDay.replace('Day', '')) + 1 - 1) % Object.keys(workoutTemplate.days).length) + 1;
          const nextDay = `Day${nextDayNumber}`;

          setTodayWorkoutData(workoutTemplate.days[nextDay]);
        }
      } catch (error) {
        console.error("Error fetching today's workout data: ", error);
      }
    };

    if (user) {
      fetchLastWorkoutLog();
      fetchTodayWorkoutData();
    }
  }, [user, lastWorkoutLog]);

  return (
    <div>
      {/* Section 1: Last Workout */}
      {lastWorkoutLog && (
        <div>
          <Typography variant="h5">Last Workout: {lastWorkoutLog.day}</Typography>
          {Object.entries(lastWorkoutLog.exercises).map(([exercise, sets]) => (
            <div key={exercise}>
              <Typography variant="h6">{exercise}</Typography>
              {sets.map((set, index) => (
                <Typography key={index}>Set {index + 1}: Weight: {set.weight}, Reps: {set.reps}</Typography>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Today's Workout Input Fields */}
      {todayWorkoutData && (
        <div>
          <Typography variant="h5">Today's Workout</Typography>
          {Object.entries(todayWorkoutData).map(([exercise, { sets, reps }]) => (
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
          ))}
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
