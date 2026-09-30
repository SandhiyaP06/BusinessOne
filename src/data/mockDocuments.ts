import { DocumentItem } from '../types';

export const mockDocuments: DocumentItem[] = [
  {
    id: 'DOC-001',
    applicationId: 'APP-2026-IND-04829',
    name: 'Certificate of Incorporation & Memorandum of Association',
    category: 'LEGAL',
    required: true,
    isUploaded: true,
    fileName: 'AeroTech_COI_MoA_Certified.pdf',
    fileSize: '3.4 MB',
    uploadedAt: '2026-03-04 10:12 AM',
    validationStatus: 'VERIFIED',
    verifiedBy: 'S. K. Nambiar (DIC)',
    verifiedAt: '2026-03-06 11:30 AM'
  },
  {
    id: 'DOC-002',
    applicationId: 'APP-2026-IND-04829',
    name: 'Registered Land Possession Order / KIADB Allotment Letter',
    category: 'LEGAL',
    required: true,
    isUploaded: true,
    fileName: 'KIADB_Plot42A_Allotment_Deed.pdf',
    fileSize: '5.1 MB',
    uploadedAt: '2026-03-04 10:14 AM',
    validationStatus: 'VERIFIED',
    verifiedBy: 'Meera Deshmukh (TCPA)',
    verifiedAt: '2026-03-08 03:20 PM'
  },
  {
    id: 'DOC-003',
    applicationId: 'APP-2026-IND-04829',
    name: 'Detailed Project Report (DPR) with Machinery Layout',
    category: 'TECHNICAL',
    required: true,
    isUploaded: true,
    fileName: 'AeroTech_DPR_Layout_V2.pdf',
    fileSize: '12.8 MB',
    uploadedAt: '2026-03-04 10:18 AM',
    validationStatus: 'VERIFIED',
    verifiedBy: 'S. K. Nambiar (DIC)',
    verifiedAt: '2026-03-10 09:45 AM'
  },
  {
    id: 'DOC-004',
    applicationId: 'APP-2026-IND-04829',
    name: 'Effluent Treatment Plant (ETP) Engineering Drawing & Flow Sheet',
    category: 'ENVIRONMENTAL',
    required: true,
    isUploaded: true,
    fileName: 'ETP_ZLD_Schematic_Drawing_2026.pdf',
    fileSize: '8.6 MB',
    uploadedAt: '2026-03-04 10:22 AM',
    validationStatus: 'UNDER_VALIDATION',
    verifiedBy: 'Dr. Ananya Sen (SPCB)'
  },
  {
    id: 'DOC-005',
    applicationId: 'APP-2026-IND-04829',
    name: 'Comprehensive Fire Evacuation Plan & Static Water Reservoir Blueprint',
    category: 'SAFETY',
    required: true,
    isUploaded: true,
    fileName: 'Fire_Hydrant_Evacuation_Plan_R1.pdf',
    fileSize: '9.2 MB',
    uploadedAt: '2026-03-04 10:25 AM',
    validationStatus: 'REJECTED',
    verifiedBy: 'Rajeshwar Patil (FIRE)',
    verifiedAt: '2026-03-18 04:15 PM',
    rejectionReason: 'Secondary pump room capacity diagram missing. Pressure ring calculation not signed by chartered fire engineer.'
  },
  {
    id: 'DOC-006',
    applicationId: 'APP-2026-IND-04829',
    name: 'Audited Financial Statements & Net Worth Certificate',
    category: 'FINANCIAL',
    required: true,
    isUploaded: true,
    fileName: 'Audited_BalanceSheet_CA_Certified.pdf',
    fileSize: '4.2 MB',
    uploadedAt: '2026-03-04 10:28 AM',
    validationStatus: 'VERIFIED',
    verifiedBy: 'S. K. Nambiar (DIC)',
    verifiedAt: '2026-03-09 02:00 PM'
  },
  {
    id: 'DOC-007',
    applicationId: 'APP-2026-IND-04829',
    name: 'Hazardous Waste Storage & Co-processing Agreement',
    category: 'ENVIRONMENTAL',
    required: false,
    isUploaded: false,
    validationStatus: 'REQUIRED'
  }
];
