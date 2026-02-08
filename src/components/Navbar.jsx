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
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
    },
    link: {
      color: "white",
      textDecoration: "none",
      marginLeft: "20px",
      fontWeight: "500",
    },
    logo: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    btn: {
      background: "#dc3545",
      color: "white",
      border: "none",
      padding: "5px 15px",
      borderRadius: "4px",
      marginLeft: "20px",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        MARKETPLACE
      </Link>
      <div>
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
