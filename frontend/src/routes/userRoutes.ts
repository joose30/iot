import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { recoverPassword } from '../controllers/userController';
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extender la interfaz Request para incluir la propiedad 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

interface JwtPayload {
  id: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado Authorization

  if (!token) {
    console.log("No se proporcionó un token");
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    console.log("Token decodificado:", decoded);
    req.user = { id: decoded.id }; // Agregar el ID del usuario al objeto req
    next();
  } catch (error) {
    console.log("Token inválido:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};

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

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h", // El token expira en 1 hora
    });

    // Respuesta exitosa con el token
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token, // Devuelve el token al frontend
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

router.get('/usuario', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id; // Verificar si req.user está definido antes de acceder a id
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.put('/usuario', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id; // Verificar si req.user está definido antes de acceder a id
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const { name, lastName, email, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, lastName, email, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Datos actualizados correctamente', user });
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find(); // Obtén todos los usuarios
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    console.log("ID recibido para eliminar:", req.params.id); // Log para depurar
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

export default router;