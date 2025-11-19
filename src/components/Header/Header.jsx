import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import "./Header.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Auto close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </nav>

      <div className="header-right" ref={menuRef}>
        {/* User Icon */}
        <FiUser
          size={32}
          className="user-icon"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />

        {dropdownOpen && (
          <div className="dropdown">

            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/cart");
                setDropdownOpen(false);
              }}
            >
              View Cart
            </div>

            <div
              className="dropdown-item logout"
              onClick={() => {
                handleLogout();
                setDropdownOpen(false);
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
