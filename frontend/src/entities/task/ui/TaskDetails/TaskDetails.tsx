import "./TaskDetails.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskDetailsProps {
  image?: string;
  title: string;
  priority: string; // priority title from backend
  status: string; // status title from backend
  date?: string; // FIX: date must be optional
  description?: string;
  completedAt?: string | null;
  extraContent?: React.ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const TaskDetails = ({
  image,
  title,
  priority,
  status,
  date,
  description,
  completedAt,
  extraContent,
  onDelete,
  onEdit,
}: TaskDetailsProps) => {
  // 🎨 Цвета приоритетов с backend ("Low", "Medium", "High")
  const getPriorityColor = (level: string) => {
    switch (level) {
      case "High":
        return "#ff3b30"; // red
      case "Medium":
        return "#ff9500"; // orange
      case "Low":
        return "#34c759"; // green
      default:
        return "#999"; // fallback
    }
  };

  // 🎨 Цвета статусов backend ("Not Started", "In Progress", "Completed")
  const getStatusColor = (s: string) => {
    switch (s) {
      case "Completed":
        return "#34c759"; // green
      case "In Progress":
        return "#0a84ff"; // blue
      case "Not Started":
        return "#ff3b30"; // red
      default:
        return "#999";
    }
  };

  return (
    <div className="task-details">
      {/* === Top Section === */}
      <div className="task-details__top">
        {image && <img src={image} alt={title} className="task-details__img" />}

        <div className="task-details__info">
          <h3 className="task-details__title">{title}</h3>

          <p className="task-details__priority">
            Priority:{" "}
            <span
              style={{ color: getPriorityColor(priority), fontWeight: 500 }}
            >
              {priority}
            </span>
          </p>

          <p className="task-details__status">
            Status:{" "}
            <span style={{ color: getStatusColor(status), fontWeight: 500 }}>
              {status}
            </span>
          </p>

          {date && <p className="task-details__date">Created on: {date}</p>}
        </div>
      </div>

      {/* === Description Area === */}
      {(description || extraContent) && (
        <div className="task-details__content">
          {description && <p>{description}</p>}
          {extraContent}
        </div>
      )}

      {/* === Completed Info === */}
      <div className="task-details__footer">
        {status === "Completed" && completedAt && (
          <p className="task-details__completed">
            ✅ Completed on {new Date(completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* === Buttons === */}
      <div className="task-details__actions">
        <button
          className="task-details__btn task-details__btn--delete"
          onClick={onDelete}
        >
          <FiTrash2 />
        </button>
        <button
          className="task-details__btn task-details__btn--edit"
          onClick={onEdit}
        >
          <FiEdit2 />
        </button>
      </div>
    </div>
  );
};
