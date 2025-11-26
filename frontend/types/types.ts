export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH" | null;
  recurrence?: string | null;
  tags?: string[];
}
