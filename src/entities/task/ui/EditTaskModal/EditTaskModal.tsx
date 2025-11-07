import "./EditTaskModal.css";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import type { Todo } from "../../../../shared/api/todos";

interface EditTaskModalProps {
  task: Todo;
  onClose: () => void;
  onSubmit: (updatedTask: Partial<Todo>) => void;
}

export const EditTaskModal = ({
  task,
  onClose,
  onSubmit,
}: EditTaskModalProps) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority || "Moderate",
    status: task.status,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="edit-modal__overlay">
      <div className="edit-modal">
        {/* === Заголовок === */}
        <div className="edit-modal__header">
          <h3 className="edit-modal__title">Edit Task</h3>
          <button className="edit-modal__close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* === Форма === */}
        <form className="edit-modal__form" onSubmit={handleSubmit}>
          <label className="edit-modal__label">
            Title
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="edit-modal__input"
              required
            />
          </label>

          <label className="edit-modal__label">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="edit-modal__textarea"
              rows={3}
            />
          </label>

          <label className="edit-modal__label">
            Priority
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="edit-modal__select"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Extreme">Extreme</option>
            </select>
          </label>

          <label className="edit-modal__label">
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="edit-modal__select"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          {/* === Кнопки === */}
          <div className="edit-modal__actions">
            <button
              type="button"
              className="edit-modal__btn edit-modal__btn--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="edit-modal__btn edit-modal__btn--save"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
