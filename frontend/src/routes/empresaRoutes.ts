import express from 'express';
import Mision from '../models/Mision';
import Vision from '../models/Vision';
import Valor from '../models/Valor';
import Politica from '../models/Politica';

const router = express.Router();

// Ruta para obtener todas las misiones
router.get('/misions', async (req, res) => {
  try {
    const misions = await Mision.find().lean();
    console.log('Misions:', misions); // Depura los datos aquí
    const formattedMisions = misions.map((mision) => ({
      id: mision._id, // Renombra _id a id
      descripcion: mision.descripcion,
    }));
    res.json(formattedMisions);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las misiones' });
  }
});

// Ruta para obtener todas las visiones
router.get('/visions', async (req, res) => {
  try {
    const visions = await Vision.find().lean();
    const formattedVisions = visions.map((vision) => ({
      id: vision._id,
      descripcion: vision.descripcion,
    }));
    res.json(formattedVisions);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las visiones' });
  }
});

// Ruta para obtener todos los valores
router.get('/valors', async (req, res) => {
  try {
    const valors = await Valor.find().lean();
    const formattedValors = valors.map((valor) => ({
      id: valor._id,
      descripcion: valor.descripcion,
    }));
    res.json(formattedValors);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los valores' });
  }
});

// Ruta para obtener todas las políticas
router.get('/politicas', async (req, res) => {
  try {
    const politicas = await Politica.find().lean();
    const formattedPoliticas = politicas.map((politica) => ({
      id: politica._id,
      descripcion: politica.descripcion,
    }));
    res.json(formattedPoliticas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las políticas' });
  }
});

export default router;