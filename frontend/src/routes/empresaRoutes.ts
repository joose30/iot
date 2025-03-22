import express from 'express';
import Mision from '../models/Mision';
import Vision from '../models/Vision';
import Valor from '../models/Valor';
import Politica from '../models/Politica';
import {
  updateEmpresaData,
  addPregunta,
  addMision,
  addVision,
  addValor,
  addPolitica,
  getEmpresa,
  getPreguntas,
  getMisions,
  getVisions,
  getValors,
  getPoliticas,
} from '../controllers/empresaController';

const router = express.Router();

// Ruta para obtener la última misión
router.get('/misions', async (req, res) => {
  try {
    const misions = await Mision.find().sort({ _id: -1 }).limit(1).lean(); // Obtiene el último registro
    if (misions.length > 0) {
      const formattedMision = {
        id: misions[0]._id,
        contenido: misions[0].contenido,
      };
      res.json(formattedMision); // Devuelve un objeto
    } else {
      res.json(null); // Devuelve null si no hay datos
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las misiones' });
  }
});

// Ruta para obtener la última visión
router.get('/visions', async (req, res) => {
  try {
    const visions = await Vision.find().sort({ _id: -1 }).limit(1).lean();
    if (visions.length > 0) {
      const formattedVision = {
        id: visions[0]._id,
        contenido: visions[0].contenido,
      };
      res.json(formattedVision); // Devuelve un objeto
    } else {
      res.json(null); // Devuelve null si no hay datos
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las visiones' });
  }
});

// Ruta para obtener el último valor
router.get('/valors', async (req, res) => {
  try {
    const valors = await Valor.find().sort({ _id: -1 }).limit(1).lean();
    if (valors.length > 0) {
      const formattedValor = {
        id: valors[0]._id,
        contenido: valors[0].contenido,
      };
      res.json(formattedValor); // Devuelve un objeto
    } else {
      res.json(null); // Devuelve null si no hay datos
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los valores' });
  }
});

// Ruta para obtener la última política
router.get('/politicas', async (req, res) => {
  try {
    const politicas = await Politica.find().sort({ _id: -1 }).limit(1).lean();
    if (politicas.length > 0) {
      const formattedPolitica = {
        id: politicas[0]._id,
        descripcion: politicas[0].descripcion,
      };
      res.json(formattedPolitica); // Devuelve un objeto
    } else {
      res.json(null); // Devuelve null si no hay datos
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las políticas' });
  }
});

// Rutas PUT y POST para crear y actualizar datos
router.put('/empresa/actualizar-todos', updateEmpresaData);
router.post('/empresa/preguntas', addPregunta);
router.post('/empresa/misiones', addMision);
router.post('/empresa/visiones', addVision);
router.post('/empresa/valores', addValor);
router.post('/empresa/politicas', addPolitica);

// Rutas GET para obtener datos
router.get('/empresa', getEmpresa);
router.get('/empresa/preguntas', getPreguntas);
router.get('/empresa/misiones', getMisions);
router.get('/empresa/visiones', getVisions);
router.get('/empresa/valores', getValors);
router.get('/empresa/politicas', getPoliticas);

export default router;