import React from "react";
import { MdDelete } from "react-icons/md";

function ExpenseItem({ item, index, onChange, onDelete }) {
  return (
    <div className="expense-item">
      <div className="item-group">
        <input
          type="number"
          placeholder="Price"
          value={item.price}
          onChange={(e) => onChange(index, "price", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={item.description}
          onChange={(e) => onChange(index, "description", e.target.value)}
        />
        <button className="icon-button delete" onClick={() => onDelete(item.id)}><MdDelete /></button>
      </div>
      {item.createdAt && (
        <div className="created-at">
          Added on: {new Date(item.createdAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default ExpenseItem;
