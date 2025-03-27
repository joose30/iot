import mongoose, { Schema, Document } from 'mongoose';

// Define una interfaz para el modelo de huellas digitales
export interface IFingerprint extends Document {
  id: number;
  date: Date;
}

// Define el esquema de Mongoose
const fingerprintSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true }, // El ID debe ser único
  date: { type: Date, default: Date.now }, // Fecha por defecto
});

// Crea y exporta el modelo
const Fingerprint = mongoose.model<IFingerprint>('Fingerprint', fingerprintSchema);
export default Fingerprint;