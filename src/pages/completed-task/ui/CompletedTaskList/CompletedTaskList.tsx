import "./CompletedTaskList.css";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { useFilteredTasks } from "../../../../shared/hooks/useFilteredTasks";

export const CompletedTaskList = () => {
  const {
    tasks,
    loading,
    selected,
    handleSelect,
    handleDelete,
    handleStatusUpdate,
  } = useFilteredTasks((t) => t.status === "Completed");

  if (loading) return <p>Loading completed tasks...</p>;

  return (
    <div className="completed-list">
      <h3 className="completed-list__title">Completed Tasks</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`completed-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() => handleSelect(task.id)}
          >
            <TaskCard
              {...task}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
              type="completed"
            />
          </div>
        ))
      ) : (
        <p>✅ No completed tasks yet!</p>
      )}
    </div>
  );
};
