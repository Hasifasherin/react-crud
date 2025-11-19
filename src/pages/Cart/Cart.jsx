import React from "react";
import { useCart } from "../../context/CartContext.jsx";
import "./Cart.css";

const Cart = () => {
  const { cart, removeItem, increaseQty, decreaseQty } = useCart();

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-text">Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-img" />

              <div className="cart-info">
                <h3 className="cart-name">{item.title}</h3>
                <p className="cart-price">₹{item.price}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
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
              ₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
            </span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
