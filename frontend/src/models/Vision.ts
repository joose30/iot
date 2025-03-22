import mongoose from 'mongoose';

const VisionSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
});

const Vision = mongoose.model('Vision', VisionSchema);

export default Vision;