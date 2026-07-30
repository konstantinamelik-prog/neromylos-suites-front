import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/features/auth/AuthProvider";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role ?? "")) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
