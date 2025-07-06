import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
const UserContext = createContext('User');

export function useAuth() {
  return useContext(AuthContext);
}

export function useUser() {
  return useContext(UserContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName ] = useState('BB User');
  const [loading, setLoading] = useState(true);

  console.log("currentUser", currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  console.log('**userName**',userName);

  return (
    <AuthContext value={{ currentUser, userName }}>
      {!loading && children}
    </AuthContext>
  );
}
