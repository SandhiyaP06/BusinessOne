import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Application, 
  DocumentItem, 
  Inspection, 
  DepartmentQuery, 
  DigitalLicence,
  DepartmentApprovalStatus 
} from '../types';
import { mockApplications } from '../data/mockApplications';
import { mockDocuments } from '../data/mockDocuments';
import { mockInspections } from '../data/mockInspections';
import { mockQueries } from '../data/mockQueries';
import { mockDigitalLicences } from '../data/mockApprovals';
import ApplicationService from '../services/applicationService';
import DocumentService from '../services/documentService';
import InspectionService from '../services/inspectionService';
import QueryService from '../services/queryService';
import ApprovalService from '../services/approvalService';
import RenewalService from '../services/renewalService';

interface ApplicationContextType {
  applications: Application[];
  selectedApplicationId: string;
  setSelectedApplicationId: (id: string) => void;
  selectedApplication?: Application;
  isLoading: boolean;
  refreshAll: () => Promise<void>;
  
  addApplication: (app: Partial<Application>) => Promise<string>;
  updateApplicationStage: (id: string, stage: Application['currentStage']) => void;
  updateDepartmentStatus: (appId: string, deptId: string, status: DepartmentApprovalStatus, remarks?: string) => Promise<void>;
  
  documents: DocumentItem[];
  uploadDocument: (docId: string, fileName: string, fileSize: string, fileObj?: File) => Promise<void>;
  verifyDocument: (docId: string, officerName: string, status: 'VERIFIED' | 'REJECTED', reason?: string) => Promise<void>;
  
  inspections: Inspection[];
  updateInspectionChecklist: (inspectionId: string, checkId: string, compliant: boolean, notes?: string) => void;
  completeInspection: (inspectionId: string, recommendation: 'APPROVE' | 'RE_INSPECT' | 'REJECT', findings: string) => Promise<void>;
  
  queries: DepartmentQuery[];
  respondToQuery: (queryId: string, responseText: string, attachments?: string[]) => Promise<void>;
  raiseQuery: (appId: string, dept: string, officer: string, question: string, dueDate: string) => Promise<void>;
  
  licences: DigitalLicence[];
  renewLicence: (licenceId: string) => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>(mockApplications[0].id);
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [queries, setQueries] = useState<DepartmentQuery[]>(mockQueries);
  const [licences, setLicences] = useState<DigitalLicence[]>(mockDigitalLicences);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync data from backend APIs
  const refreshAll = useCallback(async () => {
    try {
      // 1. Fetch Applications
      const apps = await ApplicationService.getAll();
      if (apps && apps.length > 0) {
        const mappedApps: Application[] = apps.map((a: any) => ({
          id: a.id || a.applicationNumber,
          businessName: a.business?.businessName || 'Industrial Enterprise',
          enterpriseType: (a.business?.projectSize || 'MEDIUM') as any,
          category: (a.category || 'GREEN') as any,
          sector: a.business?.industryType || 'Advanced Manufacturing',
          projectDescription: a.business?.description || 'Industrial Project',
          investmentInLakhs: a.investmentInLakhs || 0,
          expectedEmployment: a.expectedEmployment || 0,
          proposedLocation: {
            address: a.business?.location || 'Industrial Estate',
            plotNo: 'Plot ' + (a.business?.pincode?.slice(-2) || '14'),
            industrialArea: a.business?.district || 'State Industrial Area',
            district: a.business?.district || 'Central District',
            state: a.business?.state || 'State',
            pincode: a.business?.pincode || '560001',
            landAreaAcres: a.landAreaAcres || 2.0,
            powerRequirementKVA: a.powerLoadKVA || 250,
            waterRequirementKLD: a.waterLoadKLD || 20
          },
          contactPerson: {
            name: a.business?.user?.name || 'Managing Director',
            designation: a.business?.user?.designation || 'Promoter',
            mobile: a.business?.user?.phone || '+91 99000 11223',
            email: a.business?.user?.email || 'contact@enterprise.com',
            panNumber: a.business?.panNumber || 'AAACA9812G',
            gstin: a.business?.gstin || '29AAACA9812G1Z5'
          },
          currentStage: (a.status === 'APPROVED' ? 'APPROVED' : a.currentStage || 'PARALLEL_DEPARTMENT_REVIEW') as any,
          stageProgress: a.status === 'APPROVED' ? 100 : a.status === 'DRAFT' ? 10 : 65,
          submittedAt: a.submittedAt ? new Date(a.submittedAt).toLocaleDateString('en-GB') : 'Recently',
          lastUpdatedAt: new Date(a.updatedAt || a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          departments: (a.departments || []).map((d: any) => ({
            departmentId: d.department?.id || d.departmentId,
            departmentName: d.department?.name || 'State Department',
            shortCode: (d.department?.shortCode || 'DIC') as any,
            status: d.status as any,
            assignedOfficer: d.assignedOfficer?.name || 'Assigned Officer',
            submittedDate: new Date(d.assignedAt || Date.now()).toISOString().split('T')[0],
            lastUpdated: new Date(d.reviewedAt || d.assignedAt || Date.now()).toISOString().split('T')[0],
            slaDays: d.department?.mandatedSlaDays || 21,
            remainingDays: d.status === 'APPROVED' ? 0 : 12,
            remarks: d.remarks,
            approvalCertificateNo: d.nocCertificateNo
          })),
          applicableApprovals: []
        }));
        setApplications(mappedApps);
        if (!selectedApplicationId || !mappedApps.some(m => m.id === selectedApplicationId)) {
          setSelectedApplicationId(mappedApps[0].id);
        }
      }

      // 2. Fetch Inspections
      const inspList = await InspectionService.getAll();
      if (inspList && inspList.length > 0) {
        const mappedInspections: Inspection[] = inspList.map((insp: any) => ({
          id: insp.id,
          applicationId: insp.applicationId,
          businessName: insp.application?.business?.businessName || 'Apex Green Energy',
          department: insp.department?.name || 'Department of Fire & Safety',
          inspectorName: insp.inspector?.name || 'Rajeshwar Patil',
          inspectorDesignation: insp.inspector?.designation || 'Divisional Safety Officer',
          scheduledDate: new Date(insp.scheduledDate).toISOString().split('T')[0],
          scheduledTime: '10:30 AM',
          siteLocation: insp.location || 'Industrial Site',
          inspectorContact: '+91 98450 22334',
          status: (insp.status === 'COMPLETED' || insp.status === 'PASSED') ? 'PASSED' : 'SCHEDULED',
          checklist: insp.result?.checklist ? (typeof insp.result.checklist === 'string' ? JSON.parse(insp.result.checklist) : insp.result.checklist) : mockInspections[0].checklist,
          findings: insp.result?.findings || insp.remarks,
          recommendation: (insp.result?.result === 'PASSED' ? 'APPROVE' : 'RE_INSPECT') as any,
          reportDate: insp.result?.submittedAt ? new Date(insp.result.submittedAt).toISOString().split('T')[0] : undefined
        }));
        setInspections(mappedInspections);
      }

      // 3. Fetch Licences / Renewals
      const renewalsList = await RenewalService.getAll();
      if (renewalsList && renewalsList.length > 0) {
        const mappedLicences: DigitalLicence[] = renewalsList.map((ren: any) => {
          const exp = new Date(ren.expiryDate);
          const now = new Date();
          const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          return {
            id: ren.id,
            licenceNumber: ren.licenceNumber,
            licenceName: ren.licenceName || 'Consolidated Single Window Operating Clearance',
            issuedBy: 'State Single Window Digital Clearance Authority',
            issuingAuthority: 'State Single Window Approval Authority',
            applicationId: ren.application?.applicationNumber || ren.applicationId,
            businessName: ren.application?.business?.businessName || 'Industrial Enterprise',
            issueDate: new Date(ren.issueDate).toLocaleDateString('en-GB'),
            expiryDate: new Date(ren.expiryDate).toLocaleDateString('en-GB'),
            daysRemaining: Math.max(0, diffDays),
            status: (diffDays < 30 ? 'EXPIRING_SOON' : ren.renewalStatus === 'RENEWAL_SUBMITTED' ? 'RENEWAL_IN_PROGRESS' : 'ACTIVE') as any,
            signatory: 'Priyanka Sharma, IAS',
            signatoryDesignation: 'State Single Window Clearance Commissioner',
            termsAndConditions: [
              'Compliance with environmental emission norms is mandatory.',
              'Quarterly statutory self-declaration must be filed on the portal.',
              'Renewal application must be initiated 30 days prior to expiry.'
            ],
            qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + ren.licenceNumber,
            digitalSignature: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
          };
        });
        setLicences(mappedLicences);
      }
    } catch (err) {
      console.warn('Backend live sync fallback to cached mock records:', err);
    }
  }, [selectedApplicationId]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const selectedApplication = applications.find(a => a.id === selectedApplicationId) || applications[0];

  const addApplication = async (appData: Partial<Application>): Promise<string> => {
    setIsLoading(true);
    try {
      // Create via backend API
      const newDraft = await ApplicationService.createDraft({
        businessId: 'default-biz',
        category: (appData.category as any) || 'GREEN',
        investmentInLakhs: appData.investmentInLakhs || 500,
        expectedEmployment: appData.expectedEmployment || 50,
        landAreaAcres: appData.proposedLocation?.landAreaAcres || 2.0,
        powerLoadKVA: appData.proposedLocation?.powerRequirementKVA || 250,
        waterLoadKLD: appData.proposedLocation?.waterRequirementKLD || 20,
        hasBoiler: false,
        hasHazardousChem: false
      });

      const newId = newDraft.applicationNumber || newDraft.id;
      await refreshAll();
      setSelectedApplicationId(newId);
      return newId;
    } catch {
      // Fallback local creation
      const newId = `APP-2026-IND-0${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp: Application = {
        id: newId,
        businessName: appData.businessName || 'New Industrial Enterprise',
        enterpriseType: appData.enterpriseType || 'MEDIUM',
        category: appData.category || 'GREEN',
        sector: appData.sector || 'Manufacturing & Engineering',
        projectDescription: appData.projectDescription || '',
        investmentInLakhs: appData.investmentInLakhs || 500,
        expectedEmployment: appData.expectedEmployment || 50,
        proposedLocation: appData.proposedLocation || {
          address: 'Industrial Plot 14',
          plotNo: '14',
          industrialArea: 'State Industrial Growth Centre',
          district: 'Central Zone',
          state: 'State',
          pincode: '560001',
          landAreaAcres: 2.0,
          powerRequirementKVA: 250,
          waterRequirementKLD: 20
        },
        contactPerson: appData.contactPerson || {
          name: 'Applicant Name',
          designation: 'Director',
          mobile: '+91 99999 00000',
          email: 'contact@enterprise.com',
          panNumber: 'ABCDE1234F',
          gstin: '29ABCDE1234F1Z5'
        },
        currentStage: 'SUBMITTED',
        stageProgress: 25,
        submittedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' 10:00 AM',
        lastUpdatedAt: 'Just now',
        departments: [
          {
            departmentId: 'DEPT-IND',
            departmentName: 'Directorate of Industries & Commerce',
            shortCode: 'DIC',
            status: 'UNDER_REVIEW',
            assignedOfficer: 'S. K. Nambiar (Joint Director)',
            submittedDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            slaDays: 15,
            remainingDays: 15
          },
          {
            departmentId: 'DEPT-PCB',
            departmentName: 'State Pollution Control Board',
            shortCode: 'SPCB',
            status: 'ASSIGNED',
            assignedOfficer: 'Dr. Ananya Sen (SPCB)',
            submittedDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            slaDays: 30,
            remainingDays: 30
          },
          {
            departmentId: 'DEPT-FIRE',
            departmentName: 'Fire & Emergency Safety Services',
            shortCode: 'FIRE',
            status: 'ASSIGNED',
            assignedOfficer: 'Rajeshwar Patil (FIRE)',
            submittedDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            slaDays: 21,
            remainingDays: 21
          }
        ],
        applicableApprovals: []
      };

      setApplications(prev => [newApp, ...prev]);
      setSelectedApplicationId(newId);
      return newId;
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStage = (id: string, stage: Application['currentStage']) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        let progress = a.stageProgress;
        if (stage === 'SUBMITTED') progress = 25;
        if (stage === 'PARALLEL_DEPARTMENT_REVIEW') progress = 55;
        if (stage === 'INSPECTION') progress = 75;
        if (stage === 'FINAL_APPROVAL') progress = 90;
        if (stage === 'APPROVED') progress = 100;
        return { ...a, currentStage: stage, stageProgress: progress, lastUpdatedAt: 'Just now' };
      }
      return a;
    }));
  };

  const updateDepartmentStatus = async (
    appId: string,
    deptId: string,
    status: DepartmentApprovalStatus,
    remarks?: string
  ) => {
    try {
      if (status === 'APPROVED') {
        await ApprovalService.approveDepartment(appId, undefined, remarks);
      } else if (status === 'REJECTED') {
        await ApprovalService.rejectDepartment(appId, undefined, remarks);
      }
    } catch {
      // Local state fallback
    }

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedDepts = app.departments.map(d => {
          if (d.departmentId === deptId || d.shortCode === deptId) {
            return {
              ...d,
              status,
              remarks: remarks !== undefined ? remarks : d.remarks,
              lastUpdated: new Date().toISOString().split('T')[0],
              remainingDays: status === 'APPROVED' ? 0 : d.remainingDays,
              approvalCertificateNo: status === 'APPROVED' ? `${d.shortCode}/2026/CLR-${Math.floor(1000 + Math.random() * 9000)}` : d.approvalCertificateNo
            };
          }
          return d;
        });

        const allApproved = updatedDepts.every(d => d.status === 'APPROVED' || d.status === 'NOT_REQUIRED');
        const nextStage = allApproved ? 'APPROVED' : app.currentStage;
        const progress = allApproved ? 100 : app.stageProgress;

        return {
          ...app,
          departments: updatedDepts,
          currentStage: nextStage,
          stageProgress: progress,
          lastUpdatedAt: 'Just now'
        };
      }
      return app;
    }));
  };

  const uploadDocument = async (docId: string, fileName: string, fileSize: string, fileObj?: File) => {
    try {
      if (fileObj && selectedApplicationId) {
        await DocumentService.upload(selectedApplicationId, fileObj, 'TECHNICAL', fileName);
      }
    } catch {
      // fallback
    }

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          isUploaded: true,
          fileName,
          fileSize,
          uploadedAt: 'Just now',
          validationStatus: 'UNDER_VALIDATION'
        };
      }
      return doc;
    }));
  };

  const verifyDocument = async (docId: string, officerName: string, status: 'VERIFIED' | 'REJECTED', reason?: string) => {
    try {
      await DocumentService.validate(docId, status, reason);
    } catch {
      // fallback
    }

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          validationStatus: status,
          verifiedBy: officerName,
          verifiedAt: 'Just now',
          rejectionReason: status === 'REJECTED' ? reason : undefined
        };
      }
      return doc;
    }));
  };

  const updateInspectionChecklist = (inspectionId: string, checkId: string, compliant: boolean, notes?: string) => {
    setInspections(prev => prev.map(insp => {
      if (insp.id === inspectionId) {
        return {
          ...insp,
          checklist: insp.checklist.map(c => c.id === checkId ? { ...c, isCompliant: compliant, inspectorNotes: notes || c.inspectorNotes } : c)
        };
      }
      return insp;
    }));
  };

  const completeInspection = async (inspectionId: string, recommendation: 'APPROVE' | 'RE_INSPECT' | 'REJECT', findings: string) => {
    try {
      await InspectionService.submitResult(inspectionId, {
        checklist: { safetyConformity: true, layoutMatch: true, pollutionControlInstalled: true },
        findings,
        result: recommendation === 'APPROVE' ? 'PASSED' : 'REINSPECT'
      });
    } catch {
      // fallback
    }

    setInspections(prev => prev.map(insp => {
      if (insp.id === inspectionId) {
        return {
          ...insp,
          status: recommendation === 'APPROVE' ? 'PASSED' : 'RE_INSPECTION_REQUIRED',
          recommendation,
          findings,
          reportDate: new Date().toISOString().split('T')[0]
        };
      }
      return insp;
    }));
  };

  const respondToQuery = async (queryId: string, responseText: string, attachments?: string[]) => {
    try {
      await QueryService.respond(queryId, responseText, attachments);
    } catch {
      // fallback
    }

    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          status: 'RESPONDED',
          response: {
            responseText,
            respondedAt: 'Just now',
            attachments: attachments || ['Clarification_Enclosure_Response.pdf']
          }
        };
      }
      return q;
    }));
  };

  const raiseQuery = async (appId: string, dept: string, officer: string, question: string, dueDate: string) => {
    try {
      await QueryService.raise(appId, {
        queryText: question,
        dueDate
      });
    } catch {
      // fallback
    }

    const targetApp = applications.find(a => a.id === appId);
    const newQuery: DepartmentQuery = {
      id: `QRY-2026-0${Math.floor(100 + Math.random() * 900)}`,
      applicationId: appId,
      businessName: targetApp?.businessName || 'Industrial Unit',
      department: dept,
      raisedByOfficer: officer,
      question,
      raisedAt: 'Just now',
      dueDate,
      status: 'OPEN'
    };
    setQueries(prev => [newQuery, ...prev]);
    updateDepartmentStatus(appId, dept, 'QUERY_RAISED', question);
  };

  const renewLicence = async (licenceId: string) => {
    try {
      await RenewalService.renew(licenceId);
    } catch {
      // fallback
    }

    setLicences(prev => prev.map(lic => {
      if (lic.id === licenceId) {
        return {
          ...lic,
          status: 'RENEWAL_IN_PROGRESS',
          daysRemaining: 365
        };
      }
      return lic;
    }));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      selectedApplicationId,
      setSelectedApplicationId,
      selectedApplication,
      isLoading,
      refreshAll,
      addApplication,
      updateApplicationStage,
      updateDepartmentStatus,
      documents,
      uploadDocument,
      verifyDocument,
      inspections,
      updateInspectionChecklist,
      completeInspection,
      queries,
      respondToQuery,
      raiseQuery,
      licences,
      renewLicence
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};

export default ApplicationContext;
