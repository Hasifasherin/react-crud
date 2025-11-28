import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../Utils/baseUrl.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken,"-------------");
    
    const storedUser = localStorage.getItem("authUser");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(storedUser);
    setLoading(false);
  },[]);

  const login = async (username, password) => {
    try {
      // console.log(username, password,'----------------------');
      
      const res = await api.post("/login", { email: username, password });
      // console.log(res , '----------------->>>>>');
      
      if (res.data.success) {
        // console.log(res.data.user.email, '---------------------');
        
        setUser(res.data.user.email);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authUser", res.data.user.email);
        toast.success(res.data.message);
        return true;
      }
      toast.error(res.data.message || "Login failed");
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    toast.info("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
