import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Cart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = useCallback(() => {
    api
      .get("/cart")
      .then((res) => {
        const data = res.data;
        const cartItems =
          data.items ||
          data.products ||
          data.cart?.items ||
          (Array.isArray(data) ? data : []);
        setItems(cartItems);
      })
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    else fetchCart();
  }, [navigate, fetchCart]);

  const handleDelete = async (id) => {
    if (window.confirm("Hapus?")) {
      await api.delete(`/cart/${id}`);
      fetchCart();
    }
  };

  const total = items.reduce((acc, item) => {
    const harga = item.product?.price || item.price || 0;
    const qty = item.quantity || 1;
    return acc + harga * qty;
  }, 0);

  const styles = {
    container: { maxWidth: "800px", margin: "20px auto", padding: "15px" },
    item: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "15px",
      border: "1px solid #eee",
      borderRadius: "8px",
      marginBottom: "10px",
      background: "white",
      alignItems: "center",
    },
    info: { flex: "1 1 200px" },
    title: { fontSize: "1rem", margin: "0 0 5px 0" },
    sub: { color: "#666", fontSize: "0.9rem" },
    btnDel: {
      background: "#ff4d4d",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.8rem",
      marginTop: "5px",
    },
    summary: {
      padding: "20px",
      background: "#f1f1f1",
      borderRadius: "8px",
      marginTop: "20px",
      textAlign: "right",
    },
    checkout: {
      display: "inline-block",
      background: "green",
      color: "white",
      padding: "10px 20px",
      textDecoration: "none",
      borderRadius: "5px",
      marginTop: "10px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Keranjang Belanja</h2>
      {items.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          Keranjang kosong
        </p>
      ) : (
        items.map((item) => (
          <div key={item._id || Math.random()} style={styles.item}>
            <div style={styles.info}>
              <h4 style={styles.title}>{item.product?.name || "Produk"}</h4>
              <p style={styles.sub}>
                {item.quantity} x Rp{" "}
                {(item.product?.price || 0).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              style={styles.btnDel}
            >
              Hapus
            </button>
          </div>
        ))
      )}
      {items.length > 0 && (
        <div style={styles.summary}>
          <h3>Total: Rp {total.toLocaleString()}</h3>
          <Link to="/checkout" style={styles.checkout}>
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
