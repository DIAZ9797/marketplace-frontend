import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const truncateDescription = (text = "") => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 5) return words.join(" ");
    return `${words.slice(0, 5).join(" ")}...`;
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image-wrap">
          <img
            src={`https://picsum.photos/seed/${product._id}/600/400`}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-body">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-series">{truncateDescription(product.description)}</p>
          <p className="product-price">
            Rp {product.price ? product.price.toLocaleString() : "0"}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
