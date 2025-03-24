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
import PantallaRecuperarContraseña from "./componentes/PantallaRecuperarContraseña"; // Importa PantallaRecuperarContraseña
import PantallaRestablecerContraseña from "./componentes/PantallaRestablecerContraseña"; // Importa PantallaRestablecerContraseña
import PantallaProductoDetail from "./componentes/PantallaProductoDetail"; // Importa PantallaCatalogo
import PantallaPerfilUsuario from "./componentes/PantallaPerfilUsuario"; // Importa PantallaPerfilUsuario
import GestionarUsuarios from "./componentes/GestionarUsuarios";
import PantallaRecuperarConPregunta from "./componentes/PantallaRecuperarConPregunta"; // Importa PantallaRecuperarConPregunta

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
          <Route path="/admin/gestionar-usuarios" element={<GestionarUsuarios />} />
          <Route path="/admin-empresa" element={<PantallaDatosEmpresa />} />
          <Route path="/admin-productos" element={<PantallaAgregarProducto />} />
          <Route path="/empresa" element={<EmpresaInfo />} /> {/* Ruta para Empresa */}
          <Route path="/productos" element={<PantallaCatalogo />} /> {/* Ruta para Productos */}
          <Route path="/huella" element={<PantallaPuerta />} /> {/* Ruta para Huella */}
          <Route path="/dispositivo" element={<PantallaPuerta />} /> {/* Ruta para Dispositivo IoT */}
          <Route path="/rfid" element={<PantallaRfidControl />} /> {/* Ruta para RFID */}
          <Route path="/perfil" element={<PantallaPerfilUsuario />} /> {/* Ruta para Perfil */}
          <Route path="/productoDetail" element={<PantallaProductoDetail />} />
          <Route path="/login" element={<PantallaLogin />} /> {/* Ruta para Login */}
          <Route path="/recover-password" element={<PantallaRecuperarContraseña />} /> {/* Ruta para Recuperar Contraseña */}
          <Route path="/reset-password/:token" element={<PantallaRestablecerContraseña />} /> {/* Ruta para Restablecer Contraseña */}
          <Route path="/recuperar-contraseña" element={<PantallaRecuperarContraseña />} /> {/* Ruta para Recuperar Contraseña */}
          <Route path="/recuperar-con-pregunta" element={<PantallaRecuperarConPregunta />} /> {/* Ruta para Recuperar con Pregunta */}
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