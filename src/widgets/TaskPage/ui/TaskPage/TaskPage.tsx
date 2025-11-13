import "./TaskPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { TaskCard } from "@/entities/task/TaskCard";
import { TaskDetails } from "@/entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "@/entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import { EditTaskModal } from "@/entities/task/ui/EditTaskModal/EditTaskModal";

import {
  fetchTasks,
  removeTask,
  updateTaskStatus,
} from "@/entities/task/model/tasksSlice";

import { Pagination } from "@/entities/task/ui/Pagination/Pagination";
import { setPage } from "@/entities/task/model/paginationSlice";

import { useFilteredTasks } from "../hooks/useFilteredTasks";
import { useFallbackTasks } from "../hooks/useFallbackTasks";
import { usePaginationTasks } from "../hooks/usePaginationTasks";
import { useTaskSelection } from "../hooks/useTaskSelection";

import type { RootState, AppDispatch } from "@/app/providers/store";

interface TaskPageProps {
  type: "my" | "vital" | "completed";
}

export const TaskPage = ({ type }: TaskPageProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: tasks,
    selected,
    selectedDate,
    loading,
    searchQuery,
  } = useSelector((s: RootState) => s.tasks);

  const { page, limit, totalPages } = useSelector(
    (s: RootState) => s.pagination[type]
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Resize
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Load tasks
  useEffect(() => {
    if (tasks.length === 0) dispatch(fetchTasks());
  }, [tasks.length, dispatch]);

  // FILTER / FALLBACK / PAGINATION
  const filteredTasks = useFilteredTasks(
    tasks,
    selectedDate,
    type,
    searchQuery
  );

  const fallback = useFallbackTasks(
    tasks,
    filteredTasks,
    selectedDate,
    type,
    limit,
    searchQuery
  );

  const paginatedTasks = usePaginationTasks(filteredTasks, page, limit, type);

  const selectTask = useTaskSelection(paginatedTasks);

  // AUTO SELECT CARD
  useEffect(() => {
    if (!selected) {
      if (paginatedTasks.length > 0) {
        selectTask(paginatedTasks[0]);
      } else if (fallback && fallback.tasks.length > 0) {
        selectTask(fallback.tasks[0]);
      }
    }
  }, [paginatedTasks, fallback, selected, selectTask]);

  const handleEditSubmit = (updated: any) => {
    if (!selected) return;
    dispatch(updateTaskStatus({ id: selected.id, ...updated }));
    setIsEditOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  // ===== Вычисляем дату хедера =====
  const day = new Date(selectedDate).getDate();
  const month = new Date(selectedDate).toLocaleString("en-US", {
    month: "long",
  });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  const titles = {
    my: "My Tasks",
    vital: "Vital Tasks",
    completed: "Completed Tasks",
  };

  const colors = {
    my: "#377dff",
    vital: "#ff4b4b",
    completed: "#00c851",
  };

  return (
    <section className={`task-page task-page--${type}`}>
      <div className="task-page__content">
        {/* ================= LEFT ================= */}
        <div className="task-page__left">
          <div className="task-list">
            {/* ===================== HEADER ===================== */}
            <div className="task-list__header">
              <div className="task-list__title-wrapper">
                <h3
                  className="task-list__title"
                  style={{ color: colors[type] }}
                >
                  {titles[type]}
                </h3>

                <div className="task-list__date">
                  {day} {month}
                  <span className="task-list__today">{isToday}</span>
                </div>
              </div>
            </div>

            {/* ============ MAIN LIST ============ */}
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-list__item ${
                    selected?.id === task.id ? "active" : ""
                  }`}
                  onClick={() => selectTask(task)}
                >
                  <TaskCard {...task} type={type === "my" ? "default" : type} />
                </div>
              ))
            ) : (
              <p>No {titles[type].toLowerCase()} found.</p>
            )}

            {/* ===================== FALLBACK DATE ===================== */}
            {fallback && (
              <div className="task-list__fallback">
                {/* 👇 ДОБАВЛЕНА ДАТА КАК В СТАРОЙ ВЕРСИИ */}
                <div className="task-list__fallback-date-title">
                  {new Date(fallback.date).getDate()}{" "}
                  {new Date(fallback.date).toLocaleString("en-US", {
                    month: "long",
                  })}
                </div>

                {fallback.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-list__item"
                    onClick={() => selectTask(task)}
                  >
                    <TaskCard {...task} />
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => dispatch(setPage({ type, page: p }))}
            />
          </div>
        </div>

        {/* ================= RIGHT (DESKTOP) ================= */}
        {!isMobile && selected && (
          <div className="task-page__right">
            <TaskDetails
              {...selected}
              date={new Date(selected.createdAt).toLocaleDateString()}
              onEdit={() => setIsEditOpen(true)}
              onDelete={() => dispatch(removeTask(selected.id))}
            />
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && selected && (
        <EditTaskModal
          initialData={selected}
          onSubmit={handleEditSubmit}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </section>
  );
};
