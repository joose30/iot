import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User'; // Asegúrate de importar el modelo correcto
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Verificar si el correo existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'El correo no está registrado' });
    }

    // Crear un token de recuperación (puedes usar JWT o un UUID)
    const recoveryToken = Math.random().toString(36).substr(2); // Token simple para ejemplo
    // Aquí podrías guardar el token en la base de datos asociado al usuario

    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER, // Correo electrónico desde las variables de entorno
        pass: process.env.EMAIL_PASS, // Contraseña de aplicación desde las variables de entorno
      },
    });

    // Configurar el contenido del correo
    const mailOptions = {
      from: process.env.EMAIL_USER, // Remitente
      to: email, // Destinatario
      subject: 'Recuperación de contraseña',
      html: `
        <h1>Recuperación de contraseña</h1>
        <p>Hola ${user.name},</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el enlace de abajo para continuar:</p>
        <a href="http://localhost:3000/reset-password/${recoveryToken}">Restablecer contraseña</a>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Se ha enviado un enlace de recuperación a tu correo.' });
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud.' });
  }
};