// src/pages/vital-task/ui/VitalTaskList/VitalTaskList.tsx
import "./VitalTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  removeTask,
  updateTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

interface VitalTaskListProps {
  onSelectTask?: (taskId: string) => void; // 👈 новый проп
}

export const VitalTaskList = ({ onSelectTask }: VitalTaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  const vitalTasks = items.filter((t) => t.vital);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (vitalTasks.length > 0 && !selected) {
      dispatch(selectTask(vitalTasks[0]));
    }
  }, [vitalTasks, selected, dispatch]);

  useEffect(() => {
    if (selected && !vitalTasks.find((t) => t.id === selected.id)) {
      const next = vitalTasks[0] || null;
      dispatch(selectTask(next));
    }
  }, [vitalTasks, selected, dispatch]);

  const handleDeleteTask = (id: string) => {
    if (window.confirm("Удалить задачу?")) {
      const currentIndex = vitalTasks.findIndex((t) => t.id === id);
      dispatch(removeTask(id));
      const next =
        vitalTasks[currentIndex + 1] || vitalTasks[currentIndex - 1] || null;
      dispatch(selectTask(next));
    }
  };

  const handleVitalUpdate = (id: string, isVital: boolean) => {
    dispatch(updateTask({ id, vital: isVital }));
    if (!isVital && selected?.id === id) {
      const currentIndex = vitalTasks.findIndex((t) => t.id === id);
      const next =
        vitalTasks[currentIndex + 1] || vitalTasks[currentIndex - 1] || null;
      dispatch(selectTask(next));
    }
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    dispatch(
      updateTask({
        id,
        status: newStatus,
        vital: newStatus !== "Completed",
        completedAt:
          newStatus === "Completed" ? new Date().toISOString() : null,
      })
    );
    if (newStatus === "Completed" && selected?.id === id) {
      const currentIndex = vitalTasks.findIndex((t) => t.id === id);
      const next =
        vitalTasks[currentIndex + 1] || vitalTasks[currentIndex - 1] || null;
      dispatch(selectTask(next));
    }
  };

  if (loading)
    return <p className="vital-task-list__loading">Loading vital tasks...</p>;

  return (
    <div className="vital-task-list">
      <div className="vital-task-list__header">
        <h3 className="vital-task-list__title">Vital Tasks</h3>
      </div>

      {vitalTasks.length > 0 ? (
        vitalTasks.map((task) => (
          <div
            key={task.id}
            onClick={() =>
              onSelectTask ? onSelectTask(task.id) : dispatch(selectTask(task))
            } // ✅ адаптивная логика
            className={`vital-task-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              desc={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={true}
              type="vital"
              onDelete={handleDeleteTask}
              onVitalUpdate={handleVitalUpdate}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        ))
      ) : (
        <p className="vital-task-list__empty">
          😌 No vital tasks yet — mark important ones in your To-Do list!
        </p>
      )}
    </div>
  );
};
