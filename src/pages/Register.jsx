import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { name, email, password });
      alert("Daftar berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      alert("Gagal daftar");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      textAlign: "center",
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
      <h2>Daftar Akun</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>
          Daftar
        </button>
      </form>
      <Link
        to="/login"
        style={{ display: "block", marginTop: "15px", color: "#007bff" }}
      >
        Sudah punya akun? Login
      </Link>
    </div>
  );
};

export default Register;
