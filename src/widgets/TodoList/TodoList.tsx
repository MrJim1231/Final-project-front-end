import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { useEffect, useState, useMemo } from "react";
import { TaskCard } from "../../entities/task/TaskCard";
import { AddTaskModal } from "../../entities/task/ui/AddTaskModal/AddTaskModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addNewTask } from "../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../app/providers/store";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🚀 Загружаем задачи при первом рендере
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🆕 Добавление новой задачи
  const handleAddTask = (taskData: any) => {
    const newTask = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || "Low",
      status: "Not Started" as const,
      createdAt: new Date().toISOString(),
      image:
        typeof taskData.image === "string"
          ? taskData.image
          : taskData.image
          ? URL.createObjectURL(taskData.image)
          : "",
      vital: false,
    };

    dispatch(addNewTask(newTask));
  };

  // 📅 Задачи выбранной даты
  const visibleTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
        return (
          taskDate === selectedDate && !t.vital && t.status !== "Completed"
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
  }, [tasks, selectedDate]);

  // 🔥 Fallback: задачи последней даты, если на текущую нет
  const fallback = useMemo(() => {
    if (visibleTasks.length > 0) return null;

    const getDate = (t: any) =>
      new Date(t.createdAt).toISOString().split("T")[0];

    const allDates = [...new Set(tasks.map((t) => getDate(t)))].sort();

    if (allDates.length === 0) return null;

    const latest = allDates[allDates.length - 1];

    // Если последняя дата совпадает с текущей — fallback не нужен
    if (latest === selectedDate) return null;

    const latestTasks = tasks
      .filter(
        (t) => getDate(t) === latest && !t.vital && t.status !== "Completed"
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);

    if (latestTasks.length === 0) return null;

    return {
      date: latest,
      tasks: latestTasks,
    };
  }, [tasks, selectedDate, visibleTasks]);

  // 📆 Форматирование даты для главного блока
  const current = new Date(selectedDate);
  const day = current.getDate();
  const month = current.toLocaleString("en-US", { month: "long" });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="todo-list">
      {/* === Заголовок === */}
      <div className="todo-list__header">
        <div className="todo-list__title-wrapper">
          <FiClipboard className="todo-list__icon" />
          <h3 className="todo-list__title">To-Do</h3>
        </div>
        <button className="todo-list__add" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add task
        </button>
      </div>

      {/* === Текущая дата === */}
      <div className="todo-list__date">
        {day} {month} <span className="todo-list__today">{isToday}</span>
      </div>

      {/* === Список задач выбранной даты === */}
      {visibleTasks.length > 0 ? (
        <div className="todo-list__tasks">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={task.vital}
              showAlert={true}
              enableDesktopModal
            />
          ))}
        </div>
      ) : (
        <p className="todo-list__empty">No tasks for this date 🎯</p>
      )}

      {/* === Fallback задачи последней даты === */}
      {fallback && (
        <div className="todo-list__fallback">
          <div className="todo-list__fallback-date">
            {new Date(fallback.date).getDate()}{" "}
            {new Date(fallback.date).toLocaleString("en-US", {
              month: "long",
            })}
          </div>

          <div className="todo-list__tasks">
            {fallback.tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                date={new Date(task.createdAt).toLocaleDateString()}
                priority={task.priority}
                status={task.status}
                image={task.image}
                vital={task.vital}
                showAlert={true}
                enableDesktopModal
              />
            ))}
          </div>
        </div>
      )}

      {/* === Модалка добавления задачи === */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};
