import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "./components/Loader";

const AuthContext = createContext();
const UserContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useUser() {
  return useContext(UserContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userCurrency, setUserCurrency] = useState("INR");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name || "");
          setUserCurrency(docSnap.data().currency || "");
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext value={{ currentUser }}>
      <UserContext
        value={{ userName, setUserName, userCurrency, setUserCurrency }}
      >
        {loading ? <Loader /> : children}
      </UserContext>
    </AuthContext>
  );
}
