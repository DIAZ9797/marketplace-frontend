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
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      padding: "40px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      textAlign: "center",
    },
    img: {
      width: "100%",
      height: "150px",
      objectFit: "contain",
      marginBottom: "10px",
    },
    btn: {
      display: "block",
      background: "#007bff",
      color: "white",
      padding: "8px",
      textDecoration: "none",
      borderRadius: "4px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.grid}>
      {products.map((p) => (
        <div key={p._id} style={styles.card}>
          <img
            src={p.image || "https://via.placeholder.com/150"}
            alt={p.name}
            style={styles.img}
          />
          <h3>{p.name}</h3>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Rp {p.price.toLocaleString()}
          </p>
          <Link to={`/products/${p._id}`} style={styles.btn}>
            Detail
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
