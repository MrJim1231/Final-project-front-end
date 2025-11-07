import "./MyTaskList.css";
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
import type { Todo } from "../../../../shared/api/todos";

interface MyTaskListProps {
  onSelectTask: (task: Todo | null) => void;
}

export const MyTaskList = ({ onSelectTask }: MyTaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, selected } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ✅ фильтруем активные задачи (не Completed и не Vital)
  const tasks = items.filter((t) => t.status !== "Completed" && !t.vital);

  // 🗑️ удалить задачу
  const handleDeleteTask = (id: string) => {
    if (confirm("Удалить задачу?")) {
      dispatch(removeTask(id));
    }
  };

  // ⭐ обновить важность (Vital)
  const handleVitalUpdate = (id: string, isVital: boolean) => {
    dispatch(updateTask({ id, vital: isVital }));
  };

  // ✅ обновить статус
  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    dispatch(updateTask({ id, status: newStatus }));
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="my-task-list">
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              dispatch(selectTask(task));
              onSelectTask(task);
            }}
            className={`my-task-list__item ${
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
              vital={task.vital || false}
              type="default"
              onDelete={handleDeleteTask}
              onVitalUpdate={handleVitalUpdate}
              onStatusUpdate={handleStatusUpdate}
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
