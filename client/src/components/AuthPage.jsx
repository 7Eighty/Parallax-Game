import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let success = false;

      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(
          formData.user_name,
          formData.email,
          formData.password
        );
      }

      if (success) {
        navigate("/");
      } else {
        setError(
          isLogin ? "Неверный email или пароль" : "Ошибка при регистрации"
        );
      }
    } catch (err) {
      console.error("Auth error:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Произошла ошибка. Попробуйте еще раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isLoading = loading || authLoading;

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">
            {isLogin ? "Войти в игру" : "Регистрация"}
          </h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="user_name">Никнейм</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Введите никнейм"
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Введите email"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Введите пароль"
                disabled={isLoading}
              />
              {!isLogin && (
                <small className="password-hint">
                  Пароль должен содержать: заглавную букву, строчную букву,
                  цифру, специальный символ (!@#$%^&*()-,.?":{}|&lt;&gt;) и быть
                  не менее 8 символов
                </small>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Загрузка..."
                : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({ user_name: "", email: "", password: "" });
                }}
                className="switch-button"
                disabled={isLoading}
              >
                {isLogin ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
