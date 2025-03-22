import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./componentes/Header";
import Foother from "./componentes/Foother";
import PantallaLogin from "./componentes/PantallaLogin";
import PantallaRegistro from "./componentes/PantallaRegistro";
import PantallaInicio from "./componentes/PantallaPrincipal";
import AdminDashboard from "./componentes/AdminDashboard";
import PantallaDatosEmpresa from "./componentes/PantallaDatosEmpresa";
import PantallaAgregarProducto from "./componentes/PantallaAgregarProducto";
import PantallaCatalogo from "./componentes/PantallaCatalogoProductos"; // Importa PantallaCatalogo
import PantallaPuerta from "./componentes/PantallaPuerta"; // Importa PantallaPuerta
import PantallaRfidControl from "./componentes/PantallaRfidControl"; // Importa PantallaRfidControl
import EmpresaInfo from "./componentes/EmpresaInfo"; // Importa EmpresaInfo

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Mostrar el Header solo si no estamos en la pantalla de login */}
      {location.pathname !== "/" && <Header />}
      <div>
        <Routes>
          <Route path="/" element={<PantallaLogin />} />
          <Route path="/register" element={<PantallaRegistro />} />
          <Route path="/home" element={<PantallaInicio />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-empresa" element={<PantallaDatosEmpresa />} />
          <Route path="/admin-productos" element={<PantallaAgregarProducto />} />
          <Route path="/empresa" element={<EmpresaInfo />} /> {/* Ruta para Empresa */}
          <Route path="/productos" element={<PantallaCatalogo />} /> {/* Ruta para Productos */}
          <Route path="/huella" element={<PantallaPuerta />} /> {/* Ruta para Huella */}
          <Route path="/dispositivo" element={<PantallaPuerta />} /> {/* Ruta para Dispositivo IoT */}
          <Route path="/rfid" element={<PantallaRfidControl />} /> {/* Ruta para RFID */}
          <Route path="/perfil" element={<PantallaInicio />} /> {/* Ruta para Perfil */}
        </Routes>
      </div>
      {/* Mostrar el Foother solo si no estamos en la pantalla de login */}
      {location.pathname !== "/" && <Foother />}
    </>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;