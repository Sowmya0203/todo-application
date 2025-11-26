import nlp from "compromise";
import chrono from "chrono-node";

export type SmartTodo = {
  title: string;
  completed: boolean;
  dueDate?: Date | null;
  priority?: "LOW" | "MEDIUM" | "HIGH" | null;
  recurrence?: string | null;
  tags?: string[];
};

export function parseTextToTodos(text: string): SmartTodo[] {
  // Split sentences by 'and' or '.'
  const sentences = text.split(/ and |\. /i).filter(s => s.trim() !== "");

  return sentences.map(sentence => {
    const doc = nlp(sentence);

    // Extract priority keywords
    let priority: "LOW" | "MEDIUM" | "HIGH" | null = null;
    if (/high/i.test(sentence)) priority = "HIGH";
    else if (/medium/i.test(sentence)) priority = "MEDIUM";
    else if (/low/i.test(sentence)) priority = "LOW";

    // Extract due date using chrono-node
    const date = chrono.parseDate(sentence);

    // Optional: recurrence parsing (example: weekly/daily)
    let recurrence: string | null = null;
    if (/every day/i.test(sentence)) recurrence = "daily";
    else if (/every week/i.test(sentence)) recurrence = "weekly";
    else if (/every month/i.test(sentence)) recurrence = "monthly";

    return {
      title: sentence.replace(/high|medium|low/i, "").trim(),
      completed: false,
      dueDate: date || null,
      priority,
      recurrence,
      tags: [],
    };
  });
}
