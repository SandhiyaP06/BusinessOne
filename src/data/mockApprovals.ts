import { DigitalLicence } from '../types';

export const mockDigitalLicences: DigitalLicence[] = [
  {
    id: 'LIC-2026-0921',
    licenceNumber: 'IND/SWC/2026/004821-KRN',
    licenceName: 'Consolidated Single Window Operating Clearance',
    applicationId: 'APP-2026-IND-05102',
    businessName: 'Solaria Clean Energy Equipment Manufacturing',
    issuingAuthority: 'State Single Window Industrial Clearance Board',
    issueDate: '2026-02-28',
    expiryDate: '2029-02-27',
    daysRemaining: 1074,
    status: 'HEALTHY',
    signatory: 'Dr. Rameshwar Hegde, IAS',
    signatoryDesignation: 'Principal Secretary & Chairman, Single Window Clearance Board',
    termsAndConditions: [
      'The industrial enterprise must adhere strictly to emission parameters as notified under Environment (Protection) Rules.',
      'Quarterly compliance reports regarding raw material procurement and hazardous e-waste generation must be digitally uploaded.',
      'Valid factory building stability certificate must be renewed quinquennially through an empanelled structural engineer.',
      'Employment quota for local trained candidates must be maintained at minimum 65% in non-technical categories.'
    ]
  },
  {
    id: 'LIC-2025-0481',
    licenceNumber: 'PCB/CTO/AIR-WATER/2025/1194',
    licenceName: 'Consent To Operate (CTO) - Air & Water Pollution Act',
    applicationId: 'APP-2025-IND-01048',
    businessName: 'Apex Precision Castings & Tooling Ltd',
    issuingAuthority: 'State Pollution Control Board',
    issueDate: '2025-04-10',
    expiryDate: '2026-04-09',
    daysRemaining: 21,
    status: 'EXPIRING_SOON',
    signatory: 'Er. Sandeep Mukherjee',
    signatoryDesignation: 'Member Secretary, State Pollution Control Board',
    termsAndConditions: [
      'Online stack emission monitors must maintain uninterrupted link to State Pollution Control Server.',
      'Sludge generated from settling tanks must be dispatched only to TSDF facility within 90 days.',
      'Ambient air quality within 500m radius of foundry furnace must be measured quarterly.'
    ]
  },
  {
    id: 'LIC-2024-0309',
    licenceNumber: 'FIRE/NOC/RENEW/2024/7710',
    licenceName: 'Fire Safety & Hazardous Material Storage NOC',
    applicationId: 'APP-2024-IND-00389',
    businessName: 'Vanguard Polymer Extrusions Pvt Ltd',
    issuingAuthority: 'Department of Fire & Emergency Services',
    issueDate: '2024-03-01',
    expiryDate: '2026-02-28',
    daysRemaining: -20,
    status: 'EXPIRED',
    signatory: 'Brig. K. K. Verma (Retd.)',
    signatoryDesignation: 'Director General, Fire Safety & Emergency Services',
    termsAndConditions: [
      'Annual mock drill and fire evacuation exercise must be conducted with logbook verification.',
      'Pressure testing of all CO2 and DCP extinguishing cylinders must be certified annually.'
    ]
  }
];
