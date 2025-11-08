import "./VitalTask.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import {
  fetchTasks,
  removeTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const VitalTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    selected,
    selectedDate,
  } = useSelector((state: RootState) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 🚀 Подгружаем задачи при монтировании
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  // 📱 Следим за изменением ширины экрана
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🗑️ Удаление задачи
  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
    if (selected?.id === id) dispatch(selectTask(null));
  };

  // 📅 Фильтруем только vital-задачи за выбранную дату
  const vitalTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && t.vital;
  });

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        {/* === Левая колонка === */}
        <div className="vital-page__left">
          <VitalTaskList />
        </div>

        {/* === Правая колонка (только для десктопа) === */}
        {!isMobile && (
          <div className="vital-page__right">
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
              <div className="vital-page__info">
                <h2 className="vital-page__title">Vital Tasks Overview</h2>
                <p className="vital-page__subtitle">
                  Review and manage your most important tasks in this section.
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
