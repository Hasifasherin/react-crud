import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { toast } from "react-toastify";
import "./ProductDetails.css";
import api from "../../Utils/baseUrl.js";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/admin/products/${id}`);
        setProduct(res.data.product);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <h2 className="loading-text">Loading Product...</h2>;
  if (!product) return <h2 className="loading-text">Product not found</h2>;

  const handleAddCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      <div className="product-details-card">
        <div className="product-left">
          <img
            src={product.image}
            alt={product.title}
            className="product-img"
          />
        </div>

        <div className="product-right">
          <h2 className="product-title">{product.title}</h2>
          <h3 className="product-price">₹{product.price}</h3>
          <p className="product-category">
            Category: <span>{product.category}</span>
          </p>
          <p className="product-description">{product.description}</p>
          <button className="cart-btn" onClick={handleAddCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
  