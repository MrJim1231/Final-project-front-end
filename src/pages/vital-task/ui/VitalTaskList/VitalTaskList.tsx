import "./VitalTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const VitalTaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    selected,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);

  // 🚀 Загружаем задачи при монтировании
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  if (loading) return <p>Loading vital tasks...</p>;

  // 📅 Фильтруем только важные задачи за выбранную дату
  const vitalTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && t.vital;
  });

  // 📆 Форматирование даты для отображения
  const current = new Date(selectedDate);
  const day = current.getDate();
  const month = current.toLocaleString("en-US", { month: "long" });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  return (
    <div className="vital-task-list">
      {/* === Заголовок === */}
      <div className="vital-task-list__header">
        <h3 className="vital-task-list__title">Vital Tasks</h3>
      </div>

      {/* === Дата === */}
      <div className="vital-task-list__date">
        {day} {month} <span className="vital-task-list__today">{isToday}</span>
      </div>

      {/* === Список задач === */}
      {vitalTasks.length > 0 ? (
        vitalTasks.map((task) => (
          <div
            key={task.id}
            className={`vital-task-list__item ${
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
              type="vital"
              // enableDesktopModal
            />
          </div>
        ))
      ) : (
        <p>😌 No vital tasks yet — mark important ones!</p>
      )}
    </div>
  );
};
