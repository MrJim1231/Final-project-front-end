// pages/settings/ui/Settings/Settings.tsx
import "./Settings.css";
import defaultAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/providers/store";
import { updateUser } from "@/entities/user/model/userSlice";
import { UserAPI } from "@/shared/api/apiUser";

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

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

  // === LOAD USER INFO ON START ===
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      setLoading(true);
      UserAPI.setToken(token);

      try {
        const { data } = await UserAPI.getProfile();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setContact(data.contact || "");
        setPosition(data.position || "");
      } catch (err) {
        console.error("Load profile error:", err);
        setError("Не вдалося завантажити дані профілю");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

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

    if (!token) {
      setError("Ви не авторизовані.");
      return;
    }

    UserAPI.setToken(token);

    try {
      setLoading(true);
      const { data } = await UserAPI.updateProfile({
        firstName,
        lastName,
        email,
        contact,
        position,
      });

      dispatch(
        updateUser({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          contact: data.user.contact,
          position: data.user.position,
        })
      );

      setSuccess("Налаштування успішно оновлено!");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Помилка сервера. Спробуйте пізніше."
      );
    } finally {
      setLoading(false);
    }
  };

  // === AVATAR ===
  const avatarSrc = user.avatar ? user.avatar : defaultAvatar;

  // === Google account detection ===
  const isGoogleUser = Boolean((user as any).googleId);

  return (
    <section className="settings">
      <div className="settings__header">
        <h3 className="settings__title">Account Information</h3>
        <button className="settings__back" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="settings__content">
        {/* USER INFO */}
        <div className="settings__user">
          <img src={avatarSrc} alt="User" className="settings__avatar" />

          <div className="settings__user-info">
            <h4 className="settings__user-name">
              {firstName || user.firstName || "User"}{" "}
              {lastName || user.lastName}
            </h4>
            <p className="settings__user-email">{email || user.email}</p>
          </div>
        </div>

        {/* FORM */}
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

            {/* DISABLED FOR GOOGLE USERS */}
            <button
              type="button"
              className={`settings__btn settings__btn--password ${
                isGoogleUser ? "settings__btn--disabled" : ""
              }`}
              disabled={isGoogleUser}
              onClick={() =>
                !isGoogleUser && navigate("/settings/change-password")
              }
              title={
                isGoogleUser ? "Google accounts cannot change password." : ""
              }
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
