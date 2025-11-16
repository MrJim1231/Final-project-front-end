import "./TaskDetails.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskDetailsProps {
  image?: string;
  title: string;
  priority: string; // ← теперь string
  status: string; // ← теперь string
  date: string;
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
  // 🎨 Цвета по типу приоритета
  const getPriorityColor = (level: string) => {
    switch (level) {
      case "Extreme":
        return "#ff4444";
      case "High":
        return "#ff8800";
      case "Moderate":
        return "#007bff";
      case "Low":
        return "#00c851";
      default:
        return "#999";
    }
  };

  // 🎨 Цвета по статусу
  const getStatusColor = (s: string) => {
    switch (s) {
      case "Completed":
        return "#00c851";
      case "In Progress":
        return "#007bff";
      case "Not Started":
        return "#ff4444";
      default:
        return "#999";
    }
  };

  return (
    <div className="task-details">
      {/* === Верхняя часть === */}
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

          <p className="task-details__date">Created on: {date}</p>
        </div>
      </div>

      {/* === Контент === */}
      {(description || extraContent) && (
        <div className="task-details__content">
          {description && <p>{description}</p>}
          {extraContent}
        </div>
      )}

      {/* === Низ карточки === */}
      <div className="task-details__footer">
        {status === "Completed" && completedAt && (
          <p className="task-details__completed">
            ✅ Completed on {new Date(completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* === Кнопки === */}
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
