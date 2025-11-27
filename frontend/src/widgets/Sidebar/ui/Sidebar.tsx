import "./Sidebar.css";
import defaultAvatar from "../../../shared/assets/images/avatar.png";

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

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  // Закрытие при навигации на мобилках
  useEffect(() => {
    if (isOpen && window.innerWidth <= 992) {
      onClose();
    }
  }, [location.pathname]);

  // === Выбираем аватар ===
  const avatarSrc = user.avatar ? user.avatar : defaultAvatar;

  return (
    <aside className={`dashboard__sidebar ${isOpen ? "open" : ""}`}>
      <div className="dashboard__sidebar-top">
        <div className="dashboard__sidebar-profile">
          {/* === AVATAR === */}
          <img
            src={avatarSrc}
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

        {/* === NAVIGATION === */}
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

      {/* === LOGOUT === */}
      <button className="dashboard__sidebar-logout" onClick={handleLogout}>
        <FiLogOut className="dashboard__sidebar-icon" /> Logout
      </button>
    </aside>
  );
};
