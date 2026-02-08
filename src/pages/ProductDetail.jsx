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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Harap Login dulu!");
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart", {
        productId: id,
        product_id: id,
        quantity: 1,
      });
      alert("Berhasil masuk keranjang!");
    } catch (err) {
      alert("Gagal menambahkan ke keranjang");
    }
  };

  if (!product)
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h3>
    );

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "50px auto",
      display: "flex",
      gap: "30px",
      padding: "20px",
    },
    img: { width: "300px", objectFit: "contain" },
    btn: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        style={styles.img}
      />
      <div>
        <h1>{product.name}</h1>
        <h2 style={{ color: "green" }}>Rp {product.price?.toLocaleString()}</h2>
        <p>{product.description}</p>
        <button onClick={handleAdd} style={styles.btn}>
          + Masukkan Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
