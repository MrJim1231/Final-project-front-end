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

  // ⚡️ Автоматически выбираем первую задачу после загрузки
  useEffect(() => {
    if (items.length > 0 && !selected) {
      dispatch(selectTask(items[0])); // выбираем первую
    }
  }, [items, selected, dispatch]);

  // 🔹 Фильтруем активные задачи (не Completed и не Vital)
  const activeTasks = items.filter((t) => t.status !== "Completed" && !t.vital);

  // 🗑️ Удаление текущей задачи
  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      const currentIndex = activeTasks.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));

      // Выбираем следующую задачу после удаления
      const nextTask =
        activeTasks[currentIndex + 1] || activeTasks[currentIndex - 1] || null;
      dispatch(selectTask(nextTask));
    }
  };

  // ✏️ Открыть редактирование
  const handleEdit = () => {
    if (selected) {
      alert(`Редактировать задачу: ${selected.title}`);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        <div className="my-task-page__left">
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
