import React, { useState, useEffect } from "react";
import axios from "axios";

const PantallaRecuperarConPregunta: React.FC = () => {
  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState<{ id: string; pregunta: string }[]>([]);

  useEffect(() => {
    // Obtener las preguntas secretas desde la base de datos
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/users/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error al obtener las preguntas secretas:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleValidateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8082/api/users/validate-question",
        {
          email,
          secretQuestion,
          secretAnswer,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Recuperar con Pregunta Secreta</h2>
      <form onSubmit={handleValidateQuestion} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Pregunta secreta:</label>
        <select
          value={secretQuestion}
          onChange={(e) => setSecretQuestion(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Selecciona una pregunta</option>
          {questions.map((q) => (
            <option key={q.id} value={q.pregunta}>
              {q.pregunta}
            </option>
          ))}
        </select>

        <label style={styles.label}>Respuesta:</label>
        <input
          type="text"
          value={secretAnswer}
          onChange={(e) => setSecretAnswer(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Validar respuesta
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#28a745",
  },
};

export default PantallaRecuperarConPregunta;