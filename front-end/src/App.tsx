import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Rechargeur from "./pages/Rechargeur";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CityMap from "./pages/CityMap";
import ProtectedRoute from "./components/ProtecteRoute";
import CookieConsent from "./components/CookieConsent";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Account from "./pages/Accounts";

export default function App() {
  const { pathname } = useLocation();
  const hideChrome = pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Home anchor="services" />} />
          <Route path="/devenir-rechargeur" element={<Rechargeur />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<Home anchor="app" />} />
          <Route path="/carte" element={<CityMap />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
               <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="*" element={<div className="p-6">404 - Page non trouvée</div>} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <CookieConsent />}
    </div>
  );
}
