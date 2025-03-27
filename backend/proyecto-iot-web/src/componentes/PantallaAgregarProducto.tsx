// IntegradoraWEB/frontend/proyecto-iot-web/src/componentes/PantallaAgregarProducto.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PantallaAgregarProducto: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validar el tipo de archivo
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        alert("Por favor selecciona un archivo de imagen válido (jpg, jpeg, png, gif).");
        e.target.value = ""; // Limpiar el input de archivo
        return;
      }

      setImage(file); // Si es válido, guardar el archivo
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    
    const preset_name = "ml_default"; // Reemplaza con tu upload preset name
    const cloud_name = "dnwpy45qa"; // Reemplaza con tu cloud name
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset_name);
    
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      const data = await response.json();
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return null;
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !category || !image) {
      alert("Por favor completa todos los campos");
      return;
    }

    const imageUrl = await uploadImage();
    if (!imageUrl) {
      alert("Error al subir la imagen");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/api/products/add",
        {
          name,
          description,
          price,
          category,
          image: imageUrl,
        }
      );
      if (response.status === 201) {
        console.log("Producto agregado:", response.data);
        alert("Producto agregado exitosamente");
        // Resetear formulario
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto");
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
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
          <select
            style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Puerta Inteligente">Puerta Inteligente</option>
            <option value="Cerradura Inteligente">Cerradura Inteligente</option>
          </select>

          <label style={styles.label}>Imagen</label>
          <input
            type="file"
            style={styles.input}
            onChange={handleImageChange}
          />

          <button 
            style={styles.button} 
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading ? "Subiendo imagen..." : "Agregar Producto"}
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