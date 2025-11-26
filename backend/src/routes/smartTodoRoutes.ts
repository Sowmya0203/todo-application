import { Router } from "express";
import { createSmartTodo } from "../controllers/smartTodo.controller";

const router = Router();

router.post("/", createSmartTodo);

export default router;
