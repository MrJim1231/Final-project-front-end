import { useTaskPage } from "../../../../shared/hooks/useTaskPage";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";

export const VitalTask = () => {
  const {
    selected,
    isMobile,
    isModalOpen,
    setIsModalOpen,
    handleSelectTask,
    handleDelete,
  } = useTaskPage((t) => t.vital);

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        <div className="vital-page__left">
          <VitalTaskList onSelectTask={handleSelectTask} />
        </div>

        {!isMobile && selected && (
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
        )}
      </div>

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
