// src/pages/vital-task/ui/VitalTask/VitalTask.tsx
import "./VitalTask.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import type { RootState } from "../../../../app/providers/store";
import type { Todo } from "../../../../shared/api/todos";

export const VitalTask = () => {
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const { items } = useSelector((state: RootState) => state.tasks);
  const vitalTasks = items.filter((task) => task.vital);

  // ✅ Когда список загружается — выбираем первую задачу по умолчанию
  const handleTasksLoaded = (tasks: Todo[]) => {
    if (!initialLoaded && tasks.length > 0) {
      setSelectedTask(tasks[0]);
      setInitialLoaded(true);
    }
  };

  // ⚡️ Следим за изменением списка vital-задач
  useEffect(() => {
    if (!selectedTask && vitalTasks.length > 0) {
      // если ничего не выбрано, выбираем первую
      setSelectedTask(vitalTasks[0]);
    } else if (
      selectedTask &&
      !vitalTasks.find((t) => t.id === selectedTask.id)
    ) {
      // если выбранная задача исчезла из списка
      const currentIndex = items.findIndex((t) => t.id === selectedTask.id);
      const nextTask =
        vitalTasks[currentIndex] ||
        vitalTasks[currentIndex - 1] ||
        vitalTasks[0] ||
        null;
      setSelectedTask(nextTask);
    }
  }, [vitalTasks, selectedTask, items]);

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        <div className="vital-page__left">
          <VitalTaskList
            onSelectTask={setSelectedTask}
            onTasksLoaded={handleTasksLoaded}
          />
        </div>

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
