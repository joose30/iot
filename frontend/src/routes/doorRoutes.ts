import express from 'express';
const router = express.Router();

// Ruta para abrir la puerta
router.get('/abrir', (req, res) => {
  try {
    console.log("Intentando abrir la puerta...");
    // Lógica para abrir la puerta
    res.status(200).send("Puerta abierta");
  } catch (error) {
    console.error("Error al abrir la puerta:", error);
    res.status(500).send("Error al abrir la puerta");
  }
});

// Ruta para cerrar la puerta
router.get('/cerrar', (req, res) => {
  try {
    console.log("Intentando cerrar la puerta...");
    // Lógica para cerrar la puerta
    res.status(200).send("Puerta cerrada");
  } catch (error) {
    console.error("Error al cerrar la puerta:", error);
    res.status(500).send("Error al cerrar la puerta");
  }
});

export default router;
