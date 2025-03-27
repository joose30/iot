import mongoose from 'mongoose';

const VisionSchema = new mongoose.Schema({
  contenido: { type: String, required: true }, // Campo "contenido" definido correctamente
});

const Vision = mongoose.models.Vision || mongoose.model('Vision', VisionSchema);

export default Vision;