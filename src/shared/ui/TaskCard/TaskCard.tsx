import "./TaskCard.css";
import { useState, useRef, useEffect } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

interface TaskCardProps {
  id?: string;
  title: string;
  desc: string;
  date?: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority?: "Low" | "Moderate" | "High" | "Extreme";
  image?: string;
  completedAt?: string;
  type?: "default" | "completed" | "vital";
  onDelete?: (id: string) => void;
}

export const TaskCard = ({
  id,
  title,
  desc,
  date,
  status,
  priority,
  image,
  completedAt,
  type = "default",
  onDelete,
}: TaskCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // === Цвет кружка статуса ===
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

  // === Закрытие меню при клике вне ===
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Обработка кликов по действиям ===
  const handleActionClick = (action: string) => {
    if (action === "Delete" && id && onDelete) {
      onDelete(id);
      setIsMenuOpen(false);
    } else {
      console.log(`Действие: ${action}`);
      setIsMenuOpen(false);
    }
  };

  // === Меню действий ===
  const actions = [
    type === "vital" ? "Remove from Vital" : "Vital",
    "Edit",
    "Delete",
    "Finish",
  ];

  return (
    <div
      className={`task-card 
        ${type === "completed" ? "task-card--completed" : ""} 
        ${type === "vital" ? "task-card--vital" : ""}`}
    >
      {/* ⋯ Кнопка меню */}
      <div className="task-card__menu-wrapper" ref={menuRef}>
        <IoEllipsisHorizontalOutline
          className="task-card__menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {isMenuOpen && (
          <div className="task-card__actions">
            <ul>
              {actions.map((action) => (
                <li
                  key={action}
                  className="task-card__action-item"
                  onClick={() => handleActionClick(action)}
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* === Верхняя часть === */}
      <div className="task-card__top">
        <div className="task-card__left">
          <div className="task-card__header">
            <span
              className="task-card__circle"
              style={{ borderColor: getStatusColor(status) }}
            ></span>
            <h4 className="task-card__title">{title}</h4>
          </div>
          <p className="task-card__desc">{desc}</p>
        </div>

        {image && (
          <div className="task-card__right">
            <img src={image} alt={title} className="task-card__img" />
          </div>
        )}
      </div>

      {/* === Нижняя часть === */}
      <div className="task-card__bottom">
        {priority && (
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
        {date && <span className="task-card__date">Created on: {date}</span>}
      </div>
    </div>
  );
};
