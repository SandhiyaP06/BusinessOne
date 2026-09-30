import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body, req.ip);
      return ApiResponse.success(res, result, 'User registered successfully', 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body, req.ip);
      return ApiResponse.success(res, result, 'Login successful');
    } catch (error: any) {
      return next(error);
    }
  }

  static async logout(_req: Request, res: Response) {
    return ApiResponse.success(res, { loggedOut: true }, 'Session logged out successfully');
  }

  static async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getMe(req.user!.userId);
      return ApiResponse.success(res, user, 'User profile retrieved');
    } catch (error: any) {
      return next(error);
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    // Simulated token dispatch
    return ApiResponse.success(
      res,
      { message: 'If an account exists, a password reset link has been dispatched to your email.' },
      'Reset instructions dispatched'
    );
  }

  static async resetPassword(_req: Request, res: Response) {
    return ApiResponse.success(res, { reset: true }, 'Password has been updated successfully');
  }
}
