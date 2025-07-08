import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast, Bounce } from "react-toastify";
import { useUser } from "../context/AuthContext";
import Head from "next/head";
import currencySymbolMap from "currency-symbol-map/map";

const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const navigate = useRouter();

  const { setUserName, setUserCurrency } = useUser();

  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserProfile = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setEmail(data.email || auth.currentUser.email);
          setCurrency(data.currency || "INR");
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
        currency: currency,
      });
      setUserName(name);
      setUserCurrency(currency);
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
      <Head>
        <title>Daily Expense Tracker - My Profile</title>
      </Head>
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
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="expense-input"
          name="currency"
        >
          <option key="ABC" value="">
            Select Currency
          </option>
          {Object.entries(currencySymbolMap).map(([code, symbol]) => (
            <option key={code} value={code}>
              {code}-{symbol}
            </option>
          ))}
        </select>
        <button type="submit" className="add-button">
          Save
        </button>
      </form>
    </>
  );
};

export default UserProfilePage;
