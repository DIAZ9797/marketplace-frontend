import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]); // <--- PERBAIKAN: Tambahkan navigate di sini

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil dibuat!");
    navigate("/");
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      boxSizing: "border-box",
    },
    btn: {
      width: "100%",
      padding: "10px",
      background: "green",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Konfirmasi Pesanan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Penerima"
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Alamat Lengkap"
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Nomor WhatsApp"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>
          Bayar Sekarang
        </button>
      </form>
    </div>
  );
};

export default Checkout;
