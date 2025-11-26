import express from "express";
import cors from "cors";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  filterTodos,
} from "./controllers/todoController";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Routes
app.get("/api/todos", getTodos);
app.post("/api/todos", createTodo);
app.patch("/api/todos/:id", updateTodo);
app.delete("/api/todos/:id", deleteTodo);
app.get("/api/todos/filter", filterTodos);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
