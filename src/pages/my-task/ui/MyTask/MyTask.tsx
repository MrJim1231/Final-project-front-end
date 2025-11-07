// src/pages/my-task/ui/MyTask/MyTask.tsx
import "./MyTask.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyTaskList } from "../MyTaskList/MyTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import {
  fetchTasks,
  selectTask,
  removeTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const MyTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  // 🚀 Загружаем все задачи при монтировании
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔹 Фильтруем только активные (не Completed и не Vital)
  const activeTasks = items.filter((t) => t.status !== "Completed" && !t.vital);

  // 🗑️ Удаление текущей задачи
  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      dispatch(removeTask(selected.id));
      // выбираем следующую задачу после удаления
      const nextTask = activeTasks.find((t) => t.id !== selected.id);
      dispatch(selectTask(nextTask || null));
    }
  };

  // ✏️ Редактирование (можно открыть модалку или что-то другое)
  const handleEdit = () => {
    if (selected) {
      alert(`Редактировать задачу: ${selected.title}`);
      // в будущем можно dispatch(selectTask(selected)) + открыть модалку
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        <div className="my-task-page__left">
          {/* ✅ список задач теперь тоже берёт из Redux */}
          <MyTaskList />
        </div>

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
      </div>
    </section>
  );
};
