import "./TaskStatus.css";
import { FiClipboard } from "react-icons/fi";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../app/store";

export const TaskStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: todos, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  // Загружаем только если задач нет
  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchTasks());
    }
  }, [dispatch, todos.length]);

  // 🎯 Мемоизированные вычисления — пересчитываются при изменении tasks
  const data = useMemo(() => {
    const total = todos.length || 1;
    const completed = todos.filter((t) => t.status === "Completed").length;
    const inProgress = todos.filter((t) => t.status === "In Progress").length;
    const notStarted = todos.filter((t) => t.status === "Not Started").length;

    return [
      {
        label: "Completed",
        percent: Math.round((completed / total) * 100),
        color: "#00C851",
      },
      {
        label: "In Progress",
        percent: Math.round((inProgress / total) * 100),
        color: "#007bff",
      },
      {
        label: "Not Started",
        percent: Math.round((notStarted / total) * 100),
        color: "#ff4444",
      },
    ];
  }, [todos]);

  if (loading) {
    return <p className="task-status__loading">Loading...</p>;
  }

  return (
    <div className="task-status">
      {/* === Заголовок === */}
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

      {/* === Подписи === */}
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
