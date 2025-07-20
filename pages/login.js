import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Head from "next/head";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You are Logged-in!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Daily Expense Tracker - Login</title>
      </Head>
      <Image className="app-logo" src="/logo.svg" width={300} height={300} alt="Expense Tracker" />
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
        <button className="add-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link href="/signup" className="nav-link">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
