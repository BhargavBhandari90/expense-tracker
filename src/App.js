import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DailyExpensesPage from "./DailyExpensesPage";
import MonthlyExpensesPage from "./MonthlyExpensesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav style={{ marginBottom: "20px", textAlign: "center" }}>
          <Link to="/">Daily Expense</Link> | <Link to="/monthly">Monthly Expense</Link>
        </nav>
        <Routes>
          <Route path="/" element={<DailyExpensesPage />} />
          <Route path="/monthly" element={<MonthlyExpensesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
