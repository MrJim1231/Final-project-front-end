// src/pages/vital-task/ui/VitalTaskList/VitalTaskList.tsx
import "./VitalTaskList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../../../entities/task/ui/TaskCard";
import {
  fetchTasks,
  removeTask,
  updateTask,
  selectTask,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";
import type { Todo } from "../../../../shared/api/todos";

interface VitalTaskListProps {
  onSelectTask: (task: Todo | null) => void;
  onTasksLoaded?: (tasks: Todo[]) => void; // ✅ нужен для выбора первой карточки
}

export const VitalTaskList = ({
  onSelectTask,
  onTasksLoaded,
}: VitalTaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, selected } = useSelector(
    (state: RootState) => state.tasks
  );

  // 🚀 Загружаем задачи при монтировании
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🧩 Фильтруем только vital-задачи
  const vitalTasks = items.filter((task) => task.vital);

  // ⚡️ Сообщаем родителю, когда задачи загружены
  useEffect(() => {
    if (vitalTasks.length > 0 && onTasksLoaded) {
      onTasksLoaded(vitalTasks);
    }
  }, [vitalTasks, onTasksLoaded]);

  // 🗑️ Удаление задачи
  const handleDeleteTask = (id: string) => {
    if (window.confirm("Удалить задачу?")) {
      dispatch(removeTask(id));
      if (selected?.id === id) {
        dispatch(selectTask(null));
        onSelectTask(null);
      }
    }
  };

  // 💫 Удаление / добавление в "Vital"
  const handleVitalUpdate = (id: string, isVital: boolean) => {
    dispatch(updateTask({ id, vital: isVital }));

    if (!isVital && selected?.id === id) {
      dispatch(selectTask(null));
      onSelectTask(null);
    }
  };

  // ✅ Обновление статуса (Finish)
  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    if (newStatus === "Completed") {
      dispatch(
        updateTask({
          id,
          status: "Completed",
          vital: false,
          completedAt: new Date().toISOString(),
        })
      );
      if (selected?.id === id) {
        dispatch(selectTask(null));
        onSelectTask(null);
      }
    } else {
      dispatch(updateTask({ id, status: newStatus, completedAt: null }));
    }
  };

  if (loading)
    return <p className="vital-task-list__loading">Loading vital tasks...</p>;

  return (
    <div className="vital-task-list">
      <div className="vital-task-list__header">
        <div className="vital-task-list__title-wrapper">
          <h3 className="vital-task-list__title">Vital Tasks</h3>
        </div>
      </div>

      {vitalTasks.length > 0 ? (
        vitalTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              dispatch(selectTask(task));
              onSelectTask(task);
            }}
            className={`vital-task-list__item ${
              selected?.id === task.id ? "active" : ""
            }`}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              desc={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={true}
              type="vital"
              onDelete={handleDeleteTask}
              onVitalUpdate={handleVitalUpdate}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        ))
      ) : (
        <p className="vital-task-list__empty">
          😌 No vital tasks yet — mark important ones in your To-Do list!
        </p>
      )}
    </div>
  );
};
