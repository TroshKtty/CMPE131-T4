import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import '@/styles/CustomerLogin.css';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle customer login logic here, e.g., sending data to the backend API
    console.log('Customer login:', { email, password, otp });
  };

  const goBack = () => {
    navigate('/');
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
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP (if applicable)"
          className="login-input"
        />
        <button type="submit" className="login-button">Log In</button>
        <GoogleLoginButton />
        <button onClick={goBack} className="go-back-button">Go Back</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
