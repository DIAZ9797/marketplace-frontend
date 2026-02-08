import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          MARKETPLACE
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/products"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Produk
        </Link>
        <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>
          Keranjang
        </Link>
        {token ? (
          <button onClick={handleLogout} className="nav-btn">
            Keluar
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
