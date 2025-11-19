import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Home from "./pages/Home/Home.jsx";     // <-- IMPORTANT: Fix path
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Login from "./pages/Login/Login.jsx";

import ProductDetails from "./components/Home/ProductDetails.jsx";
import AddProduct from "./components/Home/AddProduct.jsx";

import Cart from "./pages/Cart/Cart.jsx";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-layout">

          {user && <Header />}

          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
              <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
              <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            </Routes>
          </div>

          {user && <Footer />}
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
