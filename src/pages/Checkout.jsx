import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/checkout", {
        receiverName: name,
        address,
        phone,
      });
      alert("Pesanan berhasil dibuat!");
      navigate("/transactions");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat pesanan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-shell card stack">
        <h2 style={{ margin: 0 }}>Konfirmasi Pesanan</h2>
        <form onSubmit={handleSubmit} className="stack">
          <div className="form-group">
            <label>Nama Penerima</label>
            <input
              type="text"
              required
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Alamat Lengkap</label>
            <input
              type="text"
              required
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nomor WhatsApp</label>
            <input
              type="number"
              required
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-success" disabled={submitting}>
            {submitting ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
