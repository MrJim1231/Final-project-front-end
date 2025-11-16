// src/app/routes/AppRouter.tsx
import { Routes, Route } from "react-router-dom";

// 📄 Основные страницы
import { Dashboard } from "../../pages/dashboard/ui/Dashboard/Dashboard";
import { TaskCategories } from "../../pages/categories/ui/TaskCategories/TaskCategories";
import { AddCategory } from "../../pages/categories/ui/AddCategory/AddCategory";
import { Settings } from "../../pages/settings/ui/Settings/Settings";
import { ChangePassword } from "../../pages/settings/ui/ChangePassword/ChangePassword";
import { Help } from "../../pages/help/ui/Help";

// 🧩 Страницы задач
import { MyTask } from "../../pages/my-task";
import { VitalTask } from "../../pages/vital-task";
import { CompletedTask } from "../../pages/completed-task";

// 🔐 Auth pages
import { RegisterPage } from "../../pages/auth/ui/RegisterPage";
import { LoginPage } from "@/pages/auth/ui/LoginPage";

// 🛡 Guards
import { PrivateRoute } from "./PrivateRoute";
import { AuthRedirectRoute } from "./AuthRedirectRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {/* 🔐 Auth pages (только если НЕ авторизован) */}
      <Route
        path="/register"
        element={
          <AuthRedirectRoute>
            <RegisterPage />
          </AuthRedirectRoute>
        }
      />

      <Route
        path="/login"
        element={
          <AuthRedirectRoute>
            <LoginPage />
          </AuthRedirectRoute>
        }
      />

      {/* 🏠 Главная (только авторизованным) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* 📌 Задачи */}
      <Route
        path="/my-task"
        element={
          <PrivateRoute>
            <MyTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/vital-task"
        element={
          <PrivateRoute>
            <VitalTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/completed-task"
        element={
          <PrivateRoute>
            <CompletedTask />
          </PrivateRoute>
        }
      />

      {/* 📦 Категории */}
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <TaskCategories />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories/add"
        element={
          <PrivateRoute>
            <AddCategory />
          </PrivateRoute>
        }
      />

      {/* ⚙ Настройки */}
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />

      {/* ❓ Помощь */}
      <Route
        path="/help"
        element={
          <PrivateRoute>
            <Help />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
