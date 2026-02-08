import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil dibuat!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="auth-shell card stack">
        <h2 style={{ margin: 0 }}>Konfirmasi Pesanan</h2>
        <form onSubmit={handleSubmit} className="stack">
          <div className="form-group">
            <label>Nama Penerima</label>
            <input type="text" required className="input" />
          </div>
          <div className="form-group">
            <label>Alamat Lengkap</label>
            <input type="text" required className="input" />
          </div>
          <div className="form-group">
            <label>Nomor WhatsApp</label>
            <input type="number" required className="input" />
          </div>
          <button type="submit" className="btn-success">
            Bayar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
