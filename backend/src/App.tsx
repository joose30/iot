import React from "react";
import Header from "./components/Header";
import Contenido from "./components/Contenido";
import Footer from "./components/Footer";
import PasswordForm from "./components/FormularioContraseña";

const App = () => {
  return (
    <div>
      <Header
        titulo="Smart Door"
        nombre="Equipo 1"
        imagen={require("./img/myAvatar.png")}
      />
      <Contenido />
      <Footer fecha="febrero 2025" grupo="B" />
      <PasswordForm />
    </div>
  );
};

export default App;
