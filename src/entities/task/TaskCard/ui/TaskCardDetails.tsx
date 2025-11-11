import { formatTimeAgo } from "@/entities/task/TaskCard/lib/formatTimeAgo";

interface Props {
  status: string;
  priority?: string;
  date?: string;
  completedAt?: string | null;
}

export const TaskCardDetails = ({
  status,
  priority,
  date,
  completedAt,
}: Props) => (
  <div className="task-card__bottom">
    {status !== "Completed" && priority && (
      <span>
        Priority: <span className="task-card__priority">{priority}</span>
      </span>
    )}

    <span
      className={`task-card__status ${
        status === "Not Started"
          ? "status--red"
          : status === "In Progress"
          ? "status--blue"
          : "status--green"
      }`}
    >
      Status: {status}
    </span>

    {status === "Completed" && completedAt && (
      <span className="task-card__completed">
        Completed {formatTimeAgo(completedAt)}.
      </span>
    )}

    {status !== "Completed" && date && (
      <span className="task-card__date">Created on: {date}</span>
    )}
  </div>
);
