import { TaskDetails } from "../../../../shared/ui/TaskDetails/TaskDetails";
import type { Todo } from "../../../../shared/api/todos";

interface VitalTaskDetailsProps {
  task: Todo;
}

export const VitalTaskDetails = ({ task }: VitalTaskDetailsProps) => {
  return (
    <TaskDetails
      image={task.image}
      title={task.title}
      priority={task.priority || "No priority"}
      status={task.status}
      date={new Date(task.createdAt).toLocaleDateString()}
      description={task.description || "No description provided."}
      extraContent={
        task.completedAt ? (
          <p>
            ✅ Completed on {new Date(task.completedAt).toLocaleDateString()}
          </p>
        ) : (
          <ul>
            <li>Priority: {task.priority}</li>
            <li>Status: {task.status}</li>
            <li>Created at: {new Date(task.createdAt).toLocaleString()}</li>
          </ul>
        )
      }
    />
  );
};
