import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PantallaRegistros: React.FC = () => {
  const [registros, setRegistros] = useState<any[]>([]); // Estado para almacenar los registros
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar el cargando

  // Función para obtener los registros desde el backend
  const obtenerRegistros = async () => {
    try {
      const response = await axios.get("http://192.168.8.3:8082/api/door/registros"); // Ruta del backend
      setRegistros(response.data); // Almacena los registros en el estado
      setLoading(false); // Desactiva el estado de cargando
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      alert("Error al obtener los registros");
      setLoading(false); // Desactiva el estado de cargando incluso si hay error
    }
  };

  // useEffect para cargar los registros al montar el componente
  useEffect(() => {
    obtenerRegistros();
  }, []);

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        <h2 style={styles.encabezado}>Registros</h2>

        {/* Mostrar estado de cargando */}
        {loading ? (
          <p>Cargando registros...</p>
        ) : registros.length > 0 ? (
          <ul style={styles.listaRegistros}>
            {registros.map((registro) => (
              <li key={registro._id} style={styles.registroItem}>
                <strong>{registro.mensaje}</strong>: {registro.descripcion} <br />
                <small>{new Date(registro.fecha).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay registros disponibles.</p>
        )}

        {/* Botón para regresar */}
        <Link to="/" style={styles.botonRegresar}>
          Regresar
        </Link>
      </div>
    </div>
  );
};

// 🎨 **Estilos en JavaScript**
const styles: { [key: string]: React.CSSProperties } = {
  screen: {
    flex: 1,
    backgroundColor: "#E3EAFD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  cardContainer: {
    width: "800px",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
  },
  encabezado: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: "20px",
  },
  listaRegistros: {
    listStyleType: "none",
    padding: 0,
    textAlign: "left",
  },
  registroItem: {
    backgroundColor: "#F5F5F5",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  botonRegresar: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default PantallaRegistros;