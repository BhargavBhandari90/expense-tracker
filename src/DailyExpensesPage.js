import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import "./styles/App.css";
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
  deleteDoc,
} from "firebase/firestore";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaPlus,
} from "react-icons/fa6";
import { auth } from "./firebase";

function DailyExpensesPage() {
  const todayDate = new Date().toISOString().split("T")[0];

  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [expensesCache, setExpensesCache] = useState({});

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));

      const updatedExpenses = expenses.filter((item) => item.id !== id);
      setExpenses(updatedExpenses);

      setExpensesCache((prev) => ({
        ...prev,
        [selectedDate]: updatedExpenses,
      }));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const fetchExpenses = React.useCallback(
    async (date) => {
      if (expensesCache[date]) {
        setExpenses(expensesCache[date]);
        return;
      }

      const expensesQuery = query(
        collection(db, "expenses"),
        where("userId", "==", auth.currentUser.uid),
        where("date", "==", date),
        orderBy("createdAt", "asc")
      );

      const snapshot = await getDocs(expensesQuery);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setExpensesCache((prev) => ({
        ...prev,
        [date]: items,
      }));

      setExpenses(items);
    },
    [expensesCache]
  );

  // Load from Firestore
  React.useEffect(() => {
    fetchExpenses(selectedDate);
  }, [selectedDate, fetchExpenses]);

  const addExpense = async () => {
    const newExpense = {
      price: "",
      description: "",
      createdAt: new Date().toISOString(),
      date: selectedDate,
      userId: auth.currentUser.uid,
    };

    const docRef = await addDoc(collection(db, "expenses"), newExpense);

    setExpenses([...expenses, { id: docRef.id, ...newExpense }]);
  };

  const handleChange = async (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);

    setExpensesCache((prev) => ({
      ...prev,
      [selectedDate]: updatedExpenses,
    }));

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
    <>
      <div className="expense-header">
        <button className="icon-button" onClick={handlePrevDay}>
          <FaCircleChevronLeft />
        </button>
        <div className="expense-title">
          <h2>{new Date(selectedDate).toDateString()}</h2>
        </div>
        <button className="icon-button" onClick={handleNextDay}>
          <FaCircleChevronRight />
        </button>
      </div>

      {expenses.length > 0 ? (
        <ExpenseList
          expenses={expenses}
          onChange={handleChange}
          onDelete={handleDelete}
        />
      ) : (
        <p>No Expense found....</p>
      )}

      <button className="add-button" onClick={addExpense}>
        <FaPlus />
      </button>
      <h2 className="total-text total-highlight">
        Total: ₹{getTotal().toFixed(2)}
      </h2>
    </>
  );
}

export default DailyExpensesPage;
