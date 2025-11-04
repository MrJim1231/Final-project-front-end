import { useNavigate } from "react-router-dom";
import "./AddCategory.css";

export const AddCategory = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate(-1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("✅ Category added!");
    // TODO: добавить логику POST-запроса к API
  };

  return (
    <section className="add-category">
      <div className="add-category__header">
        <h2 className="add-category__title">
          <span>Add</span> Category
        </h2>
        <button
          type="button"
          className="add-category__back"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      <form className="add-category__form" onSubmit={handleSubmit}>
        <label htmlFor="categoryName" className="add-category__label">
          Category Name
        </label>

        <input
          id="categoryName"
          type="text"
          placeholder="Enter category name"
          className="add-category__input"
          required
        />

        <div className="add-category__buttons">
          <button type="submit" className="btn btn--add">
            Add
          </button>
          <button
            type="button"
            className="btn btn--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
