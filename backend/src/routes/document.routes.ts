import { Router } from 'express';
import { DocumentController } from '../controllers/document.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { Roles } from '../constants/roles';

const router = Router();

router.use(authenticate);

router.delete('/:id', DocumentController.delete);
router.post('/:id/validate', requireRole(Roles.DEPARTMENT_OFFICER, Roles.ADMIN), DocumentController.validate);

export default router;
