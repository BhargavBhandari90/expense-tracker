import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { ReactComponent as Logo } from "../logo.svg";
import { useUser } from "../AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { userName } = useUser();

  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserProfile = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="app-header">
      <div className="burger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <Link to="/" className="logo">
        <Logo className="app-logo" />
        Expense Tracker
      </Link>
      <nav className={`mobile-app-nav ${menuOpen ? "active" : ""}`}>
        <FaTimes className="close-icon" onClick={toggleMenu} size={24} />
        <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Daily
        </NavLink>
        <NavLink
          to="/monthly"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Monthly
        </NavLink>
        <NavLink
          to="/profile"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          My Profile
        </NavLink>
        <button className="nav-link logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
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
            <div className="user-name">{userName}</div>
          </div>
          <div className="user-profile-dropdown">
            <NavLink
              to="/profile"
              onClick={handleLogout}
              className="profile-link logout-button"
            >
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
