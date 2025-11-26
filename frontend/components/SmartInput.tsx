"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  onTodosCreated: (newTodos: any[]) => void;
}

export default function SmartInput({ onTodosCreated }: Props) {
  const [text, setText] = useState("");

  const handleSmartAdd = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post("http://localhost:4000/api/todos/smart", { message: text });
      onTodosCreated(res.data);
      setText("");
    } catch (err) {
      console.error("Smart Todo Error:", err);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        type="text"
        value={text}
        placeholder="Add smart todo or normal todo"
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "4px 8px", width: "300px" }}
      />
      <button onClick={handleSmartAdd} style={{ marginLeft: "8px" }}>
        Smart Add
      </button>
    </div>
  );
}
