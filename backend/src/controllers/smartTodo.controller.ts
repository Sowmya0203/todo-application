import { Request, Response } from "express";
import prisma from "../prisma.config";

export const createSmartTodo = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Split message into multiple tasks
    const tasks = message
      .split(/and|,|;/i)
      .map((t) => t.trim())
      .filter(Boolean);

    const created: any[] = [];

    for (let task of tasks) {
      // Extract date using regex (dd/mm/yyyy OR dd-mm-yyyy)
      const dateRegex = /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/;
      const found = task.match(dateRegex);

      let dueDate: Date | null = null;

      if (found) {
        dueDate = new Date(found[1]); // Convert string to Date object
        task = task.replace(found[1], "").trim(); // Remove date text from title
      }

      const todo = await prisma.todo.create({
        data: {
          title: task,
          description: "",
          priority: "MEDIUM",   // MUST be uppercase
          tags: [],
          dueDate,
        },
      });

      created.push(todo);
    }

    res.status(201).json(created);
  } catch (err) {
    console.error("Smart Todo Error:", err);
    res.status(500).json({ error: "Failed to create smart todos" });
  }
};
