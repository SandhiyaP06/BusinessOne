import { prisma } from '../config/prisma';
import { Logger } from '../utils/logger';

export interface AuditLogParams {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  description: string;
  ipAddress?: string | null;
}

export class AuditService {
  static async log(params: AuditLogParams) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: params.userId || null,
          action: params.action,
          entityType: params.entityType,
          entityId: params.entityId || null,
          description: params.description,
          ipAddress: params.ipAddress || null
        }
      });
      Logger.info(`[AUDIT] Action: ${params.action} on ${params.entityType} ${params.entityId || ''} by User: ${params.userId || 'ANONYMOUS'}`);
    } catch (err: any) {
      Logger.error(`[AUDIT ERROR] Failed to record audit log: ${err.message}`);
    }
  }
}
