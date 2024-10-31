import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginPage from "@/pages/login/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";

import ProductsPage from "@/pages/products/page";
import ProductPage from "@/pages/products/individual/page";

import NavBar from "@/components/NavBar";
import Footer from "@/components/footer/Footer";
import RegistrationPage from "@/pages/registration/page";

import TomatoProductPage from "@/pages/products/individual/tomatopage";
import BananaProductPage from "@/pages/products/individual/bananapage";
import WaterProductPage from "./pages/products/individual/waterpage";
import TestProductPage from "./pages/products/individual/testpage";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for logging in */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />

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
                <Route path="/product/:product" element={<ProductPage />} />

                <Route
                  path="/products/individual/tomato"
                  element={<TomatoProductPage />}
                />
                <Route
                  path="/products/individual/banana"
                  element={<BananaProductPage />}
                />
                <Route
                  path="/products/individual/water"
                  element={<WaterProductPage />}
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