import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert("Login gagal, cek email/password");
    }
  };

  return (
    <div className="container">
      <div className="auth-shell card stack">
        <h2 style={{ margin: 0 }}>Masuk Akun</h2>
        <form onSubmit={handleLogin} className="stack">
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
          <button type="submit" className="btn-primary">
            Masuk
          </button>
        </form>
        <Link to="/register" className="auth-link">
          Belum punya akun? Daftar
        </Link>
      </div>
    </div>
  );
};

export default Login;
