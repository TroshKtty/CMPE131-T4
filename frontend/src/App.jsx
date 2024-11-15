import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "@/pages/login/page";
import RegistrationPage from "@/pages/registration/page";
import HomePage from "@/pages/home/page";
import AdminDashboardPage from "@/pages/admin/page";
import ApprovalRequestsPage from "@/pages/admin/ApprovalRequestsPage";
import UnauthorizedPage from "./pages/unauthorized_page/unauthorized";

import ProductsPage from "@/pages/products/page";
import ProductPage from "@/pages/products/individual/page";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

import TomatoProductPage from "@/pages/products/individual/tomatopage";
import BananaProductPage from "@/pages/products/individual/bananapage";
import WaterProductPage from "./pages/products/individual/waterpage";
import TestProductPage from "./pages/products/individual/testpage";

import AccountInfoPage from "./pages/accinfo/page";

//utils
import ProtectedRoute from "./utils/protected_routes";
import useAuth from "./utils/auth_check";

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
                <Route path="/products/individual/tomato" element={<TomatoProductPage />} />
                <Route path="/products/individual/banana" element={<BananaProductPage />} />
                <Route path="/products/individual/water" element={<WaterProductPage />} />
                <Route path="/products/individual/test" element={<TestProductPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                <Route path="/accinfo" element={<AccountInfoPage />} />

              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
