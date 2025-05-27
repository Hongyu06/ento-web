import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user, setUser, darkMode, setDarkMode } = useContext(UserContext);
  const [newName, setNewName] = useState(user || "");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleSave = () => {
    if (newName.trim() !== "") setUser(newName.trim());
    alert("Nombre actualizado!");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 400, margin: "auto" }}>
      <h1>Configuración</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </label>
        <button
          onClick={handleSave}
          style={{ marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}
        >
          Guardar
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />{" "}
          Modo oscuro
        </label>
      </div>

      <button
        onClick={handleLogout}
        style={{ backgroundColor: "crimson", color: "white", padding: "0.5rem", width: "100%" }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
