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

  return (
    <div className="container stack">
      <h2 className="page-title" style={{ marginBottom: 0 }}>
        Keranjang Belanja
      </h2>
      {items.length === 0 ? (
        <div className="card muted">Keranjang kosong.</div>
      ) : (
        items.map((item, index) => (
          <article
            key={item._id || `${item.product?._id || "item"}-${index}`}
            className="card cart-item"
          >
            <div>
              <h4 style={{ margin: 0 }}>{item.product?.name || "Produk"}</h4>
              <p className="muted" style={{ margin: "0.25rem 0 0" }}>
                {item.quantity} x Rp {(item.product?.price || 0).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="btn-danger"
              style={{ whiteSpace: "nowrap" }}
            >
              Hapus
            </button>
          </article>
        ))
      )}

      {items.length > 0 && (
        <section className="card" style={{ textAlign: "right" }}>
          <h3 style={{ marginTop: 0 }}>Total: Rp {total.toLocaleString()}</h3>
          <Link to="/checkout" className="btn-success">
            Checkout
          </Link>
        </section>
      )}
    </div>
  );
};

export default Cart;
