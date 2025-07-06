import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { ReactComponent as Logo } from "../logo.svg";

export default function Header() {
  const navigate = useNavigate();
  const [ name, setName ] = useState("");
  const { userName } = useUser();

  console.log('userName', userName);

    useEffect(() => {
    if (auth.currentUser) {
      const fetchUserProfile = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName( data.name );
        }
      };
      fetchUserProfile();
    }
  }, [name]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <Logo className="app-logo" />
        Expense Tracker
      </Link>
      <div className="app-header-right">
        <nav className="app-nav">
          <NavLink to="/" className="nav-link">
            Daily
          </NavLink>
          <NavLink to="/monthly" className="nav-link">
            Monthly
          </NavLink>
        </nav>
        <div className="user-profile">
          <div className="user-data">
          <FaUserCircle size={28} />
          <div className="user-name">{name}</div>
          </div>
          <div className="user-profile-dropdown">
            <NavLink to="/profile" onClick={handleLogout} className="profile-link logout-button">
              Logout
            </NavLink>
            <NavLink to="/profile" className="profile-link">
                My Profile
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
