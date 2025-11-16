// src/app/App.tsx
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter";

import { RootState } from "./providers/store";
import { setLoaded } from "@/entities/user/model/userSlice";

import "./App.css";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  // Данные пользователя
  const { isAuth, isLoaded } = useSelector((state: RootState) => state.user);

  // Проверяем auth только один раз (после загрузки localStorage)
  useEffect(() => {
    dispatch(setLoaded(true)); // данные загружены
  }, []);

  // Пока загружается — ничего не показываем (убирает мигание)
  if (!isLoaded) {
    return <div className="app__loader">Loading...</div>;
  }

  // Если НЕ авторизован и не на /login или /register → отправляем на логин
  const isAuthPage =
    location.pathname === "/register" || location.pathname === "/login";

  if (!isAuth && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // Если auth pages — скрываем header & sidebar
  if (isAuthPage) {
    return <AppRouter />;
  }

  // === Основной layout ===
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    document.body.style.overflow =
      sidebarOpen && !isAuthPage ? "hidden" : "auto";
  }, [sidebarOpen, isAuthPage]);

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
