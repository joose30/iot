import mongoose from 'mongoose';

const PoliticaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
});

const Politica = mongoose.model('Politica', PoliticaSchema);

export default Politica;