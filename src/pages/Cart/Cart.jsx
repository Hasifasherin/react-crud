import React from "react";
import { useCart } from "../../context/CartContext.jsx";
import "./Cart.css";

const Cart = () => {
  const { cart, removeItem, increaseQty, decreaseQty } = useCart();

  console.log("Cart component rendered. Current cart:", cart);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-text">Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-card" key={item._id}>
              <img
                src={item.product.image}
                alt={item.product.title}
                className="cart-img"
              />
              <div className="cart-info">
                <h3 className="cart-name">{item.product.title}</h3>
                <p className="cart-price">₹{item.product.price * item.quantity}</p>
                <div className="qty-box">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-total-box">
          <h3>
            Total:{" "}
            <span className="total-price">
              ₹{cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
            </span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
