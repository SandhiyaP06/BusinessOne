import { Router } from 'express';
import { ApplicationController, RecommendationController } from '../controllers/application.controller';
import { QueryController } from '../controllers/inspection.controller';
import { DocumentController } from '../controllers/document.controller';
import { ApprovalController } from '../controllers/approval.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createApplicationSchema, updateApplicationSchema } from '../validators/application.validator';
import { raiseQuerySchema } from '../validators/approval.validator';
import { Roles } from '../constants/roles';
import { upload } from '../config/multer';

const router = Router();

router.use(authenticate);

// Application CRUD & Submission
router.post('/', validateRequest(createApplicationSchema), ApplicationController.create);
router.get('/', ApplicationController.getAll);
router.get('/:id', ApplicationController.getById);
router.put('/:id', validateRequest(updateApplicationSchema), ApplicationController.update);
router.post('/:id/submit', ApplicationController.submit);

// Recommendation & Requirements
router.get('/:id/recommendations', RecommendationController.getRecommendations);
router.get('/:id/requirements', RecommendationController.getRecommendations);

// Application Documents
router.post('/:id/documents', upload.single('file'), DocumentController.upload);
router.get('/:id/documents', DocumentController.getByApplication);

// Application Queries
router.post('/:id/queries', requireRole(Roles.DEPARTMENT_OFFICER, Roles.ADMIN), validateRequest(raiseQuerySchema), QueryController.raise);
router.get('/:id/queries', QueryController.getByApplication);

// Application Approvals
router.post('/:id/approve', requireRole(Roles.DEPARTMENT_OFFICER, Roles.ADMIN), ApprovalController.approve);
router.post('/:id/reject', requireRole(Roles.DEPARTMENT_OFFICER, Roles.ADMIN), ApprovalController.reject);
router.get('/:id/approvals', ApprovalController.getByApplication);

export default router;
