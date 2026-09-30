import { prisma } from '../config/prisma';

export class NotificationService {
  static async getForUser(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async markAsRead(notificationId: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true }
    });
  }

  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
  }
}

export class RenewalService {
  static async getAll(userId?: string) {
    return prisma.renewal.findMany({
      where: userId ? {
        application: { business: { userId } }
      } : undefined,
      include: {
        application: {
          include: { business: true }
        }
      },
      orderBy: { expiryDate: 'asc' }
    });
  }

  static async renewApplication(applicationId: string, userId: string) {
    const renewal = await prisma.renewal.findFirst({
      where: { applicationId }
    });

    if (!renewal) throw new Error('No licence found for renewal');

    const updated = await prisma.renewal.update({
      where: { id: renewal.id },
      data: {
        renewalStatus: 'RENEWAL_SUBMITTED',
        renewedAt: new Date()
      }
    });

    await prisma.notification.create({
      data: {
        userId,
        applicationId,
        type: 'RENEWAL',
        title: 'Licence Renewal Submitted',
        message: `Renewal filing for licence ${renewal.licenceNumber} has been received under fast-track processing.`
      }
    });

    return updated;
  }
}
