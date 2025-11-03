import "./TaskCategories.css";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskPriority } from "../TaskPriority/TaskPriority";

export const TaskCategories = () => {
  return (
    <section className="categories-page">
      <div className="categories-page__header">
        <h2 className="categories-page__title">Task Categories</h2>
        <a href="#" className="categories-page__back">
          Go Back
        </a>
      </div>

      <button className="categories-page__add-btn">+ Add Category</button>

      <div className="categories-page__content">
        <TaskStatus />
        <TaskPriority />
      </div>
    </section>
  );
};
