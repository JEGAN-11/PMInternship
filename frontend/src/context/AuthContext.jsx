import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/users/me")
        .then((res) => {
          setUser({ token, profile: res.data });
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const profileRes = await axios.get("/users/me");
      setUser({ token, profile: profileRes.data });
      return { token, profile: profileRes.data };
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post("/auth/register", { name, email, password });
      return res.data;
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // 🔹 New: Update profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put("/users/me", profileData);
      const updatedProfile = res.data;
      setUser((prev) => ({ ...prev, profile: updatedProfile }));
      return updatedProfile;
    } catch (err) {
      console.error("Profile update failed:", err);
      throw err;
    }
  };

  const isProfileComplete = () => {
    if (!user?.profile) return false;
    const { bio } = user.profile;
    // Consider a profile complete if they've at least filled in the bio
    // You can adjust this logic based on what fields are truly required
    return !!bio;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, isProfileComplete, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
