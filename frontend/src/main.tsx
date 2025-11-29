import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/App";
import { RouterProvider } from "./app/providers/RouterProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
