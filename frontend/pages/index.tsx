import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

type Todo = {
  id: number;
  title: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // Fetch todos on page load
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data as Todo[]);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      await createTodo(newTitle);
      setNewTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete todo
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Update todo
  const handleUpdate = async (id: number) => {
    const updatedTitle = prompt("Enter new title:");
    if (!updatedTitle) return;
    try {
      await updateTodo(id, updatedTitle);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Todo App</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new todo"
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
              border: "1px solid #ccc",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            <span>{todo.title}</span>
            <div>
              <button
                onClick={() => handleUpdate(todo.id)}
                style={{ marginRight: "0.5rem" }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
