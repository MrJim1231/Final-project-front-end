// src/app/App.tsx
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter";

import { RootState } from "./providers/store";

import "./App.css";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // 🟦 Загружаем auth-состояние
  const { isAuth, isLoaded } = useSelector((state: RootState) => state.user);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // 🔹 Блокируем скролл при открытом меню (но не на auth страницах)
  useEffect(() => {
    if (isAuthPage) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen, isAuthPage]);

  // ============================================
  // 1) Показываем лоадер ПОКА НЕ ЗАГРУЖЕН REDUX
  // ============================================
  if (!isLoaded) {
    return <div className="app__loader">Loading...</div>;
  }

  // ============================================
  // 2) Если НЕ авторизован → на /login
  // ============================================
  if (!isAuth && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // ============================================
  // 3) Если авторизационные страницы — без layout
  // ============================================
  if (isAuthPage) {
    return <AppRouter />;
  }

  // ============================================
  // 4) Основной layout (авторизован)
  // ============================================
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div className="dashboard__overlay show" onClick={closeSidebar}></div>
      )}

      <div className="dashboard__layout">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="dashboard__content">
          <AppRouter />
        </main>
      </div>
    </>
  );
};
