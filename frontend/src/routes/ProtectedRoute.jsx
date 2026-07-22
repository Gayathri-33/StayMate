import { Navigate } from "react-router-dom";
import authService from "../services/authService";

function ProtectedRoute({ children, allowedRoles }) {
  const token = authService.getToken();
  const user = authService.getUser();

  // 1. Check if user is logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if user has the correct role for this route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they are logged in but wrong role, send them to their own dashboard
    if (user.role === "SUPER_ADMIN") return <Navigate to="/superadmin/dashboard" replace />;
    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "RESIDENT") return <Navigate to="/resident/dashboard" replace />;
    
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;