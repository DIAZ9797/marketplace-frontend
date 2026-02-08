import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data.data || res.data))
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat produk.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Katalog Produk</h2>
      {loading ? (
        <div className="card muted">Memuat produk...</div>
      ) : error ? (
        <div className="card muted">{error}</div>
      ) : products.length === 0 ? (
        <div className="card muted">Belum ada produk.</div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
