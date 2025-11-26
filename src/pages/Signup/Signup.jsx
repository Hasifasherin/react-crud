import React, { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import "../../App.css";
import api from "../../Utils/baseUrl.js";


function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/signup", { username, email, password });
            console.log(response.data, "Signup response");

            //check signup successful then go to login page 
            if (response.data.success === true ) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="container">
            <div className="box">
                <h2 className="title">Signup</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        Signup 
                    </button> 
                </form> 
                <Link to="/login" className="link">Already have an account. Login</Link>

            </div> 
        </div>
    );
}

export default Signup;
