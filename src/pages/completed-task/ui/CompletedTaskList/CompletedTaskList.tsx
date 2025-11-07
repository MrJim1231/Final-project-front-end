import "./CompletedTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  removeTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const CompletedTaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, selected } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const completedTasks = items.filter((t) => t.status === "Completed");

  // авто-выбор первой завершённой
  useEffect(() => {
    if (completedTasks.length > 0 && !selected) {
      dispatch(selectTask(completedTasks[0]));
    }
  }, [completedTasks, selected, dispatch]);

  // если выбранная задача исчезла из списка (удалили/изменили статус) — выбрать ближайшую
  useEffect(() => {
    if (selected && !completedTasks.find((t) => t.id === selected.id)) {
      const next = completedTasks[0] || null;
      dispatch(selectTask(next));
    }
  }, [completedTasks, selected, dispatch]);

  const handleDelete = (id: string) => {
    const idx = completedTasks.findIndex((t) => t.id === id);
    dispatch(removeTask(id));
    const next = completedTasks[idx + 1] || completedTasks[idx - 1] || null;
    dispatch(selectTask(next));
  };

  if (loading) {
    return (
      <p className="completed-list__loading">Loading completed tasks...</p>
    );
  }

  return (
    <div className="completed-list">
      <div className="completed-list__header">
        <h3 className="completed-list__title">Completed Tasks</h3>
      </div>

      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <div
            key={task.id}
            className={`completed-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
            onClick={() => dispatch(selectTask(task))}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              desc={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              completedAt={task.completedAt ?? "Recently completed"}
              type="completed"
              onDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <p className="completed-list__empty">✅ No completed tasks yet!</p>
      )}
    </div>
  );
};
