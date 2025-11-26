import { Request, Response } from "express";
import prisma from "../prisma.config";

// NLP libraries
import nlp from "compromise";
import nlpDates from "compromise-dates";

// Enable the dates plugin
(nlp as any).extend(nlpDates);

export const createSmartTodo = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Split tasks
    const tasks = message
      .split(/and|,|;/i)
      .map((t) => t.trim())
      .filter(Boolean);

    const createdTodos = [];

    for (let task of tasks) {
      const doc = (nlp as any)(task);     // Fix TypeScript error
      const dates = doc.dates().get();     // Now this works!

      let dueDate: Date | null = null;

      if (dates.length > 0) {
        dueDate = dates[0].date?.start || null;
        task = doc.dates().delete().out("text").trim();
      }

      const todo = await prisma.todo.create({
        data: {
          title: task,
          completed: false,
          dueDate,
        },
      });

      createdTodos.push(todo);
    }

    res.status(201).json(createdTodos);
  } catch (err) {
    console.error("Smart Todo Error:", err);
    res.status(500).json({ error: "Failed to create smart todos" });
  }
};
