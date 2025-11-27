import React, { useState, useEffect } from "react";
import "./AddTaskModal.css";

import { getTaskPriority } from "@/shared/api/priorityApi";

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
}

const priorityColors: Record<string, string> = {
  High: "#ff3b30",
  Medium: "#0a84ff",
  Low: "#34c759",
};

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    title: "",
    priority: "",
    description: "",
    image: "",
  });

  const [priorities, setPriorities] = useState<
    { _id: string; title: string }[]
  >([]);

  useEffect(() => {
    loadPriority();
  }, []);

  const loadPriority = async () => {
    const res = await getTaskPriority();
    setPriorities(res);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: "Not Started",
      image: form.image,
      vital: false,
    });

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

        <div className="addtask-modal__content">
          <form className="addtask-modal__form" onSubmit={handleSubmit}>
            <label className="form-label">
              Title
              <input
                className="form-input"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>

            <div className="priority-block">
              <label className="form-label">Priority</label>

              <div className="priority-list">
                {priorities.map((p) => (
                  <label key={p._id} className="priority-item">
                    <div
                      className="priority-dot"
                      style={{ backgroundColor: priorityColors[p.title] }}
                    ></div>

                    <span className="priority-text">{p.title}</span>

                    <input
                      type="radio"
                      name="priority"
                      value={p.title}
                      checked={form.priority === p.title}
                      onChange={(e) =>
                        setForm({ ...form, priority: e.target.value })
                      }
                    />
                  </label>
                ))}
              </div>
            </div>

            <label className="form-label">
              Description
              <textarea
                className="form-textarea"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </label>

            <label className="form-label">
              Image URL
              <input
                className="form-input"
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </label>

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
