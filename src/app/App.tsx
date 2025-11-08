// src/app/App.tsx
import { useState, useEffect } from "react";
import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter";

import "./App.css";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // 🔹 Блокируем прокрутку при открытом меню
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <>
      {/* === Хедер === */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* 🔹 Затемнение фона при открытом меню */}
      {sidebarOpen && (
        <div
          className="dashboard__overlay show"
          onClick={closeSidebar} // 👈 закрываем меню при клике на фон
        ></div>
      )}

      {/* === Основная сетка === */}
      <div className="dashboard__layout">
        {/* 👇 Передаём onClose в Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="dashboard__content">
          {/* 🔹 Здесь динамически подгружается текущая страница */}
          <AppRouter />
        </main>
      </div>
    </>
  );
};
