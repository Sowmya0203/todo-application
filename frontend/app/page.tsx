import TodoList from "../components/TodoList";

export default function Page() {
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Enabled Todo App</h1>
      <TodoList />
    </main>
  );
}
