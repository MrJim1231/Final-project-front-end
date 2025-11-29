import "./Header.css";
import { useEffect, useState, useRef } from "react";
import { FiSearch, FiBell, FiCalendar, FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDate,
  setSearchQuery,
} from "../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../app/store";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDate = useSelector(
    (state: RootState) => state.tasks.selectedDate
  );

  const [formattedDate, setFormattedDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // ✅ При загрузке страницы устанавливаем дату по Киеву
  useEffect(() => {
    const kyivNow = new Date().toLocaleString("en-CA", {
      timeZone: "Europe/Kyiv",
    });
    const dateOnly = kyivNow.split(",")[0]; // YYYY-MM-DD
    dispatch(setSelectedDate(dateOnly));
  }, [dispatch]);

  // ✅ Форматирование даты (DD.MM.YYYY, weekday)
  useEffect(() => {
    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) return;

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

  // ✅ Обновление даты через календарь
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(e.target.value));
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
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <button className="dashboard__header-button">
            <FiSearch />
          </button>
        </div>

        {/* === Правая часть (уведомления, календарь, дата) === */}
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

          {/* === Отображение текущей даты === */}
          <div className="dashboard__header-date">
            <span className="dashboard__header-full-date">{formattedDate}</span>
          </div>

          {/* === Выпадающий календарь === */}
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
