import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoutes = ({ role }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={role === "Admin" ? "/admin/login" : "/login"} replace />;
  }

  if (role && user.Role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
