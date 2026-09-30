import { Inspection } from '../types';

export const mockInspections: Inspection[] = [
  {
    id: 'INSP-2026-0812',
    applicationId: 'APP-2026-IND-03911',
    businessName: 'Nexus Bio-Pharma Formulations LLP',
    department: 'State Pollution Control Board & Drug Inspectorate Joint Wing',
    inspectorName: 'V. Ramachandran',
    inspectorDesignation: 'Senior Environmental & Chemical Safety Inspector',
    inspectorContact: '+91 94408 90123',
    scheduledDate: '2026-03-24',
    scheduledTime: '10:30 AM - 01:30 PM',
    siteLocation: 'Plot 18/B, Pharma City Phase III, Hyderabad',
    status: 'SCHEDULED',
    checklist: [
      {
        id: 'CHK-01',
        title: 'High Efficiency Particulate Air (HEPA) Filtration & Pressure Differential Verification',
        category: 'Cleanroom Standards',
        isCompliant: true,
        inspectorNotes: 'Pre-check certification submitted by accredited agency meets ISO 14644-1.'
      },
      {
        id: 'CHK-02',
        title: 'Effluent Neutralization Tank & Acid/Alkali Spill Containment Dykes',
        category: 'Pollution Control',
        isCompliant: false,
        inspectorNotes: 'Physical dyke volume inspection pending during site visit.'
      },
      {
        id: 'CHK-03',
        title: 'Dedicated Solvent Storage with Flameproof Electrical Enclosures',
        category: 'Explosion Safety',
        isCompliant: true,
        inspectorNotes: 'ATEX compliant switchgear documented.'
      },
      {
        id: 'CHK-04',
        title: 'Continuous Online Emission Monitoring System (CEMS) Telemetry Link to SPCB Server',
        category: 'Environmental Compliance',
        isCompliant: false,
        inspectorNotes: 'Live IP handshake pending verification with SPCB Central Server.'
      }
    ]
  },
  {
    id: 'INSP-2026-0749',
    applicationId: 'APP-2026-IND-05102',
    businessName: 'Solaria Clean Energy Equipment Manufacturing',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    inspectorName: 'Sanjay Rawat',
    inspectorDesignation: 'Deputy Chief Inspector of Factories',
    inspectorContact: '+91 98254 11094',
    scheduledDate: '2026-02-14',
    scheduledTime: '11:00 AM - 03:00 PM',
    siteLocation: 'Plot 7 to 10, Solar Tech Park, Ahmedabad',
    status: 'PASSED',
    findings: 'All automated laminator safety interlocks, emergency stop pull cords, robotic gantry laser curtains, and adequate ventilation systems verified compliant under Section 21 of Factories Act 1948.',
    reportDate: '2026-02-16',
    recommendation: 'APPROVE',
    checklist: [
      {
        id: 'CHK-10',
        title: 'Machine Guarding & Emergency Stop Interlocks',
        category: 'Machinery Safety',
        isCompliant: true,
        inspectorNotes: 'Conforms to IS 16503 standards.'
      },
      {
        id: 'CHK-11',
        title: 'Fire Escape Widths and Emergency Staircase Access',
        category: 'Life Safety',
        isCompliant: true,
        inspectorNotes: 'Double fire exits provided for bays exceeding 30m length.'
      }
    ]
  },
  {
    id: 'INSP-2026-0690',
    applicationId: 'APP-2026-IND-04829',
    businessName: 'AeroTech Propulsion Systems Pvt Ltd',
    department: 'Fire & Emergency Safety Services',
    inspectorName: 'Rajeshwar Patil',
    inspectorDesignation: 'Divisional Fire Officer',
    inspectorContact: '+91 98451 99014',
    scheduledDate: '2026-03-28',
    scheduledTime: '02:00 PM - 05:00 PM',
    siteLocation: 'Plot 42-A, Aerospace SEZ, Phase II, Bengaluru',
    status: 'ASSIGNED',
    checklist: [
      {
        id: 'CHK-20',
        title: 'Underground Static Reservoir (200,000 Litres Minimum)',
        category: 'Water Storage',
        isCompliant: false,
        inspectorNotes: 'Pending physical depth and suction line inspection.'
      },
      {
        id: 'CHK-21',
        title: 'Automatic Sprinkler Density and Flow Rate Testing',
        category: 'Active Fire Fighting',
        isCompliant: false,
        inspectorNotes: 'To be calibrated using hydrostatic test pump.'
      }
    ]
  }
];
