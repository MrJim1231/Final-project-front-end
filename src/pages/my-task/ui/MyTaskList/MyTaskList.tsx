import "./MyTaskList.css";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { getTodos } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const MyTaskList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Загружаем все задачи при монтировании
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();
        setTasks(data);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <p className="my-task-list__loading">Loading tasks...</p>;
  }

  return (
    <div className="my-task-list">
      {/* === Заголовок секции === */}
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

      {/* === Список карточек === */}
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
            vital={task.vital || false}
            type={
              task.vital
                ? "vital"
                : task.status === "Completed"
                ? "completed"
                : "default"
            }
          />
        ))
      ) : (
        <p className="my-task-list__empty">
          🗒 No tasks yet — create your first one!
        </p>
      )}
    </div>
  );
};
