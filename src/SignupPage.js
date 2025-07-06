import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as Logo } from "./logo.svg";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      toast.success("Succefully Signed Up! Please Login.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <Logo className="app-logo" />
      <h1>Sign Up</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="expense-input"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="expense-input"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="add-button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
