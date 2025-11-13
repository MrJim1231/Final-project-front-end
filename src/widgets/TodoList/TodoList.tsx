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
    searchQuery, // 🆕 SEARCH — достаём из redux
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

  // ============================
  // 🔍 Функция проверки поиска
  // ============================
  const matchSearch = (t: any) => {
    if (!searchQuery.trim()) return true; // если поиска нет — возвращаем всё

    const q = searchQuery.toLowerCase();

    return (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  };

  // ========================================
  // 📅 Задачи выбранной даты + поиск
  // ========================================
  const visibleTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
        const matchesDate =
          taskDate === selectedDate && !t.vital && t.status !== "Completed";

        return matchesDate && matchSearch(t); // 🆕 SEARCH
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
  }, [tasks, selectedDate, searchQuery]);

  // ========================================
  // 🔥 Fallback: задачи последней даты + поиск
  // ========================================
  const fallback = useMemo(() => {
    if (visibleTasks.length > 0) return null;

    const getDate = (t: any) =>
      new Date(t.createdAt).toISOString().split("T")[0];

    // выбираем только задачи, подходящие под поиск
    const filtered = tasks.filter(
      (t) => !t.vital && t.status !== "Completed" && matchSearch(t) // 🆕 SEARCH
    );

    if (filtered.length === 0) return null;

    // сортируем по дате (последние сверху)
    const sorted = filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const lastDate = getDate(sorted[0]);

    // задачи этой последней даты
    const lastDateTasks = sorted
      .filter((t) => getDate(t) === lastDate)
      .slice(0, 3);

    if (lastDateTasks.length === 0) return null;

    // если последняя дата совпадает с текущей — fallback не нужен
    if (lastDate === selectedDate) return null;

    return {
      date: lastDate,
      tasks: lastDateTasks,
    };
  }, [tasks, selectedDate, visibleTasks, searchQuery]);

  // 📆 Форматирование даты
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

      {/* === Список задач === */}
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
              showAlert
              enableDesktopModal
            />
          ))}
        </div>
      ) : (
        <p className="todo-list__empty">No tasks for this date 🎯</p>
      )}

      {/* === Fallback задачи === */}
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
                showAlert
                enableDesktopModal
              />
            ))}
          </div>
        </div>
      )}

      {/* === Модалка === */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};
