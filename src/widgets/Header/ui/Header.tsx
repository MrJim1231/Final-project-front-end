import "./Header.css";
import { FiSearch, FiBell, FiCalendar } from "react-icons/fi";

export const Header = () => {
  return (
    <header className="dashboard__header">
      <div className="dashboard__header-logo">
        <span className="dashboard__header-logo-highlight">Dash</span>board
      </div>

      <div className="dashboard__header-search">
        <input
          type="text"
          className="dashboard__header-input"
          placeholder="Search your task here..."
        />
        <button className="dashboard__header-button dashboard__header-button-search">
          <FiSearch />
        </button>
      </div>

      <div className="dashboard__header-actions">
        <button className="dashboard__header-button dashboard__header-button-bell">
          <FiBell />
        </button>
        <button className="dashboard__header-button dashboard__header-button-calendar">
          <FiCalendar />
        </button>
        <div className="dashboard__header-date">
          <span className="dashboard__header-day">Tuesday</span>
          <span className="dashboard__header-full-date">20/06/2023</span>
        </div>
      </div>
    </header>
  );
};
