import { Request, Response } from "express";
import prisma from "../prisma.config";

export const filterTodos = async (req: Request, res: Response) => {
  try {
    const { priority, from, to, tags } = req.query;

    const filters: any = {};

    if (priority) filters.priority = String(priority).toUpperCase();

    if (tags) filters.tags = { has: String(tags) };

    if (from || to) {
      filters.dueDate = {};
      if (from) filters.dueDate.gte = new Date(String(from));
      if (to) filters.dueDate.lte = new Date(String(to));
    }

    const todos = await prisma.todo.findMany({
      where: filters,
    });

    res.status(200).json(todos);

  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ error: "Failed to filter todos" });
  }
};
