import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "../../App.css";
import api from "../../Utils/baseUrl.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email: username, password });
      console.log(response.data, "Login  response");
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }

  };
  return (
    <div className="container">
      <div className="box">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
