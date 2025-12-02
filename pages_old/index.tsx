"use client";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH" | null;
  recurrence?: string | null;
  tags?: string[];
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");

  // Fetch all todos on load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/todos");
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  // Add normal todo
  const handleAddTodo = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:3001/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      });
      const newTodo: Todo = await res.json();
      setTodos(prev => [...prev, newTodo]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Add smart/NLP todo
  const handleSmartInput = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:3001/api/todos/smart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const newTodos: Todo[] = await res.json();
      setTodos(prev => [...prev, ...newTodos]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle completed
  const toggleComplete = async (todo: Todo) => {
    try {
      const res = await fetch(`http://localhost:3001/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (res.ok) {
        setTodos(prev =>
          prev.map(t => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTodos(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditInput(todo.title);
  };

  // Submit edit
  const submitEdit = async (id: number) => {
    if (!editInput.trim()) return;
    try {
      const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editInput }),
      });
      if (res.ok) {
        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...t, title: editInput } : t))
        );
        setEditingId(null);
        setEditInput("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My To-do App</h1>

      {/* Input */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add todo or NLP command"
          style={{ padding: "5px", width: "300px" }}
        />
        <button onClick={handleAddTodo} style={{ marginLeft: "5px" }}>Add</button>
        <button onClick={handleSmartInput} style={{ marginLeft: "5px" }}>Smart Add</button>
      </div>

      {/* Todo List */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
              style={{ marginRight: "5px" }}
            />

            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                  style={{ marginRight: "5px" }}
                />
                <button onClick={() => submitEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)} style={{ marginLeft: "5px" }}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.title}
                  {todo.dueDate && ` (Due: ${new Date(todo.dueDate).toLocaleDateString()})`}
                  {todo.priority && ` [${todo.priority}]`}
                </span>
                <button onClick={() => startEdit(todo)} style={{ marginLeft: "5px" }}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "5px" }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
