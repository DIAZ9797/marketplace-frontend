import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Checkout = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Memproses checkout...");

  useEffect(() => {
    const processCheckout = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }

      try {
        const cartRes = await api.get("/cart");
        const data = cartRes.data;
        const cartItems =
          data.items ||
          data.products ||
          data.cart?.items ||
          (Array.isArray(data) ? data : []);

        const payloadItems = cartItems
          .map((item) => ({
            productId: item.product?._id || item.productId,
            quantity: item.quantity || 1,
          }))
          .filter((item) => item.productId);

        if (payloadItems.length === 0) {
          setStatus("error");
          setMessage("Keranjang kosong, tidak ada item untuk checkout.");
          return;
        }

        await api.post("/checkout", { items: payloadItems });
        setStatus("success");
        setMessage("Checkout berhasil. Mengarahkan ke riwayat transaksi...");
        setTimeout(() => navigate("/transactions"), 800);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }
        setStatus("error");
        setMessage("Checkout gagal. Silakan coba lagi.");
      }
    };

    processCheckout();
  }, [navigate]);

  return (
    <div className="container">
      <div className="auth-shell card stack">
        <h2 style={{ margin: 0 }}>Checkout</h2>
        <p className="muted" style={{ margin: 0 }}>
          {message}
        </p>
        {status === "error" && (
          <button className="btn-primary" onClick={() => navigate("/cart")}>
            Kembali ke Keranjang
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
