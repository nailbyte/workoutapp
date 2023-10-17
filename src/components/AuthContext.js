import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // assuming you've exported firestore from firebase.js
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut,  
  createUserWithEmailAndPassword 
} from "firebase/auth";


const AuthContext = React.createContext({
  user: null,
  // other properties...
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cancelAuthListener = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log('Setting user:', user);
    });

    return cancelAuthListener;
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
      throw err;
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      const userRef = doc(db, "users", user.uid); 
      await setDoc(userRef, {
        email: email,
        joinDate: new Date().toISOString(),
        // ... Add other default values for the user here if you need
      });

    } catch (err) {
      throw err;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check and add user details in Firestore (if not already added)
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          joinDate: new Date().toISOString(),
          // ... Add other default values for the user here if you need
        });
      }

    } catch (err) {
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    }
    catch (err) {
      throw err;
    }
  };

  const contextValue = {
    user,
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn,
    handleLogout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
