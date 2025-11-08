// src/pages/vital-task/ui/VitalTask/VitalTask.tsx
import "./VitalTask.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import {
  removeTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

// === Хук для определения мобильного экрана
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

export const VitalTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected } = useSelector((state: RootState) => state.tasks);
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vitalTasks = items.filter((t) => t.vital);

  // 🗑️ Удаление задачи
  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      const currentIndex = vitalTasks.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));
      const next =
        vitalTasks[currentIndex + 1] || vitalTasks[currentIndex - 1] || null;
      dispatch(selectTask(next));
    }
  };

  // ✏️ Редактирование
  const handleEdit = () => {
    if (selected) {
      alert(`Редактировать задачу: ${selected.title}`);
    }
  };

  // 🔹 Клик по карточке
  const handleSelectTask = (taskId: string) => {
    const found = items.find((t) => t.id === taskId);
    if (found) {
      dispatch(selectTask(found));
      if (isMobile) setIsModalOpen(true); // 👈 на мобильных — открываем модалку
    }
  };

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        {/* === Левая колонка === */}
        <div className="vital-page__left">
          <VitalTaskList onSelectTask={handleSelectTask} />
        </div>

        {/* === Правая колонка — только на десктопе === */}
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
                completedAt={selected.completedAt ?? undefined} // ✅ исправили тип
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ) : (
              <p className="vital-page__placeholder">
                📁 Select a task to see details
              </p>
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
          completedAt={selected.completedAt ?? undefined} // ✅ безопасное приведение
        />
      )}
    </section>
  );
};
