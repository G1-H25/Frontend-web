import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../app/store";
import { parseJwt } from "../utils/jwt";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string; // rollen som krävs, t.ex. "Admin"
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = useSelector((state: RootState) => state.login.token);
  const user = token ? parseJwt(token) : null;
  const userRole = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  // Om route kräver en roll och användaren inte har den → redirect
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // Om ingen token finns → redirect till login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allt OK → rendera barnkomponent
  return <>{children}</>;
};

export default ProtectedRoute;
