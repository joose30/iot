import React, { useState } from "react";
import { Link } from "react-router-dom";

const Empresa: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Funciones de navegación (puedes enlazar con React Router)
  const handleMision = () => console.log("Ir a Misión");
  const handleVision = () => console.log("Ir a Visión");
  const handleValores = () => console.log("Ir a Valores");
  const handlePoliticas = () => console.log("Ir a Políticas");

  return (
    <div style={styles.container}>

      {/* Sección Hero */}
      <div style={styles.heroSection}>
        <img
          src="src/images/puertaIOT-pantallaPrincipal.jpg"
          alt="Puerta Inteligente"
          style={styles.heroImage}
        />
      </div>

      {/* Contenido principal */}
      <div style={styles.mainContent}>
        <h2 style={styles.title}>¿Quiénes somos?</h2>
        <p style={styles.parrafo}>
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        {/* Botón desplegable */}
        <button style={styles.dropdownButton} onClick={() => setMenuVisible(!menuVisible)}>
          ¿Quiénes somos?
        </button>

        {/* Menú desplegable */}
        {menuVisible && (
          <div style={styles.dropdownMenu}>
            <button style={styles.menuItem} onClick={handleMision}>Misión</button>
            <button style={styles.menuItem} onClick={handleVision}>Visión</button>
            <button style={styles.menuItem} onClick={handleValores}>Valores</button>
            <button style={styles.menuItem} onClick={handlePoliticas}>Políticas</button>
          </div>
        )}
      </div>
    </div>
  );
};

// 🎨 **Estilos en JavaScript**
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "80%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  menuOption: {
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
  },
  heroSection: {
    textAlign: "center",
    marginTop: "20px",
  },
  heroImage: {
    width: "100%",
    height: "250px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  mainContent: {
    textAlign: "center",
    marginTop: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  parrafo: {
    fontSize: "16px",
    margin: "10px 0",
  },
  dropdownButton: {
    backgroundColor: "#FF3B3B",
    color: "#FFF",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  dropdownMenu: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#F5F5F5",
    borderRadius: "8px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  },
  menuItem: {
    display: "block",
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #DDD",
    background: "none",
    border: "none",
    textAlign: "left",
    width: "100%",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    borderTop: "1px solid #E0E0E0",
    paddingTop: "10px",
    fontSize: "14px",
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    textAlign: "right",
  },
};

export default Empresa;