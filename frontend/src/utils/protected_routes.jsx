import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

function ProtectedRoute({ children, required_role }) { // Use camel case for component names
  let token = null;
  if (localStorage.getItem('token')) 
    token = localStorage.getItem('token');
  else if (sessionStorage.getItem('token'))
    token = sessionStorage.getItem('token');

  

  // Redirect to login if there's no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user_role = jwtDecode(token).role;
  // Redirect to unauthorized page if role doesn't match
  if (required_role && user_role !== required_role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the children if token and role are valid
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  required_role: PropTypes.string, // Match prop name here
};

export default ProtectedRoute;
