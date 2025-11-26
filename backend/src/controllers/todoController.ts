import { Request, Response } from "express";
import prisma from "../prisma.config";
import { Priority } from "@prisma/client";

// CREATE TODO
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, tags, dueDate } = req.body;

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || "",
        priority: priority ? (priority.toUpperCase() as Priority) : Priority.MEDIUM,
        tags: tags || [],
        dueDate: dueDate ? new Date(dueDate) : undefined,
        completed: false,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating todo" });
  }
};

// GET ALL TODOS
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { id: "desc" },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// UPDATE TODO
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, priority, tags, dueDate, completed } = req.body;

    const updated = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        priority: priority ? (priority.toUpperCase() as Priority) : undefined,
        tags,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        completed,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating todo" });
  }
};

// DELETE TODO
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.todo.delete({
      where: { id },
    });

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

// FILTER TODOS
export const filterTodos = async (req: Request, res: Response) => {
  try {
    const { priority, completed, tag } = req.query;

    const todos = await prisma.todo.findMany({
      where: {
        priority: priority ? (String(priority).toUpperCase() as Priority) : undefined,
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
    res.status(500).json({ message: "Error filtering todos" });
  }
};
