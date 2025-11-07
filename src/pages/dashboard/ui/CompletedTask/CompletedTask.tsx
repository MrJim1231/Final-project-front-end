import "./CompletedTask.css";
import { useEffect, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { getTodos, deleteTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const CompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Загружаем только завершённые задачи
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const allTasks = await getTodos();
        const completed = allTasks.filter(
          (task) => task.status === "Completed"
        );
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Ошибка при загрузке завершённых задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedTasks();
  }, []);

  // 🗑️ Удаление завершённой задачи
  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Удалить завершённую задачу?")) return;
    try {
      await deleteTodo(id);
      setCompletedTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      alert("Не удалось удалить задачу 😢");
    }
  };

  if (loading) {
    return (
      <p className="completed-task__loading">Loading completed tasks...</p>
    );
  }

  return (
    <div className="completed-task">
      {/* === Заголовок блока === */}
      <div className="completed-task__header">
        <div className="completed-task__title-wrapper">
          <FiCheckSquare className="completed-task__icon" />
          <h3 className="completed-task__title">Completed Tasks</h3>
        </div>
      </div>

      {/* === Список карточек === */}
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            desc={task.description}
            date={new Date(task.createdAt).toLocaleDateString()}
            status={task.status}
            priority={task.priority}
            image={task.image}
            completedAt={task.completedAt || "Recently completed"}
            type="completed"
            onDelete={handleDeleteTask} // ✅ добавили обработчик удаления
          />
        ))
      ) : (
        <p className="completed-task__empty">
          ✅ No completed tasks yet — finish some from your To-Do list!
        </p>
      )}
    </div>
  );
};
