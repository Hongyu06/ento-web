import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserProvider, UserContext } from "./context/UserContext";

// Páginas
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";
import PrivateChatPage from "./pages/PrivateChatPage";

// Componentes
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { darkMode } = useContext(UserContext);

  // Aplica clase de modo oscuro al body
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="/chat/:toUser" element={<PrivateRoute><PrivateChatPage /></PrivateRoute>} />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        {/* Ruta 404 */}
        <Route path="*" element={<h1 style={{ padding: "2rem" }}>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
}
