import "./TaskStatus.css";

export const TaskStatus = () => {
  const data = [
    { label: "Completed", percent: 84, color: "#00C851" },
    { label: "In Progress", percent: 46, color: "#007bff" },
    { label: "Not Started", percent: 13, color: "#ff4444" },
  ];

  return (
    <div className="task-status">
      <h3 className="task-status__title">Task Status</h3>
      <div className="task-status__list">
        {data.map((item, i) => (
          <div key={i} className="task-status__item">
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
              />
            </svg>
            <span className="task-status__percent">{item.percent}%</span>
            <p className="task-status__label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
