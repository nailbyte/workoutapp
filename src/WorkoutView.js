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
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

function WorkoutView() {
  console.log("WorkoutView rendered"); //TBD remove this

  const [userData, setUserData] = useState(null);
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const { user, handleLogout } = useContext(AuthContext);

  const [workoutInputs, setWorkoutInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  useEffect(() => {
    if (user) {
      (async () => {
        console.log('useEffect triggered for user:', user);
        try{
        const fetchedUserData = await fetchAndSetUserData();
        const fetchedLastWorkoutLog = await fetchAndSetLastWorkoutLog(fetchedUserData);
        /*const fetchedTodayWorkoutData = */await fetchAndSetTodayWorkoutData(fetchedUserData, fetchedLastWorkoutLog);
        enqueueSnackbar('Data loaded successfully.', { variant: 'success' });
      }
        catch (err) {
          setError(err.message);
        }
        finally {
          setLoading(false);
          console.log("Data loaded successfully.");
        }

      })();
    }
  }, [user]);

  const fetchAndSetUserData = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        throw new Error("User data not found.");
      }
      const userData = {
        uid: user.uid,
        ...userSnap.data(),
      };
      setUserData(userData);
      return userData;
    }
    catch (err) {
      enqueueSnackbar('Failed to fetch user data. Please try again later.', { variant: 'error' });
      //setError("Failed to fetch user data. Please refresh or try again later.");
      console.error("Error getting User details:", err);
    }
    
  };

  const fetchAndSetLastWorkoutLog = async (fetchedUserData) => {
    const q = query(
      collection(db, "workoutLogs"),
      where("user", "==", fetchedUserData.uid),
      where("WorkoutTemplate", "==", fetchedUserData.currentWorkoutTemplate),
      orderBy("date", "desc"),
      limit(1)
    );
    try{
      const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const lastWorkoutLog = querySnapshot.docs[0].data();
      setLastWorkoutLog(lastWorkoutLog);
      return lastWorkoutLog;
    }
    return null;
  }
  catch (err) {
    enqueueSnackbar('Failed to fetch workout logs. Please try again later.', { variant: 'error' });
    //setError("Failed to fetch workout logs. Please refresh or try again later.");
    console.error("Trouble getting workout logs: ", err);
  }

  };

  const fetchAndSetTodayWorkoutData = async (fetchedUserData, fetchedLastWorkoutLog) => {
    try{
    const workoutDocRef = doc(db, "workoutTemplates", fetchedUserData.currentWorkoutTemplate);
    const docSnap = await getDoc(workoutDocRef);
    if (docSnap.exists()) {
      const workoutTemplate = docSnap.data();
      const lastDay = fetchedLastWorkoutLog ? fetchedLastWorkoutLog.day : "Day0"
      const nextDayNumber =
        ((parseInt(lastDay.replace("Day", "")) + 1 - 1) %
          Object.keys(workoutTemplate.days).length) +
        1;
      const nextDay = `Day${nextDayNumber}`;
      const todayWorkoutData = {
        day: nextDay,
        programName: workoutTemplate.programName,
        exercises: workoutTemplate.days[nextDay]
      };
      
      setTodayWorkoutData(todayWorkoutData);
      return todayWorkoutData;
    }
    else {
      throw new Error("Workout template not found.");
    }
  }
  catch (err) {
    enqueueSnackbar('Failed to Workout Program details. Please try again later.', { variant: 'error' });
    //setError("Failed to Workout Program details. Please refresh or try again later.");
    console.error("Error getting workout template:", err);
  }
    
  };

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
      // Structure the data
      const workoutLogData = {
        WorkoutTemplate: userData.currentWorkoutTemplate, // Assuming you've stored user's current workout template in the user state
        day: todayWorkoutData.day,
        user: userData.uid, // user.uid,
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
  if (loading) {
    return <p>Loading...</p>;
 }
 console.log('userData:', userData);
 console.log('lastWorkoutLog:', lastWorkoutLog);
 console.log('todayWorkoutData:', todayWorkoutData); 
 return (
    <div
      style={{ maxWidth: "400px", margin: "0 auto", padding: theme.spacing(2) }}
    >
      {/* Section 1: Last Workout */}
      {lastWorkoutLog && (
        <div>
          <Typography variant="h3">
            Program: {todayWorkoutData.programName}
          </Typography>
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
        <div style={{ marginTop: theme.spacing(4) }}>
          <Typography variant="h5" gutterBottom>
            Today's Workout: {todayWorkoutData.day}
          </Typography>
          {Object.entries(todayWorkoutData.exercises).map(
            ([exercise, { sets, reps }]) => (
              <div key={exercise} style={{ marginBottom: theme.spacing(3) }}>
                <Typography variant="h6" gutterBottom>
                  {exercise}
                </Typography>
                {[...Array(sets)].map((_, index) => (
                  <div key={index} style={{ marginBottom: theme.spacing(2) }}>
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
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Finish Workout
          </Button>
        </div>
      )}

      <Grid container spacing={2} style={{ marginTop: theme.spacing(4) }}>
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
