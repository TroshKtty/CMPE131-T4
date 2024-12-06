import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";
//import EmployeeDashboardPage from "@/pages/employee/page";
import InventoryManagementPage from "@/pages/employee/InventoryManagement";
import EmployeeApprovalRequestsPage from "@/pages/employee/ApprovalRequestsPage";
import AdminApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
import OrderPage from "@/pages/employee/Orders";

import UnauthorizedPage from "@/pages/unauthorized/page";

import ProductPage from "@/pages/product/page";
import SearchPage from "@/pages/search/page";

import CartPage from "@/pages/cart/page";
import CheckoutPage from "@/pages/checkout/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/footer";
import ScrollToTopButton from "@/components/scroll-to-top/scroll-to-top";
import NotFound from "@/components/404/not-found";

import ProtectedRoute from "@/components/protected-route/protected-route";

import AccountInfoPage from "./pages/accinfo/page";
import PaymentInfoPage from "./pages/accinfo/payment";
import OrderHistoryPage from "./pages/order";
import AddressPage from "./pages/accinfo/address";

import { CartProvider } from "@/providers/CartProvider";
import { AuthProvider } from "@/providers/AuthProvider";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
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
                  <AdminApprovalRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <ProtectedRoute required_role="employee">
                  <Navigate to="/employee/approval-requests" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/inventory-management"
              element={
                <ProtectedRoute required_role="employee">
                  <InventoryManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/orders"
              element={
                <ProtectedRoute required_role="employee">
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/approval-requests"
              element={
                <ProtectedRoute required_role="employee">
                  <EmployeeApprovalRequestsPage />
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

                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute required_role="customer">
                          <CartPage />{" "}
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute required_role="customer">
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute required_role="customer">
                          <AccountInfoPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/accinfo/payment"
                      element={
                        <ProtectedRoute required_role="customer">
                          <PaymentInfoPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/accinfo/orders"
                      element={
                        <ProtectedRoute>
                          <OrderHistoryPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/accinfo/address"
                      element={
                        <ProtectedRoute required_role="customer">
                          <AddressPage />
                        </ProtectedRoute>
                      }
                    />
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
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}
