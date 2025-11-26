"use client";

import React, { useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  onUpdate: (id: number, title: string) => void;
}

export default function TodoItem({ todo, onDelete, onToggle, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editTitle.trim() === "") return;
    onUpdate(todo.id, editTitle.trim());
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            style={{ marginLeft: "8px", padding: "2px 4px" }}
            autoFocus
          />
        ) : (
          <span
            style={{
              marginLeft: "8px",
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black",
            }}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div>
        <button onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "8px" }}>
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}
