import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";
import EmployeeDashboardPage from "@/pages/employee/page";
import InventoryManagementPage from "@/pages/employee/InventoryManagement";
import EmployeeApprovalRequestsPage from "@/pages/employee/ApprovalRequestsPage";
import AdminApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
// import UnauthorizedPage from "./pages/unauthorized_page/unauthorized";

import ProductPage from "@/pages/product/page";
import SearchPage from "@/pages/search/page";

import CartPage from "@/pages/cart/page";
import CheckoutPage from "@/pages/checkout/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/footer";
import ScrollToTopButton from "@/components/scroll-to-top/scroll-to-top";
import NotFound from "@/components/404/not-found";

import ProtectedRoute from "@/components/protected-route/protected-route";

import { CartProvider } from "@/providers/CartProvider";
import { AuthProvider } from "@/providers/AuthProvider";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
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
              <Route path="/employee" element={<EmployeeDashboardPage />} />
        <Route path="/employee/inventory-management" element={<InventoryManagementPage />} />
        <Route path="/employee/approval-requests" element={<EmployeeApprovalRequestsPage />} />
        <Route path="/employee" element={<EmployeeDashboardPage />} />
        <Route path="/employee/inventory-management" element={<InventoryManagementPage />} />
        <Route path="/employee/approval-requests" element={<EmployeeApprovalRequestsPage />} />
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

                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />

                    <Route
                      path="/unauthorized"
                      element={<UnauthorizedPage />}
                    />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>

          <ScrollToTopButton />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
