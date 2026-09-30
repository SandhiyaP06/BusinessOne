import { prisma } from '../config/prisma';
import { ApplicationStatus, DepartmentStatus } from '../constants/statuses';
import { RecommendationService } from './recommendation.service';
import { AuditService } from '../middleware/audit.middleware';

export class WorkflowService {
  /**
   * Main submission workflow engine trigger
   */
  static async processApplicationSubmission(applicationId: string, userId: string, ipAddress?: string) {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        business: true,
        documents: true,
        departments: true
      }
    });

    if (!app) throw new Error('Application docket not found');
    if (app.status !== ApplicationStatus.DRAFT && app.status !== ApplicationStatus.RESUBMISSION_REQUIRED) {
      throw new Error(`Application cannot be submitted in current state: ${app.status}`);
    }

    // 1. Verify business profile completeness
    if (!app.business.panNumber || !app.business.location || !app.business.district) {
      throw new Error('Business profile has incomplete mandatory coordinates (PAN, location, district)');
    }

    // 2. Check for at least 1 uploaded document
    const uploadedDocs = app.documents.filter(d => d.status === 'UPLOADED' || d.status === 'VERIFIED');
    if (uploadedDocs.length === 0) {
      throw new Error('At least one statutory blueprint or enclosure must be uploaded prior to submission');
    }

    // 3. Compute statutory recommendations & required departments
    const recommendations = await RecommendationService.getRecommendations({
      category: app.category,
      industryType: app.business.industryType,
      projectSize: app.business.projectSize,
      powerLoadKVA: app.powerLoadKVA,
      waterLoadKLD: app.waterLoadKLD,
      expectedEmployment: app.expectedEmployment,
      hasBoiler: app.hasBoiler,
      hasHazardousChem: app.hasHazardousChem
    });

    // 4. Resolve departments in database
    const allDepartments = await prisma.department.findMany({ where: { isActive: true } });

    // 5. Create Workflow Stages
    const stages = [
      { stageName: 'SUBMISSION', status: 'COMPLETED', startedAt: new Date(), completedAt: new Date(), remarks: 'Form-1A e-signed and registered' },
      { stageName: 'SCRUTINY', status: 'COMPLETED', startedAt: new Date(), completedAt: new Date(), remarks: 'Automated statutory rules mapped' },
      { stageName: 'PARALLEL_ROUTING', status: 'IN_PROGRESS', startedAt: new Date(), remarks: 'Concurrent department review initiated' },
      { stageName: 'INSPECTION', status: 'PENDING', startedAt: new Date(), remarks: 'Central Inspection System queue' },
      { stageName: 'FINAL_CONSOLIDATION', status: 'PENDING', startedAt: new Date(), remarks: 'Single window clearance board decision' }
    ];

    // Clean existing stages if resubmitted
    await prisma.workflowStage.deleteMany({ where: { applicationId: app.id } });
    for (const st of stages) {
      await prisma.workflowStage.create({
        data: {
          applicationId: app.id,
          stageName: st.stageName,
          status: st.status,
          startedAt: st.startedAt,
          completedAt: st.completedAt,
          remarks: st.remarks
        }
      });
    }

    // 6. Route to required departments (Parallel multi-department creation)
    const targetDeptCodes = Array.from(new Set(recommendations.map(r => r.departmentCode)));
    
    // Clean existing assignments if any
    await prisma.applicationDepartment.deleteMany({ where: { applicationId: app.id } });

    for (const code of targetDeptCodes) {
      const dept = allDepartments.find(d => d.code === code);
      if (dept) {
        const slaTargetDate = new Date();
        slaTargetDate.setDate(slaTargetDate.getDate() + dept.mandatedSlaDays);

        // Find available officer for assignment
        const officer = await prisma.user.findFirst({
          where: { departmentId: dept.id, isActive: true }
        });

        await prisma.applicationDepartment.create({
          data: {
            applicationId: app.id,
            departmentId: dept.id,
            assignedOfficerId: officer?.id || null,
            status: DepartmentStatus.IN_REVIEW,
            slaTargetDate,
            remarks: `Routed under single-window composite rule: ${dept.name}`
          }
        });
      }
    }

    // 7. Update Application State
    const updatedApp = await prisma.application.update({
      where: { id: app.id },
      data: {
        status: ApplicationStatus.UNDER_REVIEW,
        currentStage: 'PARALLEL_DEPARTMENT_REVIEW',
        submittedAt: new Date()
      },
      include: {
        business: true,
        departments: { include: { department: true, assignedOfficer: true } },
        workflowStages: true
      }
    });

    // 8. Trigger Notifications
    await prisma.notification.create({
      data: {
        userId,
        applicationId: app.id,
        type: 'APPLICATION',
        title: 'Application Successfully Submitted',
        message: `Your composite industrial clearance application (${app.applicationNumber}) has been submitted and concurrently routed to ${targetDeptCodes.length} statutory departments.`
      }
    });

    await AuditService.log({
      userId,
      action: 'APPLICATION_SUBMITTED',
      entityType: 'APPLICATION',
      entityId: app.id,
      description: `Application ${app.applicationNumber} submitted and routed to ${targetDeptCodes.join(', ')}`,
      ipAddress
    });

    return updatedApp;
  }

  /**
   * Evaluates whether all mandatory department reviews are approved to award final clearance
   */
  static async evaluateFinalConsensus(applicationId: string, officerId: string, ipAddress?: string) {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        departments: { include: { department: true } },
        business: { include: { user: true } }
      }
    });

    if (!app) throw new Error('Application not found');

    const totalDepts = app.departments.length;
    const approvedDepts = app.departments.filter(d => d.status === DepartmentStatus.APPROVED);
    const rejectedDepts = app.departments.filter(d => d.status === DepartmentStatus.REJECTED);

    if (rejectedDepts.length > 0) {
      // Application has a rejection
      await prisma.application.update({
        where: { id: app.id },
        data: {
          status: ApplicationStatus.REJECTED,
          currentStage: 'REJECTED'
        }
      });

      await prisma.notification.create({
        data: {
          userId: app.business.userId,
          applicationId: app.id,
          type: 'APPROVAL',
          title: 'Application Clearance Status Update',
          message: `Application ${app.applicationNumber} has received a rejection notice from reviewing authorities.`
        }
      });

      return { status: ApplicationStatus.REJECTED, allApproved: false };
    }

    if (totalDepts > 0 && approvedDepts.length === totalDepts) {
      // All mandatory departments have accorded clearance!
      const completedAt = new Date();
      const licenceNumber = `IND/SWC/2026/${Math.floor(100000 + Math.random() * 900000)}-KRN`;

      // Update Application to APPROVED
      await prisma.application.update({
        where: { id: app.id },
        data: {
          status: ApplicationStatus.APPROVED,
          currentStage: 'APPROVED',
          completedAt
        }
      });

      // Mark Final Workflow Stage
      await prisma.workflowStage.updateMany({
        where: { applicationId: app.id, stageName: 'FINAL_CONSOLIDATION' },
        data: { status: 'COMPLETED', completedAt, remarks: `Consolidated approval issued. Licence No: ${licenceNumber}` }
      });

      // Issue Digital Licence in Renewal Master
      const issueDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 3); // 3 Years statutory validity

      await prisma.renewal.create({
        data: {
          applicationId: app.id,
          licenceNumber,
          licenceName: 'Consolidated Single Window Operating Clearance',
          issueDate,
          expiryDate,
          renewalStatus: 'ACTIVE'
        }
      });

      // Create Approval Record
      await prisma.approval.create({
        data: {
          applicationId: app.id,
          departmentId: app.departments[0].departmentId,
          officerId,
          decision: 'APPROVED',
          licenceNumber,
          remarks: 'All mandatory department reviews, inspections, and document scrutinies completed successfully.',
          approvedAt: completedAt
        }
      });

      // Send Congratulations Notification
      await prisma.notification.create({
        data: {
          userId: app.business.userId,
          applicationId: app.id,
          type: 'APPROVAL',
          title: '🎉 Statutory Industrial Clearance Granted!',
          message: `Congratulations! Consolidated Operating Licence ${licenceNumber} has been issued for ${app.business.businessName}. You can now download your digital certificate.`
        }
      });

      await AuditService.log({
        userId: officerId,
        action: 'FINAL_APPROVAL_GRANTED',
        entityType: 'APPLICATION',
        entityId: app.id,
        description: `Final consolidated approval granted for ${app.applicationNumber}. Licence: ${licenceNumber}`,
        ipAddress
      });

      return { status: ApplicationStatus.APPROVED, allApproved: true, licenceNumber };
    }

    return { status: app.status, allApproved: false, pendingDepartments: totalDepts - approvedDepts.length };
  }
}
