// src/pages/my-task/ui/MyTaskList/MyTaskList.tsx
import "./MyTaskList.css";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  selectTask,
  updateTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

interface MyTaskListProps {
  onSelectTask?: (taskId: string) => void; // 👈 добавили
}

export const MyTaskList = ({ onSelectTask }: MyTaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  if (loading) return <p className="my-task-list__loading">Loading tasks...</p>;

  const activeTasks = items.filter((t) => t.status !== "Completed" && !t.vital);

  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    dispatch(updateTask({ id, status: newStatus }));
  };

  const handleVitalUpdate = (id: string, isVital: boolean) => {
    dispatch(updateTask({ id, vital: isVital }));
  };

  const handleClick = (id: string) => {
    if (onSelectTask) onSelectTask(id);
    else {
      const found = items.find((t) => t.id === id);
      if (found) dispatch(selectTask(found));
    }
  };

  return (
    <div className="my-task-list">
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

      {activeTasks.length > 0 ? (
        activeTasks.map((task) => (
          <div
            key={task.id}
            className={`my-task-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() => handleClick(task.id)} // 👈 теперь управляем через проп
          >
            <TaskCard
              id={task.id}
              title={task.title}
              desc={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={task.vital || false}
              type="default"
              onStatusUpdate={handleStatusUpdate}
              onVitalUpdate={handleVitalUpdate}
            />
          </div>
        ))
      ) : (
        <p className="my-task-list__empty">
          🗒 No active tasks — create your first one!
        </p>
      )}
    </div>
  );
};
