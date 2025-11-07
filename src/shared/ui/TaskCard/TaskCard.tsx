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

// === Формат времени завершения ===
const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  return date.toLocaleDateString();
};

export const TaskCard = ({
  id,
  title,
  desc,
  date,
  status: initialStatus,
  priority,
  image,
  completedAt,
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
  const [completedTime, setCompletedTime] = useState(completedAt || "");
  const menuRef = useRef<HTMLDivElement | null>(null);

  // === Автообновление типа ===
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

    // 🗑 Удаление
    if (action === "Delete" && onDelete) {
      onDelete(id);
      setIsMenuOpen(false);
      return;
    }

    // ✅ Завершить задачу
    if (action === "Finish") {
      try {
        setUpdating(true);
        const now = new Date().toISOString();
        const updated = await patchTodo(id, {
          status: "Completed",
          completedAt: now,
        });
        setStatus(updated.status);
        setCompletedTime(now);
        onStatusUpdate?.(id, updated.status);
      } catch (error) {
        console.error("Ошибка при обновлении статуса:", error);
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    // 🔄 Вернуть из Completed
    if (action === "Unfinish") {
      try {
        setUpdating(true);
        const updated = await patchTodo(id, { status: "In Progress" });
        setStatus(updated.status);
        setCompletedTime("");
        onStatusUpdate?.(id, updated.status);
      } catch (error) {
        console.error("Ошибка при возврате статуса:", error);
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    // 🟦 Начать задачу
    if (action === "Mark In Progress") {
      try {
        setUpdating(true);
        const updated = await patchTodo(id, { status: "In Progress" });
        setStatus(updated.status);
        onStatusUpdate?.(id, updated.status);
      } catch (error) {
        console.error("Ошибка при обновлении статуса:", error);
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    // 🔴 Вернуть задачу в "Not Started"
    if (action === "Unmark In Progress") {
      try {
        setUpdating(true);
        const updated = await patchTodo(id, { status: "Not Started" });
        setStatus(updated.status);
        onStatusUpdate?.(id, updated.status);
      } catch (error) {
        console.error("Ошибка при возврате статуса:", error);
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    // ⭐ Vital toggle
    if (action === "Vital" || action === "Remove from Vital") {
      try {
        setUpdating(true);
        const newVital = !isVital;
        const updated = await patchTodo(id, { vital: newVital });
        setIsVital(updated.vital ?? newVital);
        onVitalUpdate?.(id, updated.vital ?? newVital);
      } catch (error) {
        console.error("Ошибка при обновлении Vital:", error);
      } finally {
        setUpdating(false);
        setIsMenuOpen(false);
      }
      return;
    }

    setIsMenuOpen(false);
  };

  // === Динамический список действий ===
  const actions = [
    isVital ? "Remove from Vital" : "Vital",
    "Edit",
    "Delete",
    ...(status === "Not Started"
      ? ["Mark In Progress", "Finish"]
      : status === "In Progress"
      ? ["Unmark In Progress", "Finish"]
      : ["Unfinish", "Mark In Progress"]),
  ];

  return (
    <div
      className={`task-card ${isMenuOpen ? "menu-open" : ""} ${
        type === "completed" ? "task-card--completed" : ""
      } ${type === "vital" ? "task-card--vital" : ""}`}
    >
      {/* ⋯ Меню */}
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
        {status !== "Completed" && priority && (
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

        {status === "Completed" && completedTime && (
          <span className="task-card__completed">
            Completed {formatTimeAgo(completedTime)}.
          </span>
        )}

        {status !== "Completed" && date && (
          <span className="task-card__date">Created on: {date}</span>
        )}
      </div>
    </div>
  );
};
