import React from "react";
import { Typography, Link } from "@mui/joy";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./employee_navbar.css"; 

export default function EmployeeSidebar() {

  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault(); // Prevent the default link navigation
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    navigate('/'); // Navigate after removing the tokens
  }

  return (
    <div className="sidebar">
      <div>
        <Typography className="sidebar-header">Employee Panel</Typography>
        <br />
        <div className="sidebar-links">
          <Link component={RouterLink} to="/employee/inventory-management" className="sidebar-link">
            Inventory Management
          </Link>
          <Link component={RouterLink} to="/employee/approval-requests" className="sidebar-link">
            Approval Requests
          </Link>
        </div>
      </div>
      <div className="sidebar-links">
        <Link onClick={logout} className="sidebar-link" to="/">
          Logout
        </Link>
      </div>
    </div>
  );
}
