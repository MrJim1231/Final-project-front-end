import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { removeTask, updateTaskStatus } from "@/entities/task/model/tasksSlice";

export const useTaskActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  // === УДАЛИТЬ ===
  const deleteTask = (id: string) => dispatch(removeTask(id));

  // === ВАЖНАЯ ЗАДАЧА ===
  const toggleVital = (id: string, vital: boolean) =>
    dispatch(updateTaskStatus({ id, vital }));

  // === ЗАВЕРШИТЬ ===
  const completeTask = (id: string) => {
    dispatch(
      updateTaskStatus({
        id,
        status: "Completed", // backend сам найдёт статус по title
        completedAt: new Date().toISOString(),
        vital: false, // completed всегда снимает vital
      })
    );
  };

  // === ВЕРНУТЬ ИЗ COMPLETED ===
  const unfinishTask = (id: string) =>
    dispatch(
      updateTaskStatus({
        id,
        status: "In Progress",
        completedAt: null,
      })
    );

  // === ПОМЕТИТЬ IN PROGRESS ===
  const markInProgress = (id: string) =>
    dispatch(updateTaskStatus({ id, status: "In Progress" }));

  // === СНЯТЬ IN PROGRESS → Not Started ===
  const unmarkInProgress = (id: string) =>
    dispatch(updateTaskStatus({ id, status: "Not Started" }));

  return {
    deleteTask,
    toggleVital,
    completeTask,
    unfinishTask,
    markInProgress,
    unmarkInProgress,
  };
};
