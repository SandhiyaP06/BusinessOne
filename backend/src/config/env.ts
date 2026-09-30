import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'industrial_approval_portal_jwt_secret_fallback',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  uploadDir: process.env.UPLOAD_DIR || path.resolve(__dirname, '../../uploads'),
  maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || '25', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
