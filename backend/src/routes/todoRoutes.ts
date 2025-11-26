import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  filterTodos,
} from "../controllers/todoController";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/filter", filterTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
