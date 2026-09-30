import { Response, NextFunction } from 'express';
import { DocumentService } from '../services/document.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class DocumentController {
  static async upload(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return ApiResponse.error(res, 'No file uploaded', 400);
      }

      const id = req.params.id as string;
      const document = await DocumentService.upload(
        id,
        req.file,
        req.body.documentType,
        req.body.name,
        req.user!.userId,
        req.ip
      );

      return ApiResponse.success(res, document, 'Document uploaded successfully', 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async getByApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const documents = await DocumentService.getByApplication(id);
      return ApiResponse.success(res, documents, 'Documents retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async validate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await DocumentService.validate(
        id,
        req.user!.userId,
        req.body.validationStatus,
        req.body.validationMessage,
        req.ip
      );
      return ApiResponse.success(res, result, 'Document validation recorded');
    } catch (error: any) {
      return next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await DocumentService.delete(id, req.user!.userId, req.ip);
      return ApiResponse.success(res, result, 'Document deleted');
    } catch (error: any) {
      return next(error);
    }
  }
}
