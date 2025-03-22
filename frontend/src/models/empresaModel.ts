import mongoose from 'mongoose';

// Esquema para datos de empresa
const empresaSchema = new mongoose.Schema({
    ubicacion: String,
    telefono: String
}, { collection: 'empresa', timestamps: true });

// Esquemas para las demás categorías
const preguntaSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: String
}, { timestamps: true });

const misionSchema = new mongoose.Schema({
    contenido: String
}, { timestamps: true });

const visionSchema = new mongoose.Schema({
    contenido: String
}, { timestamps: true });

const valorSchema = new mongoose.Schema({
    contenido: String
}, { timestamps: true });

const politicaSchema = new mongoose.Schema({
    descripcion: String
}, { timestamps: true });

export const Empresa = mongoose.model('Empresa', empresaSchema);
export const Pregunta = mongoose.model('Pregunta', preguntaSchema);
export const Mision = mongoose.model('Mision', misionSchema);
export const Vision = mongoose.model('Vision', visionSchema);
export const Valor = mongoose.model('Valor', valorSchema);
export const Politica = mongoose.model('Politica', politicaSchema);