import "./MyTaskList.css";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { getTodos, deleteTodo, patchTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const MyTaskList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Загружаем все задачи при монтировании
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();
        // ✅ Показываем только обычные задачи (не Completed и не Vital)
        const filtered = data.filter(
          (t) => t.status !== "Completed" && !t.vital
        );
        setTasks(filtered);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

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

  // ⭐ Добавление или удаление из Vital
  const handleVitalUpdate = async (id: string, isVital: boolean) => {
    try {
      await patchTodo(id, { vital: isVital });
      // 🔥 Если задача стала Vital → убираем из MyTaskList
      if (isVital) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Ошибка при изменении важности задачи:", error);
      alert("Не удалось обновить задачу 😢");
    }
  };

  if (loading) {
    return <p className="my-task-list__loading">Loading tasks...</p>;
  }

  return (
    <div className="my-task-list">
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
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
            vital={task.vital || false}
            type="default"
            onDelete={handleDeleteTask}
            onVitalUpdate={handleVitalUpdate} // 👈 добавлено
          />
        ))
      ) : (
        <p className="my-task-list__empty">
          🗒 No active tasks — create your first one!
        </p>
      )}
    </div>
  );
};
