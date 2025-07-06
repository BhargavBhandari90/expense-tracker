import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
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
        <button
          onClick={() => navigate("/login")}
          className="underline text-blue-600"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default SignupPage;
