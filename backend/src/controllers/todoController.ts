import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({ data: { title } });
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title },
  });
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.status(204).send();
};



