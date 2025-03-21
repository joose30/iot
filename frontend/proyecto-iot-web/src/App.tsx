import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PantallaPrincipal from "./componentes/PantallaPrincipal";
import Empresa from "./componentes/Empresa";
import PantallaCatalogoProductos from "./componentes/PantallaCatalogoProductos";
import PantallaPuerta from "./componentes/PantallaPuerta";
import PantallaAgregarProducto from "./componentes/PantallaAgregarProducto";
import PantallaDatosEmpresa from "./componentes/PantallaDatosEmpresa";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PantallaPrincipal />} />
          <Route path="/empresa" element={<Empresa />} /> 
          <Route path="/productos" element={<PantallaCatalogoProductos />} />
          <Route path="/dispositivo" element={<PantallaPuerta />} />
          <Route path="/admin-productos" element={<PantallaAgregarProducto />} />
          <Route path="/admin-empresa" element={<PantallaDatosEmpresa />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;