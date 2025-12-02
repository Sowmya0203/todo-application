"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import ChatUI from "@/components/ChatUI";
import ChatTodoList from "@/components/ChatTodoList";
import { Todo } from "@/types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAIAdd = async (msg: string) => {
    await axios.post("http://localhost:5000/api/todos/smart-add", { text: msg });
    await loadTodos();
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      <ChatUI onAiAddTodo={handleAIAdd} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ChatTodoList todos={todos} reload={loadTodos} />
      )}
    </div>
  );
}
