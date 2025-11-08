import { useTaskPage } from "../../../../shared/hooks/useTaskPage";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import "./VitalTask.css";

export const VitalTask = () => {
  const {
    selected,
    isMobile,
    isModalOpen,
    setIsModalOpen,
    handleSelectTask,
    handleDelete,
  } = useTaskPage((t) => t.vital); // 👈 фильтр только vital-задач

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        {/* === Левая колонка === */}
        <div className="vital-page__left">
          <VitalTaskList onSelectTask={handleSelectTask} />
        </div>

        {/* === Правая колонка === */}
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
                onDelete={handleDelete}
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
