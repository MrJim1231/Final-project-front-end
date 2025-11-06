import "./VitalTaskList.css";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { getTodos } from "../../../../shared/api/todos";
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

  if (loading) {
    return <p className="vital-task-list__loading">Loading vital tasks...</p>;
  }

  return (
    <div className="vital-task-list">
      {/* === Заголовок секции === */}
      <div className="vital-task-list__header">
        <div className="vital-task-list__title-wrapper">
          {/* <FiAlertTriangle className="vital-task-list__icon" /> */}
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
