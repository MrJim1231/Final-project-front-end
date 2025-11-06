import { useEffect, useState } from "react";
import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";
import { getTodos } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const TodoList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Загружаем данные из mockAPI
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTasks(data);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // ✅ Добавление новой задачи (локально)
  const handleAddTask = (newTask: any) => {
    const taskWithId = {
      id: String(Date.now()),
      title: newTask.title,
      description: newTask.description,
      createdAt: newTask.date,
      priority: newTask.priority,
      status: "Not Started" as const,
      image: newTask.image ? URL.createObjectURL(newTask.image) : "",
    };
    setTasks((prev) => [taskWithId, ...prev]);
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="todo-list">
      {/* === Заголовок секции === */}
      <div className="todo-list__header">
        <div className="todo-list__title-wrapper">
          <FiClipboard className="todo-list__icon" />
          <h3 className="todo-list__title">To-Do</h3>
        </div>

        <button className="todo-list__add" onClick={() => setIsModalOpen(true)}>
          <span className="todo-list__add-icon">
            <FiPlus />
          </span>
          Add task
        </button>
      </div>

      {/* === Дата под заголовком === */}
      <div className="todo-list__date-section">
        <span className="todo-list__day">20 June</span>
        <span className="todo-list__dot">•</span>
        <span className="todo-list__today">Today</span>
      </div>

      {/* === Карточки === */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          desc={task.description}
          date={new Date(task.createdAt).toLocaleDateString()}
          priority={task.priority}
          status={task.status}
          image={task.image}
        />
      ))}

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
