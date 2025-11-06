import React, { useState } from "react";
import "./AddTaskModal.css";

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    priority: "",
    description: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
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
          <h3 className="addtask-modal__title">Add New Task</h3>
          <button className="addtask-modal__close" onClick={onClose}>
            Go Back
          </button>
        </div>

        <form className="addtask-modal__form" onSubmit={handleSubmit}>
          {/* === Title === */}
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

          {/* === Date === */}
          <label>
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>

          {/* === Priority === */}
          <div className="addtask-modal__priority">
            <span>Priority</span>
            <label>
              <input
                type="radio"
                name="priority"
                value="Extreme"
                checked={form.priority === "Extreme"}
                onChange={handleChange}
              />
              <span className="dot dot--red"></span> Extreme
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="Moderate"
                checked={form.priority === "Moderate"}
                onChange={handleChange}
              />
              <span className="dot dot--blue"></span> Moderate
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="Low"
                checked={form.priority === "Low"}
                onChange={handleChange}
              />
              <span className="dot dot--green"></span> Low
            </label>
          </div>

          {/* === Description & Image === */}
          <div className="addtask-modal__row">
            <div className="addtask-modal__desc">
              <label>Task Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Start writing here..."
              />
            </div>

            <div className="addtask-modal__upload">
              <label>Upload Image</label>
              <div className="addtask-modal__upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="upload"
                />
                <p>
                  Drag & Drop files here
                  <br /> or <span>Browse</span>
                </p>
              </div>
            </div>
          </div>

          <button type="submit" className="addtask-modal__btn">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};
