import { Request, Response } from "express";
import { processUserMessage } from "../services/ai.service";

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await processUserMessage(message);

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Chat processing failed" });
  }
}

