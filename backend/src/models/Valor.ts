import mongoose from 'mongoose';

const ValorSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
});

const Valor = mongoose.models.Valor || mongoose.model('Valor', ValorSchema);

export default Valor;