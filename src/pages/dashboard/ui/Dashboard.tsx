import "./Dashboard.css";
import { FiUserPlus } from "react-icons/fi"; // 👈 импорт иконки

import u1 from "../../../shared/assets/avatars/u1.png";
import u2 from "../../../shared/assets/avatars/u2.png";
import u3 from "../../../shared/assets/avatars/u3.png";
import u4 from "../../../shared/assets/avatars/u4.png";
import u5 from "../../../shared/assets/avatars/u5.png";

const users = [u1, u2, u3, u4, u5];

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h2 className="dashboard-page__title">
          Welcome back, <span>Sundar</span> 👋
        </h2>

        <div className="dashboard-page__team">
          <div className="dashboard-page__avatars">
            {users.slice(0, 5).map((src, i) => (
              <img
                key={i}
                src={src}
                alt="user"
                className="dashboard-page__avatar"
              />
            ))}
            {/* <div className="dashboard-page__more">+4</div> */}
          </div>

          <button className="dashboard-page__invite">
            <FiUserPlus className="dashboard-page__invite-icon" />
            Invite
          </button>
        </div>
      </div>

      {/* Здесь можно добавить другие блоки: статистику, задачи и т.п. */}
    </div>
  );
};
