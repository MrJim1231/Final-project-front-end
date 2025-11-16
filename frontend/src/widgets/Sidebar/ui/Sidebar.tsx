import "./Sidebar.css";
import avatar from "../../../shared/assets/images/avatar.png";
import {
  FiGrid,
  FiZap,
  FiFileText,
  FiCheckCircle,
  FiList,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/entities/user/model/userSlice";
import { RootState } from "@/app/providers/store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  // 🔥 Logout Handler
  const handleLogout = () => {
    // удаляем токен
    localStorage.removeItem("token");
    // чистим Redux
    dispatch(logout());
    // редирект на login
    navigate("/login");
  };

  // Автозакрытие sidebar на мобилках
  useEffect(() => {
    if (isOpen && window.innerWidth <= 992) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <aside className={`dashboard__sidebar ${isOpen ? "open" : ""}`}>
      {/* === Верхняя часть === */}
      <div className="dashboard__sidebar-top">
        <div className="dashboard__sidebar-profile">
          <img
            src={avatar}
            alt="User Avatar"
            className="dashboard__sidebar-avatar"
          />
          <div className="dashboard__sidebar-user">
            <div className="dashboard__sidebar-name">
              {user.firstName} {user.lastName}
            </div>
            <div className="dashboard__sidebar-email">{user.email}</div>
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
            to="/completed-task"
            className={({ isActive }) =>
              `dashboard__sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FiCheckCircle className="dashboard__sidebar-icon" /> Completed
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
      <button className="dashboard__sidebar-logout" onClick={handleLogout}>
        <FiLogOut className="dashboard__sidebar-icon" /> Logout
      </button>
    </aside>
  );
};
