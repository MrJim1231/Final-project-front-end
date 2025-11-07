import "./VitalTask.css";
import { useState } from "react";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../shared/ui/TaskDetails/TaskDetails";
import type { Todo } from "../../../../shared/api/todos";

export const VitalTask = () => {
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // ✅ Когда VitalTaskList загружается — выбираем первую задачу по умолчанию
  const handleTasksLoaded = (tasks: Todo[]) => {
    if (!initialLoaded && tasks.length > 0) {
      setSelectedTask(tasks[0]);
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
            <TaskDetails
              image={selectedTask.image}
              title={selectedTask.title}
              priority={selectedTask.priority}
              status={selectedTask.status}
              date={new Date(selectedTask.createdAt).toLocaleDateString()}
              description={selectedTask.description}
              completedAt={selectedTask.completedAt}
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
