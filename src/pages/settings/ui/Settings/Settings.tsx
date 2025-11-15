import "./Settings.css";
import userAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUsers } from "@/shared/api/apiUsers";

export const Settings = () => {
  const navigate = useNavigate();

  const USER_ID = "1"; // ⭐ обязательный ID MockAPI

  // === FORM STATE ===
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [position, setPosition] = useState("");

  // === FEEDBACK ===
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // === LOADING USER INFO AT START ===
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiUsers.get(`/users/${USER_ID}`);

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setContact(data.contact || "");
        setPosition(data.position || "");
      } catch (err) {
        console.error("Load user error:", err);
      }
    };

    fetchUser();
  }, []);

  // === VALIDATION ===
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Імʼя та прізвище є обов’язковими.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Введіть коректний email.");
      return;
    }

    try {
      setLoading(true);

      // ⭐ UPDATE (PUT)
      await apiUsers.put(`/users/${USER_ID}`, {
        firstName,
        lastName,
        email,
        contact,
        position,
      });

      setSuccess("Налаштування успішно оновлено!");
    } catch (err: any) {
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
        <h3 className="settings__title">Account Information</h3>
        <button className="settings__back" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="settings__content">
        {/* === USER INFO BLOCK === */}
        <div className="settings__user">
          <img src={userAvatar} alt="User" className="settings__avatar" />

          <div className="settings__user-info">
            <h4 className="settings__user-name">
              {firstName || "User"} {lastName}
            </h4>
            <p className="settings__user-email">
              {email || "example@gmail.com"}
            </p>
          </div>
        </div>

        {/* === FORM === */}
        <form className="settings__form" onSubmit={handleSubmit}>
          {error && <p className="settings__error">{error}</p>}
          {success && <p className="settings__success">{success}</p>}

          <label className="settings__label">
            First Name
            <input
              type="text"
              className="settings__input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="settings__label">
            Last Name
            <input
              type="text"
              className="settings__input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="settings__label">
            Email Address
            <input
              type="email"
              className="settings__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="settings__label">
            Contact Number
            <input
              type="tel"
              className="settings__input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>

          <label className="settings__label">
            Position
            <input
              type="text"
              className="settings__input"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </label>

          <div className="settings__actions">
            <button
              type="submit"
              disabled={loading}
              className="settings__btn settings__btn--update"
            >
              {loading ? "Saving..." : "Update Info"}
            </button>

            <button
              type="button"
              className="settings__btn settings__btn--password"
              onClick={() => navigate("/settings/change-password")}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
