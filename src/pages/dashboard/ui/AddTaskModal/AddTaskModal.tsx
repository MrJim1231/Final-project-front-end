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
    imageUrl: "", // 🔹 новое поле для ссылки
  });

  const [showUrlInput, setShowUrlInput] = useState(false); // 🔹 управляем появлением поля URL

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file, imageUrl: "" }); // сбрасываем URL если выбрали файл
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 если указана ссылка — используем её как изображение
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

        {/* === Content wrapper === */}
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

            {/* === Priority === */}
            <div className="addtask-modal__priority">
              <span>Priority</span>

              <label className="priority-item">
                <input
                  type="radio"
                  name="priority"
                  value="Extreme"
                  checked={form.priority === "Extreme"}
                  onChange={handleChange}
                />
                <span className="custom-box red"></span>
                Extreme
              </label>

              <label className="priority-item">
                <input
                  type="radio"
                  name="priority"
                  value="Moderate"
                  checked={form.priority === "Moderate"}
                  onChange={handleChange}
                />
                <span className="custom-box blue"></span>
                Moderate
              </label>

              <label className="priority-item">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={form.priority === "Low"}
                  onChange={handleChange}
                />
                <span className="custom-box green"></span>
                Low
              </label>
            </div>

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
                  {/* === Поле для выбора файла === */}
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
                        <br /> or{" "}
                        <span
                          className="addtask-modal__browse"
                          onClick={() => setShowUrlInput(true)}
                        >
                          Browse
                        </span>
                      </p>
                    </>
                  )}

                  {/* === Поле для вставки ссылки === */}
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
