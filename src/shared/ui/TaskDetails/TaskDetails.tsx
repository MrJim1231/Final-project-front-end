import "./TaskDetails.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskDetailsProps {
  image?: string;
  title: string;
  priority: string;
  priorityColor?: string;
  status: string;
  statusColor?: string;
  date: string;
  description?: string;
  extraContent?: React.ReactNode; // 👈 например, список или кастомный блок
  onDelete?: () => void;
  onEdit?: () => void;
}

export const TaskDetails = ({
  image,
  title,
  priority,
  priorityColor = "#ff4444",
  status,
  statusColor = "#ff4444",
  date,
  description,
  extraContent,
  onDelete,
  onEdit,
}: TaskDetailsProps) => {
  return (
    <div className="task-details">
      {/* === Верхняя часть === */}
      <div className="task-details__top">
        {image && <img src={image} alt={title} className="task-details__img" />}

        <div className="task-details__info">
          <h3 className="task-details__title">{title}</h3>

          <p className="task-details__priority">
            Priority:{" "}
            <span style={{ color: priorityColor, fontWeight: 500 }}>
              {priority}
            </span>
          </p>

          <p className="task-details__status">
            Status:{" "}
            <span style={{ color: statusColor, fontWeight: 500 }}>
              {status}
            </span>
          </p>

          <p className="task-details__date">Created on: {date}</p>
        </div>
      </div>

      {/* === Контент === */}
      {description && (
        <div className="task-details__content">
          <p>{description}</p>
        </div>
      )}
      {extraContent && (
        <div className="task-details__extra">{extraContent}</div>
      )}

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
