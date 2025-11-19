import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo" className="footer-logo" />

      <ul className="footer-links">
        <li><a href="/" className="footer-link">Home</a></li>
        <li><a href="/about" className="footer-link">About Us</a></li>
        <li><a href="/contact" className="footer-link">Contact Us</a></li>
      </ul>

      <div className="footer-social">
        <FaFacebookF className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaYoutube className="social-icon" />
      </div>

      <p className="footer-copy">© 2025 MyApp. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
