import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (user) {
      // Если пользователь авторизован, начинаем скачивание
      const link = document.createElement("a");
      link.href = "/sample-game-file.zip"; // Имитация файла для скачивания
      link.download = "TheOverthrow-Game.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Если не авторизован, переходим на страницу входа
      navigate("/auth");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          The Overthrow
        </NavLink>

        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/community" className="nav-link">
            Community
          </NavLink>
          <NavLink to="/screenshots" className="nav-link">
            Screenshots
          </NavLink>
          {!user && (
            <NavLink to="/auth" className="nav-link">
              SIGN IN
            </NavLink>
          )}
        </nav>

        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span className="username">Привет, {user.user_name}!</span>
              <button onClick={logout} className="logout-button">
                Выйти
              </button>
            </div>
          ) : null}
          <button onClick={handlePlayClick} className="play-button">
            Play
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
