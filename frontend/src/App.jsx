import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";
import EmployeeDashboardPage from "@/pages/employee/page";
import InventoryManagementPage from "@/pages/employee/InventoryManagement";
import EmployeeApprovalRequestsPage from "@/pages/employee/ApprovalRequestsPage";
import AdminApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
// import UnauthorizedPage from "./pages/unauthorized_page/unauthorized"
import UnauthorizedPage from "@/pages/unauthorized/page";;

import ProductPage from "@/pages/product/page";
import SearchPage from "@/pages/search/page";

import CheckoutPage from "@/pages/checkout/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import ScrollToTopButton from "@/components/scroll-to-top/scroll-to-top";
import NotFound from "./components/404/not-found";

import ProtectedRoute from "./utils/protected_routes";
import useAuth from "./utils/auth_check";

import AccountInfoPage from "./pages/accinfo/page";
import PaymentInfoPage from "./pages/accinfo/payment";
import OrderHistoryPage from "./pages/accinfo/order";

import { CartProvider } from "@/providers/CartProvider";

const AuthWrapper = () => {
	useAuth();
	return null;
};
export default function App() {
  //make sure token hasnt expired
  
	return (
    <Router>
      <AuthWrapper/>
      <Routes>
        {/* Route for logging in */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        
        {/*Protected Routes - gotta find a way to make it simpler and just protect one and apply it to others*/}
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
              <EmployeeDashboardPage />
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
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:product" element={<ProductPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                <Route path="/accinfo" element={<AccountInfoPage />} />
                <Route path="/accinfo/payment" element={<PaymentInfoPage />} />
                <Route path="/accinfo/orders" element={<OrderHistoryPage />} />
              </Routes>
              <Footer />
            </>
          }
        />

      </Routes>

        <ScrollToTopButton />
    </Router>
  );
}
