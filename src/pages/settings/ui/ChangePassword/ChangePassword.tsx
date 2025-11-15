import "./ChangePassword.css";
import userAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../../../shared/api/base";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // === Validation ===
    if (!current || !newPass || !confirm) {
      setError("Будь ласка, заповніть всі поля.");
      return;
    }

    if (newPass.length < 6) {
      setError("Новий пароль має містити мінімум 6 символів.");
      return;
    }

    if (newPass !== confirm) {
      setError("Паролі не співпадають.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/user/change-password", {
        oldPassword: current,
        newPassword: newPass,
      });

      setSuccess(res.data.message || "Пароль успішно змінено!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Помилка сервера. Перевірте дані та спробуйте знову."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="settings">
      <div className="settings__header">
        <h3 className="settings__title">Change Password</h3>
        <button className="settings__back" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="settings__content">
        <div className="settings__user">
          <img src={userAvatar} alt="User" className="settings__avatar" />
          <div className="settings__user-info">
            <h4 className="settings__user-name">User</h4>
          </div>
        </div>

        <form className="settings__form" onSubmit={handleSubmit}>
          {error && <p className="settings__error">{error}</p>}
          {success && <p className="settings__success">{success}</p>}

          <label className="settings__label">
            Current Password
            <input
              type="password"
              className="settings__input"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </label>

          <label className="settings__label">
            New Password
            <input
              type="password"
              className="settings__input"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </label>

          <label className="settings__label">
            Confirm Password
            <input
              type="password"
              className="settings__input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

          <div className="settings__actions">
            <button
              type="submit"
              disabled={loading}
              className="settings__btn settings__btn--update"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            <button
              type="button"
              className="settings__btn settings__btn--cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
