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
      // 🔥 Удаляем задачу локально
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
      // 🔥 Если убрали флаг — убираем из списка
      if (!isVital) {
        setVitalTasks((prev) => prev.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Ошибка при изменении важности:", error);
      alert("Не удалось обновить задачу 😢");
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
            onDelete={handleDeleteTask} // 🗑️ удаление
            onVitalUpdate={handleVitalUpdate} // 💫 удаление из vital
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
