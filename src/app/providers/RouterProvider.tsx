// src/app/providers/RouterProvider.tsx
import { BrowserRouter } from "react-router-dom";

export const RouterProvider = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);
