import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import User from '../models/User';

const router = express.Router();

const ESP32_IP = 'http://192.168.8.8'; // Cambia la IP de tu ESP32

// Modelo de la colección "registros"
const RegistroSchema = new mongoose.Schema({
  mensaje: String,
  descripcion: String,
  fecha: Date,
});

const Registro = mongoose.model('Registro', RegistroSchema);

// Ruta para abrir la puerta
router.get('/abrir', async (req, res) => {
  try {
    console.log("Intentando abrir la puerta...");
    // Realiza una solicitud al ESP32 con la acción "abrir"
    const response = await axios.get(`${ESP32_IP}/controlPuerta?action=abrir`);
    res.send(response.data); // Responde con el mensaje de la ESP32
  } catch (error) {
    console.error("Error al abrir la puerta:", error);
    res.status(500).send('Error al abrir la puerta');
  }
});

// Ruta para cerrar la puerta
router.get('/cerrar', async (req, res) => {
  try {
    console.log("Intentando cerrar la puerta...");
    // Realiza una solicitud al ESP32 con la acción "cerrar"
    const response = await axios.get(`${ESP32_IP}/controlPuerta?action=cerrar`);
    res.send(response.data); // Responde con el mensaje de la ESP32
  } catch (error) {
    console.error("Error al cerrar la puerta:", error);
    res.status(500).send('Error al cerrar la puerta');
  }
});

// Ruta para obtener los registros
router.get('/registros', async (req, res) => {
  try {
    const registros = await Registro.find().sort({ fecha: -1 }); // Ordenar por fecha descendente
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).send('Error al obtener los registros');
  }
});

router.post('/configuracion', (req, res) => {
  const { ip } = req.body;
  console.log(`Nueva IP configurada: ${ip}`);
  res.send({ message: "Configuración guardada exitosamente." });
});

router.get('/configuracion/mac', (req, res) => {
  // Simula la dirección MAC del dispositivo
  const macAddress = "00:1A:2B:3C:4D:5E";
  res.json({ macAddress });
});

router.post('/configuracion/pin', async (req, res) => {
  const { email, pin } = req.body;

  if (!email || !pin) {
    return res.status(400).send({ message: "El correo y el PIN son requeridos." });
  }

  try {
    const result = await User.updateOne({ email }, { $set: { devicePin: pin } });

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    res.send({ message: "PIN actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar el PIN:", error);
    res.status(500).send({ message: "Error al actualizar el PIN." });
  }
});

export default router;
