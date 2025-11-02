import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import { Dashboard } from "../pages/dashboard";

import "./App.css";

export const App = () => (
  <>
    <Header />

    <div className="dashboard__layout">
      <Sidebar />
      <main className="dashboard__content">
        <Dashboard /> {/* 🔹 Страница отрисовывается здесь */}
      </main>
    </div>
  </>
);
