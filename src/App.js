import React from "react";
import ExpenseList from "./components/ExpenseList";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";

function App() {
  const todayDate = new Date().toISOString().split("T")[0];

  const [expenses, setExpenses] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(todayDate);

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next.toISOString().split("T")[0]);
  };

  const fetchExpenses = async (date) => {
    const expensesQuery = query(
      collection(db, "expenses"),
      where("date", "==", date),
      orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(expensesQuery);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setExpenses(items);
  };

  // Load from Firestore
  React.useEffect(() => {
    fetchExpenses(selectedDate);
  }, [selectedDate]);

  const addExpense = async () => {
    const newExpense = {
      price: "",
      description: "",
      createdAt: new Date().toISOString(),
      date: selectedDate,
    };

    console.log('todayDate', todayDate);
    console.log('selectedDate', selectedDate);

    const docRef = await addDoc(collection(db, "expenses"), newExpense);
    setExpenses([...expenses, { id: docRef.id, ...newExpense }]);
  };

  const handleChange = async (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);

    const expenseDoc = doc(db, "expenses", updatedExpenses[index].id);
    await updateDoc(expenseDoc, {
      [field]: value,
    });
  };

  const getTotal = () => {
    return expenses.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0),
      0
    );
  };

  return (
    <div className="app-container">
      <div className="expense-header">
      <button className="icon-button" onClick={handlePrevDay}><FaCircleChevronLeft /></button>
      <div className="expense-title">
        <h1>Daily Expense Tracker</h1>
        <h2>{new Date(selectedDate).toDateString()}</h2>
      </div>
      <button className="icon-button" onClick={handleNextDay}><FaCircleChevronRight /></button>
      </div>

      <ExpenseList expenses={expenses} onChange={handleChange} />

      <button className="add-button" onClick={addExpense}>
        Add More
      </button>

      <h2 className="total-text">Total: ₹{getTotal().toFixed(2)}</h2>
    </div>
  );
}

export default App;
