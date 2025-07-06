import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";


const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserProfile = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setEmail(data.email || auth.currentUser.email);
        } else {
          setEmail(auth.currentUser.email);
        }
      };
      fetchUserProfile();
    }
  }, []);

  const handleUserData = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: name,
        email: email,
      });

      toast.success("Profile Saved!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <h1>My Profile</h1>
      <form onSubmit={handleUserData}>
        <input
          type="email"
          placeholder="Email"
          className="expense-input"
          value={email}
          disabled
        />
        <input
          type="text"
          placeholder="Name"
          className="expense-input"
          autoComplete="on"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="add-button">
          Save
        </button>
      </form>
    </>
  );
};

export default UserProfilePage;
