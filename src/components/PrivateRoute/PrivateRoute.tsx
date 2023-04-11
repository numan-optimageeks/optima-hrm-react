import { Navigate } from "react-router";
import { LOGIN } from "src/constants/routeConstants";
import { Outlet } from "react-router-dom";
import LocalStorage from "src/services/localStorage";
import { TOKEN } from "src/constants/constants";

const ProtectedRoute = () => {
  const token = LocalStorage.GetItem(TOKEN);
  if (!token) {
    return <Navigate to={LOGIN} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
