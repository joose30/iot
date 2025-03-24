import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const GestionarUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        const response = await axios.get<User[]>("http://localhost:8082/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        });
        setUsers(response.data);
        setError("");
      } catch (err) {
        console.error("Error al cargar los usuarios:", err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Manejar la eliminación de un usuario
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8082/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
      alert("Usuario eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestionar Usuarios</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Correo</th>
            <th style={styles.th}>Rol</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <button style={styles.buttonEdit}>Editar</button>
                <button
                  style={styles.buttonDelete}
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  th: { border: "1px solid #ddd", padding: "10px", backgroundColor: "#f4f4f4", textAlign: "left" },
  td: { border: "1px solid #ddd", padding: "10px" },
  buttonEdit: { marginRight: "10px", padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  buttonDelete: { padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default GestionarUsuarios;