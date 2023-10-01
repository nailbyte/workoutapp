// AuthContext.js

import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut,  createUserWithEmailAndPassword } from "firebase/auth";
import { useSnackbar } from 'notistack';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  //const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const cancelAuthListener = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log('Setting user:', user);
      //setLoading(false);
    });

    return cancelAuthListener;
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
      enqueueSnackbar("Error Signing in: " + err.message, { variant: 'error' });
      console.log(err);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
      enqueueSnackbar("Error Signing up:" + err.message, { variant: 'error' });
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    }
    catch (err) {
      enqueueSnackbar("Error Signing in with Google:" + err.message, { variant: 'error' });
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    }
    catch (err) {
      enqueueSnackbar("Error Signing out:" + err.message, { variant: 'error' });
      console.log(err);
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
