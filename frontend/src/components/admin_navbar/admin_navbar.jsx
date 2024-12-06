import React from "react";
import { Typography, Link } from "@mui/joy";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "./admin_navbar.css";


export default function AdminSidebar() {
  
  const navigate = useNavigate();

  const logout = () =>{
    navigate('/');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    
  }

  return (
    <div className="sidebar">
      <div>
        <Typography className="sidebar-header">Dashboard</Typography>
        <br></br>
        <div className="sidebar-links">
          {/* <Link component={RouterLink} to="/admin/inventory" className="sidebar-link">
            Inventory Management
          </Link> */}
          <Link component={RouterLink} to="/admin/approval-requests" className="sidebar-link">
            Approval Requests
          </Link>
          <Link component={RouterLink} to="/admin" className="sidebar-link">
            Admin Dashboard
          </Link>
        </div>
      </div>
      <div className="sidebar-links">
        <Link component={RouterLink} to="/" className="sidebar-link">
          Return to Home
          </Link>
          <Link className="sidebar-link" onClick={logout}>
            Logout
          </Link>
      </div>
    </div>
  );
}
