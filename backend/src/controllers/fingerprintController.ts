import { Request, Response } from 'express';
import Fingerprint from '../models/Fingerprint';

// Controlador para registrar una huella digital
export const registerFingerprint = async (req: Request, res: Response) => {
  try {
    const { fingerprint_id } = req.body;

    if (!fingerprint_id) {
      return res.status(400).json({ error: 'El campo fingerprint_id es requerido.' });
    }

    // Crea una nueva huella digital en la base de datos
    const newFingerprint = new Fingerprint({ id: fingerprint_id });
    await newFingerprint.save();

    res.status(201).json(newFingerprint);
  } catch (error) {
    console.error('Error al registrar la huella:', error);
    res.status(500).json({ error: 'Error al registrar la huella' });
  }
};

// Controlador para listar todas las huellas digitales
export const listFingerprints = async (req: Request, res: Response) => {
  try {
    // Obtiene todas las huellas digitales de la base de datos
    const fingerprints = await Fingerprint.find();
    res.status(200).json(fingerprints);
  } catch (error) {
    console.error('Error al listar las huellas:', error);
    res.status(500).json({ error: 'Error al listar las huellas' });
  }
};