import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  description?: string;
  priority?: string;
  tags?: string[];
  dueDate?: Date;
  completed: boolean;
};

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  onUpdate: (id: number, data: Partial<Todo>) => void;
};

export default function TodoItem({ todo, onDelete, onToggle, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");
  const [editPriority, setEditPriority] = useState(todo.priority || "MEDIUM");
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0,16) : "");

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate ? new Date(editDueDate) : undefined,
    });
    setIsEditing(false);
  };

  const formattedDueDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div style={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />
      {isEditing ? (
        <div>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="NONE">NONE</option>
          </select>
          <input
            type="datetime-local"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          <h4>{todo.title}</h4>
          {todo.description && <p>{todo.description}</p>}
          {todo.tags && todo.tags.length > 0 && <p>Tags: {todo.tags.join(", ")}</p>}
          {todo.priority && <p>Priority: {todo.priority}</p>}
          {formattedDueDate && <p>Due: {formattedDueDate}</p>}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
