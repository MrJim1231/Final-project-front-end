import React, { useState, useEffect } from "react";
import "../AddTaskModal/AddTaskModal.css"; // Используем те же стили, НЕ меняем

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

// Цвета круглых точек (как в AddTaskModal)
const priorityColors: Record<string, string> = {
  Extreme: "#ff3b30",
  Moderate: "#0a84ff",
  Low: "#34c759",
};

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

  const [showUrlInput, setShowUrlInput] = useState(true);

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
        {/* HEADER */}
        <div className="addtask-modal__header">
          <h3 className="addtask-modal__title">Edit Task</h3>
          <button className="addtask-modal__close" onClick={onClose}>
            Go Back
          </button>
        </div>

        {/* CONTENT */}
        <div className="addtask-modal__content">
          <form className="addtask-modal__form" onSubmit={handleSubmit}>
            {/* TITLE */}
            <label className="form-label">
              Title
              <input
                className="form-input"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            {/* DATE */}
            <label className="form-label">
              Date
              <input
                className="form-input"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </label>

            {/* PRIORITY */}
            <div className="priority-block">
              <label className="form-label">Priority</label>

              <div className="priority-list">
                {["Extreme", "Moderate", "Low"].map((level) => (
                  <label key={level} className="priority-item">
                    <div
                      className="priority-dot"
                      style={{ backgroundColor: priorityColors[level] }}
                    />

                    <span className="priority-text">{level}</span>

                    <input
                      className="priority-input"
                      type="radio"
                      name="priority"
                      value={level}
                      checked={form.priority === level}
                      onChange={handleChange}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <label className="form-label">
              Task Description
              <textarea
                className="form-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Edit your task..."
              />
            </label>

            {/* IMAGE URL */}
            <div className="addtask-modal__upload">
              <label className="form-label">Image URL</label>

              <div className="addtask-modal__upload-box">
                <div className="addtask-modal__url-input">
                  <input
                    className="form-input"
                    type="text"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="Paste image URL here..."
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT */}
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
