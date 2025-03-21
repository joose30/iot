import React, { useState, useEffect } from "react";
import axios from "axios";

const PantallaDatosEmpresa: React.FC = () => {
  const API_BASE = "http://192.168.8.6:8082/api";

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    empresa: { ubicacion: "", telefono: "" },
    pregunta: { pregunta: "", respuesta: "" },
    mision: "",
    vision: "",
    valor: "",
    politica: "",
  });

  // Estados para almacenar los datos listados desde la base de datos
  const [empresaData, setEmpresaData] = useState<any>(null);
  const [preguntasList, setPreguntasList] = useState<any[]>([]);
  const [misionsList, setMisionsList] = useState<any[]>([]);
  const [visionsList, setVisionsList] = useState<any[]>([]);
  const [valoresList, setValoresList] = useState<any[]>([]);
  const [politicasList, setPoliticasList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          empresaRes,
          preguntasRes,
          misionesRes,
          visionesRes,
          valoresRes,
          politicasRes,
        ] = await Promise.all([
          axios.get<any>(`${API_BASE}/empresa`),
          axios.get<any[]>(`${API_BASE}/empresa/preguntas`),
          axios.get<any[]>(`${API_BASE}/empresa/misiones`),
          axios.get<any[]>(`${API_BASE}/empresa/visiones`),
          axios.get<any[]>(`${API_BASE}/empresa/valores`),
          axios.get<any[]>(`${API_BASE}/empresa/politicas`),
        ]);
        setEmpresaData(empresaRes.data);
        setPreguntasList(preguntasRes.data);
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
      await axios.put(`${API_BASE}/empresa/actualizar-todos`, formData.empresa);
      await Promise.all([
        formData.pregunta.pregunta &&
          axios.post(`${API_BASE}/empresa/preguntas`, formData.pregunta),
        formData.mision &&
          axios.post(`${API_BASE}/empresa/misiones`, { contenido: formData.mision }),
        formData.vision &&
          axios.post(`${API_BASE}/empresa/visiones`, { contenido: formData.vision }),
        formData.valor &&
          axios.post(`${API_BASE}/empresa/valores`, { contenido: formData.valor }),
        formData.politica &&
          axios.post(`${API_BASE}/empresa/politicas`, { descripcion: formData.politica }),
      ]);
      alert("Datos guardados con éxito");
    } catch (error) {
      console.error("Error guardando datos:", error);
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        <h2 style={styles.title}>Configuración Empresarial</h2>

        {/* Sección Datos Generales */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Datos Generales</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Ubicación"
            value={formData.empresa.ubicacion}
            onChange={(e) => setFormData({ ...formData, empresa: { ...formData.empresa, ubicacion: e.target.value } })}
          />
          <input
            type="text"
            style={styles.input}
            placeholder="Teléfono"
            value={formData.empresa.telefono}
            onChange={(e) => setFormData({ ...formData, empresa: { ...formData.empresa, telefono: e.target.value } })}
          />
        </div>

        {empresaData && (
          <div style={styles.listContainer}>
            <h3 style={styles.listTitle}>Datos de la Empresa:</h3>
            <p>Ubicación: {empresaData.ubicacion}</p>
            <p>Teléfono: {empresaData.telefono}</p>
          </div>
        )}

        {/* Sección Preguntas */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Nueva Pregunta</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Pregunta"
            value={formData.pregunta.pregunta}
            onChange={(e) => setFormData({ ...formData, pregunta: { ...formData.pregunta, pregunta: e.target.value } })}
          />
          <input
            type="text"
            style={styles.input}
            placeholder="Respuesta"
            value={formData.pregunta.respuesta}
            onChange={(e) => setFormData({ ...formData, pregunta: { ...formData.pregunta, respuesta: e.target.value } })}
          />
        </div>

        {preguntasList.length > 0 && (
          <div style={styles.listContainer}>
            <h3 style={styles.listTitle}>Preguntas Frecuentes:</h3>
            {preguntasList.map((item) => (
              <p key={item._id}>Pregunta: {item.pregunta} <br /> Respuesta: {item.respuesta}</p>
            ))}
          </div>
        )}

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

        <button style={styles.button} onClick={handleSubmit}>Guardar Cambios</button>
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
