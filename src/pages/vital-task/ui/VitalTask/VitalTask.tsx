import "./VitalTask.css";
import { useSelector, useDispatch } from "react-redux";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import {
  removeTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";

export const VitalTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected } = useSelector((state: RootState) => state.tasks);

  // 🔹 Фильтруем только vital-задачи
  const vitalTasks = items.filter((t) => t.vital);

  // 🗑️ Удаление текущей задачи из деталей
  const handleDelete = () => {
    if (!selected) return;

    if (window.confirm("Удалить задачу?")) {
      const currentIndex = vitalTasks.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));

      // Выбираем следующую задачу после удаления
      const nextTask =
        vitalTasks[currentIndex + 1] || vitalTasks[currentIndex - 1] || null;
      dispatch(selectTask(nextTask));
    }
  };

  // ✏️ Редактирование (пока просто уведомление)
  const handleEdit = () => {
    if (selected) {
      alert(`Редактировать задачу: ${selected.title}`);
    }
  };

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        {/* === Левая колонка === */}
        <div className="vital-page__left">
          <VitalTaskList />
        </div>

        {/* === Правая колонка (детали) === */}
        <div className="vital-page__right">
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
            <p className="vital-page__placeholder">
              📁 Select a task to see details
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
