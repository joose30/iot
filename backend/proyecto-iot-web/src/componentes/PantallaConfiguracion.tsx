import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PantallaConfiguracion: React.FC = () => {
  const [ipDispositivo, setIpDispositivo] = useState<string>("192.168.8.3");
  const [macAddress, setMacAddress] = useState<string>("");
  const [nuevoPin, setNuevoPin] = useState<string>("");
  const [confirmarPin, setConfirmarPin] = useState<string>(""); // Estado para confirmar el PIN
  const [mostrarPin, setMostrarPin] = useState<boolean>(false); // Estado para alternar visibilidad del PIN
  const [mensaje, setMensaje] = useState<string>("");

  // Función para obtener la dirección MAC y la IP del dispositivo
  const obtenerDatosDispositivo = async () => {
    try {
      const responseMac = await axios.get("https://iot-production-7391.up.railway.app/api/configuracion/mac");
      setMacAddress(responseMac.data.macAddress);

      const responseIp = await axios.get("https://iot-production-7391.up.railway.app/api/configuracion/ip");
      setIpDispositivo(responseIp.data.ip);
    } catch (error) {
      console.error("Error al obtener los datos del dispositivo:", error);
      setMensaje("Error al obtener los datos del dispositivo.");
    }
  };

  // Función para cambiar el PIN del dispositivo
  const cambiarPin = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setMensaje("No se encontró el correo del usuario logueado.");
        return;
      }

      if (nuevoPin !== confirmarPin) {
        setMensaje("El PIN y la confirmación no coinciden.");
        return;
      }

      await axios.post("https://iot-production-7391.up.railway.app/api/door/configuracion/pin", { email, pin: nuevoPin });
      setMensaje("PIN cambiado exitosamente.");
    } catch (error) {
      console.error("Error al cambiar el PIN:", error);
      setMensaje("Error al cambiar el PIN.");
    }
  };

  // useEffect para cargar los datos del dispositivo al montar el componente
  useEffect(() => {
    obtenerDatosDispositivo();
  }, []);

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        <h2 style={styles.encabezado}>Configuración</h2>

        {/* Mostrar la dirección MAC */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Dirección MAC del Dispositivo:</label>
          <p style={styles.macAddress}>{macAddress || "Cargando..."}</p>
        </div>

        {/* Mostrar la IP del dispositivo */}
        <div style={styles.formGroup}>
          <label style={styles.label}>IP del Dispositivo IoT:</label>
          <p style={styles.macAddress}>{ipDispositivo || "Cargando..."}</p>
        </div>

        {/* Campo para cambiar el PIN */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="nuevoPin">
            Cambiar PIN del Teclado:
          </label>
          <div style={styles.inputGroup}>
            <input
              type={mostrarPin ? "text" : "password"}
              id="nuevoPin"
              value={nuevoPin}
              onChange={(e) => setNuevoPin(e.target.value)}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setMostrarPin(!mostrarPin)}
              style={styles.toggleButton}
            >
              {mostrarPin ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        {/* Campo para confirmar el PIN */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="confirmarPin">
            Confirmar PIN:
          </label>
          <input
            type={mostrarPin ? "text" : "password"}
            id="confirmarPin"
            value={confirmarPin}
            onChange={(e) => setConfirmarPin(e.target.value)}
            style={styles.input}
          />
        </div>
        <button style={styles.botonGuardar} onClick={cambiarPin}>
          Cambiar PIN
        </button>

        {/* Mensaje de éxito o error */}
        {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

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
    width: "600px",
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
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #CCC",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    marginLeft: "10px",
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
  },
  macAddress: {
    fontSize: "16px",
    color: "#1E1E1E",
    fontWeight: "bold",
  },
  botonGuardar: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: "12px 40px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    marginBottom: "20px",
  },
  mensaje: {
    fontSize: "16px",
    color: "#1E1E1E",
    marginTop: "10px",
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

export default PantallaConfiguracion;