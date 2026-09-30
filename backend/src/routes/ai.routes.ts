import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/regulations', AiController.analyzeRegulations);
router.post('/verify-document', AiController.verifyDocument);
router.get('/predict-delay/:id', AiController.predictDelay);

export default router;
