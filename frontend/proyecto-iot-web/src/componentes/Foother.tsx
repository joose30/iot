import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Footer: React.FC = () => {
  const [address, setAddress] = useState<string>("Cargando dirección...");

  useEffect(() => {
    // Coordenadas de Huejutla de Reyes, Hidalgo
    const lat = 21.1416751;
    const lng = -98.4201608;

    // Función para obtener la dirección usando la API de Nominatim
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const displayName = response.data.display_name || "Dirección no disponible";
        setAddress(displayName);
      } catch (error) {
        console.error("Error al obtener la dirección:", error);
        setAddress("Dirección no disponible");
      }
    };

    fetchAddress();
  }, []);

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Términos y condiciones</h3>
          <p style={styles.footerText}>
            Consulta nuestros términos y condiciones para más información.
          </p>
        </div>
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Privacidad</h3>
          <p style={styles.footerText}>
            Respetamos tu privacidad. Conoce nuestra política de privacidad.
          </p>
        </div>
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>CONTÁCTANOS</h3>
          <p style={styles.footerText}>
            {address}<br />
            <a href="mailto:segurix@gmail.com?subject=Consulta&body=Hola,%20me%20gustaría%20obtener%20más%20información." style={styles.emailLink}>
            segurix@gmail.com
            </a><br />
            +52 774 545 8510
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: '20px',
    textAlign: 'center',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerSection: {
    flex: 1,
    margin: '0 10px',
  },
  footerTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  footerText: {
    fontSize: '14px',
    margin: 0,
  },
};

export default Footer;