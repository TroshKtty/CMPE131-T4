import React from "react";
import { Typography, Link } from "@mui/joy";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./employee_navbar.css";

export default function EmployeeSidebar() {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <Typography className="sidebar-header">Employee Panel</Typography>
        <br />
        <div className="sidebar-links">
          <Link
            component={RouterLink}
            to="/employee/approval-requests"
            className="sidebar-link"
          >
            Approval Requests
          </Link>
          <Link
            component={RouterLink}
            to="/employee/inventory-management"
            className="sidebar-link"
          >
            Inventory Management
          </Link>
          <Link
            component={RouterLink}
            to="/employee/orders"
            className="sidebar-link"
          >
            Order History
          </Link>
        </div>
      </div>
      <div className="sidebar-links">
        <Link component={RouterLink} to="/" className="sidebar-link">
          Return to Home
        </Link>
        <Link onClick={logout} className="sidebar-link" to="/">
          Logout
        </Link>
      </div>
    </div>
  );
}
