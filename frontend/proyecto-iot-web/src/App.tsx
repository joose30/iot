import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./componentes/Header";
import HeaderPublico from "./componentes/HeaderPublico";
import Foother from "./componentes/Foother";
import FootherPublico from "./componentes/FootherPublico";
import PantallaLogin from "./componentes/PantallaLogin";
import PantallaRegistro from "./componentes/PantallaRegistro";
import PantallaInicio from "./componentes/PantallaPrincipal";
import PantallaInicioPublica from "./componentes/PantallaInicioPublica";
import AdminDashboard from "./componentes/AdminDashboard";
import PantallaDatosEmpresa from "./componentes/PantallaDatosEmpresa";
import PantallaAgregarProducto from "./componentes/PantallaAgregarProducto";
import PantallaCatalogo from "./componentes/PantallaCatalogoProductos";
import PantallaPuerta from "./componentes/PantallaPuerta";
import PantallaRfidControl from "./componentes/PantallaRfidControl";
import EmpresaInfo from "./componentes/EmpresaInfo";
import PantallaRecuperarContraseña from "./componentes/PantallaRecuperarContraseña";
import PantallaRestablecerContraseña from "./componentes/PantallaRestablecerContraseña";
import PantallaProductoDetail from "./componentes/PantallaProductoDetail";
import PantallaPerfilUsuario from "./componentes/PantallaPerfilUsuario";
import GestionarUsuarios from "./componentes/GestionarUsuarios";
import PantallaRecuperarConPregunta from "./componentes/PantallaRecuperarConPregunta"; // Importa PantallaRecuperarConPregunta

const App: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');
  
  // Define public routes
  const publicRoutes = [
    '/', 
    '/login', 
    '/register',
    '/empresa',
    '/productos',
    '/recover-password', 
    '/reset-password/:token'
  ];
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes(':')) {
      // Handle dynamic routes like '/reset-password/:token'
      const routeBase = route.split('/:')[0];
      return location.pathname.startsWith(routeBase);
    }
    return location.pathname === route;
  });

  return (
    <>
      {/* Show public header/footer for public routes, otherwise show private ones */}
      {isPublicRoute ? <HeaderPublico /> : <Header />}
      
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PantallaInicioPublica />} />
          <Route path="/login" element={<PantallaLogin />} />
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
        </Routes>
      </div>
      
      {isPublicRoute ? <FootherPublico /> : <Foother />}
    </>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;