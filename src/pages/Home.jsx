import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "100px 20px",
      background: "#f8f9fa",
      minHeight: "80vh",
    },
    btn: {
      background: "#007bff",
      color: "white",
      padding: "10px 25px",
      textDecoration: "none",
      borderRadius: "5px",
      fontSize: "1.2rem",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Selamat Datang di Marketplace</h1>
      <p style={{ marginBottom: "30px", fontSize: "1.2rem", color: "#666" }}>
        Temukan berbagai produk digital terbaik di sini.
      </p>
      <Link to="/products" style={styles.btn}>
        Mulai Belanja
      </Link>
    </div>
  );
};

export default Home;
