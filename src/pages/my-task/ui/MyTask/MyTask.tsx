// src/pages/my-task/ui/MyTask/MyTask.tsx
import "./MyTask.css";
import { useEffect, useMemo } from "react";
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

  // 🔹 Мемоизируем фильтрованные активные задачи
  const activeTasks = useMemo(
    () => items.filter((t) => t.status !== "Completed" && !t.vital),
    [items]
  );

  // 🗑️ Удаление текущей выбранной задачи
  const handleDelete = async () => {
    if (!selected) return;
    if (!window.confirm(`Удалить задачу "${selected.title}"?`)) return;

    try {
      await dispatch(removeTask(selected.id)).unwrap();

      // ✅ выбираем следующую задачу
      const nextTask = activeTasks.find((t) => t.id !== selected.id);
      dispatch(selectTask(nextTask || null));
    } catch (err) {
      console.error("Ошибка при удалении задачи:", err);
      alert("Не удалось удалить задачу 😢");
    }
  };

  // ✏️ Редактирование — пока просто сообщение, позже можно открыть модалку
  const handleEdit = () => {
    if (selected) {
      alert(`Редактировать задачу: ${selected.title}`);
      // ⬇️ в будущем: открыть модалку для редактирования
      // dispatch(openEditModal(selected));
    }
  };

  if (loading) return <p className="my-task-page__loading">Loading tasks...</p>;

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        {/* === Левая колонка: список === */}
        <div className="my-task-page__left">
          <MyTaskList />
        </div>

        {/* === Правая колонка: детали === */}
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
