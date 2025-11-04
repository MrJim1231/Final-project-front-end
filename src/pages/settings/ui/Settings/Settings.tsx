import "./Settings.css";
import userAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom"; // 👈 импортируем навигацию

export const Settings = () => {
  const navigate = useNavigate(); // 👈 создаём навигатор

  return (
    <section className="settings">
      <div className="settings__header">
        <h3 className="settings__title">Account Information</h3>
        {/* 🔙 Кнопка "Go Back" возвращает на предыдущую страницу */}
        <button className="settings__back" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="settings__content">
        {/* === User info === */}
        <div className="settings__user">
          <img src={userAvatar} alt="User" className="settings__avatar" />
          <div className="settings__user-info">
            <h4 className="settings__user-name">Sundar Gurung</h4>
            <p className="settings__user-email">sundargurung360@gmail.com</p>
          </div>
        </div>

        {/* === Form === */}
        <form className="settings__form">
          <label className="settings__label">
            First Name
            <input type="text" className="settings__input" />
          </label>

          <label className="settings__label">
            Last Name
            <input type="text" className="settings__input" />
          </label>

          <label className="settings__label">
            Email Address
            <input type="email" className="settings__input" />
          </label>

          <label className="settings__label">
            Contact Number
            <input type="tel" className="settings__input" />
          </label>

          <label className="settings__label">
            Position
            <input type="text" className="settings__input" />
          </label>

          <div className="settings__actions">
            <button
              type="submit"
              className="settings__btn settings__btn--update"
            >
              Update Info
            </button>

            {/* 🔐 Кнопка перехода на страницу смены пароля */}
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
