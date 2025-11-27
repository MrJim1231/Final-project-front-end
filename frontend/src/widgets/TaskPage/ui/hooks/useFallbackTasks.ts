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
    // ❌ Если уже есть задачи на дату → fallback не нужен
    if (filteredTasks.length > 0) return null;

    // ❌ Если есть поиск → fallback отключаем
    if (searchQuery.trim()) return null;

    // 📌 ВЫБИРАЕМ ТОЛЬКО ЗАДАЧИ ЭТОГО ТИПА
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

    // ❌ Если вообще нет задач этого типа → fallback не нужен
    if (filteredByType.length === 0) return null;

    // 🕒 Вычисляем дату создания задач
    const sorted = [...filteredByType].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const extractDate = (t: Todo) =>
      new Date(t.createdAt).toISOString().split("T")[0];

    const lastDate = extractDate(sorted[0]);

    // ❌ Если последняя дата = выбранная → fallback не нужен
    if (lastDate === selectedDate) return null;

    // 📌 Берём задачи нужного типа на последнюю дату
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
