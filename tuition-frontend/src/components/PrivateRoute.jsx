import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("user"); // Check if user is stored

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
