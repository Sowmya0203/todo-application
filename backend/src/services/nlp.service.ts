import chrono from "chrono-node";

export function detectIntent(message: string) {
  const m = message.toLowerCase();

  if (m.includes("add") || m.includes("create")) return "add_todo";
  if (m.includes("list") || m.includes("show")) return "list_todos";

  return "unknown";
}

export function extractEntities(message: string) {
  const parsedDate = chrono.parseDate(message);

  let priority = "NONE";
  if (message.includes("high")) priority = "HIGH";
  if (message.includes("medium")) priority = "MEDIUM";
  if (message.includes("low")) priority = "LOW";

  const title = message
    .replace(/add|create|high|medium|low/gi, "")
    .trim();

  return {
    title,
    dueDate: parsedDate || null,
    priority,
    recurrence: null,
    tags: [],
  };
}
