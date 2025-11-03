import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { AppRouter } from "./routes/AppRouter"; // ✅ путь скорректирован
import "./App.css";

export const App = () => (
  <>
    <Header />

    <div className="dashboard__layout">
      <Sidebar />
      <main className="dashboard__content">
        {/* 🔹 Здесь динамически подгружается текущая страница */}
        <AppRouter />
      </main>
    </div>
  </>
);
