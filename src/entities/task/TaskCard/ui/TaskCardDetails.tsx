import { formatTimeAgo } from "@/entities/task/TaskCard/lib/formatTimeAgo";

interface Props {
  status: string;
  priority?: string;
  date?: string;
  completedAt?: string | null;
}

// Определяем CSS-класс цвета статуса
const getStatusClass = (status: string) => {
  switch (status) {
    case "Not Started":
      return "status--red";
    case "In Progress":
      return "status--blue";
    case "Completed":
      return "status--green";
    default:
      return ""; // кастомный статус — без цвета
  }
};

export const TaskCardDetails = ({
  status,
  priority,
  date,
  completedAt,
}: Props) => {
  return (
    <div className="task-card__bottom">
      {/* PRIORITY */}
      {status !== "Completed" && priority && (
        <span className="task-card__priority">
          Priority: <span>{priority}</span>
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
