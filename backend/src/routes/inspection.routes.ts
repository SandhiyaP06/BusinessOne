import { Router } from 'express';
import { InspectionController } from '../controllers/inspection.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { scheduleInspectionSchema, submitInspectionResultSchema } from '../validators/approval.validator';
import { Roles } from '../constants/roles';

const router = Router();

router.use(authenticate);

router.post('/', requireRole(Roles.DEPARTMENT_OFFICER, Roles.ADMIN, Roles.INSPECTOR), validateRequest(scheduleInspectionSchema), InspectionController.schedule);
router.get('/', InspectionController.getAll);
router.post('/:id/result', requireRole(Roles.INSPECTOR, Roles.ADMIN), validateRequest(submitInspectionResultSchema), InspectionController.submitResult);

export default router;
