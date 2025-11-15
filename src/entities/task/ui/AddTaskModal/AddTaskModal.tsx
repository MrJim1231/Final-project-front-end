import React, { useState, useEffect } from "react";
import "./AddTaskModal.css";

import { getTaskPriority } from "@/shared/api/priorityApi";

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
}

const priorityColors: Record<string, string> = {
  Extreme: "#ff3b30",
  Moderate: "#0a84ff",
  Low: "#34c759",
};

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
    imageUrl: "",
  });

  const [priorities, setPriorities] = useState<{ id: string; title: string }[]>(
    []
  );

  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    loadPriority();
  }, []);

  const loadPriority = async () => {
    const { data } = await getTaskPriority();
    setPriorities(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file, imageUrl: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      image: form.imageUrl || form.image,
      status: "Not Started",
    };

    onSubmit(finalForm);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="addtask-modal">
        {/* HEADER */}
        <div className="addtask-modal__header">
          <h3 className="addtask-modal__title">Add New Task</h3>
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
                required
              />
            </label>

            {/* PRIORITY */}
            <div className="priority-block">
              <label className="form-label">Priority</label>

              <div className="priority-list">
                {priorities.map((p) => (
                  <label key={p.id} className="priority-item">
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

            {/* DESCRIPTION + UPLOAD */}
            <div className="addtask-modal__row">
              <div className="addtask-modal__desc">
                <label className="form-label">Task Description</label>
                <textarea
                  className="form-textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Start writing here..."
                />
              </div>

              <div className="addtask-modal__upload">
                <label className="form-label">Upload Image</label>

                <div className="addtask-modal__upload-box">
                  {!showUrlInput && (
                    <>
                      <input
                        className="upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="upload"
                      />
                      <p>
                        Drag & Drop files here
                        <br />
                        or{" "}
                        <span
                          className="addtask-modal__browse"
                          onClick={() => setShowUrlInput(true)}
                        >
                          Browse
                        </span>
                      </p>
                    </>
                  )}

                  {showUrlInput && (
                    <div className="addtask-modal__url-input">
                      <input
                        className="form-input"
                        type="text"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="Paste image URL here..."
                      />
                      <button
                        type="button"
                        className="addtask-modal__url-back"
                        onClick={() => setShowUrlInput(false)}
                      >
                        Back
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="addtask-modal__actions">
              <button type="submit" className="addtask-modal__btn">
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
