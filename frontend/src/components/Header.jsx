import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${
          scrolled
            ? "bg-green-700 shadow-xl py-3 mb-8"
            : "bg-gradient-to-r from-green-600 to-emerald-500 py-4 mb-8"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-xl font-bold tracking-wide flex items-center gap-2"
        >
          Disaster Management AI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-google-sans-regular">
          <NavLink to="/" label="Dashboard" />
          <NavLink to="/alerts" label="Alerts" />
          <NavLink to="/global-risk" label="Global Risk" />
          <NavLink to="/resources" label="Resources" />
          <NavLink to="/contact" label="Emergency" />
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              menuOpen && "rotate-45 translate-y-2"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${
              menuOpen && "opacity-0"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              menuOpen && "-rotate-45 -translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 
            bg-gradient-to-b from-green-600 to-emerald-500
            ${menuOpen ? "max-h-96 py-4" : "max-h-0"}`}
      >
        <div className="flex flex-col items-center gap-4 text-white text-lg">
          <MobileLink to="/" label="Home" setMenuOpen={setMenuOpen} />
          <MobileLink to="/alerts" label="Alerts" setMenuOpen={setMenuOpen} />
          <MobileLink
            to="/global-risk"
            label="Global Risk"
            setMenuOpen={setMenuOpen}
          />
          <MobileLink
            to="/resources"
            label="Resources"
            setMenuOpen={setMenuOpen}
          />
          <MobileLink
            to="/contact"
            label="Emergency Contact"
            setMenuOpen={setMenuOpen}
          />
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative text-white font-medium after:absolute after:left-0 after:-bottom-1 
    after:h-0.5 after:w-0 after:bg-green-200 after:transition-all 
    hover:after:w-full"
  >
    {label}
  </Link>
);

const MobileLink = ({ to, label, setMenuOpen }) => (
  <Link
    to={to}
    onClick={() => setMenuOpen(false)}
    className="hover:text-green-200 transition-colors"
  >
    {label}
  </Link>
);

export default Header;
