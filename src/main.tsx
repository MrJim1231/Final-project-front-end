import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/App";
import { RouterProvider } from "./app/providers/RouterProvider";
import { DateProvider } from "./shared/context/DateContext";
import { Provider } from "react-redux"; // 👈 импорт Redux Provider
import { store } from "./app/providers/store"; // 👈 импорт твоего store

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider>
        <DateProvider>
          <App />
        </DateProvider>
      </RouterProvider>
    </Provider>
  </StrictMode>
);
