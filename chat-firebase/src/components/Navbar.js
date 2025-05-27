import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, darkMode } = useContext(UserContext);

  return (
    <nav
      className={`${styles.navbar} ${
        darkMode ? styles.darkBackground : styles.lightBackground
      }`}
    >
      <div>
        <Link to="/" className={styles.logo}>
          ChatApp
        </Link>
      </div>

      <div className={styles.menu}>
        <Link to="/" className={styles.link}>
          Inicio
        </Link>

        {user ? (
          <>
            <Link to="/chat" className={styles.link}>
              Chat
            </Link>

            <Link to="/users" className={styles.link}>
              Usuarios
            </Link>

            <Link to="/settings" className={styles.link}>
              Configuración
            </Link>
          </>
        ) : (
          <Link to="/login" className={styles.link}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
