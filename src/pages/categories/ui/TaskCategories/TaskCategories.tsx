import { useNavigate } from "react-router-dom";
import "./TaskCategories.css";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskPriority } from "../TaskPriority/TaskPriority";

export const TaskCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories-page">
      {/* === Заголовок и кнопка назад === */}
      <div className="categories-page__header">
        <h2 className="categories-page__title">Task Categories</h2>
        <button className="categories-page__back" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      {/* === Кнопка добавления категории === */}
      <button
        className="categories-page__add-btn"
        onClick={() => navigate("/categories/add")}
      >
        + Add Category
      </button>

      {/* === Контент страницы === */}
      <div className="categories-page__content">
        <TaskStatus />
        <TaskPriority />
      </div>
    </section>
  );
};
