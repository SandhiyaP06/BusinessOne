import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', DepartmentController.getAll);
router.get('/:id/applications', DepartmentController.getApplicationsForDepartment);
router.post('/applications/:id/route', DepartmentController.route);

export default router;
