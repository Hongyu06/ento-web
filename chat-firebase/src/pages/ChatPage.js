import { useState, useEffect, useContext, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { UserContext } from "../context/UserContext";

export default function ChatPage() {
  const { user, darkMode } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: input,
      user,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: 600,
        margin: "auto",
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#eee" : "#000",
        minHeight: "90vh",
      }}
    >
      <h1>💬 Chat en Tiempo Real</h1>
      <p>Usuario: <b>{user}</b></p>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: darkMode ? "#333" : "#fafafa",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: "0.5rem",
              fontWeight: msg.user === user ? "bold" : "normal",
            }}
          >
            <span style={{ color: "teal" }}>{msg.user}: </span>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
