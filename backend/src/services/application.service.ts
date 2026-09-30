import { prisma } from '../config/prisma';
import { ApplicationStatus } from '../constants/statuses';
import { Roles } from '../constants/roles';
import { AuditService } from '../middleware/audit.middleware';

export class ApplicationService {
  static async create(userId: string, data: any, ipAddress?: string) {
    // Verify business ownership
    const business = await prisma.business.findUnique({
      where: { id: data.businessId }
    });

    if (!business || business.userId !== userId) {
      throw new Error('Invalid business entity or unauthorized');
    }

    const count = await prisma.application.count();
    const applicationNumber = `APP-2026-IND-0${4000 + count + Math.floor(Math.random() * 900)}`;

    const application = await prisma.application.create({
      data: {
        applicationNumber,
        businessId: data.businessId,
        applicationType: data.applicationType || 'COMPOSITE_CLEARANCE',
        status: ApplicationStatus.DRAFT,
        currentStage: 'DRAFT',
        category: data.category || 'GREEN',
        investmentInLakhs: data.investmentInLakhs || 0,
        expectedEmployment: data.expectedEmployment || 0,
        landAreaAcres: data.landAreaAcres || 0,
        powerLoadKVA: data.powerLoadKVA || 0,
        waterLoadKLD: data.waterLoadKLD || 0,
        hasBoiler: data.hasBoiler || false,
        hasHazardousChem: data.hasHazardousChem || false
      },
      include: {
        business: true
      }
    });

    await AuditService.log({
      userId,
      action: 'APPLICATION_CREATED',
      entityType: 'APPLICATION',
      entityId: application.id,
      description: `Created application draft ${application.applicationNumber}`,
      ipAddress
    });

    return application;
  }

  static async getById(applicationId: string) {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        business: { include: { user: { select: { id: true, name: true, email: true, phone: true } } } },
        departments: { include: { department: true, assignedOfficer: { select: { id: true, name: true, email: true, designation: true } } } },
        documents: { include: { validations: { include: { validatedBy: { select: { name: true, designation: true } } } } } },
        inspections: { include: { department: true, inspector: { select: { name: true, phone: true } }, result: true } },
        queries: { include: { department: true, raisedBy: { select: { name: true } }, responses: { include: { respondedBy: { select: { name: true } } } } } },
        workflowStages: { orderBy: { startedAt: 'asc' } },
        approvals: { include: { department: true, officer: { select: { name: true, designation: true } } } },
        renewals: true
      }
    });

    if (!application) throw new Error('Application docket not found');
    return application;
  }

  static async getAll(user: { userId: string; role: string; departmentId?: string | null }) {
    if (user.role === Roles.ADMIN) {
      return prisma.application.findMany({
        include: {
          business: true,
          departments: { include: { department: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    if (user.role === Roles.DEPARTMENT_OFFICER && user.departmentId) {
      return prisma.application.findMany({
        where: {
          departments: {
            some: { departmentId: user.departmentId }
          }
        },
        include: {
          business: true,
          departments: { include: { department: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    if (user.role === Roles.INSPECTOR) {
      return prisma.application.findMany({
        where: {
          inspections: {
            some: { inspectorId: user.userId }
          }
        },
        include: {
          business: true,
          departments: { include: { department: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    // Default: ENTREPRENEUR - only their own applications
    return prisma.application.findMany({
      where: {
        business: { userId: user.userId }
      },
      include: {
        business: true,
        departments: { include: { department: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async update(applicationId: string, userId: string, data: any, ipAddress?: string) {
    const existing = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { business: true }
    });

    if (!existing) throw new Error('Application not found');
    if (existing.business.userId !== userId) throw new Error('Unauthorized access');
    if (existing.status !== ApplicationStatus.DRAFT && existing.status !== ApplicationStatus.RESUBMISSION_REQUIRED) {
      throw new Error(`Application cannot be modified in state ${existing.status}`);
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data
    });

    await AuditService.log({
      userId,
      action: 'APPLICATION_UPDATED',
      entityType: 'APPLICATION',
      entityId: applicationId,
      description: `Updated application ${updated.applicationNumber}`,
      ipAddress
    });

    return updated;
  }
}
