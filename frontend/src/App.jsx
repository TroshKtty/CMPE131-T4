import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
import AdminDashboardPage from "@/pages/admin/page";
import HomePage from "@/pages/home/page";
import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import UnauthorizedPage from "@/pages/unauthorized/page";

import ProductPage from "@/pages/products/individual/page";
import ProductsPage from "@/pages/products/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

//utils
import ProtectedRoute from "./utils/protected_routes";
import useAuth from "./utils/auth_check";

const AuthWrapper = () => {
  useAuth();
  return null;
};

export default function App() {
  return (
    <Router>
      <AuthWrapper />
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
                {/* Root page */}
                <Route path="/" element={<HomePage />} />

                {/* Route for searching products */}
                <Route path="/search" element={<ProductsPage />} />

                {/* Route for an individual product */}
                <Route path="/product/:product" element={<ProductPage />} />

                <Route path="/unauthorized" element={<UnauthorizedPage />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
