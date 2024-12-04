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

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import ScrollToTopButton from "@/components/scroll-to-top/scroll-to-top";
import NotFound from "./components/404/not-found";

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
              <AdminApprovalRequestsPage />
              <AdminApprovalRequestsPage />
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
                {/* <Route path="/products/individual/tomato" element={<TomatoProductPage />} /> */}
                {/* <Route path="/products/individual/banana" element={<BananaProductPage />} /> */}
                {/* <Route path="/products/individual/water" element={<WaterProductPage />} /> */}
                {/* <Route path="/products/individual/test" element={<TestProductPage />} /> */}
                {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
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