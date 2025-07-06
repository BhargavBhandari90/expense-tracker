import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth, useUser } from "./AuthContext";
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
  const { userName } = useUser();

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
          <Route path="*" element={<MainPage username={ userName } />} />
        </>
      )}
    </Routes>
  );
}

export default App;
