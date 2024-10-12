import React from 'react';
import AdminLogin from '@/components/AdminLogin';
import CustomerLogin from '@/components/CustomerLogin';
import '@/styles/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <h1>OFS</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>

      <div className="login-container">
        {/* Admin/Wholesaler Login Section */}
        <div className="admin-login-section">
          <AdminLogin />
        </div>

        {/* Customer Login Section */}
        <div className="customer-login-section">
          <CustomerLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
