import { Routes, Route } from "react-router-dom";

// ✅ Импорт страниц
import { Dashboard } from "../../pages/dashboard/ui/Dashboard/Dashboard";
import { VitalTask } from "../../pages/vital-task/ui/VitalTask/VitalTask";
import { MyTask } from "../../pages/my-task/ui/MyTask/MyTask";
import { TaskCategories } from "../../pages/categories/ui/TaskCategories/TaskCategories";
import { AddCategory } from "../../pages/categories/ui/AddCategory/AddCategory";
import { Settings } from "../../pages/settings/ui/Settings/Settings";
import { ChangePassword } from "../../pages/settings/ui/ChangePassword/ChangePassword"; // 🆕 импорт новой страницы
import { Help } from "../../pages/help/ui/Help";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vital-task" element={<VitalTask />} />
      <Route path="/my-task" element={<MyTask />} />
      <Route path="/categories" element={<TaskCategories />} />
      <Route path="/categories/add" element={<AddCategory />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/settings/change-password"
        element={<ChangePassword />}
      />{" "}
      {/* 🆕 маршрут */}
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};
