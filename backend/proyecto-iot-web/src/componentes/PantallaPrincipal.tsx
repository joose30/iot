// Ruta IntegradoraWEB\frontend\proyecto-iot-web\src\componentes\PantallaPrincipal.tsx <-Ruta
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Configuración del ícono del marcador (necesario para React Leaflet)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Interfaz para las preguntas frecuentes
interface FAQ {
  _id: string;
  pregunta: string;
  respuesta: string;
}

const PantallaInicio: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>("Empresa");
  const [userName, setUserName] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [error, setError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el nombre del usuario desde localStorage
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }

    // Cargar preguntas frecuentes desde el backend
    const fetchFAQs = async () => {
      try {
        setLoadingFaqs(true);
        const response = await axios.get<FAQ[]>("http://iot-production-7391.up.railway.app/api/preguntasFrecuentes");
        setFaqs(response.data);
        setError("");
      } catch (err) {
        console.error("Error al cargar preguntas frecuentes:", err);
        setError("No se pudieron cargar las preguntas frecuentes");
        // Datos de respaldo en caso de error
        setFaqs([
          { _id: "1", pregunta: "¿Para qué sirve Segurix?", respuesta: "Segurix es una plataforma para gestionar y controlar dispositivos IoT de seguridad." },
          { _id: "2", pregunta: "¿Cómo conectar mi dispositivo IoT?", respuesta: "Ve a la sección de dispositivos y sigue las instrucciones de configuración." },
        ]);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFAQs();
  }, []);

  // Función para alternar la visibilidad de la respuesta
  const toggleFaqExpansion = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  // Coordenadas de Huejutla de Reyes, Hidalgo
  const huejutlaLocation: L.LatLngExpression = [21.1416751, -98.4201608];

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
            src="https://res.cloudinary.com/dnwpy45qa/image/upload/v1742828362/zvpz8trkvzartzl89nes.jpg" // Reemplaza con la URL de tu imagen
            alt="Puerta Inteligente"
            style={styles.heroImage}
          />
          <h2 style={styles.heroTitle}>Bienvenido a Segurix</h2>
          <p style={styles.heroSubtitle}>
            La solución inteligente para controlar y asegurar tus dispositivos IoT.
          </p>
        </div>

        {/* Mapa de ubicación */}
        <div style={styles.mapContainer}>
          <MapContainer
            center={huejutlaLocation} // Coordenadas de Huejutla
            zoom={13} // Nivel de zoom
            style={styles.map}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={huejutlaLocation} icon={icon}>
              <Popup>
                Huejutla de Reyes, Hidalgo
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Sección de Preguntas Frecuentes */}
        <div style={styles.faqSection}>
          <h3 style={styles.faqTitle}>Preguntas Frecuentes</h3>

          {loadingFaqs ? (
            <div style={styles.loadingContainer}>
              <p>Cargando preguntas...</p>
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <p>{error}</p>
            </div>
          ) : (
            faqs.map((faq) => (
              <div key={faq._id} style={styles.faqItem}>
                <div
                  style={styles.faqQuestion}
                  onClick={() => toggleFaqExpansion(faq._id)}
                >
                  <p style={styles.faqQuestionText}>{faq.pregunta}</p>
                  <span style={styles.faqToggleIcon}>
                    {expandedFaq === faq._id ? "▲" : "▼"}
                  </span>
                </div>

                {expandedFaq === faq._id && (
                  <div style={styles.faqAnswer}>
                    <p style={styles.faqAnswerText}>{faq.respuesta}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
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
  /* Mapa */
  mapContainer: {
    marginTop: "20px",
    height: "400px", // Altura del mapa
    borderRadius: "12px",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
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
    cursor: "pointer",
  },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1E1E1E",
  },
  faqToggleIcon: {
    fontSize: "14px",
    color: "#1E1E1E",
  },
  faqAnswer: {
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #E0E0E0",
  },
  faqAnswerText: {
    fontSize: "14px",
    color: "#333",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "20px",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default PantallaInicio;