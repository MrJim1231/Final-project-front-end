import "./MyTask.css";
import { useState } from "react";
import { MyTaskList } from "../MyTaskList/MyTaskList";
import { TaskDetails } from "../../../../shared/ui/TaskDetails/TaskDetails";
import type { Todo } from "../../../../shared/api/todos";

export const MyTask = () => {
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        <div className="my-task-page__left">
          {/* 👇 передаём обработчик выбора задачи */}
          <MyTaskList onSelectTask={setSelectedTask} />
        </div>

        <div className="my-task-page__right">
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
            <p className="my-task-page__placeholder">
              🗂 Select a task to see details
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
