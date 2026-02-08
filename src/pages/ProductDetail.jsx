import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAdd = async () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    try {
      await api.post("/cart", { productId: id, quantity: 1 });
      alert("Masuk keranjang!");
    } catch (err) {
      alert("Gagal menambah ke keranjang");
    }
  };

  if (!product) {
    return (
      <div className="container">
        <div className="card muted">Memuat detail produk...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detail-layout">
        <div className="card">
          <div className="detail-image-wrap">
            <img
              src={`https://picsum.photos/seed/${product._id}/600/400`}
              alt={product.name}
              className="detail-image"
            />
          </div>
        </div>
        <div className="card stack">
          <h1 style={{ margin: 0 }}>{product.name}</h1>
          <div className="product-price" style={{ fontSize: "1.35rem" }}>
            Rp {product.price.toLocaleString()}
          </div>
          <p className="stock-info">Stok: {product.stock ?? 0}</p>
          <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
            {product.description}
          </p>
          <button onClick={handleAdd} className="btn-primary">
            + Tambah Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
