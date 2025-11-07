import "./MyTaskList.css";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { getTodos, deleteTodo, patchTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

interface MyTaskListProps {
  onSelectTask: (task: Todo | null) => void; // 👈 получаем из MyTask
}

export const MyTaskList = ({ onSelectTask }: MyTaskListProps) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // 🚀 Загружаем все задачи при монтировании
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();
        // ✅ показываем только незавершённые и не vital
        const filtered = data.filter(
          (t) => t.status !== "Completed" && !t.vital
        );
        setTasks(filtered);

        // ✅ выбираем первую задачу по умолчанию
        if (filtered.length > 0) {
          setActiveTaskId(filtered[0].id);
          onSelectTask(filtered[0]);
        }
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [onSelectTask]);

  // 🔄 выбор следующей задачи при удалении/завершении текущей
  const selectNextTask = (removedId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== removedId);
      setTimeout(() => {
        if (updated.length > 0) {
          setActiveTaskId(updated[0].id);
          onSelectTask(updated[0]);
        } else {
          setActiveTaskId(null);
          onSelectTask(null);
        }
      }, 0);
      return updated;
    });
  };

  // 🗑️ Удаление задачи
  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Удалить задачу?")) return;
    try {
      await deleteTodo(id);
      selectNextTask(id); // 👈 выбираем следующую
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      alert("Не удалось удалить задачу 😢");
    }
  };

  // ⭐ Добавление/удаление из Vital
  const handleVitalUpdate = async (id: string, isVital: boolean) => {
    try {
      await patchTodo(id, { vital: isVital });
      if (isVital) {
        selectNextTask(id); // 👈 аналогично
      }
    } catch (error) {
      console.error("Ошибка при изменении важности задачи:", error);
      alert("Не удалось обновить задачу 😢");
    }
  };

  // ✅ Обновление статуса — при "Finish" задача исчезает
  const handleStatusUpdate = async (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    try {
      const updated = await patchTodo(id, { status: newStatus });

      if (updated.status === "Completed") {
        selectNextTask(id); // 👈 сразу выбираем следующую
      } else {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
        );
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      alert("Не удалось обновить статус задачи 😢");
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
          <div
            key={task.id}
            onClick={() => {
              onSelectTask(task);
              setActiveTaskId(task.id);
            }}
            className={`my-task-list__item ${
              activeTaskId === task.id ? "active" : ""
            }`}
          >
            <TaskCard
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
              onVitalUpdate={handleVitalUpdate}
              onStatusUpdate={handleStatusUpdate} // 👈 Finish
            />
          </div>
        ))
      ) : (
        <p className="my-task-list__empty">
          🗒 No active tasks — create your first one!
        </p>
      )}
    </div>
  );
};
