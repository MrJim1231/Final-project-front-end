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
import { useDateContext } from "../../../../shared/context/DateContext";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks, loading } = useSelector(
    (state: RootState) => state.tasks
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedDate } = useDateContext();

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
      status: "Not Started" as "Not Started",
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

  // 📅 Фильтруем задачи по выбранной дате
  const visibleTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && !t.vital && t.status !== "Completed";
  });

  // 📆 Форматирование даты
  const today = new Date(selectedDate);
  const day = today.getDate();
  const month = today.toLocaleString("en-US", { month: "long" });
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

      {/* === Дата (20 June · Today) === */}
      <div className="todo-list__date">
        {day} {month} <span className="todo-list__today">{isToday}</span>
      </div>

      {/* === Список задач === */}
      {visibleTasks.length > 0 ? (
        visibleTasks.map((task) => (
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
            enableDesktopModal // 👈 добавь это
          />
        ))
      ) : (
        <p>No tasks for this date 🎯</p>
      )}

      {/* === Модалка добавления === */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};
