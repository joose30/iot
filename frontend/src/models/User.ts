// filepath: c:\Users\AlfredoHH\Documents\GitHub\web\Integrador\frontend\src\models\User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nuevo campo
  lastName: { type: String, required: true }, // Nuevo campo
  surname: { type: String, required: true }, // Nuevo campo
  phone: { type: String, required: true }, // Nuevo campo
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware para cifrar la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo cifra si la contraseña ha sido modificada

  try {
    const salt = await bcrypt.genSalt(10); // Genera un salt
    this.password = await bcrypt.hash(this.password, salt); // Cifra la contraseña
    next();
  } catch (error) {
    next(error as mongoose.CallbackError);
  }
});

const User = mongoose.model('User', UserSchema);

export default User;