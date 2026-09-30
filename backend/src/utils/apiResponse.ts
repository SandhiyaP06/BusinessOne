import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(
    res: Response,
    message: string = 'Internal server error',
    statusCode: number = 500,
    errors?: any
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: errors || undefined,
      timestamp: new Date().toISOString()
    });
  }
}
