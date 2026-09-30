import { Response, NextFunction } from 'express';
import { InspectionService } from '../services/inspection.service';
import { QueryService } from '../services/query.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { Roles } from '../constants/roles';

export class InspectionController {
  static async schedule(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inspection = await InspectionService.schedule(req.body, req.user!.userId, req.ip);
      return ApiResponse.success(res, inspection, 'Inspection scheduled successfully', 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async submitResult(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await InspectionService.submitResult(
        id,
        req.user!.userId,
        req.body,
        req.ip
      );
      return ApiResponse.success(res, result, 'Inspection result recorded');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getByApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const inspections = await InspectionService.getByApplication(id);
      return ApiResponse.success(res, inspections, 'Inspections retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inspectorId = req.user?.role === Roles.INSPECTOR ? req.user.userId : undefined;
      const inspections = await InspectionService.getAll(inspectorId);
      return ApiResponse.success(res, inspections, 'All inspections retrieved');
    } catch (error: any) {
      return next(error);
    }
  }
}

export class QueryController {
  static async raise(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const query = await QueryService.raise(
        {
          applicationId: id,
          departmentId: req.body.departmentId || req.user!.departmentId!,
          queryText: req.body.queryText,
          dueDate: req.body.dueDate
        },
        req.user!.userId,
        req.ip
      );
      return ApiResponse.success(res, query, 'Query raised and applicant notified', 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async respond(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await QueryService.respond(
        id,
        req.user!.userId,
        req.body.responseText,
        req.body.attachments,
        req.ip
      );
      return ApiResponse.success(res, result, 'Response submitted to department');
    } catch (error: any) {
      return next(error);
    }
  }

  static async resolve(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const query = await QueryService.resolve(id, req.user!.userId, req.ip);
      return ApiResponse.success(res, query, 'Query marked as resolved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getByApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const queries = await QueryService.getByApplication(id);
      return ApiResponse.success(res, queries, 'Queries retrieved');
    } catch (error: any) {
      return next(error);
    }
  }
}
