import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const styles = {
    nav: {
      background: "#007bff",
      padding: "15px 20px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
    },
    logo: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    menu: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "0.95rem",
    },
    btn: {
      background: "#dc3545",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        MARKETPLACE
      </Link>
      <div style={styles.menu}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/products" style={styles.link}>
          Produk
        </Link>
        <Link to="/cart" style={styles.link}>
          Keranjang
        </Link>
        {token ? (
          <button onClick={handleLogout} style={styles.btn}>
            Keluar
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Masuk
            </Link>
            <Link to="/register" style={styles.link}>
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
