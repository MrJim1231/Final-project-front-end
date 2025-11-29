import "../TaskCard.css";
import { useState, useEffect, useRef } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

import { TaskDetailsModal } from "@/entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import { EditTaskModal } from "@/entities/task/ui/EditTaskModal/EditTaskModal";

import { useTaskActions } from "@/entities/task/TaskCard/model/useTaskActions";
import { getSafeImageSrc } from "@/entities/task/TaskCard/lib/getSafeImageSrc";
import { getStatusColor } from "@/entities/task/TaskCard/lib/getStatusColor";
import { TaskCardMenu } from "./TaskCardMenu";
import { TaskCardDetails } from "./TaskCardDetails";

import { useDispatch } from "react-redux";
import { updateTaskStatus } from "@/entities/task/model/tasksSlice";
import type { AppDispatch } from "@/app/store";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  date?: string;
  status: string;
  priority?: string;
  image?: string;
  completedAt?: string | null;
  vital?: boolean;
  enableDesktopModal?: boolean;
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
  type = "default",
}: TaskCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    deleteTask,
    toggleVital,
    completeTask,
    unfinishTask,
    markInProgress,
    unmarkInProgress,
  } = useTaskActions();

  const [status, setStatus] = useState(initialStatus);
  const [isVital, setIsVital] = useState(Boolean(vital));
  const [completedTime, setCompletedTime] = useState<string>(completedAt || "");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // === Тип карточки ===
  useEffect(() => {
    if (isVital) type = "vital";
    else if (status === "Completed") type = "completed";
    else type = "default";
  }, [status, isVital]);

  // === Resize listener ===
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Close menu on outside click ===
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Actions handler ===
  const handleActionClick = async (action: string) => {
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

      case "Edit":
        setIsEditOpen(true);
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

  // === onSubmit from Edit Modal ===
  const handleEditSubmit = (updated: any) => {
    dispatch(
      updateTaskStatus({
        id,
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        image: updated.imageUrl,
      })
    );
  };

  // === Modal open ===
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".task-card__menu-wrapper")) return;
    if (isMobile || enableDesktopModal) setIsModalOpen(true);
  };

  // === FIX: Правильное формирование initialData ===
  const initialEditData = {
    id,
    title,
    date: date || "",
    priority: priority || "",
    description: description || "",
    image: image || "",
  };

  return (
    <>
      {/* CARD */}
      <div
        className={`task-card ${isMenuOpen ? "menu-open" : ""} ${
          type === "completed" ? "task-card--completed" : ""
        } ${type === "vital" ? "task-card--vital" : ""}`}
        onClick={handleCardClick}
      >
        {/* MENU */}
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

        {/* TOP SECTION */}
        <div className="task-card__top">
          <div className="task-card__left">
            <div className="task-card__header">
              <span
                className="task-card__circle"
                style={{ borderColor: getStatusColor(status) }}
              />

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

        {/* DETAILS */}
        <TaskCardDetails
          status={status}
          priority={priority}
          date={date}
          completedAt={completedTime}
        />
      </div>

      {/* VIEW MODAL */}
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

      {/* EDIT MODAL */}
      {isEditOpen && (
        <EditTaskModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditSubmit}
          initialData={initialEditData}
        />
      )}
    </>
  );
};
