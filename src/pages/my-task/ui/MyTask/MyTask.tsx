// src/pages/my-task/ui/MyTask/MyTask.tsx
import "./MyTask.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyTaskList } from "../MyTaskList/MyTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import {
  fetchTasks,
  selectTask,
  removeTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

// === хук для определения мобильного экрана
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

export const MyTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const activeTasks = items.filter((t) => t.status !== "Completed" && !t.vital);

  useEffect(() => {
    if (activeTasks.length > 0 && !selected) {
      dispatch(selectTask(activeTasks[0]));
    }
  }, [activeTasks, selected, dispatch]);

  useEffect(() => {
    if (selected && !activeTasks.find((t) => t.id === selected.id)) {
      const nextTask = activeTasks[0] || null;
      dispatch(selectTask(nextTask));
    }
  }, [activeTasks, selected, dispatch]);

  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      const currentIndex = activeTasks.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));
      const nextTask =
        activeTasks[currentIndex + 1] || activeTasks[currentIndex - 1] || null;
      dispatch(selectTask(nextTask));
    }
  };

  const handleEdit = () => {
    if (selected) {
      alert(`Редактировать задачу: ${selected.title}`);
    }
  };

  // === Клик по карточке ===
  const handleSelectTask = (taskId: string) => {
    const found = items.find((t) => t.id === taskId);
    if (found) {
      dispatch(selectTask(found));
      if (isMobile) setIsModalOpen(true); // 👈 на мобильных открываем модалку
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        <div className="my-task-page__left">
          {/* Передаём кастомный onSelect */}
          <MyTaskList onSelectTask={handleSelectTask} />
        </div>

        {/* ✅ Desktop: отображаем TaskDetails справа */}
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
                completedAt={selected.completedAt}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ) : (
              <p className="my-task-page__placeholder">
                🗂 Select a task to see details
              </p>
            )}
          </div>
        )}
      </div>

      {/* ✅ Mobile: открываем TaskDetailsModal */}
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
          completedAt={selected.completedAt ?? undefined} // 👈 привели null к undefined
        />
      )}
    </section>
  );
};
