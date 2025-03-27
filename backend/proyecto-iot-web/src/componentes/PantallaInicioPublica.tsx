import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface FAQ {
  _id: string;
  pregunta: string;
  respuesta: string;
}

const PantallaInicioPublica: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [error, setError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const huejutlaLocation: L.LatLngExpression = [21.1416751, -98.4201608];

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoadingFaqs(true);
        const response = await axios.get<FAQ[]>("http://iot-production-7391.up.railway.app/api/preguntasFrecuentes");
        setFaqs(response.data);
        setError("");
      } catch (err) {
        console.error("Error al cargar preguntas frecuentes:", err);
        setError("No se pudieron cargar las preguntas frecuentes");
        setFaqs([
          { 
            _id: "1", 
            pregunta: "¿Para qué sirve Segurix?", 
            respuesta: "Segurix es una plataforma para gestionar y controlar dispositivos IoT de seguridad." 
          },
          { 
            _id: "2", 
            pregunta: "¿Cómo conectar mi dispositivo IoT?", 
            respuesta: "Ve a la sección de dispositivos y sigue las instrucciones de configuración." 
          },
        ]);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFaqExpansion = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div style={styles.screen as React.CSSProperties}>
      <div style={styles.cardContainer as React.CSSProperties}>
        <div style={styles.heroSection as React.CSSProperties}>
          <img
            src="https://res.cloudinary.com/dnwpy45qa/image/upload/v1742828362/zvpz8trkvzartzl89nes.jpg"
            alt="Puerta Inteligente"
            style={styles.heroImage as React.CSSProperties}
          />
          <h2 style={styles.heroTitle as React.CSSProperties}>Bienvenido a Segurix</h2>
          <p style={styles.heroSubtitle as React.CSSProperties}>
            La solución inteligente para controlar y asegurar tus dispositivos IoT.
          </p>
        </div>

        <div style={styles.mapContainer as React.CSSProperties}>
          <MapContainer center={huejutlaLocation} zoom={13} style={styles.map as React.CSSProperties}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={huejutlaLocation} icon={icon}>
              <Popup>Huejutla de Reyes, Hidalgo</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Sección de Preguntas Frecuentes */}
        <div style={styles.faqSection as React.CSSProperties}>
          <h3 style={styles.faqTitle as React.CSSProperties}>Preguntas Frecuentes</h3>

          {loadingFaqs ? (
            <div style={styles.loadingContainer as React.CSSProperties}>
              <p>Cargando preguntas...</p>
            </div>
          ) : error ? (
            <div style={styles.errorContainer as React.CSSProperties}>
              <p>{error}</p>
            </div>
          ) : (
            faqs.map((faq) => (
              <div key={faq._id} style={styles.faqItem as React.CSSProperties}>
                <div
                  style={styles.faqQuestion as React.CSSProperties}
                  onClick={() => toggleFaqExpansion(faq._id)}
                >
                  <p style={styles.faqQuestionText as React.CSSProperties}>{faq.pregunta}</p>
                  <span style={styles.faqToggleIcon as React.CSSProperties}>
                    {expandedFaq === faq._id ? "▲" : "▼"}
                  </span>
                </div>

                {expandedFaq === faq._id && (
                  <div style={styles.faqAnswer as React.CSSProperties}>
                    <p style={styles.faqAnswerText as React.CSSProperties}>{faq.respuesta}</p>
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

const styles = {
  screen: {
    flex: 1,
    backgroundColor: "#E3EAFD",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  cardContainer: {
    width: "1200px",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
    margin: "20px auto",
  },
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
  mapContainer: {
    marginTop: "20px",
    height: "400px",
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
  faqTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  }
};

export default PantallaInicioPublica;