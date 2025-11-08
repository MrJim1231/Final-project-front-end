// src/pages/completed-task/ui/CompletedTaskList/CompletedTaskList.tsx
import "./CompletedTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  removeTask,
  selectTask,
  updateTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

interface CompletedTaskListProps {
  onSelectTask?: (taskId: string) => void;
}

export const CompletedTaskList = ({ onSelectTask }: CompletedTaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, selected } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const completedTasks = items.filter((t) => t.status === "Completed");

  // ⚡ Автоматический выбор первой задачи
  useEffect(() => {
    if (completedTasks.length > 0 && !selected) {
      dispatch(selectTask(completedTasks[0]));
    }
  }, [completedTasks, selected, dispatch]);

  // ⚡ Следим за исчезновением выбранной
  useEffect(() => {
    if (selected && !completedTasks.find((t) => t.id === selected.id)) {
      const next = completedTasks[0] || null;
      dispatch(selectTask(next));
    }
  }, [completedTasks, selected, dispatch]);

  const handleDelete = (id: string) => {
    const idx = completedTasks.findIndex((t) => t.id === id);
    dispatch(removeTask(id));
    const next = completedTasks[idx + 1] || completedTasks[idx - 1] || null;
    dispatch(selectTask(next));
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    dispatch(updateTask({ id, status: newStatus }));
    if (newStatus !== "Completed") {
      const idx = completedTasks.findIndex((t) => t.id === id);
      const next = completedTasks[idx + 1] || completedTasks[idx - 1] || null;
      dispatch(selectTask(next));
    }
  };

  if (loading)
    return (
      <p className="completed-list__loading">Loading completed tasks...</p>
    );

  return (
    <div className="completed-list">
      <div className="completed-list__header">
        <h3 className="completed-list__title">Completed Tasks</h3>
      </div>

      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <div
            key={task.id}
            className={`completed-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() =>
              onSelectTask ? onSelectTask(task.id) : dispatch(selectTask(task))
            }
          >
            <TaskCard
              id={task.id}
              title={task.title}
              desc={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              completedAt={task.completedAt ?? "Recently completed"}
              type="completed"
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        ))
      ) : (
        <p className="completed-list__empty">✅ No completed tasks yet!</p>
      )}
    </div>
  );
};
