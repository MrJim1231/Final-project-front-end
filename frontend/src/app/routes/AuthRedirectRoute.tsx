// src/app/routes/AuthRedirectRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/providers/store";

export const AuthRedirectRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuth = Boolean(user.token);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
