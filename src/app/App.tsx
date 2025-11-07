import { useState, useEffect } from "react";
import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter";

import "./App.css";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // 🔹 Блокируем прокрутку при открытом меню
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />

      {/* 🔹 Затемнение фона при открытом меню */}
      {sidebarOpen && (
        <div
          className="dashboard__overlay show"
          onClick={toggleSidebar} // закрывает меню при клике на фон
        ></div>
      )}

      <div className="dashboard__layout">
        <Sidebar isOpen={sidebarOpen} />
        <main className="dashboard__content">
          {/* 🔹 Здесь динамически подгружается текущая страница */}
          <AppRouter />
        </main>
      </div>
    </>
  );
};
