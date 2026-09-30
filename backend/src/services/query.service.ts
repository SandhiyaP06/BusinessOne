import { prisma } from '../config/prisma';
import { QueryStatus, ApplicationStatus } from '../constants/statuses';
import { AuditService } from '../middleware/audit.middleware';

export class QueryService {
  static async raise(data: {
    applicationId: string;
    departmentId: string;
    queryText: string;
    dueDate: string;
  }, officerId: string, ipAddress?: string) {
    const app = await prisma.application.findUnique({
      where: { id: data.applicationId },
      include: { business: true }
    });

    if (!app) throw new Error('Application not found');

    const query = await prisma.query.create({
      data: {
        applicationId: data.applicationId,
        departmentId: data.departmentId,
        raisedById: officerId,
        queryText: data.queryText,
        dueDate: new Date(data.dueDate),
        status: QueryStatus.OPEN
      },
      include: { department: true, raisedBy: { select: { name: true } } }
    });

    // Update application and department review statuses
    await prisma.application.update({
      where: { id: data.applicationId },
      data: { status: ApplicationStatus.QUERY_RAISED }
    });

    await prisma.applicationDepartment.updateMany({
      where: { applicationId: data.applicationId, departmentId: data.departmentId },
      data: { status: 'QUERY', remarks: data.queryText }
    });

    // Notify applicant
    await prisma.notification.create({
      data: {
        userId: app.business.userId,
        applicationId: app.id,
        type: 'QUERY',
        title: `Statutory Query Raised by ${query.department.name}`,
        message: `A query has been raised regarding your industrial filing. Response required by ${new Date(data.dueDate).toLocaleDateString()}.`
      }
    });

    await AuditService.log({
      userId: officerId,
      action: 'QUERY_RAISED',
      entityType: 'QUERY',
      entityId: query.id,
      description: `Query raised by ${query.department.name} on ${app.applicationNumber}`,
      ipAddress
    });

    return query;
  }

  static async respond(
    queryId: string,
    userId: string,
    responseText: string,
    attachments?: string[],
    ipAddress?: string
  ) {
    const query = await prisma.query.findUnique({
      where: { id: queryId },
      include: { application: { include: { business: true } }, department: true }
    });

    if (!query) throw new Error('Query not found');
    if (query.application.business.userId !== userId) throw new Error('Unauthorized');

    const response = await prisma.queryResponse.create({
      data: {
        queryId,
        responseText,
        attachments: attachments ? JSON.stringify(attachments) : null,
        respondedById: userId
      }
    });

    const updatedQuery = await prisma.query.update({
      where: { id: queryId },
      data: { status: QueryStatus.RESPONDED }
    });

    // Update department status back to IN_REVIEW
    await prisma.applicationDepartment.updateMany({
      where: { applicationId: query.applicationId, departmentId: query.departmentId },
      data: { status: 'IN_REVIEW', remarks: 'Applicant response received' }
    });

    await AuditService.log({
      userId,
      action: 'QUERY_ANSWERED',
      entityType: 'QUERY',
      entityId: queryId,
      description: `Applicant responded to query ${query.id}`,
      ipAddress
    });

    return { query: updatedQuery, response };
  }

  static async resolve(queryId: string, officerId: string, ipAddress?: string) {
    const query = await prisma.query.findUnique({ where: { id: queryId } });
    if (!query) throw new Error('Query not found');

    const resolved = await prisma.query.update({
      where: { id: queryId },
      data: {
        status: QueryStatus.RESOLVED,
        resolvedAt: new Date()
      }
    });

    await AuditService.log({
      userId: officerId,
      action: 'QUERY_RESOLVED',
      entityType: 'QUERY',
      entityId: queryId,
      description: `Query marked as resolved by officer`,
      ipAddress
    });

    return resolved;
  }

  static async getByApplication(applicationId: string) {
    return prisma.query.findMany({
      where: { applicationId },
      include: {
        department: true,
        raisedBy: { select: { name: true, designation: true } },
        responses: {
          include: { respondedBy: { select: { name: true } } },
          orderBy: { respondedAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
