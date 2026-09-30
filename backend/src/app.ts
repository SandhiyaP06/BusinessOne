import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { config } from './config/env';
import apiRoutes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { ApiResponse } from './utils/apiResponse';

const app: Application = express();

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: config.corsOrigin || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(path.resolve(config.uploadDir)));

// Root Route Handler
app.get('/', (_req: Request, res: Response) => {
  return ApiResponse.success(res, {
    system: 'Industrial Approval Portal Backend API',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: {
      health: '/api/health',
      auth: '/api/auth',
      applications: '/api/applications',
      departments: '/api/departments',
      documents: '/api/documents',
      inspections: '/api/inspections',
      queries: '/api/queries',
      analytics: '/api/analytics/overview'
    },
    frontendApp: 'http://localhost:5173'
  }, 'Industrial Approval Portal API is running');
});

// Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  return ApiResponse.success(res, {
    status: 'ONLINE',
    system: 'Industrial Approval Portal Backend API',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  }, 'System is healthy');
});

// Mount Main API Router
app.use('/api', apiRoutes);

// 404 Not Found Handler
app.use('*', (req: Request, res: Response) => {
  return ApiResponse.error(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
