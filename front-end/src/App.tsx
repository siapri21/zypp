import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Rechargeur from "./pages/Rechargeur";
import Login from "./pages/Login";
import Register from "./components/Register";
import CityMap from "./pages/CityMap";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
