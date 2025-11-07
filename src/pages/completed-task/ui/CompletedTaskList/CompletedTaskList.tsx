import "./CompletedTaskList.css";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { getTodos, deleteTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const CompletedTaskList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const data = await getTodos();
        const completed = data.filter((t) => t.status === "Completed");
        setTasks(completed);
      } catch (error) {
        console.error("Ошибка при загрузке завершённых задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompleted();
  }, []);

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

  if (loading) {
    return (
      <p className="completed-list__loading">Loading completed tasks...</p>
    );
  }

  return (
    <div className="completed-list">
      <div className="completed-list__header">
        <h3 className="completed-list__title">Completed Tasks</h3>
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
            completedAt={task.completedAt}
            type="completed"
            onDelete={handleDeleteTask}
          />
        ))
      ) : (
        <p className="completed-list__empty">✅ No completed tasks yet!</p>
      )}
    </div>
  );
};
