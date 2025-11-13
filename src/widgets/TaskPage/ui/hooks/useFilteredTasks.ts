import { useMemo } from "react";
import type { Todo } from "@/entities/task/api/todos";

export const useFilteredTasks = (
  tasks: Todo[],
  selectedDate: string,
  type: "my" | "vital" | "completed",
  searchQuery: string
) => {
  const matchSearch = (t: Todo) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  };

  return useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = matchSearch(t);

      if (searchQuery.trim()) {
        switch (type) {
          case "my":
            return matchesSearch && !t.vital && t.status !== "Completed";
          case "vital":
            return matchesSearch && t.vital === true;
          case "completed":
            return matchesSearch && t.status === "Completed";
          default:
            return matchesSearch;
        }
      }

      const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
      if (taskDate !== selectedDate) return false;
      if (!matchesSearch) return false;

      switch (type) {
        case "my":
          return !t.vital && t.status !== "Completed";
        case "vital":
          return t.vital === true;
        case "completed":
          return t.status === "Completed";
        default:
          return true;
      }
    });
  }, [tasks, selectedDate, type, searchQuery]);
};
