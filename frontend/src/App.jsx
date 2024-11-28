import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";
import ApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
import UnauthorizedPage from "@/pages/unauthorized/page";

import ProductPage from "@/pages/products/individual/page";
import ProductsPage from "@/pages/products/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

import ProtectedRoute from "./utils/protected_routes";
import useAuth from "./utils/auth_check";

import { CartProvider } from "@/providers/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";

const AuthWrapper = () => {
  useAuth();
  return null;
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AuthWrapper />
        <NavBar />  {/* Move NavBar outside of the routes to prevent re-rendering on every page */}
        <Routes>
          {/* Route for logging in */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute required_role="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approval-requests"
            element={
              <ProtectedRoute required_role="admin">
                <ApprovalRequestsPage />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<ProductsPage />} />
          <Route path="/product/:product" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
        <Footer />  {/* Move Footer outside of the routes to prevent re-rendering on every page */}
      </Router>
    </CartProvider>
  );
}
