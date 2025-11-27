import { useMemo } from "react";
import type { Todo } from "@/entities/task/api/todos";

export const useFilteredTasks = (
  tasks: Todo[],
  selectedDate: string,
  type: "my" | "vital" | "completed",
  searchQuery: string
) => {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return tasks.filter((t) => {
      const createdDate = new Date(t.createdAt).toISOString().split("T")[0];

      // ------------------------------
      // 🔍 MATCH SEARCH
      // ------------------------------
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // ------------------------------
      // 🔍 Если есть search — пропускаем фильтр по дате
      // ------------------------------
      if (query) {
        if (type === "my") return !t.vital && t.status !== "Completed";

        if (type === "vital") return t.vital === true;

        if (type === "completed") return t.status === "Completed";

        return true;
      }

      // ------------------------------
      // 📅 Фильтр по дате
      // ------------------------------
      if (createdDate !== selectedDate) return false;

      // ------------------------------
      // 🔥 Фильтр по type
      // ------------------------------
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
