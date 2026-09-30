import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse';
import { Logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(`[Unhandled Error] ${req.method} ${req.url} - ${err.message}`, err.stack);

  if (err.name === 'MulterError') {
    return ApiResponse.error(res, `File upload error: ${err.message}`, 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : undefined);
};
