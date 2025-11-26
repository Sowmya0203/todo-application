import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { createSmartTodo } from "../controllers/smartTodo.controller";

const router = express.Router();

// Normal CRUD routes
router.get("/api/todos", getTodos);
router.post("/api/todos", createTodo);
router.patch("/api/todos/:id", updateTodo);
router.delete("/api/todos/:id", deleteTodo);

// Smart todo
router.post("/api/todos/smart", createSmartTodo);

export default router;
