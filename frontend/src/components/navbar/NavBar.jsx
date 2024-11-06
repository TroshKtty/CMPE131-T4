import { Box, IconButton, Input, Link, Typography } from "@mui/joy";
import { MenuIcon, Search, ShoppingCart, User } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import "./navbar.css";

function NavLink({ children, ...props }) {
  return (
    <Link
      component={RouterLink}
      to={props.to}
      sx={{
        textDecoration: "none",
        color: "primary.solidColor",
        // Remove underline on hover
        "&:hover": {
          textDecoration: "none",
        },
      }}
    >
      {children}
    </Link>
  );
}

// I don't know why this is required...
NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default function NavBar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams, setQuery]);

  const handleSearch = (ev) => {
    ev.preventDefault();

    if (query.length < 3) {
      return;
    }

    const target = new URLSearchParams({ q: query }).toString();
    navigate(encodeURI(`/search?${target}`));
  };

  const log_out = () =>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    alert('Logged Out Successfully!');
    navigate('/');
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        py: 2,
        backgroundColor: "primary.solidBg",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <NavLink to="/">
        <Typography level="h2" fontSize="title-lg" textColor="common.white">
          OFS
        </Typography>
      </NavLink>
      <Box marginLeft={16}>
        <form onSubmit={handleSearch}>
          <Input
            value={query}
            placeholder="Search for products"
            endDecorator={
              <IconButton type="submit">
                <Search size={16} />
              </IconButton>
            }
            sx={{ width: 500 }}
            onChange={(ev) => setQuery(ev.target.value)}
          />
        </form>
      </Box>
      <Box component="nav" sx={{ display: "flex", gap: 2 }}>
        <NavLink to="/cart">
          <ShoppingCart size={18} style={{ marginRight: 8 }} />
          <Typography level="h4" fontSize="lg" textColor="common.white">
            Cart
          </Typography>
        </NavLink>
        {sessionStorage.getItem("token") || localStorage.getItem("token") ? (
          <div className="navbar_menu">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MenuIcon size={18} style={{ color: "white" }} />
              <Typography level="h4" fontSize="lg" textColor="common.white">
                Menu
              </Typography>
            </Box>
            <ul className="navbar_dropdown">
              <li>Account Information</li>
              <hr />
              <li>Order History</li>
              <hr />
              <li onClick={log_out}>Logout</li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login">
            <User size={18} style={{ marginRight: 8 }} />
            <Typography level="h4" fontSize="lg" textColor="common.white">
              Log In
            </Typography>
          </NavLink>
        )}
      </Box>
    </Box>
  );
}
