import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
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
          <FaUserCircle size={28} />
          <div className="user-profile-dropdown">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
