import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: input,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 500, margin: "auto" }}>
      <h1>💬 Chat en Tiempo Real</h1>
      <div style={{
        height: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem"
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "0.5rem" }}>{msg.text}</div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ width: "70%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem" }}>Enviar</button>
      </form>
    </div>
  );
}

export default App;
