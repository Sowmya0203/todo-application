import { Router } from "express";
import { handleChatRequest } from "../controllers/chat.Controller";

const router = Router();

router.post("/", handleChatRequest);

export default router;
