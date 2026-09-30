export type UserRole = 'ENTREPRENEUR' | 'DEPARTMENT_OFFICER' | 'INSPECTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation?: string;
  department?: string;
  organization?: string;
  avatarUrl?: string;
}

export type ApplicationCategory = 'RED' | 'ORANGE' | 'GREEN' | 'WHITE';

export type ApplicationStage = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'SCRUTINY'
  | 'PARALLEL_DEPARTMENT_REVIEW'
  | 'INSPECTION'
  | 'VERIFICATION'
  | 'FINAL_APPROVAL'
  | 'APPROVED'
  | 'REJECTED';

export type DepartmentApprovalStatus = 
  | 'NOT_REQUIRED'
  | 'ASSIGNED'
  | 'UNDER_REVIEW'
  | 'QUERY_RAISED'
  | 'INSPECTION_SCHEDULED'
  | 'RECOMMENDED'
  | 'APPROVED'
  | 'REJECTED';

export interface DepartmentReview {
  departmentId: string;
  departmentName: string;
  shortCode: string;
  status: DepartmentApprovalStatus;
  assignedOfficer: string;
  submittedDate: string;
  lastUpdated: string;
  remarks?: string;
  slaDays: number;
  remainingDays: number;
  approvalCertificateNo?: string;
}

export interface Application {
  id: string;
  businessName: string;
  enterpriseType: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'MEGA_PROJECT';
  category: ApplicationCategory;
  sector: string;
  projectDescription: string;
  investmentInLakhs: number;
  expectedEmployment: number;
  proposedLocation: {
    address: string;
    plotNo: string;
    industrialArea: string;
    district: string;
    state: string;
    pincode: string;
    landAreaAcres: number;
    powerRequirementKVA: number;
    waterRequirementKLD: number;
  };
  contactPerson: {
    name: string;
    designation: string;
    mobile: string;
    email: string;
    panNumber: string;
    gstin: string;
  };
  currentStage: ApplicationStage;
  stageProgress: number; // 0-100%
  submittedAt: string;
  lastUpdatedAt: string;
  departments: DepartmentReview[];
  applicableApprovals: ApprovalRequirement[];
  isDraft?: boolean;
  membersApplied?: number;
  membersApproved?: number;
}

export type DocumentValidationStatus = 
  | 'REQUIRED'
  | 'UPLOADED'
  | 'UNDER_VALIDATION'
  | 'VERIFIED'
  | 'REJECTED';

export interface DocumentItem {
  id: string;
  applicationId: string;
  name: string;
  category: 'LEGAL' | 'TECHNICAL' | 'FINANCIAL' | 'ENVIRONMENTAL' | 'SAFETY';
  required: boolean;
  isUploaded: boolean;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  validationStatus: DocumentValidationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface ApprovalRequirement {
  id: string;
  name: string;
  department: string;
  mandatory: boolean;
  legalAct: string;
  reason: string;
  requiredDocuments: string[];
  status: 'PENDING' | 'CLEARED' | 'NOT_APPLICABLE';
}

export type InspectionStatus = 
  | 'SCHEDULED'
  | 'ASSIGNED'
  | 'COMPLETED'
  | 'PASSED'
  | 'RE_INSPECTION_REQUIRED';

export interface InspectionChecklistItem {
  id: string;
  title: string;
  category: string;
  isCompliant: boolean;
  inspectorNotes?: string;
}

export interface Inspection {
  id: string;
  applicationId: string;
  businessName: string;
  department: string;
  inspectorName: string;
  inspectorDesignation: string;
  inspectorContact: string;
  scheduledDate: string;
  scheduledTime: string;
  siteLocation: string;
  status: InspectionStatus;
  checklist: InspectionChecklistItem[];
  findings?: string;
  reportDate?: string;
  recommendation?: 'APPROVE' | 'RE_INSPECT' | 'REJECT';
}

export type QueryStatus = 'OPEN' | 'RESPONDED' | 'UNDER_REVIEW' | 'RESOLVED';

export interface DepartmentQuery {
  id: string;
  applicationId: string;
  businessName: string;
  department: string;
  raisedByOfficer: string;
  question: string;
  raisedAt: string;
  dueDate: string;
  status: QueryStatus;
  response?: {
    responseText: string;
    respondedAt: string;
    attachments?: string[];
  };
}

export type LicenceHealthStatus = 'HEALTHY' | 'EXPIRING_SOON' | 'EXPIRED' | 'RENEWAL_IN_PROGRESS';

export interface DigitalLicence {
  id: string;
  licenceNumber: string;
  licenceName: string;
  applicationId: string;
  businessName: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: LicenceHealthStatus;
  qrCodeUrl?: string;
  signatory: string;
  signatoryDesignation: string;
  termsAndConditions: string[];
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  category: 'APPLICATION' | 'DOCUMENT' | 'INSPECTION' | 'QUERY' | 'APPROVAL' | 'RENEWAL';
  timestamp: string;
  isRead: boolean;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  targetUrl?: string;
}
