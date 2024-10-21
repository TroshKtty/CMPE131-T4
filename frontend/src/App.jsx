import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLoginPage from "@/pages/admin-login/page";
import CustomerLoginPage from "@/pages/customer-login/page";
import HomePage from "@/pages/home/page";
import IndividualProductPage from "@/pages/products/individual/page";

import TomatoProductPage from "@/pages/products/individual/tomatopage";
import BananaProductPage from "@/pages/products/individual/bananapage";
import WaterProductPage from "./pages/products/individual/waterpage";
import TestProductPage from "./pages/products/individual/testpage";

import ProductsPage from "@/pages/products/page";

import NavBar from "@/components/NavBar";
import Footer from "@/components/footer/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Admin/Wholesaler login */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        {/* Route for Customer login */}
        <Route path="/customer-login" element={<CustomerLoginPage />} />

        <Route
          path="/*"
          element={
            <>
              <NavBar />

              <Routes>
                {/* Root page */}
                <Route path="/" element={<HomePage />} />

                {/* Route for searching products */}
                <Route path="/search" element={<ProductsPage />} />
                {/* Route for an individual product */}
                {/* For now, this path will do but should be a query param or search param */}
                <Route
                  path="/products/individual"
                  element={<IndividualProductPage />}
                />
                <Route
                  path="/products/individual/test"
                  element={<TestProductPage />}
                />
              </Routes>

              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
