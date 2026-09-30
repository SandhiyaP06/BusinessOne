import { prisma } from '../config/prisma';
import { DepartmentStatus } from '../constants/statuses';
import { AuditService } from '../middleware/audit.middleware';

export class DepartmentService {
  static async getAll() {
    return prisma.department.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { applicationDepartments: true, officers: true } }
      }
    });
  }

  static async getApplicationsForDepartment(departmentId: string) {
    return prisma.applicationDepartment.findMany({
      where: { departmentId },
      include: {
        application: {
          include: {
            business: true,
            documents: true
          }
        },
        assignedOfficer: { select: { name: true, email: true, designation: true } }
      },
      orderBy: { assignedAt: 'desc' }
    });
  }

  static async routeApplication(applicationId: string, departmentId: string, officerId?: string, ipAddress?: string) {
    const dept = await prisma.department.findUnique({ where: { id: departmentId } });
    if (!dept) throw new Error('Department not found');

    const slaTargetDate = new Date();
    slaTargetDate.setDate(slaTargetDate.getDate() + dept.mandatedSlaDays);

    const link = await prisma.applicationDepartment.upsert({
      where: {
        applicationId_departmentId: {
          applicationId,
          departmentId
        }
      },
      create: {
        applicationId,
        departmentId,
        assignedOfficerId: officerId || null,
        status: DepartmentStatus.IN_REVIEW,
        slaTargetDate,
        remarks: 'Directly routed by authority'
      },
      update: {
        assignedOfficerId: officerId || undefined,
        status: DepartmentStatus.IN_REVIEW,
        slaTargetDate
      }
    });

    await AuditService.log({
      userId: officerId || null,
      action: 'DEPARTMENT_ASSIGNED',
      entityType: 'APPLICATION',
      entityId: applicationId,
      description: `Routed to ${dept.name}`,
      ipAddress
    });

    return link;
  }
}
