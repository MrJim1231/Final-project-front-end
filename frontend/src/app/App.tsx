// src/app/App.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter";

import "./App.css";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // 🔐 какие маршруты считаем "авторизационными"
  const isAuthPage =
    location.pathname === "/register" || location.pathname === "/login";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // 🔹 Блокируем прокрутку при открытом меню (только НЕ на auth-страницах)
  useEffect(() => {
    if (isAuthPage) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen, isAuthPage]);

  // 🔐 Для /register и /login — НИКАКОГО Header/Sidebar, только сами страницы
  if (isAuthPage) {
    return <AppRouter />;
  }

  // 🌐 Все остальные страницы — старый рабочий layout
  return (
    <>
      {/* === Хедер === */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* 🔹 Затемнение фона при открытом меню */}
      {sidebarOpen && (
        <div className="dashboard__overlay show" onClick={closeSidebar}></div>
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
