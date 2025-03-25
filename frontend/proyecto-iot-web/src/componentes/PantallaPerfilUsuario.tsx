import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

const PantallaPerfilUsuario: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        const response = await axios.get("http://localhost:8082/api/users/usuario", {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        });
        setUser(response.data);
        setError("");
      } catch (err) {
        console.error("Error al cargar los datos del usuario:", err);
        setError("No se pudieron cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserData();
  };

  const updateUserData = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      const response = await axios.put(
        "http://localhost:8082/api/users/usuario",
        {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        }
      );
      setSuccessMessage("Datos actualizados correctamente.");
      setError("");
    } catch (err) {
      console.error("Error al actualizar los datos del usuario:", err);
      setError("No se pudieron actualizar los datos.");
      setSuccessMessage("");
    }
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Perfil del Usuario</h2>
      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nombre:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Apellido:</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Correo Electrónico:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
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
  error: {
    color: "red",
    marginBottom: "15px",
    textAlign: "center",
  },
  success: {
    color: "green",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default PantallaPerfilUsuario;