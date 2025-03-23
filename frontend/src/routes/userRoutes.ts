import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { recoverPassword } from '../controllers/userController';

const router = express.Router();

// Ruta para manejar el inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña enviada con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Respuesta exitosa con el nombre y rol del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, lastName, surname, phone, email, password } = req.body;

  try {
    // Verificar que todos los campos estén presentes
    if (!name || !lastName || !surname || !phone || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de hashing

    // Crear un nuevo usuario con la contraseña hasheada
    const newUser = new User({
      name,
      lastName,
      surname,
      phone,
      email,
      password: hashedPassword, // Aquí usamos la contraseña hasheada
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para recuperación de contraseña
router.post('/recover-password', recoverPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Buscar al usuario por el token de recuperación
    const user = await User.findOne({ recoveryToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    // Verificar que el token no sea null (aunque ya lo validamos con la consulta)
    if (!user.recoveryToken) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña y limpiar el token de recuperación
    user.password = hashedPassword;
    user.recoveryToken = null; // Limpia el token de recuperación
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud.' });
  }
});

export default router;