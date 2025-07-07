import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast, Bounce } from "react-toastify";
import { useUser } from "../context/AuthContext";

const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useRouter();

  const { setUserName } = useUser();

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
      setUserName(name);
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
      navigate.push("/profile");
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
