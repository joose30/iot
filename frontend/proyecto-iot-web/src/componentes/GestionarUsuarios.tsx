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
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<User[]>("http://localhost:8082/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8082/api/users/${editingUser._id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(users.map((user) => (user._id === editingUser._id ? (response.data as User) : user)));
      setEditingUser(null);
      alert("Usuario actualizado correctamente.");
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      alert("No se pudo actualizar el usuario.");
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
      {editingUser && (
        <div style={styles.editForm}>
          <h2>Editar Usuario</h2>
          <label>
            Nombre:
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
          </label>
          <label>
            Rol:
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
            </select>
          </label>
          <button onClick={handleSaveUser}>Guardar</button>
          <button onClick={() => setEditingUser(null)}>Cancelar</button>
        </div>
      )}
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
                <button style={styles.buttonEdit} onClick={() => handleEditUser(user)}>
                  Editar
                </button>
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
  editForm: { marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" },
};

export default GestionarUsuarios;