import mongoose from 'mongoose';

const MisionSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
});

const Mision = mongoose.model('Mision', MisionSchema);

export default Mision;