import { Routes, Route } from "react-router-dom";

// 📄 Импорт страниц
import { Dashboard } from "../../pages/dashboard/ui/Dashboard/Dashboard";
import { TaskCategories } from "../../pages/categories/ui/TaskCategories/TaskCategories";
import { AddCategory } from "../../pages/categories/ui/AddCategory/AddCategory";
import { Settings } from "../../pages/settings/ui/Settings/Settings";
import { ChangePassword } from "../../pages/settings/ui/ChangePassword/ChangePassword";
import { Help } from "../../pages/help/ui/Help";

// 🆕 Импорт универсальной страницы
import { TaskPage } from "../../pages/task-page/ui/TaskPage/TaskPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      {/* 🧩 Универсальная страница для всех типов задач */}
      <Route path="/my-task" element={<TaskPage type="my" />} />
      <Route path="/vital-task" element={<TaskPage type="vital" />} />
      <Route path="/completed-task" element={<TaskPage type="completed" />} />

      {/* Остальные страницы */}
      <Route path="/categories" element={<TaskCategories />} />
      <Route path="/categories/add" element={<AddCategory />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/change-password" element={<ChangePassword />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};
