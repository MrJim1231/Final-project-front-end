import "./TaskCard.css";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

interface TaskCardProps {
  title: string;
  desc: string;
  date?: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority?: "Low" | "Moderate" | "High" | "Extreme";
  image?: string;
  completedAt?: string;
  type?: "default" | "completed"; // completed = для CompletedTask
}

export const TaskCard = ({
  title,
  desc,
  date,
  status,
  priority,
  image,
  completedAt,
  type = "default",
}: TaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "#ff4444";
      case "In Progress":
        return "#007bff";
      case "Completed":
        return "#00c851";
      default:
        return "#ccc";
    }
  };

  return (
    <div
      className={`task-card ${
        type === "completed" ? "task-card--completed" : ""
      }`}
    >
      <IoEllipsisHorizontalOutline className="task-card__menu" />

      <div className="task-card__main">
        {/* === Левая часть === */}
        <div className="task-card__left">
          <div className="task-card__header">
            <span
              className="task-card__circle"
              style={{ borderColor: getStatusColor(status) }}
            ></span>
            <h4 className="task-card__title">{title}</h4>
          </div>

          <p className="task-card__desc">{desc}</p>

          {type === "completed" ? (
            <div className="task-card__bottom">
              <span className="task-card__status status--green">
                Status: Completed
              </span>
              <span className="task-card__date">Completed {completedAt}</span>
            </div>
          ) : (
            <div className="task-card__bottom">
              {priority && (
                <span>
                  Priority:{" "}
                  <span className="task-card__priority">{priority}</span>
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
            </div>
          )}
        </div>

        {/* === Правая часть === */}
        {image && (
          <div className="task-card__right">
            <div className="task-card__image-wrapper">
              <img src={image} alt={title} className="task-card__img" />
            </div>
            {date && type !== "completed" && (
              <span className="task-card__date">Created on: {date}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
