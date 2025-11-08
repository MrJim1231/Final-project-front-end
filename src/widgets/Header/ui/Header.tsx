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

  // ✅ Устанавливаем текущую дату по Киеву при загрузке
  useEffect(() => {
    const kyivNow = new Date().toLocaleString("en-CA", {
      timeZone: "Europe/Kyiv",
    });
    const dateOnly = kyivNow.split(",")[0]; // YYYY-MM-DD
    setSelectedDate(dateOnly);
  }, [setSelectedDate]);

  // ✅ Форматирование даты (DD.MM.YYYY, weekday)
  useEffect(() => {
    const date = new Date(selectedDate);
    const weekday = date.toLocaleDateString("en-GB", {
      weekday: "long",
      timeZone: "Europe/Kyiv",
    });
    const formatted = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Kyiv",
    });
    setFormattedDate(`${formatted}, ${weekday}`);
  }, [selectedDate]);

  // ✅ Закрытие календаря при клике вне
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

  // ✅ Изменение даты через календарь
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setIsCalendarOpen(false);
  };

  return (
    <header className="dashboard__header">
      <div className="dashboard__header-container">
        {/* === Бургер === */}
        <button className="dashboard__burger" onClick={onToggleSidebar}>
          <FiMenu />
        </button>

        {/* === Лого === */}
        <div className="dashboard__header-logo">
          <span className="dashboard__header-logo-highlight">Dash</span>board
        </div>

        {/* === Поиск === */}
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

        {/* === Блок действий справа === */}
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

          {/* === Отображение даты === */}
          <div className="dashboard__header-date">
            <span className="dashboard__header-full-date">{formattedDate}</span>
          </div>

          {/* === Календарь === */}
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
