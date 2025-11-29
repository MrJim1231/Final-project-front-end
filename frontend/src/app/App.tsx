// src/app/App.tsx
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter";

import { RootState } from "./store";
import { setAuthToken } from "@/shared/api/api";
import { setLoaded } from "@/entities/user/model/userSlice";

import "./App.css";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuth, isLoaded, token } = useSelector(
    (state: RootState) => state.user
  );

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // ===================================================
  // 🔥 1) При загрузке приложения — активируем axios токен
  // ===================================================
  useEffect(() => {
    if (token) {
      setAuthToken(token); // ставим токен глобально в axios
    }

    // когда восстановление завершилось — говорим что готово
    dispatch(setLoaded(true));
  }, [token, dispatch]);

  // ===================================================
  // 🔹 Блокируем скролл при открытом sidebar
  // ===================================================
  useEffect(() => {
    if (isAuthPage) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen, isAuthPage]);

  // ===================================================
  // 2) Пока Redux не готов — показываем загрузку
  // ===================================================
  if (!isLoaded) {
    return <div className="app__loader">Loading...</div>;
  }

  // ===================================================
  // 3) Если НЕ авторизован — отправляем на /login
  // ===================================================
  if (!isAuth && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // ===================================================
  // 4) На login/register без layout
  // ===================================================
  if (isAuthPage) {
    return <AppRouter />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // ===================================================
  // 5) Основной layout (авторизованный)
  // ===================================================
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
