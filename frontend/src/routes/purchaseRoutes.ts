import express from 'express';
import { sendPurchaseEmail } from '../controllers/purchaseController';

const router = express.Router();

router.post('/send-purchase-email', sendPurchaseEmail);

export default router;