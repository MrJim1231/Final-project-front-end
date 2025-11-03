import "./TaskStatus.css";
import { FiClipboard } from "react-icons/fi"; // 👈 иконка слева

export const TaskStatus = () => {
  const data = [
    { label: "Completed", percent: 84, color: "#00C851" },
    { label: "In Progress", percent: 46, color: "#007bff" },
    { label: "Not Started", percent: 13, color: "#ff4444" },
  ];

  return (
    <div className="task-status">
      {/* === Заголовок с иконкой === */}
      <div className="task-status__header">
        <FiClipboard className="task-status__icon" />
        <h3 className="task-status__title">Task Status</h3>
      </div>

      {/* === Круги === */}
      <div className="task-status__list">
        {data.map((item, i) => (
          <div key={i} className="task-status__item" data-status={item.label}>
            <svg width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke={item.color}
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(item.percent / 100) * 220}, 220`}
                transform="rotate(-90 40 40)"
                strokeLinecap="round"
              />
            </svg>
            <span className="task-status__percent">{item.percent}%</span>
          </div>
        ))}
      </div>

      {/* === Подписи с точками === */}
      <div className="task-status__legend">
        {data.map((item, i) => (
          <div key={i} className="task-status__legend-item">
            <span
              className="task-status__dot"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="task-status__legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
