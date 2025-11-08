import "./MyTask.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { MyTaskList } from "../MyTaskList/MyTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import {
  fetchTasks,
  removeTask,
  selectTask,
  selectFirstTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const MyTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    selected,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 🚀 Загружаем задачи при первом рендере
  useEffect(() => {
    if (tasks.length === 0) dispatch(fetchTasks());
  }, [dispatch]);

  // 📱 Следим за ресайзом
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📅 Фильтруем задачи
  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) => {
        const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
        return (
          taskDate === selectedDate && !t.vital && t.status !== "Completed"
        );
      }),
    [tasks, selectedDate]
  );

  // 🧠 Автовыбор первой задачи при загрузке или обновлении списка
  useEffect(() => {
    if (!selected && filteredTasks.length > 0) {
      dispatch(selectFirstTask(filteredTasks));
    }
  }, [filteredTasks, selected, dispatch]);

  // 🧹 Если выбранная задача исчезла — выбираем следующую
  useEffect(() => {
    if (selected && !filteredTasks.some((t) => t.id === selected.id)) {
      if (filteredTasks.length > 0) {
        dispatch(selectFirstTask(filteredTasks));
      } else {
        dispatch(selectTask(null));
      }
    }
  }, [filteredTasks, selected, dispatch]);

  // 🗑️ Удалить задачу
  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        {/* === Левая колонка === */}
        <div className="my-task-page__left">
          <MyTaskList />
        </div>

        {/* === Правая колонка (десктоп) === */}
        {!isMobile && (
          <div className="my-task-page__right">
            {selected ? (
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
              <div className="my-task-page__info">
                <h2 className="my-task-page__title">My Tasks Overview</h2>
                <p className="my-task-page__subtitle">
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
