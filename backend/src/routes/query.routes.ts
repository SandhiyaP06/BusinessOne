import { Router } from 'express';
import { QueryController } from '../controllers/inspection.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { respondQuerySchema } from '../validators/approval.validator';
import { Roles } from '../constants/roles';

const router = Router();

router.use(authenticate);

router.post('/:id/respond', validateRequest(respondQuerySchema), QueryController.respond);
router.post('/:id/resolve', requireRole(Roles.DEPARTMENT_OFFICER, Roles.ADMIN), QueryController.resolve);

export default router;
