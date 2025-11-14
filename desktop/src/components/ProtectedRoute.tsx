import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../app/store";
import { parseJwt } from "../utils/jwt";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string; // t.ex. "Admin"
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = useSelector((state: RootState) => state.login.token);
  const user = token ? parseJwt(token) : null;

  const userRole = user?.role ?? null;

  // Om ingen token → redirect till login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Om route kräver en roll → kontrollera den
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
