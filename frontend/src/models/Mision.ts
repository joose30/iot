import mongoose from 'mongoose';

const MisionSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
});

const Mision = mongoose.models.Mision || mongoose.model('Mision', MisionSchema);

export default Mision;