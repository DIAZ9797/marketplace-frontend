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

  return (
    <div className="container">
      <div className="auth-shell card stack">
        <h2 style={{ margin: 0 }}>Daftar Akun</h2>
        <form onSubmit={handleRegister} className="stack">
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="btn-success">
            Daftar
          </button>
        </form>
        <Link to="/login" className="auth-link">
          Sudah punya akun? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
