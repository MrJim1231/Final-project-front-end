import { useEffect, useState } from "react";
import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";
import { getTodos, createTodo, deleteTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const TodoList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Загружаем задачи с mockAPI при монтировании
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

  // ✅ Добавление новой задачи
  const handleAddTask = async (form: any) => {
    try {
      const newTodo = {
        title: form.title,
        description: form.description,
        createdAt: form.date || new Date().toISOString(),
        priority: form.priority || "Low",
        status: "Not Started" as const,
        image:
          form.image instanceof File
            ? URL.createObjectURL(form.image)
            : form.image || "",
      };

      const created = await createTodo(newTodo);
      setTasks((prev) => [created, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      alert("Не удалось добавить задачу 😢");
    }
  };

  // 🗑️ Удаление задачи
  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Удалить задачу?")) return;
    try {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      alert("Не удалось удалить задачу 😢");
    }
  };

  // ✅ Обновление статуса после клика Finish
  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="todo-list">
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

      <div className="todo-list__date-section">
        <span className="todo-list__day">20 June</span>
        <span className="todo-list__dot">•</span>
        <span className="todo-list__today">Today</span>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            desc={task.description}
            date={new Date(task.createdAt).toLocaleDateString()}
            priority={task.priority}
            status={task.status}
            image={task.image}
            onDelete={handleDeleteTask}
            onStatusUpdate={handleStatusUpdate} // 👈 добавили
          />
        ))
      ) : (
        <p>No tasks yet. Add your first one!</p>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};
