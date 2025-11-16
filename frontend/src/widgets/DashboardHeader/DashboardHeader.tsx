import "./DashboardHeader.css";
import { FiUserPlus } from "react-icons/fi";
import u1 from "../../shared/assets/images/avatars/u1.png";
import u2 from "../../shared/assets/images/avatars/u2.png";
import u3 from "../../shared/assets/images/avatars/u3.png";
import u4 from "../../shared/assets/images/avatars/u4.png";
import u5 from "../../shared/assets/images/avatars/u5.png";

const users = [u1, u2, u3, u4, u5];

export const DashboardHeader = () => (
  <div className="dashboard-header">
    <h2 className="dashboard-header__title">
      Welcome back, <span>Sundar</span> 👋
    </h2>

    <div className="dashboard-header__team">
      <div className="dashboard-header__avatars">
        {users.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="user"
            className="dashboard-header__avatar"
          />
        ))}
      </div>

      <button className="dashboard-header__invite">
        <FiUserPlus className="dashboard-header__invite-icon" />
        Invite
      </button>
    </div>
  </div>
);
