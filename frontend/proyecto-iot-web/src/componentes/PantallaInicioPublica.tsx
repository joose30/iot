import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import HeaderPublico from "./HeaderPublico";
import FooterPublico from "./FootherPublico";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PantallaInicioPublica: React.FC = () => {
  const huejutlaLocation: L.LatLngExpression = [21.1416751, -98.4201608];

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
  }
};

export default PantallaInicioPublica;