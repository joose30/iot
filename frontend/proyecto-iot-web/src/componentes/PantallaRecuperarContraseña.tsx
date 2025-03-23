import React, { useState } from "react";
import axios from "axios";

const PantallaRecuperarContraseña: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8082/api/users/recover-password", {
        email,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
        <button type="submit" style={styles.button}>
          Enviar enlace de recuperación
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "Arial, sans-serif", textAlign: "center" as "center" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", width: "300px", padding: "20px", borderRadius: "5px", backgroundColor: "#fff", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" },
  label: { fontSize: "14px", fontWeight: "bold", marginBottom: "5px", textAlign: "left" as "left" },
  input: { padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", width: "100%" },
  button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" },
  message: { marginTop: "20px", fontSize: "14px", color: "#28a745" },
};

export default PantallaRecuperarContraseña;