import app from './app';
import { config } from './config/env';
import { Logger } from './utils/logger';
import { prisma } from './config/prisma';

const server = app.listen(config.port, async () => {
  Logger.info(`=======================================================`);
  Logger.info(` Industrial Approval Portal - Backend Server Running   `);
  Logger.info(` Port: http://localhost:${config.port}                `);
  Logger.info(` Environment: ${config.nodeEnv}                         `);
  Logger.info(` Health Check: http://localhost:${config.port}/api/health`);
  Logger.info(`=======================================================`);
});

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  Logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    Logger.info('Prisma database client disconnected.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server;
