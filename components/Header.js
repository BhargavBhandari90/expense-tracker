import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "../context/AuthContext";

export default function Header() {
  const navigate = useRouter();
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
      navigate.push("/");
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
      <Link href="/" className="logo">
        <Image className="app-logo" src="/logo.svg" width={300} height={300} alt="Expense Tracker" />
        Expense Tracker
      </Link>
      <nav className={`mobile-app-nav ${menuOpen ? "active" : ""}`}>
        <FaTimes className="close-icon" onClick={toggleMenu} size={24} />
        <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Daily
        </Link>
        <Link
          href="/monthly"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Monthly
        </Link>
        <Link
          href="/profile"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          My Profile
        </Link>
        <button className="nav-link logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="app-header-right">
        <nav className="app-nav">
          <Link href="/" className="nav-link">
            Daily
          </Link>
          <Link href="/monthly" className="nav-link">
            Monthly
          </Link>
        </nav>
        <div className="user-profile">
          <div className="user-data">
            <FaUserCircle size={28} />
            <div className="user-name">{userName}</div>
          </div>
          <div className="user-profile-dropdown">
            <Link
              href="/profile"
              onClick={handleLogout}
              className="profile-link logout-button"
            >
              Logout
            </Link>
            <Link href="/profile" className="profile-link">
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
