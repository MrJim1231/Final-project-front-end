import "./CompletedTask.css";
import { useDispatch, useSelector } from "react-redux";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import {
  removeTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const CompletedTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected } = useSelector((state: RootState) => state.tasks);

  // показываем только завершённые в расчётах “следующей”
  const completed = items.filter((t) => t.status === "Completed");

  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      const idx = completed.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));
      const next = completed[idx + 1] || completed[idx - 1] || null;
      dispatch(selectTask(next));
    }
  };

  const handleEdit = () => {
    if (selected) alert(`Редактировать задачу: ${selected.title}`);
  };

  return (
    <section className="completed-page">
      <div className="completed-page__content">
        <div className="completed-page__left">
          <CompletedTaskList />
        </div>

        <div className="completed-page__right">
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
      </div>
    </section>
  );
};
