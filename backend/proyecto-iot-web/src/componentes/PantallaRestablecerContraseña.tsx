import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PantallaRestablecerContraseña: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Obtiene el token de la URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Enviar la nueva contraseña al backend
      const response = await axios.post("http://localhost:8082/api/users/reset-password", {
        token,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage((response.data as { message: string }).message);
      setError("");

      // Redirigir al login después de un tiempo
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Restablecer Contraseña</h2>
      <form onSubmit={handleResetPassword} style={styles.form}>
        <label style={styles.label}>Nueva Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Confirmar Contraseña:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Restablecer Contraseña
        </button>
      </form>

      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}
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
  successMessage: { marginTop: "20px", fontSize: "14px", color: "#28a745" },
  errorMessage: { marginTop: "20px", fontSize: "14px", color: "#dc3545" },
};

export default PantallaRestablecerContraseña;