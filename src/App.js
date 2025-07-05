import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import DailyExpensesPage from "./DailyExpensesPage";
import MonthlyExpensesPage from "./MonthlyExpensesPage";
import { FaUserCircle } from "react-icons/fa";
import "./App.css";
import "./Header.css";

function App() {
  return (
    <Router>
      <header className="app-header">
        <Link to="/" className="logo">
          Expense Tracker
        </Link>
        <div className="app-header-right">
          <nav className="app-nav">
            <NavLink to="/" className="nav-link">
              Daily
            </NavLink>
            <NavLink to="/monthly" className="nav-link">
              Monthly
            </NavLink>
          </nav>
          <div className="user-profile">
            <FaUserCircle size={28} />
          </div>
        </div>
      </header>
      <main className="app-container">
        <Routes>
          <Route path="/" element={<DailyExpensesPage />} />
          <Route path="/monthly" element={<MonthlyExpensesPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
