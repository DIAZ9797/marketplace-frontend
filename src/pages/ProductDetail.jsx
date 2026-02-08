import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAdd = async () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    try {
      await api.post("/cart", { productId: id, quantity: 1 });
      alert("Masuk keranjang!");
    } catch (err) {
      alert("Gagal menambah ke keranjang");
    }
  };

  if (!product)
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h3>
    );

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "20px auto",
      padding: "20px",
      display: "flex",
      flexWrap: "wrap",
      gap: "30px",
      justifyContent: "center",
    },
    imgWrapper: { flex: "1 1 300px", textAlign: "center" },
    img: {
      maxWidth: "100%",
      maxHeight: "300px",
      objectFit: "contain",
      borderRadius: "8px",
    },
    info: { flex: "1 1 300px", padding: "10px" },
    title: { fontSize: "1.8rem", marginBottom: "10px" },
    price: {
      fontSize: "1.5rem",
      color: "green",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    desc: { lineHeight: "1.6", color: "#555", marginBottom: "20px" },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imgWrapper}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          style={styles.img}
        />
      </div>
      <div style={styles.info}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>Rp {product.price.toLocaleString()}</p>
        <p style={styles.desc}>{product.description}</p>
        <button onClick={handleAdd} style={styles.btn}>
          + Tambah Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
