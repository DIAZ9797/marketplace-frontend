import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    container: { padding: "20px", background: "#f8f9fa", minHeight: "100vh" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      gap: "15px",
    },
    card: {
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    },
    img: {
      width: "100%",
      height: "120px",
      objectFit: "contain",
      marginBottom: "10px",
    },
    name: {
      fontSize: "1rem",
      margin: "5px 0",
      height: "40px",
      overflow: "hidden",
    },
    price: { color: "green", fontWeight: "bold", fontSize: "0.95rem" },
    btn: {
      display: "block",
      background: "#007bff",
      color: "white",
      padding: "8px",
      textDecoration: "none",
      borderRadius: "4px",
      marginTop: "10px",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Katalog Produk
      </h2>
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              style={styles.img}
            />
            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.price}>Rp {p.price.toLocaleString()}</p>
            <Link to={`/products/${p._id}`} style={styles.btn}>
              Lihat
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
