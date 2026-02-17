import { TodoApp } from "@/components/todo-app";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <TodoApp />
    </div>
  );
}
