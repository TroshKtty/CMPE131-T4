import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLoginPage from "@/pages/admin-login/page";
import CustomerLoginPage from "@/pages/customer-login/page";
import HomePage from "@/pages/home/page";
import IndividualProductPage from "@/pages/products/individual/page";
import ProductsPage from "@/pages/products/page";

import NavBar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Root page */}
        <Route path="/" element={<HomePage />} />

        {/* Route for Admin/Wholesaler login */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        {/* Route for Customer login */}
        <Route path="/customer-login" element={<CustomerLoginPage />} />

        {/* Route for searching products */}
        <Route path="/search" element={<ProductsPage />} />
        {/* Route for an individual product */}
        {/* For now, this path will do but should be a query param or search param */}
        <Route
          path="/products/individual"
          element={<IndividualProductPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}
