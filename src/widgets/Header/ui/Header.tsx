import "./Header.css";
import { useEffect, useState, useRef } from "react";
import { FiSearch, FiBell, FiCalendar, FiMenu } from "react-icons/fi";
import { useDateContext } from "../../../shared/context/DateContext";

export const Header = ({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) => {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [formattedDate, setFormattedDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const date = new Date(selectedDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    setFormattedDate(date.toLocaleDateString("en-GB", options));
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value); // сохраняем выбранную дату в контекст
    setIsCalendarOpen(false);
  };

  return (
    <header className="dashboard__header">
      <div className="dashboard__header-container">
        <button className="dashboard__burger" onClick={onToggleSidebar}>
          <FiMenu />
        </button>

        <div className="dashboard__header-logo">
          <span className="dashboard__header-logo-highlight">Dash</span>board
        </div>

        <div className="dashboard__header-search">
          <input
            type="text"
            className="dashboard__header-input"
            placeholder="Search your task here..."
          />
          <button className="dashboard__header-button">
            <FiSearch />
          </button>
        </div>

        <div className="dashboard__header-actions" ref={calendarRef}>
          <button className="dashboard__header-button">
            <FiBell />
          </button>

          <button
            className="dashboard__header-button"
            onClick={() => setIsCalendarOpen((prev) => !prev)}
          >
            <FiCalendar />
          </button>

          <div className="dashboard__header-date">
            <span className="dashboard__header-full-date">{formattedDate}</span>
          </div>

          {isCalendarOpen && (
            <div className="dashboard__calendar-popup">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="dashboard__calendar-input"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
