import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You have been logged out due to inactivity.");
    window.location.href = "/login"; // or we navigate to home page
  };

  useEffect(() => {
    const checkToken = () => {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleLogout();
          return false;
        }
        return true;
      }
      return false;
    };

    const isValid = checkToken();
    setIsLoggedIn(isValid);

    if (isValid) {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const timeout = (decodedToken.exp - currentTime) * 1000;
      const timer = setTimeout(handleLogout, timeout);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
