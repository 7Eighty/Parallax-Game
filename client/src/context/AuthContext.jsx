import React, { createContext, useContext, useState } from "react";
import UserApi from "../entities/UserApi.js";
import { setAccessToken } from "../shared/lib/axiosInstance.js";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await UserApi.login({ email, password });

      if (response.statusCode === 200 && response.data) {
        const { accessToken, user: userData } = response.data;
        setAccessToken(accessToken);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", accessToken);
        return true;
      } else {
        console.error("Login failed:", response.message);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (user_name, email, password) => {
    setLoading(true);
    try {
      const response = await UserApi.register({ user_name, email, password });

      if (response.statusCode === 200 && response.data) {
        const { accessToken, user: userData } = response.data;
        setAccessToken(accessToken);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", accessToken);
        return true;
      } else {
        console.error("Registration failed:", response.message);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await UserApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAccessToken("");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  };

  // Проверяем сохраненного пользователя и токен при загрузке
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("accessToken");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedToken);
    }
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
