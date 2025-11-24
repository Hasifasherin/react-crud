import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import ProductDetails from "./components/Home/ProductDetails.jsx";
import AddProduct from "./components/Home/AddProduct.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  const location = useLocation();

  // Hide Header and Footer on login & signup
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Header />}
      <div className="main-content">{children}</div>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" />

        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
