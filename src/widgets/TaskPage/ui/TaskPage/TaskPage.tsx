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

  // ===== Resize handler =====
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // ===== Load tasks on first render =====
  useEffect(() => {
    if (tasks.length === 0) dispatch(fetchTasks());
  }, [tasks.length, dispatch]);

  // ===== CUSTOM HOOKS =====
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

  // ======================================================
  // 🔥 АВТО-ВЫБОР ПЕРВОЙ ДОСТУПНОЙ КАРТОЧКИ
  // ======================================================
  useEffect(() => {
    if (!selected) {
      if (paginatedTasks.length > 0) {
        selectTask(paginatedTasks[0]);
      } else if (fallback && fallback.tasks.length > 0) {
        selectTask(fallback.tasks[0]);
      }
    }
  }, [paginatedTasks, fallback, selected, selectTask]);

  // ===== SUBMIT EDITED TASK =====
  const handleEditSubmit = (updated: any) => {
    if (!selected) return;

    dispatch(updateTaskStatus({ id: selected.id, ...updated }));
    setIsEditOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className={`task-page task-page--${type}`}>
      <div className="task-page__content">
        {/* ================= LEFT ================= */}
        <div className="task-page__left">
          <div className="task-list">
            {/* === MAIN LIST === */}
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
              <p>No tasks found</p>
            )}

            {/* === FALLBACK LIST === */}
            {fallback && (
              <div className="task-list__fallback">
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

            {/* === PAGINATION === */}
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
              image={selected.image}
              title={selected.title}
              priority={selected.priority}
              status={selected.status}
              description={selected.description}
              completedAt={selected.completedAt ?? undefined}
              onEdit={() => setIsEditOpen(true)}
              onDelete={() => dispatch(removeTask(selected.id))}
              date={
                selected.createdAt
                  ? new Date(selected.createdAt).toLocaleDateString()
                  : ""
              }
            />
          </div>
        )}
      </div>

      {/* ================= MOBILE DETAILS MODAL ================= */}
      {isMobile && selected && isModalOpen && (
        <TaskDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selected.title}
          desc={selected.description}
          date={
            selected.createdAt
              ? new Date(selected.createdAt).toLocaleDateString()
              : ""
          }
          priority={selected.priority}
          status={selected.status}
          image={selected.image}
          completedAt={selected.completedAt ?? undefined}
        />
      )}

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
