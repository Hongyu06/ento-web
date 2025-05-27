import { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import styles from "./UsersPage.module.css";

export default function UsersPage() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const allUsers = snapshot.docs.map((doc) => doc.data().name);
      setUsers(allUsers.filter((u) => u !== user));
    };
    loadUsers();
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuarios Conectados</h1>
      <ul className={styles.userList}>
        {users.map((u) => (
          <li key={u} className={styles.userItem}>
            <Link to={`/chat/${u}`} className={styles.userLink}>
              💬 Chatear con {u}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
