import { formatTimeAgo } from "@/entities/task/TaskCard/lib/formatTimeAgo";

interface Props {
  status: string;
  priority?: string;
  date?: string;
  completedAt?: string | null;
}

// Цвета приоритета
const priorityColors: Record<string, string> = {
  High: "#ff3b30", // красный
  Medium: "#0a84ff", // синий
  Low: "#34c759", // зелёный
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Not Started":
      return "status--red";
    case "In Progress":
      return "status--blue";
    case "Completed":
      return "status--green";
    default:
      return "";
  }
};

export const TaskCardDetails = ({
  status,
  priority,
  date,
  completedAt,
}: Props) => {
  // цвет приоритета
  const priorityColor = priority ? priorityColors[priority] : undefined;

  return (
    <div className="task-card__bottom">
      {/* PRIORITY */}
      {status !== "Completed" && priority && (
        <span
          className="task-card__priority"
          style={{ color: priorityColor, fontWeight: 600 }}
        >
          Priority: {priority}
        </span>
      )}

      {/* STATUS */}
      <span className={`task-card__status ${getStatusClass(status)}`}>
        Status: {status}
      </span>

      {/* COMPLETED TIME */}
      {status === "Completed" && completedAt && (
        <span className="task-card__completed">
          Completed {formatTimeAgo(completedAt)}
        </span>
      )}

      {/* CREATED DATE */}
      {status !== "Completed" && date && (
        <span className="task-card__date">Created on: {date}</span>
      )}
    </div>
  );
};
