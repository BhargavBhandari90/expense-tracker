import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MainPage from "./MainPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {!currentUser ? (
        <>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      ) : (
        <>
          <Route path="*" element={<MainPage />} />
        </>
      )}
    </Routes>
  );
}

export default App;
