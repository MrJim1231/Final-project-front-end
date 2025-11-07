import "./VitalTask.css";
import { useState } from "react";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { VitalTaskDetails } from "../VitalTaskDetails/VitalTaskDetails";
import type { Todo } from "../../../../shared/api/todos";

export const VitalTask = () => {
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // ✅ Получаем первую задачу из списка, когда VitalTaskList загружен
  const handleTasksLoaded = (tasks: Todo[]) => {
    if (!initialLoaded && tasks.length > 0) {
      setSelectedTask(tasks[0]); // 👈 выбираем первую задачу
      setInitialLoaded(true);
    }
  };

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        {/* === Левая колонка: список === */}
        <div className="vital-page__left">
          <VitalTaskList
            onSelectTask={setSelectedTask}
            onTasksLoaded={handleTasksLoaded}
          />
        </div>

        {/* === Правая колонка: детали === */}
        <div className="vital-page__right">
          {selectedTask ? (
            <VitalTaskDetails task={selectedTask} />
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
