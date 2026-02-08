import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // --- STYLES ---
  const styles = {
    card: {
      border: "1px solid #eee",
      borderRadius: "10px",
      overflow: "hidden",
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      transition: "transform 0.2s",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      maxWidth: "300px",
      margin: "0 auto",
    },
    imageContainer: {
      height: "200px",
      width: "100%",
      backgroundColor: "#f9f9f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "10px",
    },
    info: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    name: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "#333",
      textDecoration: "none",
      lineHeight: "1.4",
    },
    price: {
      fontSize: "1rem",
      color: "#e74c3c", // Warna merah harga
      fontWeight: "bold",
      marginTop: "auto", // Dorong harga ke bawah
      marginBottom: "15px",
    },
    btnDetail: {
      display: "block",
      width: "100%",
      padding: "10px",
      backgroundColor: "#111",
      color: "white",
      textAlign: "center",
      textDecoration: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.card}>
      {/* Gambar */}
      <div style={styles.imageContainer}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          style={styles.image}
        />
      </div>

      {/* Info Produk */}
      <div style={styles.info}>
        <Link to={`/products/${product._id}`} style={styles.name}>
          {product.name}
        </Link>

        <p style={{ fontSize: "0.85rem", color: "#777", margin: "0 0 10px 0" }}>
          Running Series
        </p>

        <div style={styles.price}>
          Rp {product.price ? product.price.toLocaleString() : "0"}
        </div>

        <Link to={`/products/${product._id}`} style={styles.btnDetail}>
          LIHAT DETAIL
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
