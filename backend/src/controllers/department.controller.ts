import { Response, NextFunction } from 'express';
import { DepartmentService } from '../services/department.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class DepartmentController {
  static async getAll(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const departments = await DepartmentService.getAll();
      return ApiResponse.success(res, departments, 'Departments retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getApplicationsForDepartment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const applications = await DepartmentService.getApplicationsForDepartment(id);
      return ApiResponse.success(res, applications, 'Department applications retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async route(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await DepartmentService.routeApplication(
        id,
        req.body.departmentId,
        req.user!.userId,
        req.ip
      );
      return ApiResponse.success(res, result, 'Application routed to department');
    } catch (error: any) {
      return next(error);
    }
  }
}
