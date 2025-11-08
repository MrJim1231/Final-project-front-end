import "./CompletedTask.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import {
  fetchTasks,
  removeTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const CompletedTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    selected,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 🚀 Загружаем задачи при монтировании
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  // 📱 Следим за шириной экрана
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🗑️ Удалить задачу
  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
    if (selected?.id === id) dispatch(selectTask(null));
  };

  // ✅ Фильтруем только завершённые задачи за выбранную дату
  const completedTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && t.status === "Completed";
  });

  return (
    <section className="completed-page">
      <div className="completed-page__content">
        {/* === Левая колонка === */}
        <div className="completed-page__left">
          <CompletedTaskList />
        </div>

        {/* === Правая колонка (для десктопа) === */}
        {!isMobile && (
          <div className="completed-page__right">
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
              <div className="completed-page__info">
                <h2 className="completed-page__title">
                  Completed Tasks Overview
                </h2>
                <p className="completed-page__subtitle">
                  Here you can review all tasks that have been successfully
                  finished.
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
