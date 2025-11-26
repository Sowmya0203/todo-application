import { Request, Response } from "express";

const parseMessage = async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  let reply = "Could not understand your message.";
  if (message.toLowerCase().includes("todo")) reply = "Detected TODO command!";

  res.status(200).json({ reply });
};

export default parseMessage; // ✅ default export
