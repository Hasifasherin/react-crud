import React, { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "../../App.css";
import api from "../../Utils/baseUrl.js";
import { toast } from "react-toastify";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await api.post("/login", { email: username, password });
      const response = await login(username, password)
      console.log(response, "Login response");

      if (response) {
        navigate("/");
      }
    } catch (error) {
      const msge = error.response?.data?.message || "Login failed";
      toast.error(msge); 
      console.error("Login error:", msge);
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
      <Link to="/signup" className="link">Don't have an account? Create new</Link>

        
      </div>
    </div>
  );
}

export default Login;
