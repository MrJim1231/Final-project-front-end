// src/pages/completed-task/ui/CompletedTask/CompletedTask.tsx
import { useTaskPage } from "../../../../shared/hooks/useTaskPage";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import "./CompletedTask.css";

export const CompletedTask = () => {
  const {
    selected,
    isMobile,
    isModalOpen,
    setIsModalOpen,
    handleSelectTask,
    handleDelete,
  } = useTaskPage((t) => t.status === "Completed"); // 👈 фильтр только завершённых

  return (
    <section className="completed-page">
      <div className="completed-page__content">
        {/* === Левая колонка со списком === */}
        <div className="completed-page__left">
          <CompletedTaskList onSelectTask={handleSelectTask} />
        </div>

        {/* === Правая колонка для десктопа === */}
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
                onDelete={handleDelete}
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
