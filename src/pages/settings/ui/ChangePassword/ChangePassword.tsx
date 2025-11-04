import "./ChangePassword.css";
import userAvatar from "../../../../shared/assets/images/avatar.png";
import { useNavigate } from "react-router-dom"; // 👈 импортируем хук навигации

export const ChangePassword = () => {
  const navigate = useNavigate(); // 👈 создаём экземпляр навигации

  return (
    <section className="settings">
      <div className="settings__header">
        <h3 className="settings__title">Change Password</h3>
        {/* 🔙 Кнопка возврата */}
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

        {/* === Password form === */}
        <form className="settings__form">
          <label className="settings__label">
            Current Password
            <input type="password" className="settings__input" />
          </label>

          <label className="settings__label">
            New Password
            <input type="password" className="settings__input" />
          </label>

          <label className="settings__label">
            Confirm Password
            <input type="password" className="settings__input" />
          </label>

          <div className="settings__actions">
            <button
              type="submit"
              className="settings__btn settings__btn--update"
            >
              Update Password
            </button>

            {/* ❌ Кнопка Cancel возвращает назад */}
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
