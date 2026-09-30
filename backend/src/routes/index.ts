import { Router } from 'express';
import authRoutes from './auth.routes';
import businessRoutes from './business.routes';
import applicationRoutes from './application.routes';
import documentRoutes from './document.routes';
import departmentRoutes from './department.routes';
import inspectionRoutes from './inspection.routes';
import queryRoutes from './query.routes';
import aiRoutes from './ai.routes';
import { notificationRouter, renewalRouter, adminRouter, analyticsRouter } from './notification.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/business', businessRoutes);
router.use('/businesses', businessRoutes);
router.use('/applications', applicationRoutes);
router.use('/documents', documentRoutes);
router.use('/departments', departmentRoutes);
router.use('/inspections', inspectionRoutes);
router.use('/queries', queryRoutes);
router.use('/notifications', notificationRouter);
router.use('/renewals', renewalRouter);
router.use('/analytics', analyticsRouter);
router.use('/admin', adminRouter);
router.use('/ai', aiRoutes);

export default router;
