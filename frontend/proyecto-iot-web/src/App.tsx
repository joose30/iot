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
          <Route path="/recover-password" element={<PantallaRecuperarContraseña />} />
          <Route path="/reset-password/:token" element={<PantallaRestablecerContraseña />} />
          <Route path="/empresa" element={<EmpresaInfo />} />
          <Route path="/productos" element={<PantallaCatalogo />} />
          
          {/* Private Routes */}
          <Route path="/home" element={isAuthenticated ? <PantallaInicio /> : <Navigate to="/login" />} />
          <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/gestionar-usuarios" element={isAuthenticated ? <GestionarUsuarios /> : <Navigate to="/login" />} />
          <Route path="/admin-empresa" element={isAuthenticated ? <PantallaDatosEmpresa /> : <Navigate to="/login" />} />
          <Route path="/admin-productos" element={isAuthenticated ? <PantallaAgregarProducto /> : <Navigate to="/login" />} />
          <Route path="/huella" element={isAuthenticated ? <PantallaPuerta /> : <Navigate to="/login" />} />
          <Route path="/dispositivo" element={isAuthenticated ? <PantallaPuerta /> : <Navigate to="/login" />} />
          <Route path="/rfid" element={isAuthenticated ? <PantallaRfidControl /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={isAuthenticated ? <PantallaPerfilUsuario /> : <Navigate to="/login" />} />
          <Route path="/productoDetail" element={isAuthenticated ? <PantallaProductoDetail /> : <Navigate to="/login" />} />
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