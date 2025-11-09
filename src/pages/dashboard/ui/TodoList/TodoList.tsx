import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { AddTaskModal } from "../../../../entities/task/ui/AddTaskModal/AddTaskModal";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  addNewTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

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
      createdAt: taskData.date || new Date().toISOString(),
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

  // 📅 Фильтруем задачи по выбранной дате из Redux
  const visibleTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && !t.vital && t.status !== "Completed";
  });

  // 📆 Форматирование даты (например, "9 November · Today")
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
          {" "}
          {/* ✅ Контейнер с gap и анимацией */}
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
