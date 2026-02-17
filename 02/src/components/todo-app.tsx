"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Search,
  Calendar,
  CheckCheck,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "todo-app-data";

type Priority = "low" | "medium" | "high";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
};

type FilterType = "all" | "active" | "completed";

const priorityLabels: Record<Priority, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

const priorityBadgeVariant: Record<Priority, "secondary" | "default" | "destructive"> = {
  low: "secondary",
  medium: "default",
  high: "destructive",
};

function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [showAddOptions, setShowAddOptions] = useState(false);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      saveTodos(todos);
    }
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false,
        priority,
        dueDate: dueDate || null,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInputValue("");
    setDueDate("");
    setPriority("medium");
    setShowAddOptions(false);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const markAllComplete = () => {
    const allCompleted = filteredTodos.every((t) => t.completed);
    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: allCompleted ? false : true,
      }))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    setEditingId(null);
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id: string) => {
    if (editingText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const updateTodoPriority = (id: string, newPriority: Priority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const updateTodoDueDate = (id: string, newDate: string | null) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, dueDate: newDate } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      !searchQuery.trim() ||
      todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);
    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const activeCount = totalCount - completedCount;

  const formatDueDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { text: "지남", isOverdue: true };
    if (diff === 0) return { text: "오늘", isOverdue: false };
    if (diff === 1) return { text: "내일", isOverdue: false };
    return { text: date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" }), isOverdue: false };
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>할일 목록</CardTitle>
        <CardDescription>
          할일을 추가하고, 우선순위와 마감일을 설정하며, 필터링하고 검색할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 추가 폼 */}
        <form onSubmit={addTodo} className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="새 할일 입력..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Plus className="size-4" />
              <span className="sr-only">추가</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAddOptions(!showAddOptions)}
            >
              {showAddOptions ? "옵션 숨기기" : "우선순위 · 마감일"}
            </Button>
            {showAddOptions && (
              <div className="flex flex-wrap items-center gap-2">
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="우선순위" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">낮음</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="high">높음</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-[140px]"
                />
              </div>
            )}
          </div>
        </form>

        {/* 검색 & 필터 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="할일 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "active", "completed"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === "all" && "전체"}
                {f === "active" && "진행중"}
                {f === "completed" && "완료"}
              </Button>
            ))}
          </div>
        </div>

        {/* 통계 & 일괄 작업 */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
          <p className="text-sm text-muted-foreground">
            {completedCount} / {totalCount} 완료
            {activeCount > 0 && ` · ${activeCount}개 남음`}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllComplete}
              disabled={filteredTodos.length === 0}
            >
              <CheckCheck className="size-4" />
              {filteredTodos.every((t) => t.completed) ? "전체 해제" : "전체 완료"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
              onClick={clearCompleted}
              disabled={completedCount === 0}
            >
              <Trash className="size-4" />
              완료 항목 삭제
            </Button>
          </div>
        </div>

        {/* 할일 목록 */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              {todos.length === 0
                ? "아직 할일이 없습니다. 위에서 새 할일을 추가해보세요."
                : "검색 또는 필터 조건에 맞는 할일이 없습니다."}
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredTodos.map((todo) => {
                const dueInfo = formatDueDate(todo.dueDate);
                return (
                  <li
                    key={todo.id}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                      todo.completed && "bg-muted/50"
                    )}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo.id)}
                      aria-label={todo.text}
                    />
                    {editingId === todo.id ? (
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex gap-2">
                          <Input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(todo.id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                            className="flex-1 min-w-0"
                            autoFocus
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => saveEdit(todo.id)}
                            aria-label="저장"
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={cancelEdit}
                            aria-label="취소"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Select
                            value={todo.priority}
                            onValueChange={(v) => updateTodoPriority(todo.id, v as Priority)}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="우선순위" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">낮음</SelectItem>
                              <SelectItem value="medium">보통</SelectItem>
                              <SelectItem value="high">높음</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="date"
                            value={todo.dueDate || ""}
                            onChange={(e) =>
                              updateTodoDueDate(todo.id, e.target.value || null)
                            }
                            className="w-[140px]"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-1 flex-wrap items-center gap-2 min-w-0">
                          <span
                            className={cn(
                              "cursor-pointer flex-1 min-w-0",
                              todo.completed && "text-muted-foreground line-through"
                            )}
                            onClick={() => startEditing(todo)}
                          >
                            {todo.text}
                          </span>
                          <Badge variant={priorityBadgeVariant[todo.priority]} className="shrink-0">
                            {priorityLabels[todo.priority]}
                          </Badge>
                          {dueInfo && (
                            <span
                              className={cn(
                                "flex items-center gap-1 text-xs shrink-0",
                                dueInfo.isOverdue ? "text-destructive" : "text-muted-foreground"
                              )}
                            >
                              <Calendar className="size-3" />
                              {dueInfo.text}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => startEditing(todo)}
                            aria-label="수정"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => deleteTodo(todo.id)}
                            aria-label="삭제"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
