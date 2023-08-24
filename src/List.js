import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ editItem, items, removeItem }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, name } = item;
        return (
          <article key={id} className="todo-item">
            <p className="title">{name}</p>
            <div className="btn-container">
              <button
                onClick={() => editItem(id)}
                className="edit-btn"
                type="button"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeItem(id)}
                className="delete-btn"
                type="button"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
