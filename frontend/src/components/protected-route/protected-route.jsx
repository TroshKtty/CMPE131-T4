import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children, required_role }) {
  const { token } = useAuth();

  if (!token) {
    console.log("Unauthenticated");
    return <Navigate to="/login" replace />;
  }

  const user_role = jwtDecode(token).role;
  if (required_role && user_role !== required_role) {
    console.log("Unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Authentication and authorization passed");
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  required_role: PropTypes.string,
};
