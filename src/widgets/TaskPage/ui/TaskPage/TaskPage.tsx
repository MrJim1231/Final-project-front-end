// == FALLBACK ДОБАВЛЕНО В ЭТОЙ ВЕРСИИ ==

import "./TaskPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { TaskDetails } from "@/entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "@/entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import { EditTaskModal } from "@/entities/task/ui/EditTaskModal/EditTaskModal";
import { TaskCard } from "@/entities/task/TaskCard";
import {
  fetchTasks,
  removeTask,
  selectTask,
  selectFirstTask,
  clearSelected,
  updateTaskStatus,
} from "@/entities/task/model/tasksSlice";
import { Pagination } from "@/entities/task/ui/Pagination/Pagination";
import { setPage, setTotalPages } from "@/entities/task/model/paginationSlice";
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
  } = useSelector((state: RootState) => state.tasks);

  const { page, limit, totalPages } = useSelector(
    (state: RootState) => state.pagination[type]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (tasks.length === 0) dispatch(fetchTasks());
  }, [dispatch, tasks.length]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(clearSelected());
  }, [type, dispatch]);

  // 🔍 Проверка поиска
  const matchSearch = (t: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  };

  // =============================
  // 📌 OSNOVNAYA FILTRACIYA TASKOV
  // =============================
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = matchSearch(t);

      // 🔍 Поиск работает по всем датам
      if (searchQuery.trim()) {
        switch (type) {
          case "my":
            return matchesSearch && !t.vital && t.status !== "Completed";
          case "vital":
            return matchesSearch && t.vital === true;
          case "completed":
            return matchesSearch && t.status === "Completed";
          default:
            return matchesSearch;
        }
      }

      // 📅 Без поиска — фильтрация по дате
      const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
      if (taskDate !== selectedDate) return false;
      if (!matchesSearch) return false;

      switch (type) {
        case "my":
          return !t.vital && t.status !== "Completed";
        case "vital":
          return t.vital === true;
        case "completed":
          return t.status === "Completed";
        default:
          return true;
      }
    });
  }, [tasks, selectedDate, type, searchQuery]);

  // =============================
  // 🔥 FALLBACK — задачи предыдущей даты (КАК В TODOLIST)
  // =============================
  const fallback = useMemo(() => {
    // Если список не пустой — fallback не нужен
    if (filteredTasks.length > 0) return null;

    // Поиск → fallback не нужен
    if (searchQuery.trim()) return null;

    const getDate = (t: any) =>
      new Date(t.createdAt).toISOString().split("T")[0];

    // Фильтр по типу страницы
    const filteredByType = tasks.filter((t) => {
      switch (type) {
        case "my":
          return !t.vital && t.status !== "Completed";
        case "vital":
          return t.vital === true;
        case "completed":
          return t.status === "Completed";
        default:
          return true;
      }
    });

    if (filteredByType.length === 0) return null;

    // Сортировка по дате
    const sorted = [...filteredByType].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const lastDate = getDate(sorted[0]);

    // Если последняя дата совпадает — fallback не нужен
    if (lastDate === selectedDate) return null;

    const lastDateTasks = sorted
      .filter((t) => getDate(t) === lastDate)
      .slice(0, limit);

    if (lastDateTasks.length === 0) return null;

    return {
      date: lastDate,
      tasks: lastDateTasks,
    };
  }, [tasks, filteredTasks, selectedDate, searchQuery, type, limit]);

  // =============================
  // ПАГИНАЦИЯ
  // =============================
  useEffect(() => {
    const pages = Math.ceil(filteredTasks.length / limit) || 1;
    dispatch(setTotalPages({ type, totalPages: pages }));
  }, [filteredTasks, limit, type, dispatch]);

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredTasks.slice(start, end);
  }, [filteredTasks, page, limit]);

  useEffect(() => {
    if (paginatedTasks.length > 0) {
      dispatch(selectFirstTask(paginatedTasks));
    }
  }, [paginatedTasks, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  const handleEditSubmit = (updated: any) => {
    if (!selected) return;

    dispatch(
      updateTaskStatus({
        id: selected.id,
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        image: updated.imageUrl,
        date: updated.date,
      })
    );

    setIsEditOpen(false);
  };

  const titles: Record<TaskPageProps["type"], string> = {
    my: "My Tasks",
    vital: "Vital Tasks",
    completed: "Completed Tasks",
  };

  const typeColors: Record<TaskPageProps["type"], string> = {
    my: "#377dff",
    vital: "#ff4b4b",
    completed: "#00c851",
  };

  const current = new Date(selectedDate);
  const day = current.getDate();
  const month = current.toLocaleString("en-US", { month: "long" });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  if (loading) return <p>Loading {titles[type].toLowerCase()}...</p>;

  return (
    <section className={`task-page task-page--${type}`}>
      <div className="task-page__content">
        <div className="task-page__left">
          <div className="task-list">
            <div className="task-list__header">
              <div className="task-list__title-wrapper">
                <h3
                  className="task-list__title"
                  style={{ color: typeColors[type] }}
                >
                  {titles[type]}
                </h3>

                <div className="task-list__date">
                  {day} {month}{" "}
                  <span className="task-list__today">{isToday}</span>
                </div>
              </div>
            </div>

            {/* === ОСНОВНОЙ СПИСОК ЗАДАЧ === */}
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-list__item ${
                    selected?.id === task.id ? "active" : ""
                  }`}
                  onClick={() => dispatch(selectTask(task))}
                >
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    date={new Date(task.createdAt).toLocaleDateString()}
                    priority={task.priority}
                    status={task.status}
                    image={task.image}
                    vital={task.vital}
                    type={type === "my" ? "default" : type}
                    completedAt={task.completedAt ?? undefined}
                  />
                </div>
              ))
            ) : (
              <p>No {titles[type].toLowerCase()} found.</p>
            )}

            {/* === FALLBACK ДАТА + ЗАДАЧИ === */}
            {fallback && (
              <div className="task-list__fallback">
                <div className="task-list__fallback-date">
                  {new Date(fallback.date).getDate()}{" "}
                  {new Date(fallback.date).toLocaleString("en-US", {
                    month: "long",
                  })}
                </div>

                {fallback.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-list__item"
                    onClick={() => dispatch(selectTask(task))}
                  >
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      date={new Date(task.createdAt).toLocaleDateString()}
                      priority={task.priority}
                      status={task.status}
                      image={task.image}
                      vital={task.vital}
                      type={type === "my" ? "default" : type}
                      completedAt={task.completedAt ?? undefined}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* === ПАГИНАЦИЯ === */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                dispatch(setPage({ type, page: newPage }))
              }
            />
          </div>
        </div>

        {/* === PRAвая панель === */}
        {!isMobile && (
          <div className="task-page__right">
            {selected && paginatedTasks.some((t) => t.id === selected.id) ? (
              <TaskDetails
                image={selected.image}
                title={selected.title}
                priority={selected.priority}
                status={selected.status}
                date={new Date(selected.createdAt).toLocaleDateString()}
                description={selected.description}
                completedAt={selected.completedAt ?? undefined}
                onDelete={() => handleDelete(selected.id)}
                onEdit={() => setIsEditOpen(true)}
              />
            ) : (
              <div className="task-page__info">
                <h2 className="task-page__title">{titles[type]} Overview</h2>
                <p className="task-page__subtitle">
                  Select a task from the list to view details and manage
                  progress.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* === MOBILE DETAILS MODAL === */}
      {isMobile && selected && isModalOpen && (
        <TaskDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selected.title}
          desc={selected.description}
          date={new Date(selected.createdAt).toLocaleDateString()}
          priority={selected.priority}
          status={selected.status}
          image={selected.image}
          completedAt={selected.completedAt ?? undefined}
        />
      )}

      {/* === EDIT MODAL === */}
      {isEditOpen && selected && (
        <EditTaskModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditSubmit}
          initialData={{
            id: selected.id,
            title: selected.title,
            date: selected.date || selected.createdAt,
            priority: selected.priority,
            description: selected.description,
            image: selected.image,
          }}
        />
      )}
    </section>
  );
};
