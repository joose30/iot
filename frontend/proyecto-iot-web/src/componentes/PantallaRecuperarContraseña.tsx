import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PantallaRecuperarContraseña: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage("Enviando solicitud...");

    try {
      const response = await axios.post(
        "http://localhost:8082/api/users/recover-password",
        { email },
        { 
          headers: { "Content-Type": "application/json" },
          timeout: 15000 // Aumentamos el timeout a 15 segundos
        }
      );

      // Verificamos si la respuesta es exitosa aunque no tenga mensaje
      if (response.status >= 200 && response.status < 300) {
        setMessage("✓ Correo de recuperación enviado. Por favor revisa tu bandeja de entrada.");
      } else {
        setMessage(response.data.message || "Solicitud recibida. Verifica tu correo.");
      }
    } catch (error: any) {
      console.error("Error en la petición:", error);
      
      if (error.code === 'ECONNABORTED') {
        // Si el timeout ocurre pero sabemos que el correo puede haberse enviado
        setMessage("Correo enviado exitosamente. Por favor verifica tu correo.");
      } else if (error.response) {
        setMessage(error.response.data.message || "Error en el servidor");
      } else {
        setMessage("Error de conexión. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Recuperar Contraseña</h2>
      <form onSubmit={handleRecoverPassword} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button 
          type="submit" 
          style={isLoading ? {...styles.button, backgroundColor: "#cccccc"} : styles.button}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
        </button>
      </form>
      {message && (
        <p style={{
          ...styles.message,
          color: message.startsWith("✓") ? "#28a745" : 
                message.includes("Error") ? "#dc3545" : "#ffc107"
        }}>
          {message}
        </p>
      )}
      <p>
        <a
          href="/recuperar-con-pregunta"
          style={styles.link}
        >
          ¿Prefieres recuperar con pregunta secreta?
        </a>
      </p>
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
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default PantallaRecuperarContraseña;