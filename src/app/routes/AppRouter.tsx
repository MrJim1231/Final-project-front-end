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

export const AppRouter = () => {
  return (
    <Routes>
      {/* 🔐 Авторизация */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} /> — добавим позже
      {/* 🏠 Главная панель */}
      <Route path="/" element={<Dashboard />} />
      {/* ✅ Страницы задач */}
      <Route path="/my-task" element={<MyTask />} />
      <Route path="/vital-task" element={<VitalTask />} />
      <Route path="/completed-task" element={<CompletedTask />} />
      {/* 📦 Категории */}
      <Route path="/categories" element={<TaskCategories />} />
      <Route path="/categories/add" element={<AddCategory />} />
      {/* ⚙️ Настройки */}
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/change-password" element={<ChangePassword />} />
      {/* ❓ Помощь */}
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};
