import "./MyTaskList.css";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { useFilteredTasks } from "../../../../shared/hooks/useFilteredTasks";

export const MyTaskList = () => {
  const {
    tasks,
    loading,
    selected,
    handleSelect,
    handleDelete,
    handleStatusUpdate,
    handleVitalUpdate,
  } = useFilteredTasks((t) => !t.vital && t.status !== "Completed");

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="my-task-list">
      <h3 className="my-task-list__title">My Tasks</h3>
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
              {...task}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
              onVitalUpdate={handleVitalUpdate}
              type="default"
            />
          </div>
        ))
      ) : (
        <p>🗒 No active tasks — create your first one!</p>
      )}
    </div>
  );
};
