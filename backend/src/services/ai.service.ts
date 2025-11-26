import { detectIntent, extractEntities } from "./nlp.service";
import prisma from "../prisma.config";

export async function processUserMessage(message: string): Promise<string> {
  const intent = detectIntent(message);
  const entities = extractEntities(message);

  if (intent === "add_todo") {
    const todo = await prisma.todo.create({
      data: {
        title: entities.title,
        dueDate: entities.dueDate,
        priority: entities.priority ? entities.priority.toUpperCase() as any : null,
        recurrence: entities.recurrence,
        tags: entities.tags || [],
      },
    });

    return `Added: ${todo.title}`;
  }

  if (intent === "list_todos") {
    const todos = await prisma.todo.findMany();
    if (!todos.length) return "You have no tasks.";

    return todos.map((t) => `• ${t.title}`).join("\n");
  }

  return "I did not understand that.";
}
