import React, { useState, useEffect } from "react";
import "./EditTaskModal.css"; // ✅ можно использовать те же стили

interface EditTaskModalProps {
  onClose: () => void;
  onSubmit: (updatedTask: any) => void;
  initialData: {
    id?: string;
    title: string;
    date?: string;
    priority?: string;
    description?: string;
    image?: string;
  };
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    priority: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    setForm({
      title: initialData.title || "",
      date: initialData.date || "",
      priority: initialData.priority || "",
      description: initialData.description || "",
      imageUrl: initialData.image || "",
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="addtask-modal">
        <div className="addtask-modal__header">
          <h3 className="addtask-modal__title">Edit Task</h3>
          <button className="addtask-modal__close" onClick={onClose}>
            Go Back
          </button>
        </div>

        <div className="addtask-modal__content">
          <form className="addtask-modal__form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </label>

            <div className="addtask-modal__priority">
              <span>Priority</span>

              {["Extreme", "Moderate", "Low"].map((level) => (
                <label className="priority-item" key={level}>
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={form.priority === level}
                    onChange={handleChange}
                  />
                  <span
                    className={`custom-box ${
                      level === "Extreme"
                        ? "red"
                        : level === "Moderate"
                        ? "blue"
                        : "green"
                    }`}
                  ></span>
                  {level}
                </label>
              ))}
            </div>

            <label>
              Task Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Edit your task..."
              />
            </label>

            <label>
              Image URL
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </label>

            <div className="addtask-modal__actions">
              <button type="submit" className="addtask-modal__btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
