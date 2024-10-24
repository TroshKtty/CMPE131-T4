import { Route, BrowserRouter as Router, Routes} from "react-router-dom";

//import AdminLoginPage from "@/pages/admin-login/page";
import CustomerLoginPage from "@/pages/customer-login/page";
import AdminDashboard from '@/pages/admin_dashboard';
import EmployeeDashboard from '@/pages/employee_dashboard';
import HomePage from "@/pages/home/page";
import IndividualProductPage from "@/pages/products/individual/page";
import ProductsPage from "@/pages/products/page";

import NavBar from "@/components/NavBar";
import Footer from "@/components/footer/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* Route for Customer login */}
        <Route path="/customer-login" element={<CustomerLoginPage />} />
        
        {/* Route for Admin/Wholesaler login */}
        <Route path="/admin_dashboard" element={<AdminDashboard/>} />

        {/* Route for Admin/Wholesaler login */}
        <Route path="/employee_dashboard" element={<EmployeeDashboard/>} />

        
        

        {/* Route for Admin/Wholesaler login */}
        
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
                {/* For now, this path will do but should be a query param or search param */}
                <Route
                  path="/products/individual"
                  element={<IndividualProductPage />}
                />
              </Routes>

              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};
