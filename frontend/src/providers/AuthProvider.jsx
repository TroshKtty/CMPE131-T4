import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../providers/CartProvider";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const { syncCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    sessionStorage.getItem("token") || localStorage.getItem("token") || null
  );
  const [userRole, setUserRole] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleLogin = async (newToken, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", newToken);

    const decodedToken = jwtDecode(newToken);
    setToken(newToken);
    setUserRole(decodedToken.role);

    if (decodedToken.role === "admin") {
      navigate("/admin");
    } else if (decodedToken.role === "employee") {
      navigate("/");
    } else {
        syncCart(newToken);
      navigate("/");
    }
  };

  const handleLogout = (msg) => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
    clearCart();
    navigate("/");
    if (msg) {
      alert("You have been logged out due to inactivity.");
    }
  };

  useEffect(() => setIsInitialized(true), []);

  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    setToken(token);

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        handleLogout(true);
      } else {
        const timeout = (decodedToken.exp - currentTime) * 1000;
        const timer = setTimeout(() => handleLogout(true), timeout);

        return () => clearTimeout(timer);
      }
    }
  }, [navigate]);

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: token !== null,
        token,
        userRole,
        login: handleLogin,
        logout: () => handleLogout(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
