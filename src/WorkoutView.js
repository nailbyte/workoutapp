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
import { addDoc } from "firebase/firestore";

function WorkoutView() {
  const [userData, setUserData] = useState(null);
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const { user, handleLogout } = useContext(AuthContext);

  const [workoutInputs, setWorkoutInputs] = useState({});

  // Function to handle input change
  const handleInputChange = (exercise, setIndex, type, value) => {
    const newInputs = { ...workoutInputs };
    if (!newInputs[exercise]) {
      newInputs[exercise] = [];
    }
    if (!newInputs[exercise][setIndex]) {
      newInputs[exercise][setIndex] = { weight: 0, reps: 0 };
    }
    newInputs[exercise][setIndex][type] = value;

    setWorkoutInputs(newInputs);

    // Store the data in localStorage
    localStorage.setItem("workoutInputs", JSON.stringify(newInputs));
  };
  // Fetch workoutInputs from localStorage on component mount
  useEffect(() => {
    const savedInputs = localStorage.getItem("workoutInputs");
    if (savedInputs) {
      setWorkoutInputs(JSON.parse(savedInputs));
    }
  }, []);

  const handleFinish = async () => {
    try {
      // Calculate the day based on the logic you've provided previously
      //const nextDayNumber = (parseInt((lastWorkoutLog && lastWorkoutLog.day ? lastWorkoutLog.day : "Day0").replace("Day", "")) % Object.keys(todayWorkoutData).length) + 1;
      //const nextDay = `Day${nextDayNumber}`;
      // Structure the data
      const workoutLogData = {
        WorkoutTemplate: userData.currentWorkoutTemplate, // Assuming you've stored user's current workout template in the user state
        day: todayWorkoutData.day,
        user: userData.uid,// user.uid,
        date: new Date().toISOString(),
        timeStarted: null, // Set this to the actual time when you implement the "Start Workout" feature
        timeFinished: new Date().toISOString(),
        exercises: workoutInputs,
      };

      // Push to Firestore
      const docRef = await addDoc(
        collection(db, "workoutLogs"),
        workoutLogData
      );

      console.log("Document written with ID: ", docRef.id);

      // Clear the workoutInputs state and the localStorage
      setWorkoutInputs({});
      localStorage.removeItem("workoutInputs");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchUserData = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);
    return {
      uid: user.uid,
      ...userSnap.data()
    };
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
      return {
        day: nextDay,
        ...workoutTemplate.days[nextDay]
      };
      //return workoutTemplate.days[nextDay];
    }
    return null;
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const userData = await fetchUserData();
        const workoutLog = await fetchLastWorkoutLog(user.uid);
        const nextWorkout = await fetchTodayWorkoutData(
          userData.currentWorkoutTemplate,
          workoutLog ? workoutLog.day : "Day0"
        );

        setUserData(userData);
        setLastWorkoutLog(workoutLog);
        setTodayWorkoutData(nextWorkout);
      })();
    }
  }, [user /*, lastWorkoutLog*/]);

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
          <Typography variant="h5">Today's Workout: {todayWorkoutData.day}</Typography>
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
                      value={
                        workoutInputs[exercise] &&
                        workoutInputs[exercise][index]
                          ? workoutInputs[exercise][index].weight
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          exercise,
                          index,
                          "weight",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      label={`Reps (suggested: ${reps})`}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={
                        workoutInputs[exercise] &&
                        workoutInputs[exercise][index]
                          ? workoutInputs[exercise][index].reps
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          exercise,
                          index,
                          "reps",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            )
          )}
          <Button onClick={handleFinish}>Finish Workout</Button>
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
