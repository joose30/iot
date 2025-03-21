import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PantallaAgregarProducto: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "http://192.168.8.6:8082/api/products/add",
        {
          name,
          description,
          price,
          category,
        }
      );
      if (response.status === 201) {
        console.log("Producto agregado:", response.data);
        alert("Producto agregado exitosamente");
        // Limpiar los campos después de agregar el producto
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto");
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>

        {/* Contenido principal */}
        <div style={styles.contentContainer}>
          <h2 style={styles.title}>Agregar Producto</h2>

          <label style={styles.label}>Nombre</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingresa el nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label style={styles.label}>Descripción</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingresa la descripción del producto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label style={styles.label}>Precio</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Ingresa el precio del producto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label style={styles.label}>Categoría</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Ingresa la categoría del producto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button style={styles.button} onClick={handleAddProduct}>
            Agregar Producto
          </button>
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
  /* Menú de Navegación */
  nav: {
    display: "flex",
    gap: "15px",
  },
  navText: {
    fontSize: "16px",
    color: "#1E1E1E",
    textDecoration: "none",
    fontWeight: "500",
  },
  /* Contenido principal */
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: "16px",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: "40px",
    borderColor: "#ccc",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "5px",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    height: "50px",
    backgroundColor: "#007bff",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
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

export default PantallaAgregarProducto;
