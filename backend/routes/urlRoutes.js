import express from 'express';
import { shortenUrl, redirectUrl, getStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/api/shorten', shortenUrl);
router.get('/api/stats/:shortCode', getStats);
router.get('/:shortCode', redirectUrl);

export default router;