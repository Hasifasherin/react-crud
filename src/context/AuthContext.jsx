import { createContext, useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

// const fakeUsers = [
//   { username: "admin", password: "1234" },
//   { username: "user", password: "1234" },
//   { username: "hasifa", password: "abcd" },
// ];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load stored user
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const found = fakeUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      const userData = { username: found.username };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      toast.success(`Welcome, ${found.username}!`);
      return true;
    }

    toast.error("Invalid username or password!");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    toast.info("Logged out successfully!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {!loading && (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
