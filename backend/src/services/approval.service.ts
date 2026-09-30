import { prisma } from '../config/prisma';
import { DepartmentStatus } from '../constants/statuses';
import { WorkflowService } from './workflow.service';
import { AuditService } from '../middleware/audit.middleware';

export class ApprovalService {
  static async recordDecision(
    applicationId: string,
    departmentId: string,
    officerId: string,
    decision: 'APPROVED' | 'REJECTED',
    remarks?: string,
    ipAddress?: string
  ) {
    const dept = await prisma.department.findUnique({ where: { id: departmentId } });
    if (!dept) throw new Error('Department not found');

    const appDept = await prisma.applicationDepartment.findUnique({
      where: {
        applicationId_departmentId: {
          applicationId,
          departmentId
        }
      }
    });

    if (!appDept) throw new Error('Application is not assigned to this department');

    const status = decision === 'APPROVED' ? DepartmentStatus.APPROVED : DepartmentStatus.REJECTED;
    const certificateNo = decision === 'APPROVED' ? `${dept.shortCode}/2026/CLR-${Math.floor(1000 + Math.random() * 9000)}` : null;

    // Update departmental link
    await prisma.applicationDepartment.update({
      where: {
        applicationId_departmentId: {
          applicationId,
          departmentId
        }
      },
      data: {
        status,
        reviewedAt: new Date(),
        remarks: remarks || null,
        nocCertificateNo: certificateNo,
        assignedOfficerId: officerId
      }
    });

    // Create approval record
    const approval = await prisma.approval.create({
      data: {
        applicationId,
        departmentId,
        officerId,
        decision,
        remarks,
        licenceNumber: certificateNo,
        approvedAt: decision === 'APPROVED' ? new Date() : null,
        rejectedAt: decision === 'REJECTED' ? new Date() : null
      }
    });

    await AuditService.log({
      userId: officerId,
      action: decision === 'APPROVED' ? 'APPROVAL_GRANTED' : 'APPROVAL_REJECTED',
      entityType: 'APPROVAL',
      entityId: approval.id,
      description: `Department clearance ${decision} by ${dept.name}`,
      ipAddress
    });

    // Check if all mandatory departments are completed to grant final consolidated clearance
    const consensusResult = await WorkflowService.evaluateFinalConsensus(applicationId, officerId, ipAddress);

    return {
      approval,
      consensus: consensusResult
    };
  }

  static async getApprovalsByApplication(applicationId: string) {
    return prisma.approval.findMany({
      where: { applicationId },
      include: {
        department: true,
        officer: { select: { name: true, designation: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
