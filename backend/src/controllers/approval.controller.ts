import { Response, NextFunction } from 'express';
import { ApprovalService } from '../services/approval.service';
import { NotificationService, RenewalService } from '../services/notification.service';
import { AnalyticsService, AdminService } from '../services/analytics.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { Roles } from '../constants/roles';

export class ApprovalController {
  static async approve(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await ApprovalService.recordDecision(
        id,
        req.body.departmentId || req.user!.departmentId!,
        req.user!.userId,
        'APPROVED',
        req.body.remarks,
        req.ip
      );
      return ApiResponse.success(res, result, 'Departmental clearance approved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async reject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await ApprovalService.recordDecision(
        id,
        req.body.departmentId || req.user!.departmentId!,
        req.user!.userId,
        'REJECTED',
        req.body.remarks,
        req.ip
      );
      return ApiResponse.success(res, result, 'Departmental rejection recorded');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getByApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const approvals = await ApprovalService.getApprovalsByApplication(id);
      return ApiResponse.success(res, approvals, 'Approvals retrieved');
    } catch (error: any) {
      return next(error);
    }
  }
}

export class NotificationController {
  static async getForUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const notifications = await NotificationService.getForUser(req.user!.userId);
      return ApiResponse.success(res, notifications, 'Notifications retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async markRead(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await NotificationService.markAsRead(id, req.user!.userId);
      return ApiResponse.success(res, { read: true }, 'Notification marked as read');
    } catch (error: any) {
      return next(error);
    }
  }

  static async markAllRead(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      await NotificationService.markAllAsRead(req.user!.userId);
      return ApiResponse.success(res, { allRead: true }, 'All notifications marked as read');
    } catch (error: any) {
      return next(error);
    }
  }
}

export class RenewalController {
  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.role === Roles.ENTREPRENEUR ? req.user.userId : undefined;
      const renewals = await RenewalService.getAll(userId);
      return ApiResponse.success(res, renewals, 'Licences and renewals retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async renew(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const renewed = await RenewalService.renewApplication(id, req.user!.userId);
      return ApiResponse.success(res, renewed, 'Renewal application initiated');
    } catch (error: any) {
      return next(error);
    }
  }
}

export class AnalyticsController {
  static async getOverview(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const overview = await AnalyticsService.getOverview();
      return ApiResponse.success(res, overview, 'Analytics overview retrieved');
    } catch (error: any) {
      return next(error);
    }
  }
}

export class AdminController {
  static async getUsers(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const users = await AdminService.getUsers();
      return ApiResponse.success(res, users, 'System users retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getAuditLogs(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const logs = await AdminService.getAuditLogs();
      return ApiResponse.success(res, logs, 'System audit logs retrieved');
    } catch (error: any) {
      return next(error);
    }
  }
}
