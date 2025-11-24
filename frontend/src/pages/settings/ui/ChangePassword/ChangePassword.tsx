import "./ChangePassword.css";
import userAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/providers/store";

// API
import { UserAPI } from "@/shared/api/apiUser";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.user.token);

  // === Form state ===
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  // === Feedback state ===
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

    if (!token) {
      setError("Ви не авторизовані.");
      return;
    }

    try {
      setLoading(true);

      // === API call ===
      await UserAPI.changePassword({
        oldPassword: current,
        newPassword: newPass,
        token,
      });

      setSuccess("Пароль успішно оновлено!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err: any) {
      console.error("Change password error:", err);
      setError(
        err.response?.data?.message || "Помилка сервера. Спробуйте пізніше."
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
          {/* Hidden input to prevent browser autocomplete issues */}
          <input
            type="text"
            autoComplete="username"
            style={{ display: "none" }}
          />

          {error && <p className="settings__error">{error}</p>}
          {success && <p className="settings__success">{success}</p>}

          <label className="settings__label">
            Current Password
            <input
              type="password"
              className="settings__input"
              value={current}
              autoComplete="current-password"
              onChange={(e) => setCurrent(e.target.value)}
            />
          </label>

          <label className="settings__label">
            New Password
            <input
              type="password"
              className="settings__input"
              value={newPass}
              autoComplete="new-password"
              onChange={(e) => setNewPass(e.target.value)}
            />
          </label>

          <label className="settings__label">
            Confirm Password
            <input
              type="password"
              className="settings__input"
              value={confirm}
              autoComplete="new-password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

          <div className="settings__actions">
            <button
              type="submit"
              className="settings__btn settings__btn--update"
              disabled={loading}
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
