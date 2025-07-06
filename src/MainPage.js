import React from "react";
import { Routes, Route } from "react-router-dom";
import DailyExpensesPage from "./DailyExpensesPage";
import MonthlyExpensesPage from "./MonthlyExpensesPage";
import "./styles/App.css";
import "./styles/Header.css";
import Header from "./components/Header";

function MainPage() {
  return (
    <>
      <Header />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<DailyExpensesPage />} />
          <Route path="/monthly" element={<MonthlyExpensesPage />} />
        </Routes>
      </main>
    </>
  );
}

export default MainPage;
