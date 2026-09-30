import { Response, NextFunction } from 'express';
import { BusinessService } from '../services/business.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class BusinessController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const business = await BusinessService.create(req.user!.userId, req.body, req.ip);
      return ApiResponse.success(res, business, 'Business entity registered', 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const business = await BusinessService.getById(id);
      return ApiResponse.success(res, business, 'Business entity retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const businesses = await BusinessService.getByUser(req.user!.userId);
      return ApiResponse.success(res, businesses, 'User businesses retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const updated = await BusinessService.update(id, req.user!.userId, req.body, req.ip);
      return ApiResponse.success(res, updated, 'Business profile updated');
    } catch (error: any) {
      return next(error);
    }
  }
}
