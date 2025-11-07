import "./VitalTaskList.css";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { getTodos, deleteTodo, patchTodo } from "../../../../shared/api/todos";
import type { Todo } from "../../../../shared/api/todos";

export const VitalTaskList = () => {
  const [vitalTasks, setVitalTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Загружаем только задачи с меткой "vital"
  useEffect(() => {
    const fetchVitalTasks = async () => {
      try {
        const allTasks = await getTodos();
        const vitalOnly = allTasks.filter((task) => task.vital === true);
        setVitalTasks(vitalOnly);
      } catch (error) {
        console.error("Ошибка при загрузке Vital задач:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVitalTasks();
  }, []);

  // 🗑️ Удаление задачи
  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Удалить задачу?")) return;
    try {
      await deleteTodo(id);
      setVitalTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      alert("Не удалось удалить задачу 😢");
    }
  };

  // 💫 Удаление из "Vital"
  const handleVitalUpdate = async (id: string, isVital: boolean) => {
    try {
      await patchTodo(id, { vital: isVital });
      if (!isVital) {
        setVitalTasks((prev) => prev.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Ошибка при изменении важности:", error);
      alert("Не удалось обновить задачу 😢");
    }
  };

  // ✅ При добавлении в Finish — убираем из vital и обновляем статус
  const handleStatusUpdate = async (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    try {
      // 👇 если завершили — убираем из vital сразу
      const updateData =
        newStatus === "Completed"
          ? {
              status: newStatus,
              vital: false,
              completedAt: new Date().toISOString(),
            }
          : { status: newStatus };

      const updated = await patchTodo(id, updateData);

      // 🔥 если задача завершена — удаляем из локального состояния
      if (updated.status === "Completed") {
        setVitalTasks((prev) => prev.filter((task) => task.id !== id));
      } else {
        // иначе просто обновляем статус в списке
        setVitalTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
        );
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      alert("Не удалось обновить статус задачи 😢");
    }
  };

  if (loading) {
    return <p className="vital-task-list__loading">Loading vital tasks...</p>;
  }

  return (
    <div className="vital-task-list">
      {/* === Заголовок секции === */}
      <div className="vital-task-list__header">
        <div className="vital-task-list__title-wrapper">
          <h3 className="vital-task-list__title">Vital Tasks</h3>
        </div>
      </div>

      {/* === Список карточек === */}
      {vitalTasks.length > 0 ? (
        vitalTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            desc={task.description}
            date={new Date(task.createdAt).toLocaleDateString()}
            priority={task.priority}
            status={task.status}
            image={task.image}
            vital={true}
            type="vital"
            onDelete={handleDeleteTask}
            onVitalUpdate={handleVitalUpdate}
            onStatusUpdate={handleStatusUpdate} // ✅ обновление статуса
          />
        ))
      ) : (
        <p className="vital-task-list__empty">
          😌 No vital tasks yet — mark important ones in your To-Do list!
        </p>
      )}
    </div>
  );
};
