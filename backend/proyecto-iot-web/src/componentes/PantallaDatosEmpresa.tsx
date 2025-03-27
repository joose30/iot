import React, { useState, useEffect } from "react";
import axios from "axios";

const PantallaDatosEmpresa: React.FC = () => {
  const API_BASE = "http://localhost:8082/api"; //(IPCONFIG)

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    mision: "",
    vision: "",
    valor: "",
    politica: "",
  });

  // Estados para almacenar los datos listados desde la base de datos
  const [misionsList, setMisionsList] = useState<any[]>([]);
  const [visionsList, setVisionsList] = useState<any[]>([]);
  const [valoresList, setValoresList] = useState<any[]>([]);
  const [politicasList, setPoliticasList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [misionesRes, visionesRes, valoresRes, politicasRes] = await Promise.all([
          axios.get<any[]>(`${API_BASE}/empresa/misions`),
          axios.get<any[]>(`${API_BASE}/empresa/visions`),
          axios.get<any[]>(`${API_BASE}/empresa/valors`),
          axios.get<any[]>(`${API_BASE}/empresa/politicas`),
        ]);
        setMisionsList(misionesRes.data);
        setVisionsList(visionesRes.data);
        setValoresList(valoresRes.data);
        setPoliticasList(politicasRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      // Inserta los nuevos datos de misión, visión, valores y políticas
      await Promise.all([
        formData.mision &&
          axios.post(`${API_BASE}/empresa/misions`, { contenido: formData.mision }),
        formData.vision &&
          axios.post(`${API_BASE}/empresa/visions`, { contenido: formData.vision }),
        formData.valor &&
          axios.post(`${API_BASE}/empresa/valors`, { contenido: formData.valor }),
        formData.politica &&
          axios.post(`${API_BASE}/empresa/politicas`, { descripcion: formData.politica }),
      ]);

      alert("Datos insertados con éxito");

      // Limpia los campos del formulario después de guardar
      setFormData({
        mision: "",
        vision: "",
        valor: "",
        politica: "",
      });

      // Recarga los datos listados
      const [misionesRes, visionesRes, valoresRes, politicasRes] = await Promise.all([
        axios.get<any[]>(`${API_BASE}/empresa/misions`),
        axios.get<any[]>(`${API_BASE}/empresa/visions`),
        axios.get<any[]>(`${API_BASE}/empresa/valors`),
        axios.get<any[]>(`${API_BASE}/empresa/politicas`),
      ]);
      setMisionsList(misionesRes.data);
      setVisionsList(visionesRes.data);
      setValoresList(valoresRes.data);
      setPoliticasList(politicasRes.data);
    } catch (error) {
      console.error("Error insertando datos:", error);
      alert("Hubo un error al insertar los datos.");
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        <h2 style={styles.title}>Configuración Empresarial</h2>

        {/* Sección Misión */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Misión</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingrese la misión de la empresa"
            value={formData.mision}
            onChange={(e) => setFormData({ ...formData, mision: e.target.value })}
          />
        </div>

        {misionsList.length > 0 && (
          <div style={styles.listContainer}>
            <h3 style={styles.listTitle}>Misiones:</h3>
            {misionsList.map((item) => <p key={item._id}>{item.contenido}</p>)}
          </div>
        )}

        {/* Sección Visión */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Visión</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingrese la visión de la empresa"
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
          />
        </div>

        {visionsList.length > 0 && (
          <div style={styles.listContainer}>
            <h3 style={styles.listTitle}>Visiones:</h3>
            {visionsList.map((item) => <p key={item._id}>{item.contenido}</p>)}
          </div>
        )}

        {/* Sección Valores */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Valores</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingrese los valores de la empresa"
            value={formData.valor}
            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
          />
        </div>

        {valoresList.length > 0 && (
          <div style={styles.listContainer}>
            <h3 style={styles.listTitle}>Valores:</h3>
            {valoresList.map((item) => <p key={item._id}>{item.contenido}</p>)}
          </div>
        )}

        {/* Sección Políticas */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Políticas</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingrese las políticas de la empresa"
            value={formData.politica}
            onChange={(e) => setFormData({ ...formData, politica: e.target.value })}
          />
        </div>

        {politicasList.length > 0 && (
          <div style={styles.listContainer}>
            <h3 style={styles.listTitle}>Políticas:</h3>
            {politicasList.map((item) => <p key={item._id}>{item.descripcion}</p>)}
          </div>
        )}

        <button style={styles.button} onClick={handleSubmit}>Insertar Datos</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  screen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "20px",
  },
  cardContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: { fontSize: "24px", fontWeight: "bold", textAlign: "center" },
  section: { marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" },
  sectionTitle: { fontSize: "18px", fontWeight: "bold" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  listContainer: { padding: "10px", backgroundColor: "#e9ecef", borderRadius: "5px", marginBottom: "20px" },
  listTitle: { fontSize: "16px", fontWeight: "bold" },
  button: { backgroundColor: "#007bff", color: "#fff", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%" },
};

export default PantallaDatosEmpresa;