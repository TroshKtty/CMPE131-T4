import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
import AdminDashboardPage from "@/pages/admin/page";
import HomePage from "@/pages/home/page";
import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";

import ProductPage from "@/pages/products/individual/page";
import ProductsPage from "@/pages/products/page";

import NavBar from "@/components/NavBar";
import Footer from "@/components/footer/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for logging in */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route
          path="/admin/approval-requests"
          element={<ApprovalRequestsPage />}
        />

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
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
