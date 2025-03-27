import express from 'express';
import { registerFingerprint, listFingerprints } from '../controllers/fingerprintController';

const router = express.Router();

// Ruta para registrar una huella digital
router.post('/register', registerFingerprint);

// Ruta para listar todas las huellas digitales
router.get('/list', listFingerprints);

export default router;