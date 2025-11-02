import "./Sidebar.css";
import avatar from "../../../assets/avatar.png";

import {
  FiGrid,
  FiZap,
  FiFileText,
  FiList,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

export const Sidebar = () => {
  return (
    <aside className="dashboard__sidebar">
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

      <nav className="dashboard__sidebar-nav">
        <button className="dashboard__sidebar-link active">
          <FiGrid className="dashboard__sidebar-icon" /> Dashboard
        </button>
        <button className="dashboard__sidebar-link">
          <FiZap className="dashboard__sidebar-icon" /> Vital Task
        </button>
        <button className="dashboard__sidebar-link">
          <FiFileText className="dashboard__sidebar-icon" /> My Task
        </button>
        <button className="dashboard__sidebar-link">
          <FiList className="dashboard__sidebar-icon" /> Task Categories
        </button>
        <button className="dashboard__sidebar-link">
          <FiSettings className="dashboard__sidebar-icon" /> Settings
        </button>
        <button className="dashboard__sidebar-link">
          <FiHelpCircle className="dashboard__sidebar-icon" /> Help
        </button>
      </nav>

      <button className="dashboard__sidebar-logout">
        <FiLogOut className="dashboard__sidebar-icon" /> Logout
      </button>
    </aside>
  );
};
