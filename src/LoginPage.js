import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="expense-input"
          value={email}
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="expense-input"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="add-button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="underline text-blue-600"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
