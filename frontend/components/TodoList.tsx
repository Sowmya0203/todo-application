"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import SmartInput from "./SmartInput";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // FETCH TODOS
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD NORMAL TODO
  const addTodo = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post("http://localhost:4000/api/todos", { title: newTitle });
      setTodos((prev) => [res.data, ...prev]);
      setNewTitle("");
    } catch (err) {
      console.error("Add Todo Error:", err);
    }
  };

  // DELETE TODO
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // TOGGLE CHECKBOX
  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/todos/${id}`, { completed: !completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };

  // UPDATE TODO TITLE
  const handleUpdate = async (id: number, title: string) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/todos/${id}`, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  // SMART TODOS
  const handleSmartTodos = (newTodos: any[]) => {
    setTodos((prev) => [...newTodos, ...prev]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add new todo"
          style={{ padding: "4px 8px", width: "300px" }}
        />
        <button onClick={addTodo} style={{ marginLeft: "8px" }}>
          Add
        </button>
      </div>

      <SmartInput onTodosCreated={handleSmartTodos} />

      {todos.length === 0 && <p style={{ color: "gray" }}>No todos found. Add one!</p>}

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
