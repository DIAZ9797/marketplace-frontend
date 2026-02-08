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
    if (window.confirm("Hapus item ini?")) {
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
    container: { maxWidth: "800px", margin: "30px auto", padding: "20px" },
    item: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      borderBottom: "1px solid #ddd",
      alignItems: "center",
    },
    btnDel: {
      background: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Keranjang Belanja</h2>
      {items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p>Keranjang kosong</p>
        </div>
      ) : (
        items.map((item) => (
          <div key={item._id || Math.random()} style={styles.item}>
            <div>
              <h4>{item.product?.name || item.name || "Produk"}</h4>
              <p>
                Qty: {item.quantity} x Rp{" "}
                {(item.product?.price || item.price || 0).toLocaleString()}
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
        <div style={{ marginTop: "30px", textAlign: "right" }}>
          <h3>Total: Rp {total.toLocaleString()}</h3>
          <Link to="/checkout">
            <button
              style={{
                background: "green",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout Sekarang
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
