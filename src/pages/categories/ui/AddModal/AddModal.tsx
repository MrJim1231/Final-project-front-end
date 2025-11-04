import React from "react";
import "./AddModal.css";

interface AddModalProps {
  title: string;
  subtitle?: string;
  inputLabel?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
  confirmText?: string;
  cancelText?: string;
}

export const AddModal: React.FC<AddModalProps> = ({
  title,
  subtitle,
  inputLabel,
  onClose,
  onSubmit,
  confirmText = "Create",
  cancelText = "Cancel",
}) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>{" "}
          {/* ✅ динамический заголовок */}
          <button className="modal__close" onClick={onClose}>
            Go Back
          </button>
        </div>

        <div className="modal__content">
          {/* ✅ вывод подзаголовка, если есть */}
          {subtitle && <p className="modal__subtitle">{subtitle}</p>}

          <form onSubmit={handleSubmit} className="modal__form">
            {inputLabel && <label className="modal__label">{inputLabel}</label>}
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="modal__input"
              required
            />
            <div className="modal__actions">
              <button type="submit" className="modal__btn modal__btn--confirm">
                {confirmText}
              </button>
              <button
                type="button"
                className="modal__btn modal__btn--cancel"
                onClick={onClose}
              >
                {cancelText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
