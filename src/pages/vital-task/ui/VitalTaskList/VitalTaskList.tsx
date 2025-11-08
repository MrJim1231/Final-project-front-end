import "./VitalTaskList.css";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import { useFilteredTasks } from "../../../../shared/hooks/useFilteredTasks";

export const VitalTaskList = () => {
  const {
    tasks,
    loading,
    selected,
    handleSelect,
    handleDelete,
    handleStatusUpdate,
    handleVitalUpdate,
  } = useFilteredTasks((t) => t.vital);

  if (loading) return <p>Loading vital tasks...</p>;

  return (
    <div className="vital-task-list">
      <h3 className="vital-task-list__title">Vital Tasks</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`vital-task-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() => handleSelect(task.id)}
          >
            <TaskCard
              {...task}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
              onVitalUpdate={handleVitalUpdate}
              type="vital"
            />
          </div>
        ))
      ) : (
        <p>😌 No vital tasks yet — mark important ones!</p>
      )}
    </div>
  );
};
