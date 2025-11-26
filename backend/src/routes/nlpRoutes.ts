import { Router } from "express";
import parseMessage from "../controllers/nlp.controller"; // ✅ default import

const router = Router();

router.post("/parse", parseMessage);

export default router;

