import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const formatTransactionTime = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    api
      .get("/checkout")
      .then((res) => {
        const data = res.data?.data || res.data;
        setTransactions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }
        console.error(err);
        setError("Gagal memuat riwayat transaksi.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="container stack">
      <h2 className="page-title" style={{ marginBottom: 0 }}>
        Riwayat Transaksi
      </h2>

      {loading ? (
        <div className="card muted">Memuat riwayat transaksi...</div>
      ) : error ? (
        <div className="card muted">{error}</div>
      ) : transactions.length === 0 ? (
        <div className="card muted">Belum ada transaksi.</div>
      ) : (
        transactions.map((trx) => (
          <article key={trx._id} className="card stack">
            <div className="transaction-header">
              <h3 style={{ margin: 0 }}>Transaksi #{trx._id.slice(-6)}</h3>
              <p className="muted" style={{ margin: 0 }}>
                Waktu: {formatTransactionTime(trx.createdAt)}
              </p>
            </div>

            <div className="transaction-items">
              {(trx.items || []).map((item, index) => (
                <div
                  key={`${trx._id}-${item.product?._id || index}`}
                  className="transaction-row"
                >
                  <span>{item.product?.name || "Produk"}</span>
                  <span className="transaction-qty">x{item.quantity || 0}</span>
                </div>
              ))}
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default Transactions;
