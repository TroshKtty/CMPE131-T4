import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/components/HomePage';  // Import your homepage component
import SelectLoginType from '@/components/SelectLoginType';
import AdminLogin from '@/components/AdminLogin';
import CustomerLogin from '@/components/CustomerLogin';
import '@/styles/LoginPage.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<HomePage />} />

        {/* Default route: Landing page where users select login type */}   
        <Route path="/select-login" element={<SelectLoginType />} />

        {/* Route for Admin/Wholesaler login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Route for Customer login */}
        <Route path="/customer-login" element={<CustomerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

