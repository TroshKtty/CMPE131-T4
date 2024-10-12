import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/SelectLoginType.css';

const SelectLoginType = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleCustomerLogin = () => {
    navigate('/customer-login');
  };

  return (
    <div className="select-login-type">
      {/* Add the company name at the top */}
      <h1 className="company-name">OFS</h1>
      
      <h2>Select Login Type</h2>
      <button onClick={handleAdminLogin} className="login-option-button">
        Login as Admin/Wholesaler
      </button>
      <button onClick={handleCustomerLogin} className="login-option-button">
        Login as Customer
      </button>
    </div>
  );
};

export default SelectLoginType;
