import "./TaskDetailsModal.css";
import { FiX } from "react-icons/fi";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  date?: string;
  priority?: "Low" | "Moderate" | "High" | "Extreme";
  status?: "Not Started" | "In Progress" | "Completed";
  image?: string;
  completedAt?: string;
}

export const TaskDetailsModal = ({
  isOpen,
  onClose,
  title,
  desc,
  date,
  priority,
  status,
  image,
  completedAt,
}: TaskDetailsModalProps) => {
  if (!isOpen) return null;

  // 🎨 Цвета приоритета
  const getPriorityColor = (p?: string) => {
    switch (p) {
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

  const getStatusColor = (s?: string) => {
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
    <div className="task-modal__overlay" onClick={onClose}>
      <div
        className="task-modal"
        onClick={(e) => e.stopPropagation()} // не закрывать при клике внутрь
      >
        <button className="task-modal__close" onClick={onClose}>
          <FiX size={22} />
        </button>

        {image && <img src={image} alt={title} className="task-modal__image" />}

        <h3 className="task-modal__title">{title}</h3>

        {desc && <p className="task-modal__desc">{desc}</p>}

        <div className="task-modal__info">
          {priority && (
            <p>
              <strong>Priority:</strong>{" "}
              <span style={{ color: getPriorityColor(priority) }}>
                {priority}
              </span>
            </p>
          )}

          {status && (
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: getStatusColor(status) }}>{status}</span>
            </p>
          )}

          {date && (
            <p>
              <strong>Created:</strong> {date}
            </p>
          )}

          {completedAt && (
            <p>
              <strong>Completed:</strong>{" "}
              {new Date(completedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
