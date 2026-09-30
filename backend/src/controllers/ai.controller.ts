import { Response, NextFunction } from 'express';
import { AiService } from '../services/ai.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AiController {
  static async analyzeRegulations(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const result = await AiService.analyzeRegulations(req.body);
      return ApiResponse.success(res, result, 'AI regulation analysis generated successfully');
    } catch (error: any) {
      return next(error);
    }
  }

  static async verifyDocument(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { documentId, documentType, businessId } = req.body;
      const result = await AiService.verifyDocument(documentId, documentType, businessId);
      return ApiResponse.success(res, result, 'AI document OCR verification complete');
    } catch (error: any) {
      return next(error);
    }
  }

  static async predictDelay(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await AiService.predictDelay(id);
      return ApiResponse.success(res, result, 'AI predictive SLA and bottleneck analysis generated');
    } catch (error: any) {
      return next(error);
    }
  }
}
