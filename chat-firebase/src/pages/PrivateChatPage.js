import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import styles from "./PrivateChatPage.module.css";

export default function PrivateChatPage() {
  const { toUser } = useParams();
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const chatId = [user, toUser].sort().join("_");

  useEffect(() => {
    const q = query(
      collection(db, "privateChats", chatId, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    await addDoc(collection(db, "privateChats", chatId, "messages"), {
      text: input,
      user,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chat privado con {toUser}</h2>
      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div key={i} className={styles.message}>
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className={styles.form}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje"
        />
        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
