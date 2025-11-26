import { useState } from "react";
import axios from "axios";

type Props = {
  onTodosCreated: (todos: any[]) => void;
};

export default function SmartInput({ onTodosCreated }: Props) {
  const [input, setInput] = useState("");

  const handleAdd = async () => {
    const lines = input.split("\n").filter(Boolean);
    const todosToAdd: any[] = [];

    for (const line of lines) {
      const todo = { title: line, priority: "MEDIUM" };
      try {
        const res = await axios.post("http://localhost:4000/api/todos", todo);
        todosToAdd.push(res.data);
      } catch (err) {
        console.error("Smart Add Error:", err);
      }
    }

    onTodosCreated(todosToAdd);
    setInput("");
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <textarea
        rows={4}
        cols={50}
        placeholder="Add multiple todos, one per line"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleAdd}>Smart Add</button>
    </div>
  );
}
