import { useEffect, useState } from "react";
import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";
import { getTodos, deleteTodo, patchTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";
import { useDateContext } from "../../../../shared/context/DateContext";

export const TodoList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { selectedDate } = useDateContext(); // 👈 выбранная дата

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

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Удалить задачу?")) return;
    try {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleVitalUpdate = async (id: string, isVital: boolean) => {
    try {
      await patchTodo(id, { vital: isVital });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, vital: isVital } : t))
      );
    } catch (error) {
      console.error("Ошибка при обновлении важности:", error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  // 🔹 Фильтруем задачи по выбранной дате
  const visibleTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && !t.vital && t.status !== "Completed";
  });

  // ✨ Форматируем выбранную дату для отображения
  const dateObj = new Date(selectedDate);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
  });
  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  return (
    <div className="todo-list">
      {/* === Заголовок секции === */}
      <div className="todo-list__header">
        <div className="todo-list__title-wrapper">
          <FiClipboard className="todo-list__icon" />
          <h3 className="todo-list__title">To-Do</h3>
        </div>
        <button className="todo-list__add" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add task
        </button>
      </div>

      {/* === Отображение даты (например "20 June • Today") === */}
      <div className="todo-list__date-section">
        <span className="todo-list__day">{formattedDate}</span>
        {isToday && (
          <>
            <span className="todo-list__dot">•</span>
            <span className="todo-list__today">Today</span>
          </>
        )}
      </div>

      {/* === Список карточек === */}
      {visibleTasks.length > 0 ? (
        visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            desc={task.description}
            date={new Date(task.createdAt).toLocaleDateString()}
            priority={task.priority}
            status={task.status}
            image={task.image}
            vital={task.vital}
            onDelete={handleDeleteTask}
            onStatusUpdate={handleStatusUpdate}
            onVitalUpdate={handleVitalUpdate}
          />
        ))
      ) : (
        <p>No tasks for this date 🎯</p>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};
