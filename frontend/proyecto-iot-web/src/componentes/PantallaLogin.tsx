import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Definir la interfaz para la respuesta del servidor
interface LoginResponse {
  message: string;
  name: string;
  role: string;
}

const PantallaLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar las credenciales al backend
      const response = await axios.post<LoginResponse>(
        "http://localhost:8082/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Si el inicio de sesión es exitoso
      alert(response.data.message); // Mensaje del servidor

      // Guardar el nombre y rol del usuario en localStorage
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userRole", response.data.role);

      // Redirigir según el rol
      if (response.data.role === "admin") {
        navigate("/admin-dashboard"); // Redirige al dashboard de admin
      } else {
        navigate("/home"); // Redirige a la página principal para usuarios
      }
    } catch (error: any) {
      // Manejo de errores
      if (error.response) {
        alert(error.response.data.message); // Mensaje de error del servidor
      } else {
        alert("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Ingresar
        </button>
      </form>
      <p>
        ¿No tienes una cuenta?{" "}
        <a href="/register" style={{ color: "#007bff", textDecoration: "none" }}>
          Regístrate aquí
        </a>
      </p>
      <p>
        ¿Olvidaste tu contraseña?{" "}
        <a href="/recover-password" style={{ color: "#007bff", textDecoration: "none" }}>
          Recuperar contraseña
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
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  label: { fontSize: "14px", fontWeight: "bold", marginBottom: "5px", textAlign: "left" },
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
};

export default PantallaLogin;