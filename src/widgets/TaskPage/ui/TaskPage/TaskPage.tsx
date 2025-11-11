import "./TaskPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { TaskDetails } from "@/entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "@/entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import { TaskCard } from "@/entities/task/TaskCard";
import {
  fetchTasks,
  removeTask,
  selectTask,
  selectFirstTask,
  clearSelected,
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
  } = useSelector((state: RootState) => state.tasks);

  // 📄 пагинация из Redux
  const { page, limit, totalPages } = useSelector(
    (state: RootState) => state.pagination[type]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 🚀 Загружаем задачи при первом запуске
  useEffect(() => {
    if (tasks.length === 0) dispatch(fetchTasks());
  }, [dispatch, tasks.length]);

  // 📱 Следим за изменением ширины экрана
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🧹 Сбрасываем выбранную задачу при смене типа страницы
  useEffect(() => {
    dispatch(clearSelected());
  }, [type, dispatch]);

  // 🧮 Фильтрация задач по типу страницы
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
      if (taskDate !== selectedDate) return false;

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
  }, [tasks, selectedDate, type]);

  // 📊 Считаем общее число страниц
  useEffect(() => {
    const pages = Math.ceil(filteredTasks.length / limit) || 1;
    dispatch(setTotalPages({ type, totalPages: pages }));
  }, [filteredTasks, limit, type, dispatch]);

  // ✂️ Берем только задачи для текущей страницы
  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredTasks.slice(start, end);
  }, [filteredTasks, page, limit]);

  // 🧠 Автоматически выбираем первую задачу при загрузке
  useEffect(() => {
    if (paginatedTasks.length > 0) {
      dispatch(selectFirstTask(paginatedTasks));
    }
  }, [paginatedTasks, dispatch]);

  // 🗑️ Удаление задачи
  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  // 📆 Заголовки
  const titles: Record<TaskPageProps["type"], string> = {
    my: "My Tasks",
    vital: "Vital Tasks",
    completed: "Completed Tasks",
  };

  if (loading) return <p>Loading {titles[type].toLowerCase()}...</p>;

  // === Разметка ===
  return (
    <section className={`task-page task-page--${type}`}>
      <div className="task-page__content">
        {/* === Левая колонка === */}
        <div className="task-page__left">
          <div className="task-list">
            <div className="task-list__header">
              <h3 className="task-list__title">{titles[type]}</h3>
            </div>

            {/* === Список задач === */}
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

            {/* === Пагинация === */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                dispatch(setPage({ type, page: newPage }))
              }
            />
          </div>
        </div>

        {/* === Правая колонка (десктоп) === */}
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
                onEdit={() => alert("Редактировать задачу")}
              />
            ) : (
              <div className="task-page__info">
                <h2 className="task-page__title">{titles[type]} Overview</h2>
                <p className="task-page__subtitle">
                  Select a task from the list to view details and manage its
                  progress.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* === Модалка для мобильных === */}
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
    </section>
  );
};
