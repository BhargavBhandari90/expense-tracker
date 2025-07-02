import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onChange }) {

  return (
    <div className="expense-list">
      {expenses.map((item, index) => (
        <ExpenseItem
          key={index}
          item={item}
          index={index}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
