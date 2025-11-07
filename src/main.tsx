import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/App";
import { RouterProvider } from "./app/providers/RouterProvider";
import { DateProvider } from "./shared/context/DateContext"; // 👈 импортируем контекст

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      {/* 👇 теперь контекст даты доступен везде */}
      <DateProvider>
        <App />
      </DateProvider>
    </RouterProvider>
  </StrictMode>
);
