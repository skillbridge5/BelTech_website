import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import SeoManager from "./components/SeoManager";
import ProtectedRoute from "./components/ProtectedRoute";
import VisitorTracker from "./components/VisitorTracker";

const Homepage = lazy(() => import("./pages/Homepage"));
const Aboutpage = lazy(() => import("./pages/Aboutpage"));
const Servicespage = lazy(() => import("./pages/Servicespage"));
const SolutionsPage = lazy(() => import("./pages/Solutionspage"));
const ERPDetail = lazy(() => import("./pages/ERPDetail"));
const CharityPlatform = lazy(() => import("./pages/CharityPlatform"));
const RetailAuto = lazy(() => import("./pages/RetailAuto"));
const Blog = lazy(() => import("./pages/blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Industries = lazy(() => import("./pages/Industries"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProjectCaseDetail = lazy(() => import("./pages/ProjectCaseDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SolutionsAdmin = lazy(() => import("./pages/admin/SolutionsAdmin"));
const InsightsAdmin = lazy(() => import("./pages/admin/InsightsAdmin"));
const ContactsAdmin = lazy(() => import("./pages/admin/ContactsAdmin"));
const TestimonialsAdmin = lazy(() => import("./pages/admin/TestimonialsAdmin"));
const ProductsAdmin = lazy(() => import("./pages/admin/ProductsAdmin"));
const AnalyticsAdmin = lazy(() => import("./pages/admin/AnalyticsAdmin"));

const RouteFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center bg-[#f7f8fa]" aria-busy="true">
    <div className="h-8 w-8 animate-pulse rounded-full bg-[#0078B7]/30" />
    <span className="sr-only">Loading page</span>
  </div>
);

const PublicLayout = () => (
  <>
    <VisitorTracker />
    <Navbar />
    <Suspense fallback={<RouteFallback />}>
      <Outlet />
    </Suspense>
    <Footer />
    <WhatsAppButton />
  </>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <SeoManager />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<Aboutpage />} />
              <Route path="/services" element={<Servicespage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/Solutions" element={<SolutionsPage />} />
              <Route path="/projects/diligent-trade" element={<ERPDetail />} />
              <Route path="/projects/skillbridge" element={<CharityPlatform />} />
              <Route path="/projects/eyoha-digitals" element={<RetailAuto />} />
              <Route path="/projects/:slug" element={<ProjectCaseDetail />} />
              <Route path="/solutions/:slug" element={<ProjectCaseDetail />} />
              <Route path="/ERPDetail" element={<ERPDetail />} />
              <Route path="/CharityPlatform" element={<CharityPlatform />} />
              <Route path="/RetailAuto" element={<RetailAuto />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/insights" element={<Blog />} />
              <Route path="/insights/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<AnalyticsAdmin />} />
                <Route path="solutions" element={<SolutionsAdmin />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="blog" element={<InsightsAdmin />} />
                <Route path="insights" element={<InsightsAdmin />} />
                <Route path="contact" element={<ContactsAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
