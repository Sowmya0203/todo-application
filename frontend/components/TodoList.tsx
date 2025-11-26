"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import SmartInput from "./SmartInput";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const fetchFilteredTodos = async () => {
    try {
      const params: any = {};
      if (filterPriority) params.priority = filterPriority;
      if (filterCompleted) params.completed = filterCompleted;
      if (filterTag) params.tag = filterTag;

      const res = await axios.get("http://localhost:4000/api/todos/filter", { params });
      setTodos(res.data);
    } catch (err) {
      console.error("Filter Error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/todos/${id}`, { completed: !completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };

  const handleUpdate = async (id: number, data: any) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/todos/${id}`, data);
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const handleSmartTodos = (newTodos: any[]) => {
    setTodos((prev) => [...newTodos, ...prev]);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ADD TODO */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add new todo"
          style={{ padding: "4px 8px", width: "300px" }}
        />
        <button onClick={addTodo} style={{ marginLeft: "8px" }}>Add</button>
      </div>

      {/* SMART INPUT */}
      <SmartInput onTodosCreated={handleSmartTodos} />

      {/* FILTERS */}
      <div style={{ marginBottom: "16px" }}>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="NONE">NONE</option>
        </select>

        <select value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)} style={{ marginLeft: "8px" }}>
          <option value="">All Status</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </select>

        <input
          type="text"
          placeholder="Tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={{ marginLeft: "8px" }}
        />

        <button onClick={fetchFilteredTodos} style={{ marginLeft: "8px" }}>Filter</button>
      </div>

      {/* TODO LIST */}
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
