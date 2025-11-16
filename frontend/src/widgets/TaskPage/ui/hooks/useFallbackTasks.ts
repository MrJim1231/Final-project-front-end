import { useMemo } from "react";
import type { Todo } from "@/entities/task/api/todos";

export const useFallbackTasks = (
  tasks: Todo[],
  filteredTasks: Todo[],
  selectedDate: string,
  type: "my" | "vital" | "completed",
  limit: number,
  searchQuery: string
) => {
  return useMemo(() => {
    if (filteredTasks.length > 0) return null;
    if (searchQuery.trim()) return null;

    const extractDate = (t: Todo) =>
      new Date(t.createdAt).toISOString().split("T")[0];

    const filteredByType = tasks.filter((t) => {
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

    if (filteredByType.length === 0) return null;

    const sorted = [...filteredByType].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const lastDate = extractDate(sorted[0]);

    if (lastDate === selectedDate) return null;

    const lastDateTasks = sorted
      .filter((t) => extractDate(t) === lastDate)
      .slice(0, limit);

    if (lastDateTasks.length === 0) return null;

    return {
      date: lastDate,
      tasks: lastDateTasks,
    };
  }, [tasks, filteredTasks, selectedDate, type, limit, searchQuery]);
};
