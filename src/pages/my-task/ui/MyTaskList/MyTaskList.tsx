import "./MyTaskList.css";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";
import { useEffect } from "react";

export const MyTaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    selected,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);

  // 🚀 Загружаем задачи при первом открытии
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  if (loading) return <p>Loading tasks...</p>;

  // 📅 Фильтруем задачи по выбранной дате из Redux
  const filteredTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && !t.vital && t.status !== "Completed";
  });

  // 📆 Форматируем дату (например, "8 November · Today")
  const current = new Date(selectedDate);
  const day = current.getDate();
  const month = current.toLocaleString("en-US", { month: "long" });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  return (
    <div className="my-task-list">
      {/* === Заголовок === */}
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

      {/* === Дата === */}
      <div className="my-task-list__date">
        {day} {month} <span className="my-task-list__today">{isToday}</span>
      </div>

      {/* === Список задач === */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`my-task-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() => dispatch(selectTask(task))}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={task.vital}
              type="default"
              enableDesktopModal // ✅ Модалка и на десктопе
            />
          </div>
        ))
      ) : (
        <p>🗒 No active tasks — create your first one!</p>
      )}
    </div>
  );
};
