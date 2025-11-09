import "./TaskCard.css";
import { useState, useRef, useEffect } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import noImage from "../../../../shared/assets/images/no-image.jpeg";
import { TaskDetailsModal } from "../TaskDetailsModal/TaskDetailsModal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/providers/store";
import { removeTask, updateTaskStatus } from "../../model/tasksSlice";

interface TaskCardProps {
  id?: string;
  title: string;
  description: string;
  date?: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority?: "Low" | "Moderate" | "High" | "Extreme";
  image?: string;
  completedAt?: string | null;
  type?: "default" | "completed" | "vital";
  vital?: boolean;
  showAlert?: boolean;
  enableDesktopModal?: boolean;
}

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
  description,
  date,
  status: initialStatus,
  priority,
  image,
  completedAt,
  type: initialType = "default",
  vital = false,
  showAlert = false,
  enableDesktopModal = false,
}: TaskCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState(initialStatus);
  const [isVital, setIsVital] = useState(vital);
  const [type, setType] = useState<"default" | "completed" | "vital">(
    initialType
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedTime, setCompletedTime] = useState(completedAt || "");
  const [updating, setUpdating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // === Обновление ширины экрана ===
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Определяем тип карточки ===
  useEffect(() => {
    if (isVital) setType("vital");
    else if (status === "Completed") setType("completed");
    else setType("default");
  }, [status, isVital]);

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

  // === Закрываем меню по клику вне ===
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSafeImageSrc = (src?: string) => {
    if (!src) return noImage;
    if (src.includes("undefined") || src.includes("null")) return noImage;
    return src.startsWith("http") ? src : noImage;
  };

  // === Меню действий ===
  const handleActionClick = async (action: string) => {
    if (!id) return;
    const closeMenu = () => setIsMenuOpen(false);

    try {
      setUpdating(true);
      switch (action) {
        case "Delete":
          dispatch(removeTask(id));
          break;

        case "Vital":
        case "Remove from Vital": {
          const newVital = !isVital;
          setIsVital(newVital);
          dispatch(updateTaskStatus({ id, vital: newVital }));
          break;
        }

        case "Finish": {
          const now = new Date().toISOString();
          setStatus("Completed");
          setCompletedTime(now);
          dispatch(
            updateTaskStatus({ id, status: "Completed", completedAt: now })
          );
          break;
        }

        case "Unfinish":
          setStatus("In Progress");
          setCompletedTime("");
          dispatch(
            updateTaskStatus({ id, status: "In Progress", completedAt: null })
          );
          break;

        case "Mark In Progress":
          setStatus("In Progress");
          dispatch(updateTaskStatus({ id, status: "In Progress" }));
          break;

        case "Unmark In Progress":
          setStatus("Not Started");
          dispatch(updateTaskStatus({ id, status: "Not Started" }));
          break;
      }
    } catch (error) {
      console.error("Ошибка при выполнении действия:", error);
      alert("Не удалось выполнить действие 😢");
    } finally {
      setUpdating(false);
      closeMenu();
    }
  };

  // === Клик по карточке (открыть модалку) ===
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".task-card__menu-wrapper")) return;
    if (isMobile || enableDesktopModal) setIsModalOpen(true);
  };

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
    <>
      <div
        className={`task-card ${isMenuOpen ? "menu-open" : ""} ${
          type === "completed" ? "task-card--completed" : ""
        } ${type === "vital" ? "task-card--vital" : ""}`}
        onClick={handleCardClick}
      >
        {/* ⋯ Меню */}
        <div className="task-card__menu-wrapper" ref={menuRef}>
          <IoEllipsisHorizontalOutline
            className="task-card__menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
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
            <p className="task-card__desc">{description}</p>
          </div>

          <div className="task-card__right">
            <img
              src={getSafeImageSrc(image)}
              alt={title}
              className="task-card__img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== noImage) target.src = noImage;
              }}
            />
          </div>
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

      {/* === Модалка деталей задачи (всегда смонтирована) === */}
      <TaskDetailsModal
        isOpen={isModalOpen && (isMobile || enableDesktopModal)}
        onClose={() => setIsModalOpen(false)}
        title={title}
        desc={description}
        date={date}
        priority={priority}
        status={status}
        image={getSafeImageSrc(image)}
        completedAt={completedAt}
      />
    </>
  );
};
