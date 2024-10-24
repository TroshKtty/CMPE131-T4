import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles.css";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      const { redirectTo } = response.data;

      // Redirect user based on the role
      window.location.href = redirectTo;
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="customer-login-page">
      <h1 className="company-name">OFS</h1>

      <h2 className="login-heading">Customer Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="login-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Log In
        </button>
        <GoogleLoginButton />
        <button onClick={goBack} className="go-back-button">
          Go Back
        </button>
      </form>
    </div>
  );
}
