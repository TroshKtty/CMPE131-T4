// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    alert("You have been logged out due to inactivity.");
    navigate("/login");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 

      if (decodedToken.exp < currentTime) {
        handleLogout();
      } else {
        const timeout = (decodedToken.exp - currentTime) * 1000;
        const timer = setTimeout(handleLogout, timeout);

        return () => clearTimeout(timer);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

};

export default useAuth;
