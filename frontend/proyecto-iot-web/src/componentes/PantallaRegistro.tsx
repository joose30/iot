import React, { useState } from "react";
import axios from "axios";

const PantallaRegistro: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8082/api/users/register", {
        name,
        lastName,
        surname,
        phone,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Usuario registrado exitosamente");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message || "Error al registrar el usuario");
      } else {
        alert("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrarse</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <label style={styles.label}>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
          style={styles.input}
        />

        <label style={styles.label}>Apellido paterno</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ingresa tu apellido paterno"
          required
          style={styles.input}
        />

        <label style={styles.label}>Apellido materno</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Ingresa tu apellido materno"
          required
          style={styles.input}
        />

        <label style={styles.label}>Teléfono</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingresa tu teléfono"
          required
          style={styles.input}
        />

        <label style={styles.label}>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
          required
          style={styles.input}
        />

        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Registrarse
        </button>
      </form>
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
};

export default PantallaRegistro;