// AuthContext.js

import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
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
      const result = await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
      enqueueSnackbar("Error Signing in:" , { variant: 'error' });
      console.log(err);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
      enqueueSnackbar("Error Signing up:" , { variant: 'error' });
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    }
    catch (err) {
      enqueueSnackbar("Error Signing in with Google:" , { variant: 'error' });
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    }
    catch (err) {
      enqueueSnackbar("Error Signing out:" , { variant: 'error' });
      console.log(err);
    }
    setUser(null);
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
