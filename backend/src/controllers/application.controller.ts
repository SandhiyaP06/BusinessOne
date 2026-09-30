import { Response, NextFunction } from 'express';
import { ApplicationService } from '../services/application.service';
import { WorkflowService } from '../services/workflow.service';
import { RecommendationService } from '../services/recommendation.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class ApplicationController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const application = await ApplicationService.create(req.user!.userId, req.body, req.ip);
      return ApiResponse.success(res, application, 'Application draft created', 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const application = await ApplicationService.getById(id);
      return ApiResponse.success(res, application, 'Application details retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const applications = await ApplicationService.getAll(req.user!);
      return ApiResponse.success(res, applications, 'Applications retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const updated = await ApplicationService.update(id, req.user!.userId, req.body, req.ip);
      return ApiResponse.success(res, updated, 'Application draft updated');
    } catch (error: any) {
      return next(error);
    }
  }

  static async submit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const submitted = await WorkflowService.processApplicationSubmission(id, req.user!.userId, req.ip);
      return ApiResponse.success(res, submitted, 'Application successfully submitted and parallel department routing initiated');
    } catch (error: any) {
      return next(error);
    }
  }
}

export class RecommendationController {
  static async getRecommendations(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const app = await ApplicationService.getById(id);
      const recommendations = await RecommendationService.getRecommendations({
        category: app.category,
        industryType: app.business.industryType,
        projectSize: app.business.projectSize,
        powerLoadKVA: app.powerLoadKVA,
        waterLoadKLD: app.waterLoadKLD,
        expectedEmployment: app.expectedEmployment,
        hasBoiler: app.hasBoiler,
        hasHazardousChem: app.hasHazardousChem
      });
      return ApiResponse.success(res, recommendations, 'Statutory recommendations calculated');
    } catch (error: any) {
      return next(error);
    }
  }
}
