// Import required classes from Firebase
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAA7gOxfJ10BZbXuKxfmc8uGeJL86OjF1M",
    authDomain: "workout-app-d965d.firebaseapp.com",
    projectId: "workout-app-d965d",
    storageBucket: "workout-app-d965d.appspot.com",
    messagingSenderId: "492490789763",
    appId: "1:492490789763:web:46deccffd1fd74a8e2dcb6",
    measurementId: "G-PD8KH9G3LR"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig); 

// Initialize Auth
const auth = getAuth(app);

// Set Persistence: not sure if it's needed TBD
setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);

export { auth, app, db };

