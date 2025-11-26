import { Request, Response } from "express";
import prisma from "../prisma.config";
import { Priority } from "@prisma/client";

export const filterTodos = async (req: Request, res: Response) => {
  try {
    const { priority, completed, tag } = req.query;

    const todos = await prisma.todo.findMany({
      where: {
        priority: priority
          ? { equals: priority.toString().toUpperCase() as Priority }
          : undefined,

        completed:
          completed === "true"
            ? true
            : completed === "false"
            ? false
            : undefined,

        tags: tag ? { has: String(tag) } : undefined,
      },
    });

    res.json(todos);
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Error filtering todos" });
  }
};
