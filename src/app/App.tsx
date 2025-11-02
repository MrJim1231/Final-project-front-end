import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import "./App.css";

export const App = () => (
  <>
    <Header />

    <div className="dashboard__layout">
      <Sidebar />
      <main className="dashboard__content">{/* Контент или маршруты */}</main>
    </div>
  </>
);
