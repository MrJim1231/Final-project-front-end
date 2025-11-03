import "./Sidebar.css";
import avatar from "../../../shared/assets/images/avatar.png";
import {
  FiGrid,
  FiZap,
  FiFileText,
  FiList,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom"; // 👈 добавляем роутинг

export const Sidebar = () => {
  return (
    <aside className="dashboard__sidebar">
      {/* === Верхняя часть === */}
      <div className="dashboard__sidebar-top">
        <div className="dashboard__sidebar-profile">
          <img
            src={avatar}
            alt="User Avatar"
            className="dashboard__sidebar-avatar"
          />
          <div className="dashboard__sidebar-user">
            <div className="dashboard__sidebar-name">Sundar Gurung</div>
            <div className="dashboard__sidebar-email">
              sundargurung360@gmail.com
            </div>
          </div>
        </div>

        {/* === Навигация === */}
        <nav className="dashboard__sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiGrid className="dashboard__sidebar-icon" /> Dashboard
          </NavLink>

          <NavLink
            to="/vital-task"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiZap className="dashboard__sidebar-icon" /> Vital Task
          </NavLink>

          <NavLink
            to="/my-task"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiFileText className="dashboard__sidebar-icon" /> My Task
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiList className="dashboard__sidebar-icon" /> Task Categories
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiSettings className="dashboard__sidebar-icon" /> Settings
          </NavLink>

          <NavLink
            to="/help"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiHelpCircle className="dashboard__sidebar-icon" /> Help
          </NavLink>
        </nav>
      </div>

      {/* === Кнопка выхода === */}
      <button className="dashboard__sidebar-logout">
        <FiLogOut className="dashboard__sidebar-icon" /> Logout
      </button>
    </aside>
  );
};
