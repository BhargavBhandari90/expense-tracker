import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const MonthlyExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  ); // e.g., "2025-07"

  const fetchMonthlyExpenses = React.useCallback(

    async () => {
    const expensesQuery = query(
      collection(db, "expenses"),
      orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(expensesQuery);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Filter by selectedMonth
    const filtered = items.filter((item) => {
      const itemMonth = item.date.slice(0, 7); // "2025-07"
      return itemMonth === selectedMonth;
    });

    setExpenses(filtered);
  }, [selectedMonth])

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [fetchMonthlyExpenses]);

  const total = expenses.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <div>
      <h1>Monthly Expenses</h1>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      <div className="expense-list">
        {expenses.map((item) => (
          <div key={item.id} className="expense-item">
            <div className="item-group">
              <input type="number" value={item.price} readOnly />
              <input type="text" value={item.description} readOnly />
            </div>
            <div className="created-at">
              Added on: {new Date(item.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <h2 className="total-text">Total: ₹{total.toFixed(2)}</h2>
    </div>
  );
};

export default MonthlyExpensesPage;
