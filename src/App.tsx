import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Servicespage from "./pages/Servicespage";
import SolutionsPage from "./pages/Solutionspage";
import ERPDetail from "./pages/ERPDetail";
import CharityPlatform from "./pages/CharityPlatform";
import RetailAuto from "./pages/RetailAuto";
import Blog from "./pages/blog";
import Contact from "./pages/Contact";
import Industries from "./pages/Industries";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import SolutionsAdmin from "./pages/admin/SolutionsAdmin";
import InsightsAdmin from "./pages/admin/InsightsAdmin";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public site (with Navbar/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/services" element={<Servicespage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/ERPDetail" element={<ERPDetail />} />
            <Route path="/CharityPlatform" element={<CharityPlatform />} />
            <Route path="/RetailAuto" element={<RetailAuto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/insights" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/industries" element={<Industries />} />
          </Route>

          {/* Admin login (standalone) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin panel (protected, no public Navbar/Footer) */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="solutions" element={<SolutionsAdmin />} />
              <Route path="blog" element={<InsightsAdmin />} />
              <Route path="insights" element={<InsightsAdmin />} />
              <Route path="contact" element={<ContactsAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
