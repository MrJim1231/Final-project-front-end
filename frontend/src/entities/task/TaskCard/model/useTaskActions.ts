import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/providers/store";
import { removeTask, updateTaskStatus } from "@/entities/task/model/tasksSlice";

export const useTaskActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteTask = (id: string) => dispatch(removeTask(id));

  const toggleVital = (id: string, vital: boolean) =>
    dispatch(updateTaskStatus({ id, vital }));

  const completeTask = (id: string) => {
    const now = new Date().toISOString();
    dispatch(
      updateTaskStatus({
        id,
        status: "Completed",
        completedAt: now,
        vital: false,
      })
    );
  };

  const unfinishTask = (id: string) =>
    dispatch(
      updateTaskStatus({ id, status: "In Progress", completedAt: null })
    );

  const markInProgress = (id: string) =>
    dispatch(updateTaskStatus({ id, status: "In Progress" }));

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
