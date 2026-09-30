import { prisma } from '../config/prisma';
import { AuditService } from '../middleware/audit.middleware';

export class BusinessService {
  static async create(userId: string, data: any, ipAddress?: string) {
    const business = await prisma.business.create({
      data: {
        userId,
        businessName: data.businessName,
        businessType: data.businessType,
        industryType: data.industryType,
        businessStage: data.businessStage || 'Proposed',
        projectSize: data.projectSize || 'MEDIUM',
        panNumber: data.panNumber,
        gstin: data.gstin,
        location: data.location,
        district: data.district,
        state: data.state,
        pincode: data.pincode,
        description: data.description
      }
    });

    await AuditService.log({
      userId,
      action: 'BUSINESS_CREATED',
      entityType: 'BUSINESS',
      entityId: business.id,
      description: `Registered business entity: ${business.businessName}`,
      ipAddress
    });

    return business;
  }

  static async getById(businessId: string) {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { applications: true, user: { select: { name: true, email: true, phone: true } } }
    });

    if (!business) throw new Error('Business entity not found');
    return business;
  }

  static async getByUser(userId: string) {
    return prisma.business.findMany({
      where: { userId },
      include: { applications: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async update(businessId: string, userId: string, data: any, ipAddress?: string) {
    const existing = await prisma.business.findUnique({ where: { id: businessId } });
    if (!existing) throw new Error('Business not found');
    if (existing.userId !== userId) throw new Error('Unauthorized to modify this business');

    const updated = await prisma.business.update({
      where: { id: businessId },
      data
    });

    await AuditService.log({
      userId,
      action: 'BUSINESS_UPDATED',
      entityType: 'BUSINESS',
      entityId: businessId,
      description: `Updated business profile: ${updated.businessName}`,
      ipAddress
    });

    return updated;
  }
}
