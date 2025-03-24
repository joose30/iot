// IntegradoraWEB/frontend/config/db.ts <- Ruta
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

const uri = process.env.MONGO_URI || ''; // URI de MongoDB desde .env

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // Options removed as they are now defaults in Mongoose
    });
    console.log('Conectado a MongoDB');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al conectar a MongoDB:', error.message); // Acceso seguro a message
    } else {
      console.error('Error desconocido al conectar a MongoDB');
    }
    process.exit(1); // Salir del proceso si hay un error
  }
};

export default connectDB;
