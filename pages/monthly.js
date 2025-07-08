import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import Head from "next/head";
import Amount from "../components/Amount";

const MonthlyExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const fetchMonthlyExpenses = React.useCallback(async () => {
    const expensesQuery = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("date", "asc")
    );
    const snapshot = await getDocs(expensesQuery);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Filter by selectedMonth
    const filtered = items.filter((item) => {
      const itemMonth = item.date.slice(0, 7); // "2025-07"
      return itemMonth === selectedMonth;
    });

    setExpenses(filtered);
  }, [selectedMonth]);

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [fetchMonthlyExpenses]);

  const total = expenses.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <>
      <Head>
        <title>Daily Expense Tracker - Monthly Expenses</title>
      </Head>
      <h1>Monthly Expenses</h1>
      <div className="month-container">
        <input
          type="month"
          value={selectedMonth}
          id="month"
          name="month"
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
            margin: "20px 0",
          }}
        />
      </div>
      {expenses.length > 0 ? (
        <table className="monthly-expenses-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toDateString()}</td>
                <td>{item.description}</td>
                <td>
                  <Amount amount={parseFloat(item.price || 0)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found for this month.</p>
      )}
      <h2 className="total-text total-highlight">
        Total: <Amount amount={total} />
      </h2>
    </>
  );
};

export default MonthlyExpensesPage;
