import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const PantallaCatalogoProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://192.168.8.6:8082/api/products/get");
        if (response.status === 200) {
          setProducts(response.data as Product[]);
        }
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.screen}>
      <div style={styles.cardContainer}>
        {/* Barra Superior */}
        <div style={styles.topBar}>
          <h1 style={styles.logo}>SEGURIX</h1>
          <div style={styles.menuContainer}>
            {[
              { name: "Empresa", path: "/empresa" },
              { name: "Productos", path: "/productos" },
              { name: "Huella", path: "/huella" },
              { name: "Dispositivo IoT", path: "/dispositivo" },
              { name: "RFID", path: "/rfid" },
              { name: "Perfil", path: "/perfil" },
              { name: "Admin (agg prod)", path: "/admin-productos" },
            ].map((option) => (
              <Link key={option.name} to={option.path} style={styles.menuOption}>
                {option.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contenido principal del catálogo */}
        <h2 style={styles.title}>Catálogo de Productos</h2>

        {loading ? (
          <div style={styles.loadingContainer}>
            <p>Cargando productos...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
          </div>
        ) : (
          <div style={styles.productList}>
            {products.map((item) => (
              <div key={item._id} style={styles.productCard}>
                <h3 style={styles.productName}>{item.name}</h3>
                <p style={styles.productDescription}>{item.description}</p>
                <div style={styles.detailsContainer}>
                  <span style={styles.priceText}>${item.price.toFixed(2)}</span>
                  <span style={styles.categoryText}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <p style={styles.footerText}>Términos y condiciones</p>
            <p style={styles.footerText}>Privacidad</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerTitle}>Contáctanos</p>
            <p style={styles.footerText}>Col. Horacio Camargo</p>
            <p style={styles.footerText}>segurix@mail.com</p>
            <p style={styles.footerText}>+52 774 545 8510</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎨 **Estilos mejorados y adaptados a React**
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
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  menuOption: {
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
  },
  /* Contenido principal */
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1E1E1E",
    marginTop: "18px",
    textAlign: "center",
  },
  /* Lista de productos */
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  productCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  productDescription: {
    fontSize: "14px",
    color: "#6c757d",
    marginBottom: "8px",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#28a745",
  },
  categoryText: {
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "4px",
    padding: "4px 8px",
  },
  /* Contenedor de carga */
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  /* Contenedor de error */
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "16px",
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

export default PantallaCatalogoProductos;
