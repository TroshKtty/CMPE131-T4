import { Link } from "react-router-dom";
import "./styles.css";

export default function NavBar() {
  // Underline the logo when hovered
  const onMouseEnter = (ev) => {
    ev.target.style.textDecoration = "underline";
  };

  // Hide the underline
  const onMouseLeave = (ev) => {
    ev.target.style.textDecoration = "none";
  };

  return (
    <header className="header">
      <div className="logo">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <h1>OFS</h1>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/customer-login">Login</Link>
      </nav>
    </header>
  );
}
