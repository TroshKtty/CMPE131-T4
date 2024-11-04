import { Box, IconButton, Input, Link, Typography, Button, Grid, Sheet } from "@mui/joy";
import { MenuIcon, Search, ShoppingCart, User, X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams
  useSearchParams,
} from "react-router-dom";

import "./navbar.css";

export default function NavBar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <Sheet
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ px: { xs: 2, sm: 4 }, py: 1 }}
      >
        <Grid xs={6} sm={3} display="flex" alignItems="center">
          <Button
            variant="plain"
            color="primary"
            sx={{ color: "common.black" }}
            onClick={() => navigate("/")}
          >
            <Typography level="h1" fontSize="xl">
              OFS
            </Typography>
          </Button>
        </Grid>

        <Grid xs={12} sm={6} md={5} lg={6} order={{ xs: 3, sm: 2 }}>
          <form onSubmit={handleSearch}>
            <Input
              value={query}
              placeholder="Search for products"
              sx={{ width: "100%" }}
              onChange={(ev) => setQuery(ev.target.value)}
              endDecorator={
                <>
                  {query && (
                    <IconButton
                      onClick={clearSearch}
                      size="sm"
                      variant="plain"
                      color="neutral"
                    >
                      <X size={16} />
                    </IconButton>
                  )}
                  <IconButton type="submit" size="sm">
                    <Search size={16} />
                  </IconButton>
                </>
              }
            />
          </form>
        </Grid>

        <Grid
          xs={6}
          sm={3}
          md={4}
          lg={3}
          order={{ xs: 2, sm: 3 }}
          display="flex"
          justifyContent="flex-end"
        >
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              variant="plain"
              color="primary"
              startDecorator={<ShoppingCart size={20} />}
              sx={{ color: "common.black" }}
              onClick={() => navigate("/cart")}
            >
              Cart
            </Button>
            <Button
              variant="plain"
              color="primary"
              startDecorator={<User size={20} />}
              sx={{ color: "common.black" }}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <NavLink to="/cart">
              <Button
                variant="plain"
                color="primary"
                startDecorator={<ShoppingCart size={20} />}
                sx={{ color: "common.black" }}
              >
                Cart
              </Button>
            </NavLink>
            {/*<NavLink to="/login">
              <Button
                variant="plain"
                color="primary"
                startDecorator={<User size={20} />}
                sx={{ color: "common.black" }}
              >
                Log In
              </Button>
            </NavLink>*/}
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
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ display: { xs: "flex", md: "none" }, color: "common.black" }}
          >
            <Menu />
          </IconButton>
        </Grid>
      </Grid>

      {mobileMenuOpen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
        </Box>
      )}
    </Sheet>
  );
}
