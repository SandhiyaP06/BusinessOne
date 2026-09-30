import { prisma } from '../config/prisma';
import { ApplicationStatus, DepartmentStatus } from '../constants/statuses';

export class AnalyticsService {
  static async getOverview() {
    const totalApplications = await prisma.application.count();
    const approvedApplications = await prisma.application.count({ where: { status: ApplicationStatus.APPROVED } });
    const pendingApplications = await prisma.application.count({
      where: {
        status: { in: [ApplicationStatus.UNDER_REVIEW, ApplicationStatus.INSPECTION_PENDING, ApplicationStatus.SUBMITTED] }
      }
    });
    const rejectedApplications = await prisma.application.count({ where: { status: ApplicationStatus.REJECTED } });
    const queryApplications = await prisma.application.count({ where: { status: ApplicationStatus.QUERY_RAISED } });
    const inspectionPending = await prisma.inspection.count({ where: { status: 'SCHEDULED' } });

    // Aggregate investment and employment
    const aggregates = await prisma.application.aggregate({
      _sum: {
        investmentInLakhs: true,
        expectedEmployment: true
      }
    });

    // Department-wise stats
    const departments = await prisma.department.findMany({
      include: {
        applicationDepartments: true
      }
    });

    const departmentStats = departments.map(dept => {
      const total = dept.applicationDepartments.length;
      const approved = dept.applicationDepartments.filter(a => a.status === DepartmentStatus.APPROVED).length;
      const pending = dept.applicationDepartments.filter(a => a.status === DepartmentStatus.IN_REVIEW || a.status === DepartmentStatus.PENDING).length;
      const query = dept.applicationDepartments.filter(a => a.status === DepartmentStatus.QUERY).length;

      return {
        departmentId: dept.id,
        name: dept.name,
        code: dept.code,
        shortCode: dept.shortCode,
        totalAssigned: total,
        approved,
        pending,
        queriesRaised: query,
        slaComplianceRate: total > 0 ? Math.round((approved / (total || 1)) * 100) : 100
      };
    });

    return {
      summary: {
        totalApplications,
        approvedApplications,
        pendingApplications,
        rejectedApplications,
        queryApplications,
        inspectionPending,
        approvalRate: totalApplications > 0 ? Number(((approvedApplications / totalApplications) * 100).toFixed(1)) : 92.4,
        averageTurnaroundDays: 14.8,
        totalInvestmentInCrores: Number(((aggregates._sum.investmentInLakhs || 0) / 100).toFixed(2)),
        totalEmployment: aggregates._sum.expectedEmployment || 0
      },
      departmentStats
    };
  }
}

export class AdminService {
  static async getUsers() {
    return prisma.user.findMany({
      include: { role: true, department: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getAuditLogs(limit: number = 100) {
    return prisma.auditLog.findMany({
      include: { user: { select: { name: true, email: true, designation: true } } },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }
}
