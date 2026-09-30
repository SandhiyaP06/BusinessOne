import { prisma } from '../config/prisma';
import { InspectionStatus, ApplicationStatus } from '../constants/statuses';
import { AuditService } from '../middleware/audit.middleware';

export class InspectionService {
  static async schedule(data: {
    applicationId: string;
    departmentId: string;
    inspectorId?: string;
    scheduledDate: string;
    location: string;
    remarks?: string;
  }, schedulerId: string, ipAddress?: string) {
    const inspection = await prisma.inspection.create({
      data: {
        applicationId: data.applicationId,
        departmentId: data.departmentId,
        inspectorId: data.inspectorId || null,
        scheduledDate: new Date(data.scheduledDate),
        location: data.location,
        status: data.inspectorId ? InspectionStatus.ASSIGNED : InspectionStatus.SCHEDULED,
        remarks: data.remarks
      },
      include: {
        department: true,
        application: { include: { business: true } }
      }
    });

    // Update application stage if needed
    await prisma.application.update({
      where: { id: data.applicationId },
      data: { status: ApplicationStatus.INSPECTION_PENDING }
    });

    // Notify entrepreneur
    await prisma.notification.create({
      data: {
        userId: inspection.application.business.userId,
        applicationId: data.applicationId,
        type: 'INSPECTION',
        title: 'Site Inspection Scheduled',
        message: `${inspection.department.name} has scheduled an on-site inspection on ${new Date(data.scheduledDate).toLocaleDateString()} at ${data.location}.`
      }
    });

    await AuditService.log({
      userId: schedulerId,
      action: 'INSPECTION_SCHEDULED',
      entityType: 'INSPECTION',
      entityId: inspection.id,
      description: `Scheduled site inspection for application ${inspection.application.applicationNumber}`,
      ipAddress
    });

    return inspection;
  }

  static async submitResult(
    inspectionId: string,
    inspectorId: string,
    data: {
      checklist: any[];
      findings: string;
      result: 'PASSED' | 'REINSPECT' | 'REJECTED';
      evidencePath?: string;
    },
    ipAddress?: string
  ) {
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: { application: { include: { business: true } }, department: true }
    });

    if (!inspection) throw new Error('Inspection record not found');

    const result = await prisma.inspectionResult.create({
      data: {
        inspectionId,
        checklist: JSON.stringify(data.checklist),
        findings: data.findings,
        result: data.result,
        evidencePath: data.evidencePath || null
      }
    });

    const statusMap = {
      PASSED: InspectionStatus.PASSED,
      REINSPECT: InspectionStatus.REINSPECTION_REQUIRED,
      REJECTED: InspectionStatus.COMPLETED
    };

    const updated = await prisma.inspection.update({
      where: { id: inspectionId },
      data: {
        status: statusMap[data.result],
        completedDate: new Date(),
        inspectorId
      }
    });

    await prisma.notification.create({
      data: {
        userId: inspection.application.business.userId,
        applicationId: inspection.applicationId,
        type: 'INSPECTION',
        title: `Site Inspection ${data.result === 'PASSED' ? 'Passed ✓' : 'Result Uploaded'}`,
        message: `Inspection by ${inspection.department.name} completed with result: ${data.result}.`
      }
    });

    await AuditService.log({
      userId: inspectorId,
      action: 'INSPECTION_COMPLETED',
      entityType: 'INSPECTION',
      entityId: inspectionId,
      description: `Inspection completed with result ${data.result}`,
      ipAddress
    });

    return { inspection: updated, result };
  }

  static async getByApplication(applicationId: string) {
    return prisma.inspection.findMany({
      where: { applicationId },
      include: {
        department: true,
        inspector: { select: { id: true, name: true, email: true, phone: true } },
        result: true
      },
      orderBy: { scheduledDate: 'desc' }
    });
  }

  static async getAll(inspectorId?: string) {
    return prisma.inspection.findMany({
      where: inspectorId ? { inspectorId } : undefined,
      include: {
        department: true,
        application: { include: { business: true } },
        inspector: { select: { id: true, name: true, email: true, phone: true } },
        result: true
      },
      orderBy: { scheduledDate: 'desc' }
    });
  }
}
