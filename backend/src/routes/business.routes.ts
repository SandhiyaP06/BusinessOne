import { Router } from 'express';
import { BusinessController } from '../controllers/business.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createBusinessSchema, updateBusinessSchema } from '../validators/business.validator';

const router = Router();

router.use(authenticate);

router.post('/', validateRequest(createBusinessSchema), BusinessController.create);
router.get('/', BusinessController.getByUser);
router.get('/:id', BusinessController.getById);
router.put('/:id', validateRequest(updateBusinessSchema), BusinessController.update);

export default router;
