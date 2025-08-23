import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Servicespage from "./pages/Servicespage";
import SolutionsPage from "./pages/Solutionspage";
import ERPDetail from "./pages/ERPDetail";
import CharityPlatform from "./pages/CharityPlatform";
import RetailAuto from "./pages/RetailAuto";
import Insights from "./pages/insights"
import Contact from "./pages/Contact";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path ="/services" element={<Servicespage />} />
        <Route path="/solutions" element = {<SolutionsPage />} />
        <Route path="/ERPDetail" element = {<ERPDetail />} />
        <Route path="/CharityPlatform" element = {<CharityPlatform />} />
        <Route path="/RetailAuto" element ={<RetailAuto />} />
        <Route path="/insights" element ={<Insights />} />
        <Route path="/Contact" element ={<Contact />} />

      </Routes>
      <Footer />
    </Router>
  );
}
