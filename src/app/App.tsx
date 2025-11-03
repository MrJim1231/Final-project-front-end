import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "../app/routes/AppRouter"; // ✅ добавляем маршруты
import { BrowserRouter } from "react-router-dom";

import "./App.css";

export const App = () => (
  <BrowserRouter>
    <Header />

    <div className="dashboard__layout">
      <Sidebar />
      <main className="dashboard__content">
        {/* 🔹 Здесь будет подгружаться нужная страница */}
        <AppRouter />
      </main>
    </div>
  </BrowserRouter>
);
