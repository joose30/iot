import mongoose from 'mongoose';
import Mision from './Mision';
import Vision from './Vision';
import Valor from './Valor';
import Politica from './Politica';

// Esquema para datos de empresa
const empresaSchema = new mongoose.Schema({
  ubicacion: String,
  telefono: String,
}, { collection: 'empresa', timestamps: true });

// Esquema para preguntas
const preguntaSchema = new mongoose.Schema({
  pregunta: String,
  respuesta: String,
}, { timestamps: true });

export const Empresa = mongoose.models.Empresa || mongoose.model('Empresa', empresaSchema);
export const Pregunta = mongoose.models.Pregunta || mongoose.model('Pregunta', preguntaSchema);
export { Mision, Vision, Valor, Politica }; // Exporta los modelos importados