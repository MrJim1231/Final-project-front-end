import "./ChangePassword.css";
import userAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUsers } from "@/shared/api/apiUsers";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const USER_ID = "1";

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [realPassword, setRealPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // === Load user from MockAPI ===
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await apiUsers.get(`/users/${USER_ID}`);
      setRealPassword(data.password || "");
    };

    loadUser();
  }, []);

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

    // === Check old password ===
    if (current !== realPassword) {
      setError("Поточний пароль невірний.");
      return;
    }

    try {
      setLoading(true);

      // === Update password ===
      await apiUsers.put(`/users/${USER_ID}`, {
        password: newPass,
      });

      setSuccess("Пароль успішно оновлено!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
      setRealPassword(newPass);
    } catch (err: any) {
      setError("Помилка сервера. Спробуйте пізніше.");
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
              placeholder="Подскаска сейчас пароль 1234567"
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
