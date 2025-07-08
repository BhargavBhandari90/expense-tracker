import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import { auth } from "../firebase/firebase";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Head from "next/head";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();

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
      navigate.push("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Daily Expense Tracker - SignUp</title>
      </Head>
      <Image className="app-logo" src="/logo.svg" width={300} height={300} alt="Expense Tracker" />
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
        <Link href="/login" className="nav-link">
          Login
        </Link>
      </p>
    </>
  );
}

export default SignupPage;
