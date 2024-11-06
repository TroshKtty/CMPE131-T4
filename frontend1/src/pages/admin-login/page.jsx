import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle admin/wholesaler login logic here, e.g., sending data to the backend API
    console.log("Admin login:", { email, password });
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="admin-login-page">
      <h1 className="company-name">OFS</h1>

      <h2 className="login-heading">Admin/Wholesaler Login</h2>
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
