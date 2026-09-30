import { Request, Response, NextFunction } from 'express';
import { TokenUtil, TokenPayload } from '../utils/token';
import { ApiResponse } from '../utils/apiResponse';
import { prisma } from '../config/prisma';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload & { name?: string; isActive?: boolean };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.error(res, 'Authentication token missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = TokenUtil.verify(token);

    // Verify user exists and is active in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true }
    });

    if (!user || !user.isActive) {
      return ApiResponse.error(res, 'User account not found or disabled', 401);
    }

    req.user = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
      departmentId: user.departmentId,
      isActive: user.isActive
    };

    return next();
  } catch (error: any) {
    return ApiResponse.error(res, 'Invalid or expired session token', 401, error.message);
  }
};
