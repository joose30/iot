import React, { useState } from "react";
import { Link } from "react-router-dom";

const PantallaInicio: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>("Empresa");

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        {/* Barra Superior */}
        <div style={styles.topBar}>
          <h1 style={styles.logo}>SEGURIX</h1>
        </div>

        {/* Sección Hero */}
        <div style={styles.heroSection}>
          <img
            src="../images/puertaIOT-pantallaPrincipal.jpg"
            alt="Puerta Inteligente"
            style={styles.heroImage}
          />
          <h2 style={styles.heroTitle}>Bienvenido a Segurix</h2>
          <p style={styles.heroSubtitle}>
            La solución inteligente para controlar y asegurar tus dispositivos IoT.
          </p>
        </div>

        {/* Sección de Preguntas Frecuentes */}
        <div style={styles.faqSection}>
          <div style={styles.faqItem}>
            <p style={styles.faqTitle}>Preguntas Frecuentes</p>
            <p>¿Para qué sirve Segurix?</p>
          </div>
          <div style={styles.faqItem}>
            <p>¿Cómo conectar mi dispositivo IoT?</p>
          </div>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <button style={styles.logoutButton}>Cerrar sesión</button>
    </div>
  );
};

// 🎨 **Estilos optimizados sin cambios exagerados**
const styles: { [key: string]: React.CSSProperties } = {
  screen: {
    flex: 1,
    backgroundColor: "#E3EAFD",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  cardContainer: {
    width: "1200px",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
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
  /* Menú Opciones en horizontal */
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "15px",
    backgroundColor: "#FFFFFF",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
  },
  menuOption: {
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
    padding: "10px 20px",
    transition: "color 0.3s ease, transform 0.2s",
    fontWeight: "500",
    color: "#333",
  },
  menuOptionActive: {
    borderBottom: "3px solid #FF3B3B",
    fontWeight: "bold",
    transform: "translateY(-2px)",
    color: "#D32F2F",
  },
  /* Sección Hero */
  heroSection: {
    marginTop: "30px",
    textAlign: "center",
  },
  heroImage: {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  heroTitle: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1E1E1E",
    marginTop: "18px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#4A4A4A",
    marginTop: "8px",
    marginBottom: "12px",
  },
  /* Sección Preguntas Frecuentes */
  faqSection: {
    marginTop: "35px",
  },
  faqItem: {
    backgroundColor: "#F5F5F5",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  faqTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: "5px",
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
    cursor: "pointer",
    transition: "color 0.2s",
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "10px",
    textTransform: "uppercase",
  },
  /* Botón de Cerrar Sesión */
  logoutButton: {
    marginTop: "30px",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    padding: "14px 30px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default PantallaInicio;
