import React, { useState, useEffect } from "react";
import "../AddTaskModal/AddTaskModal.css"; // те же стили

import { getTaskPriority } from "@/entities/priority/api/priorityApi";

interface EditTaskModalProps {
  onClose: () => void;
  onSubmit: (updatedTask: any) => void;
  initialData: {
    id?: string;
    title: string;
    priority?: string;
    description?: string;
    image?: string;
  };
}

const priorityColors: Record<string, string> = {
  High: "#ff3b30",
  Medium: "#0a84ff",
  Low: "#34c759",
};

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    title: "",
    priority: "",
    description: "",
    imageUrl: "",
  });

  const [priorities, setPriorities] = useState<
    { _id: string; title: string }[]
  >([]);

  useEffect(() => {
    loadPriority();
  }, []);

  const loadPriority = async () => {
    const list = await getTaskPriority();
    setPriorities(list);
  };

  useEffect(() => {
    setForm({
      title: initialData.title || "",
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

    onSubmit({
      title: form.title,
      priority: form.priority,
      description: form.description,
      image: form.imageUrl,
    });

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

            {/* PRIORITY */}
            <div className="priority-block">
              <label className="form-label">Priority</label>

              <div className="priority-list">
                {priorities.map((p) => (
                  <label key={p._id} className="priority-item">
                    <div
                      className="priority-dot"
                      style={{ backgroundColor: priorityColors[p.title] }}
                    />
                    <span className="priority-text">{p.title}</span>

                    <input
                      className="priority-input"
                      type="radio"
                      name="priority"
                      value={p.title}
                      checked={form.priority === p.title}
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

            {/* IMAGE */}
            <label className="form-label">
              Image URL
              <input
                className="form-input"
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="Paste image URL..."
              />
            </label>

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
