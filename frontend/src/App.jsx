import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";
import ApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
import UnauthorizedPage from "@/pages/unauthorized/page";

import ProductPage from "@/pages/product/page";
import SearchPage from "@/pages/search/page";

import CheckoutPage from "@/pages/checkout/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/footer";
import ScrollToTopButton from "@/components/scroll-to-top/scroll-to-top";
import NotFound from "./components/404/not-found";

import ProtectedRoute from "./utils/protected_routes";
import useAuth from "./utils/auth_check";

import { CartProvider } from "@/providers/CartProvider";

const AuthWrapper = () => {
	useAuth();
	return null;
};

export default function App() {
	return (
    <CartProvider>
      <Router>
        <AuthWrapper />
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
          <Route
            path="/*"
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  {/* Root page */}
                  <Route path="/" element={<HomePage />} />
                  {/* Route for searching products */}
                  <Route path="/search" element={<SearchPage />} />
                  {/* Route for an individual product */}
                  <Route path="/product/:product" element={<ProductPage />} />
                  {/* Route for checkout page */}
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>

        <ScrollToTopButton />
      </Router>
    </CartProvider>
  );
}
