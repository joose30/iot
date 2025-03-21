import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = express.Router();

// Ruta para manejar el inicio de sesión
router.post('/login', async (req, res) => {
  try {
    // Verificar que el cuerpo de la solicitud contenga email y password
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, proporciona email y contraseña' });
    }

    console.log('Cuerpo de la solicitud:', req.body); // Log para depuración

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', user);

    // Validar la contraseña usando bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('¿Contraseña válida?', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

export default router;