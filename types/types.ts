export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Todo {
  id: number;                  // backend uses number? (you confirmed)
  title: string;
  description?: string;        // optional field, safe to include
  priority: Priority;          // "LOW" | "MEDIUM" | "HIGH"
  tags: string[];              // always an array
  dueDate: string | null;      // ISO date or null
  completed: boolean;          // checkbox status
}
