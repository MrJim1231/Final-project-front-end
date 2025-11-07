import "./CompletedTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  removeTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";
import type { Todo } from "../../../../shared/api/todos";

export const CompletedTaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.tasks); // ✅ заменили tasks → items

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  // ✅ теперь всё типизировано
  const completedTasks = items.filter((t: Todo) => t.status === "Completed");

  if (loading)
    return (
      <p className="completed-list__loading">Loading completed tasks...</p>
    );

  return (
    <div className="completed-list">
      <div className="completed-list__header">
        <h3 className="completed-list__title">Completed Tasks</h3>
      </div>

      {completedTasks.length > 0 ? (
        completedTasks.map((task: Todo) => (
          <TaskCard
            key={task.id}
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
        ))
      ) : (
        <p className="completed-list__empty">✅ No completed tasks yet!</p>
      )}
    </div>
  );
};
