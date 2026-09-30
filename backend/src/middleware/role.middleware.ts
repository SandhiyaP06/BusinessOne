import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { ApiResponse } from '../utils/apiResponse';

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Unauthorized access', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Access forbidden. Role '${req.user.role}' is not authorized for this resource. Required: [${allowedRoles.join(', ')}]`,
        403
      );
    }

    return next();
  };
};
