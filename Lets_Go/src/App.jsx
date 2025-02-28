import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

// Lazy load pages
const Landing = lazy(() => import("./pages/landing"));
const Journeys = lazy(() => import("./pages/journeys"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="w-screen min-h-screen bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-20 bg-white backdrop-filter backdrop-blur-lg shadow-sm">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <NavLink to="/" className="text-2xl text-gray-900 font-bold">
                Ed Venture
              </NavLink>

              {/* Desktop Links */}
              <div className="hidden md:flex space-x-6">
                <NavLink to="/" className={({ isActive }) => isActive ? "text-gray-900 font-bold" : "text-gray-900 hover:text-gray-600"}>
                  Home
                </NavLink>
                <NavLink to="/home" className={({ isActive }) => isActive ? "text-gray-900 font-bold" : "text-gray-900 hover:text-gray-600"}>
                  Learning Platform
                </NavLink>
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                ☰
              </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="md:hidden flex flex-col space-y-3 p-4">
                <NavLink to="/" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-600">
                  Home
                </NavLink>
                <NavLink to="/home" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-600">
                  Learning Platform
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Page Routes */}
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="*" element={<div className="text-center text-xl mt-10">404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
