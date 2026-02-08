import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Kita akan pakai ini sekarang

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // PERBAIKAN: Gunakan navigate agar tidak refresh halaman (SPA)
      // window.location.href = "/"; <--- HAPUS INI
      navigate("/"); // <--- PAKAI INI
      window.location.reload(); // Reload sedikit diperlukan agar Navbar update status login
    } catch (err) {
      alert("Login gagal, cek email/password");
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
      background: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          Masuk
        </button>
      </form>
      <Link
        to="/register"
        style={{ display: "block", marginTop: "15px", color: "#007bff" }}
      >
        Belum punya akun? Daftar
      </Link>
    </div>
  );
};

export default Login;
