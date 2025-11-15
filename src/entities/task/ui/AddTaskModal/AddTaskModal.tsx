import React, { useState, useEffect } from "react";
import "./AddTaskModal.css";

import { getTaskPriority } from "@/shared/api/priorityApi";
import { getTaskStatus } from "@/shared/api/statusApi";

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
    status: "",
    description: "",
    image: null as File | null,
    imageUrl: "",
  });

  const [priorities, setPriorities] = useState<{ id: string; title: string }[]>(
    []
  );
  const [statuses, setStatuses] = useState<{ id: string; title: string }[]>([]);

  const [showUrlInput, setShowUrlInput] = useState(false);

  // === Загружаем списки ===
  useEffect(() => {
    loadPriority();
    loadStatus();
  }, []);

  const loadPriority = async () => {
    const { data } = await getTaskPriority();
    setPriorities(data);
  };

  const loadStatus = async () => {
    const data = await getTaskStatus();
    setStatuses(data);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    };

    onSubmit(finalForm);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="addtask-modal">
        {/* === Header === */}
        <div className="addtask-modal__header">
          <h3 className="addtask-modal__title">Add New Task</h3>
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
                required
              />
            </label>

            {/* === Priority SELECT === */}
            <label>
              Priority
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select priority…</option>
                {priorities.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>

            {/* === Status SELECT === */}
            <label>
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="">Select status…</option>
                {statuses.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            {/* === Description & Upload === */}
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
                  {!showUrlInput && (
                    <>
                      <input
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
