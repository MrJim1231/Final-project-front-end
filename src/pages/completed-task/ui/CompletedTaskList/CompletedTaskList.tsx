import "./CompletedTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  selectTask,
  selectFirstTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const CompletedTaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    selected,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);

  // 🚀 Подгружаем задачи при монтировании
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  if (loading) return <p>Loading completed tasks...</p>;

  // ✅ Фильтруем завершённые задачи за выбранную дату
  const completedTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && t.status === "Completed";
  });

  // 🧠 Автоселект первой задачи
  useEffect(() => {
    if (completedTasks.length > 0 && !selected) {
      dispatch(selectFirstTask(completedTasks));
    }
  }, [completedTasks, selected, dispatch]);

  // 📆 Форматирование даты
  const current = new Date(selectedDate);
  const day = current.getDate();
  const month = current.toLocaleString("en-US", { month: "long" });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  return (
    <div className="completed-list">
      {/* === Заголовок === */}
      <div className="completed-list__header">
        <h3 className="completed-list__title">Completed Tasks</h3>
      </div>

      {/* === Дата === */}
      <div className="completed-list__date">
        {day} {month} <span className="completed-list__today">{isToday}</span>
      </div>

      {/* === Список задач === */}
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <div
            key={task.id}
            className={`completed-list__item ${
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
              type="completed"
              completedAt={task.completedAt ?? undefined}
              // enableDesktopModal
            />
          </div>
        ))
      ) : (
        <p>✅ No completed tasks for this date!</p>
      )}
    </div>
  );
};
