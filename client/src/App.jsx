import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DiscussionProvider } from "./context/DiscussionContext.jsx";
import Header from "./components/Header.jsx";
import ParallaxHero from "./components/ParallaxHero.jsx";
import AuthPage from "./components/AuthPage.jsx";
import CommunityPage from "./components/CommunityPage.jsx";
import ScreenshotsPage from "./components/ScreenshotsPage.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <DiscussionProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<ParallaxHero />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/screenshots" element={<ScreenshotsPage />} />
            </Routes>
          </div>
        </Router>
      </DiscussionProvider>
    </AuthProvider>
  );
}

export default App;
