import "./MyTaskList.css";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { useFilteredTasks } from "../../../../shared/hooks/useFilteredTasks";

export const MyTaskList = () => {
  const { tasks, loading, selected, handleSelect } = useFilteredTasks(
    (t) => !t.vital && t.status !== "Completed"
  );

  if (loading) return <p>Loading tasks...</p>;

  // 📅 Форматируем дату
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("en-US", { month: "long" });
  const isToday = "· Today";

  return (
    <div className="my-task-list">
      {/* === Заголовок блока === */}
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

      {/* === Дата (8 November · Today) === */}
      <div className="my-task-list__date">
        {day} {month} <span className="my-task-list__today">{isToday}</span>
      </div>

      {/* === Список задач === */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`my-task-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() => handleSelect(task.id)}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={task.vital}
              type="default"
              enableDesktopModal // 👈 модалка теперь и на десктопе
            />
          </div>
        ))
      ) : (
        <p>🗒 No active tasks — create your first one!</p>
      )}
    </div>
  );
};
