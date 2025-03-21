import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PantallaPrincipal from "./componentes/PantallaPrincipal";
import Empresa from "./componentes/Empresa";
import PantallaCatalogoProductos from "./componentes/PantallaCatalogoProductos";
import PantallaPuerta from "./componentes/PantallaPuerta";
import PantallaAgregarProducto from "./componentes/PantallaAgregarProducto";
import PantallaDatosEmpresa from "./componentes/PantallaDatosEmpresa";
import PantallaPerfil from "./componentes/PantallaPerfil";
import PantallaRfidControl from "./componentes/PantallaRfidControl";
import Header from "./componentes/Header"; // Importa el componente Header
import Footer from "./componentes/Foother"; // Importa el componente Footer
import PantallaLogin from "./componentes/PantallaLogin"; // Importa PantallaLogin

const App: React.FC = () => {
  return (
    <Router>
      <Header /> {/* Añade el Header aquí */}
      <div>
        <Routes>
          <Route path="/" element={<PantallaLogin />} /> {/* Cambia la ruta raíz al login */}
          <Route path="/home" element={<PantallaPrincipal />} /> {/* Mueve PantallaPrincipal a /home */}
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/productos" element={<PantallaCatalogoProductos />} />
          <Route path="/dispositivo" element={<PantallaPuerta />} />
          <Route path="/admin-productos" element={<PantallaAgregarProducto />} />
          <Route path="/admin-empresa" element={<PantallaDatosEmpresa />} />
          <Route path="/perfil" element={<PantallaPerfil userId="123" />} />
          <Route path="/RFID" element={<PantallaRfidControl />} />
        </Routes>
      </div>
      <Footer /> {/* Añade el Footer aquí */}
    </Router>
  );
};

export default App;