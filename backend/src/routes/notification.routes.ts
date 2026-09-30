import { Router } from 'express';
import { NotificationController, RenewalController, AdminController, AnalyticsController } from '../controllers/approval.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { Roles } from '../constants/roles';

// Notification router
export const notificationRouter = Router();
notificationRouter.use(authenticate);
notificationRouter.get('/', NotificationController.getForUser);
notificationRouter.put('/:id/read', NotificationController.markRead);
notificationRouter.put('/read-all', NotificationController.markAllRead);

// Renewal router
export const renewalRouter = Router();
renewalRouter.use(authenticate);
renewalRouter.get('/', RenewalController.getAll);
renewalRouter.post('/applications/:id/renew', RenewalController.renew);

// Analytics router
export const analyticsRouter = Router();
analyticsRouter.use(authenticate);
analyticsRouter.get('/overview', AnalyticsController.getOverview);

// Admin router
export const adminRouter = Router();
adminRouter.use(authenticate, requireRole(Roles.ADMIN));
adminRouter.get('/users', AdminController.getUsers);
adminRouter.get('/audit-logs', AdminController.getAuditLogs);
adminRouter.get('/analytics', AnalyticsController.getOverview);
