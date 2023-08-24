import "./styles.css";

import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalData = () => {
  let list = localStorage.getItem("toDoList");
  if (list) return JSON.parse(list);
  else return [];
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalData());
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return showAlert(true, "Input Field is Empty", "danger");
    if (name && isEdit) {
      setList(
        list.map((item) => {
          if (item.id === editID) return { ...item, name };
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEdit(false);

      return showAlert(true, "Item Edited", "success");
    }

    const id = new Date().getTime().toString();
    const newItem = { id, name };
    setList((list) => [...list, newItem]);
    showAlert(true, "Item Added Successfully", "success");
    setName("");
  };
  const showAlert = (show = false, message = "", type = "") =>
    setAlert({ show, message, type });

  const handleAddItem = (e) => setName(e.target.value);
  const handleClearList = () => {
    showAlert(true, "List Cleared!", "success");
    setList([]);
  };
  const handleRemoveItem = (id) => {
    const newItem = list.filter((item) => item.id !== id);
    setList(newItem);
    showAlert(true, "Item Removed", "danger");
  };
  const handleEditItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setEditID(editItem.id);
    setName(editItem.name);
    setIsEdit(true);
  };

  useEffect(() => localStorage.setItem("toDoList", JSON.stringify(list)), [
    list
  ]);

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="todo-form">
        {alert.show && <Alert list={list} removeAlert={showAlert} {...alert} />}
        <h3>To Do List</h3>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="Add your item here..."
            value={name}
            onChange={(e) => handleAddItem(e)}
          />
          <button type="submit" className="submit-btn">
            {isEdit ? "Edit" : "Save"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List
            editItem={handleEditItem}
            removeItem={handleRemoveItem}
            items={list}
          />
          <button onClick={handleClearList} className="clear-btn">
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
