import { useTaskPage } from "../../../../shared/hooks/useTaskPage";
import { MyTaskList } from "../MyTaskList/MyTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import { TaskDetailsModal } from "../../../../entities/task/ui/TaskDetailsModal/TaskDetailsModal";
import "./MyTask.css";

export const MyTask = () => {
  const {
    selected,
    isMobile,
    isModalOpen,
    setIsModalOpen,
    handleSelectTask,
    handleDelete,
  } = useTaskPage((t) => !t.vital && t.status !== "Completed");

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        {/* === Левая колонка === */}
        <div className="my-task-page__left">
          <MyTaskList onSelectTask={handleSelectTask} />
        </div>

        {/* === Правая колонка === */}
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
                onDelete={handleDelete}
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
