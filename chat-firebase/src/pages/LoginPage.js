import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    const trimmed = name.trim();

    // Guardar usuario como "conectado"
    await setDoc(doc(db, "users", trimmed), {
      name: trimmed,
      lastSeen: serverTimestamp(),
    });

    setUser(trimmed);
    navigate("/chat");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 400, margin: "auto" }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tu nombre de usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem", width: "100%" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
