import "../TaskCard.css";
import { useState, useEffect, useRef } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { TaskDetailsModal } from "@/entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import { useTaskActions } from "@/entities/task/TaskCard/model/useTaskActions";
import { getSafeImageSrc } from "@/entities/task/TaskCard/lib/getSafeImageSrc";
import { getStatusColor } from "@/entities/task/TaskCard/lib/getStatusColor";
import { TaskCardMenu } from "./TaskCardMenu";
import { TaskCardDetails } from "./TaskCardDetails";

interface TaskCardProps {
  id?: string;
  title: string;
  description: string;
  date?: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority?: "Low" | "Moderate" | "High" | "Extreme";
  image?: string;
  completedAt?: string | null;
  vital?: boolean;
  enableDesktopModal?: boolean;

  // 🔽 добавляем недостающие поля, чтобы не было ошибок
  type?: "default" | "completed" | "vital";
  showAlert?: boolean;
}

export const TaskCard = ({
  id,
  title,
  description,
  date,
  status: initialStatus,
  priority,
  image,
  completedAt,
  vital = false,
  enableDesktopModal = false,
  type = "default", // ✅ по умолчанию
  showAlert = false, // ✅ по умолчанию
}: TaskCardProps) => {
  const {
    deleteTask,
    toggleVital,
    completeTask,
    unfinishTask,
    markInProgress,
    unmarkInProgress,
  } = useTaskActions();

  const [status, setStatus] = useState(initialStatus);
  const [isVital, setIsVital] = useState(vital);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedTime, setCompletedTime] = useState(completedAt || "");
  const [updating, setUpdating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // === Определяем тип карточки ===
  useEffect(() => {
    if (isVital) type = "vital";
    else if (status === "Completed") type = "completed";
    else type = "default";
  }, [status, isVital]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = async (action: string) => {
    if (!id) return;
    setUpdating(true);

    switch (action) {
      case "Delete":
        deleteTask(id);
        break;
      case "Vital":
      case "Remove from Vital":
        toggleVital(id, !isVital);
        setIsVital(!isVital);
        break;
      case "Finish":
        completeTask(id);
        setStatus("Completed");
        setCompletedTime(new Date().toISOString());
        setIsVital(false);
        break;
      case "Unfinish":
        unfinishTask(id);
        setStatus("In Progress");
        setCompletedTime("");
        break;
      case "Mark In Progress":
        markInProgress(id);
        setStatus("In Progress");
        break;
      case "Unmark In Progress":
        unmarkInProgress(id);
        setStatus("Not Started");
        break;
    }
    setUpdating(false);
    setIsMenuOpen(false);
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

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".task-card__menu-wrapper")) return;
    if (isMobile || enableDesktopModal) setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`task-card ${isMenuOpen ? "menu-open" : ""} ${
          type === "completed" ? "task-card--completed" : ""
        } ${type === "vital" ? "task-card--vital" : ""}`}
        onClick={handleCardClick}
      >
        <div className="task-card__menu-wrapper" ref={menuRef}>
          <IoEllipsisHorizontalOutline
            className="task-card__menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
          />
          {isMenuOpen && (
            <TaskCardMenu
              actions={actions}
              onAction={handleActionClick}
              disabled={updating}
            />
          )}
        </div>

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
            />
          </div>
        </div>

        <TaskCardDetails
          status={status}
          priority={priority}
          date={date}
          completedAt={completedTime}
        />
      </div>

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

      {/* 🔔 опциональный alert (если ты когда-то хочешь подсказки при действии) */}
      {showAlert && <div className="task-card__alert">Action completed ✅</div>}
    </>
  );
};
