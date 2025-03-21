import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PantallaPuerta: React.FC = () => {
  const [puertaAbierta, setPuertaAbierta] = useState(false);

  const handleTogglePuerta = async () => {
    try {
      const url = puertaAbierta
        ? "http://192.168.8.6:8082/api/door/cerrar"  // MI IPCONFIG
        : "http://192.168.8.6:8082/api/door/abrir";
      const response = await axios.get(url);
      setPuertaAbierta(!puertaAbierta);
      alert(response.data);
    } catch (error) {
      console.error("Error al controlar la puerta:", error);
      alert("Error al controlar la puerta");
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        {/* Barra Superior */}
        <div style={styles.topBar}>
          <h1 style={styles.logo}>SEGURIX</h1>
          <div style={styles.menuContainer}>
            {[
              { name: "Empresa", path: "/empresa" },
              { name: "Productos", path: "/productos" },
              { name: "Huella", path: "/huella" },
              { name: "Dispositivo IoT", path: "/dispositivo" },
              { name: "RFID", path: "/rfid" },
              { name: "Perfil", path: "/perfil" },
              { name: "Admin (agg prod)", path: "/admin-productos" },
            ].map((option) => (
              <Link key={option.name} to={option.path} style={styles.menuOption}>
                {option.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contenido principal */}
        <div style={styles.contentContainer}>
          <h2 style={styles.encabezado}>Dispositivo IoT</h2>

          {/* Ícono de la puerta */}
          <div style={styles.iconoPuerta}>
            {puertaAbierta ? "🚪 Abierta" : "🚪 Cerrada"}
          </div>

          {/* Botón para abrir/cerrar */}
          <button style={styles.botonPuerta} onClick={handleTogglePuerta}>
            {puertaAbierta ? "Cerrar puerta" : "Abrir puerta"}
          </button>

          {/* Botones de Configuración y Registros */}
          <div style={styles.bottomButtons}>
            <Link to="/configuracionDispositivo" style={styles.configButton}>
              <span style={styles.buttonIcon}>⚙️</span>
              <span style={styles.configButtonText}>Configuración</span>
            </Link>

            <Link to="/registros" style={styles.configButton}>
              <span style={styles.buttonIcon}>📜</span>
              <span style={styles.configButtonText}>Registros</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <p style={styles.footerText}>Términos y condiciones</p>
            <p style={styles.footerText}>Privacidad</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerTitle}>Contáctanos</p>
            <p style={styles.footerText}>Col. Horacio Camargo</p>
            <p style={styles.footerText}>segurix@mail.com</p>
            <p style={styles.footerText}>+52 774 545 8510</p>
          </div>
        </div>
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
  /* Barra Superior */
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "2px solid #E0E0E0",
    paddingBottom: "12px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1E1E1E",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  /* Menú de Navegación */
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
  /* Contenido principal */
  contentContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  encabezado: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: "20px",
  },
  iconoPuerta: {
    fontSize: "100px",
    marginBottom: "20px",
  },
  botonPuerta: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: "12px 40px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    marginBottom: "30px",
  },
  bottomButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  configButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: "15px",
    padding: "15px 20px",
    textDecoration: "none",
    color: "#1E1E1E",
    fontSize: "16px",
    fontWeight: "500",
    gap: "10px",
  },
  buttonIcon: {
    fontSize: "20px",
  },
  configButtonText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  /* Footer */
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    borderTop: "1px solid #E0E0E0",
    paddingTop: "12px",
    color: "#333",
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    textAlign: "right",
  },
  footerText: {
    fontSize: "16px",
    color: "#2C2C2C",
    marginBottom: "5px",
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "10px",
    textTransform: "uppercase",
  },
};

export default PantallaPuerta;
