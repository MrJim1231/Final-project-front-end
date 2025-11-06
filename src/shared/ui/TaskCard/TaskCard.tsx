import "./TaskCard.css";
import { useState, useRef, useEffect } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { patchTodo } from "../../api/todos";

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
  vital?: boolean;
  onDelete?: (id: string) => void;
  onStatusUpdate?: (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => void;
  onVitalUpdate?: (id: string, isVital: boolean) => void;
}

export const TaskCard = ({
  id,
  title,
  desc,
  date,
  status: initialStatus,
  priority,
  image,
  type: initialType = "default",
  vital = false,
  onDelete,
  onStatusUpdate,
  onVitalUpdate,
}: TaskCardProps) => {
  const [status, setStatus] = useState(initialStatus);
  const [isVital, setIsVital] = useState(vital);
  const [type, setType] = useState<"default" | "completed" | "vital">(
    initialType
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // === Автоматически обновляем тип при изменении статуса или vital ===
  useEffect(() => {
    if (isVital) {
      setType("vital");
    } else if (status === "Completed") {
      setType("completed");
    } else {
      setType("default");
    }
  }, [status, isVital]);

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

  // === Обработка действий ===
  const handleActionClick = async (action: string) => {
    if (!id) return;

    // 🗑️ Удаление
    if (action === "Delete" && onDelete) {
      onDelete(id);
      setIsMenuOpen(false);
      return;
    }

    // ✅ Завершение задачи (Finish)
    if (action === "Finish") {
      try {
        setUpdating(true);
        // 👇 добавили сохранение даты завершения
        const updated = await patchTodo(id, {
          status: "Completed",
          completedAt: new Date().toISOString(), // ✅ фикс
        });
        setStatus(updated.status);
        onStatusUpdate?.(id, updated.status);
      } catch (error) {
        console.error("Ошибка при обновлении статуса:", error);
        alert("Не удалось обновить статус 😢");
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    // ⭐ Vital / Remove from Vital
    if (action === "Vital" || action === "Remove from Vital") {
      try {
        setUpdating(true);
        const newVital = !isVital;
        const updated = await patchTodo(id, { vital: newVital });
        setIsVital(updated.vital ?? newVital);
        onVitalUpdate?.(id, updated.vital ?? newVital);
      } catch (error) {
        console.error("Ошибка при обновлении Vital:", error);
        alert("Не удалось изменить важность задачи 😢");
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    console.log(`Действие: ${action}`);
    setIsMenuOpen(false);
  };

  const actions = [
    isVital ? "Remove from Vital" : "Vital",
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
                  className={`task-card__action-item ${
                    updating ? "disabled" : ""
                  }`}
                  onClick={() => !updating && handleActionClick(action)}
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
            <h4 className="task-card__title">
              {title} {isVital && <span style={{ color: "#ff6767" }}>★</span>}
            </h4>
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
