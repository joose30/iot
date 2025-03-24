import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Importando la conexión a la base de datos
import doorRoutes from './src/routes/doorRoutes';  // Rutas para el control de la puerta
import userRoutes from './src/routes/userRoutes'; // Importa las rutas de usuarios
import empresaRoutes from './src/routes/empresaRoutes';
import productRoutes from './src/routes/productRoutes'; // Importa las rutas de productos
import preguntasFrecuentesRoutes from './src/routes/preguntasFrecuentesRoutes'; // Importa las rutas de preguntas frecuentes

dotenv.config(); // Cargando las variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 8082;

// Conexión a la base de datos
connectDB();



// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/door', doorRoutes);  // Rutas para el control de la puerta
app.use('/api/users', userRoutes); // Registra las rutas de usuarios
app.use('/api/empresa', empresaRoutes); // Rutas de empresa
app.use('/api/products', productRoutes); // Rutas de productos
app.use('/api/preguntasFrecuentes', preguntasFrecuentesRoutes); // Rutas de preguntas frecuentes

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});