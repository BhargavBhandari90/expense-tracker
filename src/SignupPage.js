import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactComponent as Logo } from "./logo.svg";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please add Email"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Please add Password"),
    confirmPassword: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Please add Confirm Password"),
  });

  return (
    <div className="app-container">
      <Logo className="app-logo" />
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            if (values.password !== values.confirmPassword) {
              toast.error("Passwords do not match!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              return false;
            }

            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
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
            toast.error(error.message, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="field-group">
              <Field
                name="email"
                className="expense-input"
                placeholder="Email*"
                autoComplete="off"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="field-group">
              <Field
                name="password"
                type="password"
                className="expense-input"
                placeholder="Password*"
                autoComplete="new-password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="field-group">
              <Field
                name="confirmPassword"
                type="password"
                className="expense-input"
                placeholder="Confirm Password*"
                autoComplete="new-password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>
            <button className="add-button" type="submit">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
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
