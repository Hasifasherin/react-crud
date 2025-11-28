import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import api from "../Utils/baseUrl.js";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const { token } = useAuth();
  const [cart, setCart] = useState([]);
const token = localStorage.getItem('token')
  console.log("CartContext initialized. Token:", token);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setCart([]);
        return;
      }

      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched cart:", res.data.cart);

        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Failed to fetch the cart:", err);
        toast.error("Failed to load cart");
      }
    };

    fetchCart();
  }, [token]);

  // Add item 
  const addToCart = async (product) => {
    if (!token) return toast.error("Login required");

    try {
      const res = await api.post(
        "/cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Added to cart:", res.data);
      setCart(res.data.cart);
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // Remove item 
  const removeItem = async (cartItemId) => {
    if (!token) return toast.error("Login required");

    try {
      const res = await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
        data: { cartItemId },
      });

      console.log("Removed from cart:", res.data);
      setCart(res.data.cart);
      toast.success("Removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove from cart");
    }
  };

  // Increase qnty
  const increaseQty = async (cartItemId) => {
    const item = cart.find((i) => i._id === cartItemId);
    if (!item) return;

    try {
      await api.post(
        "/cart",
        { productId: item.product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prev) =>
        prev.map((i) =>
          i._id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Decrease qnty
  const decreaseQty = async (cartItemId) => {
    const item = cart.find((i) => i._id === cartItemId);
    if (!item || item.quantity <= 1) return;

    try {
      await api.post(
        "/cart",
        { productId: item.product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prev) =>
        prev.map((i) =>
          i._id === cartItemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
