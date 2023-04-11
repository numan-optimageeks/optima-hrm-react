import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { LOGIN } from "src/constants/routeConstants";
import { RootState } from "src/store/store";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (!token) {
    return <Navigate to={LOGIN} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
