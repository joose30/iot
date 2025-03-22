import mongoose from 'mongoose';

const ValorSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
});

const Valor = mongoose.model('Valor', ValorSchema);

export default Valor;